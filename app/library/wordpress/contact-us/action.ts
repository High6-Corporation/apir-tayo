"use server";
import { unstable_cache } from "next/cache";

// Cache form fields for 1 hour
export const getFormFields = unstable_cache(
  async () => {
    const baseUrl = process.env.WORDPRESS_URL;
    const credentials = Buffer.from(
      `${process.env.GFORM_CONSUMER_KEY}:${process.env.GFORM_CONSUMER_SECRET}`
    ).toString("base64");

    const res = await fetch(`${baseUrl}/wp-json/gf/v2/forms/1`, {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const form = await res.json();
    const formFields = form.fields.map((f: any) => ({
      id: f.id,
      type: f.type,
      label: f.label,
      required: f.isRequired,
    }));

    return formFields;
  },
  ["contact-form-fields"],
  { revalidate: 3600 }
);
