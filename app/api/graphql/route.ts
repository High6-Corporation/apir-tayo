import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Cache form data for 1 hour (3600 seconds)
const getCachedForm = unstable_cache(
  async (baseUrl: string, credentials: string) => {
    const res = await fetch(`${baseUrl}/wp-json/gf/v2/forms/1`, {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: 3600 }, // ISR: regenerate every hour
    });
    return res.json();
  },
  ["gravity-form"],
  { revalidate: 3600 }
);

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();
  
  const baseUrl = process.env.WORDPRESS_URL;

  const credentials = Buffer.from(`${process.env.GFORM_CONSUMER_KEY}:${process.env.GFORM_CONSUMER_SECRET}`).toString('base64');

  // GraphQL Schema
  if (query.includes("form {")) {
    // Use cached form data
    const form = await getCachedForm(baseUrl!, credentials);
    
    return NextResponse.json({
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
    
    return NextResponse.json({
      data: {
        submitForm: {
          success: true,
          entryId: result.id,
          message: "Thanks for contacting us!",
        },
      },
    });
  }

  return NextResponse.json({ error: "Unknown query" }, { status: 400 });
}
