'use server';

import { headers } from 'next/headers';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// function validateField(value: string, maxLength: number): boolean {
//   return value.length > 0 && value.length <= maxLength;
// }

function validatePhoneNumber(phone: string): boolean {
  // Check if phone contains only valid characters (digits and dashes)
  const phoneRegex = /^[\d-]+$/;
  return phoneRegex.test(phone);
}

// ============ TYPE DEFINITIONS ============

export type GravityFieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "textarea"
  | "website"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "hidden"
  | "fileupload"
  | "time"
  | "password"
  | "html"
  | "section";

export interface GravityFormChoice {
  text: string;
  value: string;
  isSelected?: boolean;
}

export interface GravityFormField {
  id: number;
  type: string;
  label: string;
  adminLabel?: string;
  isRequired: boolean;
  placeholder?: string;
  choices?: GravityFormChoice[];
  maxLength?: number;
  description?: string;
  inputName?: string;
}

// Transformed field for frontend rendering
export interface DynamicFormField {
  id: number;
  type: GravityFieldType;
  label: string;
  name: string;
  isRequired: boolean;
  placeholder: string;
  choices?: { value: string; label: string }[];
  maxLength?: number;
  description?: string;
  labelPlacement?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

// ============ FETCH FORM DEFINITION ============

// Fetch form definition from Gravity Forms
export async function getContactFormDefinition(
  formId?: string,
): Promise<Record<string, unknown> | null> {
  try {
    const siteUrl = process.env.WP_SITE_URL;
    const targetFormId = formId || process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const apiKey = process.env.WP_GRAVITY_API_KEY;
    const apiSecret = process.env.WP_GRAVITY_API_SECRET;

    if (!siteUrl || !targetFormId || !apiKey || !apiSecret) {
      console.error("Missing Gravity Forms configuration");
      return null;
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const response = await fetch(
      `${siteUrl}/wp-json/gf/v2/forms/${targetFormId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gravity Forms API Error fetching form:", errorText);
      return null;
    }

    const formDefinition = await response.json();
    return formDefinition;
  } catch (err) {
    console.error("Error fetching form definition:", err);
    return null;
  }
}

// Map Gravity Forms field types to our types
function mapFieldType(gfType: string): GravityFieldType {
  const typeMap: Record<string, GravityFieldType> = {
    text: "text",
    email: "email",
    phone: "phone",
    select: "select",
    textarea: "textarea",
    website: "website",
    number: "number",
    date: "date",
    checkbox: "checkbox",
    radio: "radio",
    hidden: "hidden",
    fileupload: "fileupload",
    time: "time",
    password: "password",
    html: "html",
    section: "section",
  };
  return typeMap[gfType] || "text";
}

// Transform Gravity Forms field to frontend field format
function transformField(field: Record<string, unknown>): DynamicFormField {
  // Handle choices - could be array, object, or undefined
  let choices: { value: string; label: string }[] | undefined;

  if (field.choices && Array.isArray(field.choices)) {
    choices = (field.choices as Array<Record<string, string>>).map(
      (choice) => ({
        value: (choice.value || choice.text) as string,
        label: choice.text as string,
      }),
    );
  }

  return {
    id: field.id as number,
    type: mapFieldType(field.type as string),
    label: (field.label || field.adminLabel || `Field ${field.id}`) as string,
    name: `input_${field.id}`,
    isRequired: (field.isRequired as boolean) || false,
    placeholder: (field.placeholder || field.label || "") as string,
    choices,
    maxLength: field.maxLength as number | undefined,
    description: field.description as string | undefined,
  };
}

// Fetch and transform form fields for dynamic rendering
export async function getDynamicFormFields(
  formId?: string,
): Promise<DynamicFormField[]> {
  try {
    const formDefinition = await getContactFormDefinition(formId);
    if (
      !formDefinition ||
      !formDefinition.fields ||
      !Array.isArray(formDefinition.fields)
    ) {
      return [];
    }

    // Filter out honeypot, hidden, and page fields, then transform
    return (formDefinition.fields as Array<Record<string, unknown>>)
      .filter((field) => {
        const fieldType = field.type as string;
        // Keep fields that are visible form inputs
        return !["honeypot", "hidden", "page", "html", "section"].includes(
          fieldType,
        );
      })
      .map(transformField);
  } catch (error) {
    console.error("Error fetching form fields:", error);
    return [];
  }
}

// ============ FORM SUBMISSION ============

// Dynamic form submission with field validation
export async function submitDynamicFormAction(
  formData: FormData,
  fields: DynamicFormField[],
  formId?: string,
  ct_bot_detector_event_token?: string,
): Promise<FormSubmissionResult> {
  try {
    const honeypot = formData.get("website")?.toString().trim() || "";
    if (honeypot) {
      return { success: true, message: "Form submitted successfully" };
    }

    // Build submission data and validate dynamically
    const missingFields: string[] = [];

    if (
      !ct_bot_detector_event_token ||
      ct_bot_detector_event_token.trim() === ""
    ) {
      console.warn("CleanTalk token not provided - rejecting submission");
      return {
        success: false,
        message: "Verification failed. Please refresh the page and try again.",
      };
    }

    // Get user's real IP address from headers (Server Action compatible)
    const headersList = await headers();
    const userIP = 
      headersList.get('cf-connecting-ip') ||
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      headersList.get('x-client-ip') ||
      headersList.get('remote-addr') ||
      'unknown';

    // Extract user agent and referrer from request headers
    const userAgent = headersList.get('user-agent') || '';
    const referrer = headersList.get('referer') || headersList.get('referrer') || '';

    // Extract form data from FormData object
    const formFields: { [key: string]: string } = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'website') { // Exclude honeypot
        formFields[key] = value.toString();
      }
    }

    // Find email field
    const emailField = fields.find((f) => f.type === 'email');
    const senderEmail = emailField ? (formFields[emailField.name] || '') : '';
    
    // Combine all form values for CleanTalk
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim();
    const allFormValues = Object.values(formFields)
      .filter((val) => val && val.trim() !== '')
      .map(sanitize)
      .join(' | ')
      .substring(0, 1024);

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
      return {
        success: false,
        message: "Verification failed. Please refresh the page and try again.",
      };
    }

    for (const field of fields) {
      // Skip file uploads
      if (field.type === "fileupload") {
        continue;
      }

      const value = formData.get(field.name)?.toString().trim() || "";

      // Special handling for "Other Subject" field (input_5)
      // Only validate if it's shown (when Subject = "Others")
      // const isOtherSubjectField = field.name === "input_5";
      // const subjectValue = formData.get("input_4")?.toString().trim() || "";
      // const isOtherSelected = subjectValue === "Others";

      // If this is the Other Subject field and "Others" is NOT selected, skip validation
      // if (isOtherSubjectField && !isOtherSelected) {
      //   continue;
      // }

      if (field.isRequired && !value) {
        console.warn(`Missing required field: ${field.label}`);
        missingFields.push(field.label);
      }

      // Validate email fields
      if (field.type === "email" && value) {
        if (value.length > 256) {
          console.error(`Email too long: ${value.length} chars`);
          return {
            success: false,
            message: `${field.label} exceeds maximum length (256 characters)`,
          };
        }
        if (!isValidEmail(value)) {
          console.error(`Invalid email format: ${value}`);
          return {
            success: false,
            message: `Invalid email format for ${field.label}`,
          };
        }
      }

      // Validate phone fields
      if (field.type === "phone" && value) {
        if (value.length > 32) {
          console.error(`Phone too long: ${value.length} chars (max 32)`);
          return {
            success: false,
            message: `${field.label} exceeds maximum length (32 characters)`,
          };
        }
        if (!validatePhoneNumber(value)) {
          console.error(`Invalid phone format: ${value}`);
          return {
            success: false,
            message: `Phone number can only contain numbers and dashes (-)`,
          };
        }
      }

      // Validate max length (use field maxLength if set, otherwise use defaults)
      const maxLength = (field.maxLength && field.maxLength > 0) 
        ? field.maxLength 
        : (field.type === 'textarea' ? 512 : 256);
      
      if (value.length > maxLength) {
        console.error(`${field.label} too long: ${value.length} > ${maxLength}`);
        return {
          success: false,
          message: `${field.label} exceeds maximum length (${maxLength} characters)`,
        };
      }
    }

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in: ${missingFields.join(", ")}`,
      };
    }

    return await submitDynamicToGravityForms(formData, formId);
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// Submit dynamic form data to Gravity Forms REST API
async function submitDynamicToGravityForms(
  formData: FormData,
  formId?: string,
): Promise<FormSubmissionResult> {
  try {
    const siteUrl = process.env.WP_SITE_URL;
    const targetFormId = formId || process.env.WP_GRAVITY_FORM_CONTACT_ID;
    const apiKey = process.env.WP_GRAVITY_API_KEY;
    const apiSecret = process.env.WP_GRAVITY_API_SECRET;

    if (!siteUrl || !targetFormId || !apiKey || !apiSecret) {
      console.error("Missing Gravity Forms configuration");
      return {
        success: false,
        message: "Form configuration error. Please try again later.",
      };
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    // Create new FormData for Gravity Forms (excluding honeypot)
    const gfFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key !== "website") {
        gfFormData.append(key, value);
      }
    }

    // Get user's real IP address and referer from headers
    const headersList = await headers();
    const userIP = 
      headersList.get('cf-connecting-ip') ||
      headersList.get('x-forwarded-for')?.split(',')[0].trim() ||
      headersList.get('x-real-ip') ||
      headersList.get('x-client-ip') ||
      headersList.get('remote-addr') ||
      'unknown';

    const referer = headersList.get('referer') || headersList.get('referrer') || '';

    const response = await fetch(
      `${siteUrl}/wp-json/gf/v2/forms/${targetFormId}/submissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
        },
        body: gfFormData,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gravity Forms API Error:", errorText);
      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      };
    }

    const result = await response.json();

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: result,
    };
  } catch (error) {
    console.error("Gravity Forms submission error:", error);
    return {
      success: false,
      message: "Failed to submit form. Please try again later.",
    };
  }
}


// CleanTalk API
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
      console.warn('CLEANTALK_API_KEY not configured (development mode) - rejecting submission');
      return { allow: false, message: 'Api Key not configured' };
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
