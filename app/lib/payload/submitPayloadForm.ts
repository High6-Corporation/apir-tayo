"use server";

import { headers } from "next/headers";
import {
  type DynamicFormField,
  type FormSubmissionResult,
  validateCleanTalkToken,
} from "@/app/lib/gravity-forms/contactform";

const BASE_URL = process.env.PAYLOAD_API_URL;

/**
 * Submit form data to Payload CMS form-submissions collection.
 *
 * Mirrors the validation logic from submitDynamicFormAction (honeypot check,
 * CleanTalk anti-spam) but POSTs to Payload instead of Gravity Forms.
 */
export async function submitPayloadFormAction(
  formData: FormData,
  fields: DynamicFormField[],
  formId: string,
): Promise<FormSubmissionResult> {
  try {
    // --- Honeypot check ---
    const honeypot = formData.get("website")?.toString().trim() || "";
    if (honeypot) {
      // Silently accept — bot likely filled the hidden field
      return { success: true, message: "Form submitted successfully" };
    }

    // --- CleanTalk token extraction ---
    const ctToken =
      formData.get("ct_bot_detector_event_token")?.toString() || "";

    if (!ctToken || ctToken.trim() === "") {
      console.warn("CleanTalk token not provided - rejecting submission");
      return {
        success: false,
        message: "Verification failed. Please refresh the page and try again.",
      };
    }

    // --- Collect request metadata for CleanTalk ---
    const headersList = await headers();
    const userIP =
      headersList.get("cf-connecting-ip") ||
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
      headersList.get("x-real-ip") ||
      headersList.get("x-client-ip") ||
      headersList.get("remote-addr") ||
      "unknown";

    const userAgent = headersList.get("user-agent") || "";
    const referrer =
      headersList.get("referer") || headersList.get("referrer") || "";

    // --- Build CleanTalk payload ---
    const emailField = fields.find((f) => f.type === "email");
    const senderEmail = emailField
      ? formData.get(emailField.name)?.toString() || ""
      : "";

    const sanitize = (str: string) => str.replace(/<[^>]*>/g, "").trim();
    const allFormValues = fields
      .map((f) => formData.get(f.name)?.toString() || "")
      .filter((val) => val && val.trim() !== "")
      .map(sanitize)
      .join(" | ")
      .substring(0, 1024);

    const ctResult = await validateCleanTalkToken(
      ctToken,
      senderEmail,
      allFormValues,
      userIP,
      userAgent,
      referrer,
    );

    if (!ctResult.allow) {
      console.warn("CleanTalk validation failed:", ctResult.message);
      return {
        success: false,
        message: "Verification failed. Please refresh the page and try again.",
      };
    }

    // --- Build submissionData using payloadName ---
    // For file upload fields: upload the file to Payload Media first,
    // then store the media document ID as the submission value.
    // form-submissions doesn't accept multipart — this is the confirmed pattern.
    const submissionData: { field: string; value: string }[] = []

    for (const field of fields) {
      if (field.type === 'fileupload') {
        const file = formData.get(field.name) as File | null
        if (file && file.size > 0) {
          try {
            const uploadForm = new FormData()
            uploadForm.append('file', file)
            uploadForm.append('formId', formId)

            const uploadRes = await fetch(`${BASE_URL}/api/public-form-upload`, {
              method: 'POST',
              body: uploadForm,
            })

            if (uploadRes.ok) {
              const created = await uploadRes.json()
              const mediaId = created?.id ?? ''
              if (mediaId) {
                submissionData.push({
                  field: field.payloadName ?? field.name,
                  value: mediaId,
                })
              }
            } else {
              console.error(
                `[submitPayloadForm] Media upload failed for ${field.name}: HTTP ${uploadRes.status}`,
              )
            }
          } catch (err) {
            console.error(
              `[submitPayloadForm] Media upload error for ${field.name}:`,
              err,
            )
          }
        }
      } else {
        submissionData.push({
          field: field.payloadName ?? field.name,
          value: formData.get(field.name)?.toString().trim() || '',
        })
      }
    };

    // --- Resolve tenant from the form document ---
    if (!BASE_URL) {
      console.error("PAYLOAD_API_URL is not set");
      return {
        success: false,
        message: "Form configuration error. Please try again later.",
      };
    }

    const formRes = await fetch(`${BASE_URL}/api/forms/${formId}?depth=0`);
    const formDoc = await formRes.json();
    const tenantId = formDoc?.tenant;

    // --- POST to Payload ---
    // Forward real client IP/UA/referrer so the Payload-side CleanTalk hook
    // scores the visitor, not the VPS. The hook reads clientInfo.ip /
    // clientInfo.userAgent / clientInfo.referrer when present.
    const response = await fetch(`${BASE_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: formId,
        submissionData,
        tenant: tenantId,
        clientInfo: {
          ip: userIP,
          userAgent,
          referrer,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payload form-submissions API error:", errorText);
      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Payload form submission error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
