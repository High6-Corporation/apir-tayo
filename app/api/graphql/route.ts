import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Cache configuration
const CACHE_TAGS = ["gravity-form"];
const CACHE_REVALIDATE = 3600; // 1 hour

// Cache form data for 1 hour (3600 seconds)
const getCachedForm = unstable_cache(
  async (baseUrl: string, credentials: string) => {
    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const res = await fetch(`${baseUrl}/wp-json/gf/v2/forms/${formId}`, {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: CACHE_REVALIDATE, tags: CACHE_TAGS },
    });
    return res.json();
  },
  CACHE_TAGS,
  { revalidate: CACHE_REVALIDATE }
);

// Helper function to add cache headers to responses
function addCacheHeaders(response: NextResponse, maxAge: number = 3600): NextResponse {
  response.headers.set(
    "Cache-Control",
    `public, max-age=${maxAge}, stale-while-revalidate=86400`
  );
  response.headers.set("Vary", "Accept-Encoding");
  return response;
}

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();
  
  const baseUrl = process.env.WORDPRESS_URL;

  const credentials = Buffer.from(`${process.env.GFORM_CONSUMER_KEY}:${process.env.GFORM_CONSUMER_SECRET}`).toString('base64');

  // GraphQL Schema
  if (query.includes("form {")) {
    // Use cached form data
    const form = await getCachedForm(baseUrl!, credentials);

    const response = NextResponse.json({
      data: {
        form: {
          id: form.id,
          title: form.title,
          fields: form.fields.map((f: any) => ({
            id: f.id,
            type: f.type,
            label: f.label,
            required: f.isRequired,
            placeholder: f.placeholder,
          })),
        },
      },
    });

    return addCacheHeaders(response, CACHE_REVALIDATE);
  }

  if (query.includes("submitForm")) {
    const { input } = variables;
    
    // Get user's real IP address (not VPS IP)
    const userIP = 
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('x-client-ip') ||
      request.headers.get('remote-addr') ||
      'unknown';

    // Extract user agent and referrer from request headers
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || '';

    // Extract CleanTalk token from fields
    const { ct_bot_detector_event_token, ...formFields } = input;

    // Find the email field by checking field types from cached form
    const form = await getCachedForm(baseUrl!, credentials);
    const emailField = form.fields.find((f: any) => f.type === 'email');
    const senderEmail = emailField ? (formFields[emailField.id] as string) || '' : '';

    // Combine all form field values into a single message string
    const allFormValues = Object.values(formFields)
      .filter((val): val is string => typeof val === 'string' && val.trim() !== '')
      .join(' | ')
      .substring(0, 10000);

    // Require CleanTalk token for all submissions
    if (!ct_bot_detector_event_token || ct_bot_detector_event_token.trim() === '') {
      console.warn('CleanTalk token not provided - rejecting submission');
      return NextResponse.json(
        { 
          error: 'Bot verification failed. Please refresh the page and try again.'
        },
        { status: 403 }
      );
    }

    // Validate the token with CleanTalk API
    const ctValidationResult = await validateCleanTalkToken(
      ct_bot_detector_event_token, 
      senderEmail,
      allFormValues,
      userIP,
      userAgent,
      referrer
    );
    
    if (!ctValidationResult.allow) {
      console.warn('CleanTalk validation failed:', ctValidationResult.message);
      const response = NextResponse.json(
        { 
          error: ctValidationResult.message || 'Verification failed. Please try again.'
        },
        { status: 403 }
      );
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
    
    // CleanTalk passed - proceed with form submission
    const entryData = Object.fromEntries(
      Object.entries(formFields).map(([fieldId, value]) => [`input_${fieldId}`, value])
    );

    const formId = process.env.WP_GRAVITY_FORM_CONTACT_ID;

    const res = await fetch(`${baseUrl}/wp-json/gf/v2/forms/${formId}/submissions`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });

    const result = await res.json();
    
    if (result.is_valid === false) {
      const response = NextResponse.json({
        data: {
          submitForm: {
            success: false,
            entryId: null,
            message: "Validation failed.",
            validationMessages: result.validation_messages || {},
          },
        },
      });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const response = NextResponse.json({
      data: {
        submitForm: {
          success: true,
          entryId: result.id,
          message: "Thanks for contacting us!",
        },
      },
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const errorResponse = NextResponse.json({ error: "Unknown query" }, { status: 400 });
  errorResponse.headers.set("Cache-Control", "no-store");
  return errorResponse;
}

// CleanTalk token validation function
async function validateCleanTalkToken(
  token: string, 
  senderEmail: string,
  message: string,
  userIP: string,
  userAgent: string = '',
  referrer: string = ''
): Promise<{ allow: boolean; message?: string; code?: string }> {
  try {
    const apiKey = process.env.CLEANTALK_API_KEY;
    if (!apiKey) {
      // Fail closed in production, fail open in development
      const isProduction = process.env.NODE_ENV === 'production';
      if (isProduction) {
        console.error('CLEANTALK_API_KEY not configured in production - rejecting submission');
        return { allow: false, message: 'Service unavailable' };
      } else {
        console.warn('CLEANTALK_API_KEY not configured (development mode) - rejecting submission');
        return { allow: false, message: 'Api Key not configured' };
      }
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      // Use the correct CleanTalk API endpoint
      const response = await fetch('https://moderate.cleantalk.org/api2.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method_name: 'check_message',
          auth_key: apiKey,
          event_token: token,
          event_token_enabled: 1,
          sender_ip: userIP,
          sender_email: senderEmail,
          message: message,
          sender_info: JSON.stringify({
            REFFERRER: referrer,
            USER_AGENT: userAgent
          })
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);
      // Check if API response is OK
      if (!response.ok) {
        console.error('CleanTalk API error:', response.status, response.statusText);
        
        // Fail closed - block submission when API is down
        return { allow: false, message: 'Verification service unavailable. Please try again later.' };
      }

      const result = await response.json();

      // CleanTalk returns allow as number (1 or 0), not boolean
      if (result.allow === 1 || result.allow === true) {
        return { allow: true };
      } else {
        console.warn('CleanTalk blocked:', result.codes);
        return {
          allow: false,
          message: result.comment || 'Verification failed',
          code: result.codes || result.code
        };
      }
    } catch (fetchError: any) {
      clearTimeout(timeout);
      
      // Handle timeout specifically
      if (fetchError.name === 'AbortError') {
        console.error('CleanTalk API request timed out');
      } else {
        console.error('CleanTalk validation network error:', fetchError.message);
      }
      
      // Fail closed - block submission on network errors
      return { allow: false, message: 'Verification service unavailable. Please try again later.' };
    }
  } catch (error: any) {
    console.error('CleanTalk validation unexpected error:', error.message);
    // Fail closed - block submission on unexpected errors
    return { allow: false, message: 'Verification service unavailable. Please try again later.' };
  }
}
