import type {
  DynamicFormField,
  GravityFieldType,
} from "@/app/lib/gravity-forms/contactform";

const BASE_URL = process.env.PAYLOAD_API_URL;
const SITE_ID = process.env.PAYLOAD_SITE_ID;

// ============================================================================
// Payload Form Builder field shape (as returned by GET /api/forms/{id}?depth=1)
// ============================================================================

interface PayloadFormField {
  id?: string;
  name: string;
  blockName?: string;
  blockType: string;
  label: string;
  required?: boolean;
  width?: number;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  maxLength?: number;
  description?: string;
}

interface PayloadForm {
  id: string;
  title: string;
  fields: PayloadFormField[];
}

// ============================================================================
// Type mapping — Payload blockType → GravityFieldType
// ============================================================================

function mapBlockType(blockType: string): GravityFieldType {
  const typeMap: Record<string, GravityFieldType> = {
    text: "text",
    email: "email",
    number: "phone", // Payload seed data uses blockType: 'number' for phone fields
    textarea: "textarea",
    select: "select",
    checkbox: "checkbox",
    radio: "radio",
    date: "date",
    fileupload: "fileupload",
    website: "website",
  };
  return typeMap[blockType] || "text";
}

// ============================================================================
// Transform — Payload field → frontend DynamicFormField
// ============================================================================

function transformField(
  field: PayloadFormField,
  index: number,
): DynamicFormField {
  const fieldId = index + 1; // Gravity Forms uses 1-based numeric IDs; match that convention
  const mappedType = mapBlockType(field.blockType);

  let choices: { value: string; label: string }[] | undefined;
  if (field.options && Array.isArray(field.options)) {
    choices = field.options.map((opt) => ({
      value: opt.value,
      label: opt.label,
    }));
  }

  return {
    id: fieldId,
    type: mappedType,
    label: field.label,
    name: `input_${fieldId}`,
    isRequired: field.required || false,
    placeholder: field.placeholder || field.label || "",
    choices,
    maxLength: field.maxLength,
    description: field.description,
  };
}

// ============================================================================
// Public API
// ============================================================================

/**
 * Fetch a single form by ID from Payload CMS and return its fields transformed
 * for frontend rendering. Returns an empty array on any failure.
 */
export async function fetchPayloadFormFields(
  formId: string,
): Promise<DynamicFormField[]> {
  if (!BASE_URL) {
    console.error("[fetchPayloadFormFields] PAYLOAD_API_URL is not set");
    return [];
  }

  try {
    const url = `${BASE_URL}/api/forms/${formId}?depth=1`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(
        `[fetchPayloadFormFields] HTTP ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const form = (await res.json()) as PayloadForm;

    if (!form.fields || !Array.isArray(form.fields)) {
      return [];
    }

    return form.fields
      .filter((f) => !["hidden", "html", "section"].includes(f.blockType))
      .map((field, index) => transformField(field, index));
  } catch (error) {
    console.error("[fetchPayloadFormFields] fetch failed", error);
    return [];
  }
}

/**
 * Fetch the contact form for the current site from Payload CMS.
 *
 * Queries the `forms` collection scoped to PAYLOAD_SITE_ID and returns the
 * first matching form's `id` and transformed `fields`. Returns `null` on any
 * failure — callers should fall back to the Gravity Forms env var path.
 */
export async function fetchPayloadContactForm(): Promise<{
  id: string;
  fields: DynamicFormField[];
} | null> {
  if (!BASE_URL || !SITE_ID) {
    console.error(
      "[fetchPayloadContactForm] PAYLOAD_API_URL or PAYLOAD_SITE_ID is not set",
    );
    return null;
  }

  try {
    const url = `${BASE_URL}/api/forms?where[site][equals]=${SITE_ID}&depth=1`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(
        `[fetchPayloadContactForm] HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = (await res.json()) as { docs: PayloadForm[] };

    if (!json.docs || json.docs.length === 0) {
      return null;
    }

    const form = json.docs[0];
    const fields =
      form.fields
        ?.filter((f) => !["hidden", "html", "section"].includes(f.blockType))
        .map((field, index) => transformField(field, index)) ?? [];

    return { id: form.id, fields };
  } catch (error) {
    console.error("[fetchPayloadContactForm] fetch failed", error);
    return null;
  }
}
