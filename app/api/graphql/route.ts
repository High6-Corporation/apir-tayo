import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Cache configuration
const CACHE_TAGS = ["gravity-form"];
const CACHE_REVALIDATE = 3600; // 1 hour

// Cache form data for 1 hour (3600 seconds)
const getCachedForm = unstable_cache(
  async (baseUrl: string, credentials: string) => {
    const res = await fetch(`${baseUrl}/wp-json/gf/v2/forms/1`, {
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
    
    const entryData = Object.fromEntries(
      Object.entries(input).map(([fieldId, value]) => [`input_${fieldId}`, value])
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
      // Don't cache error responses
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

    // Don't cache form submissions
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const errorResponse = NextResponse.json({ error: "Unknown query" }, { status: 400 });
  errorResponse.headers.set("Cache-Control", "no-store");
  return errorResponse;
}
