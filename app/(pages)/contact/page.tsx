import { Navigation } from "@/app/components/navigation/Navigation";
import { Footer } from "@/app/components/sections/homepage/Footer";
import ContactFormSection from "@/app/components/sections/contact/ContactFormSection";
import { fetchPayloadContactForm } from "@/app/lib/payload/fetchPayloadForm";

// ISR: Regenerate page every 1 hour (3600 seconds).
// Form fields are fetched from Payload CMS at request time — the Payload env
// vars (PAYLOAD_API_URL, PAYLOAD_SITE_ID) may not be available at build time
// and the form definition can change in the CMS between builds.
export const revalidate = 3600;

export default async function ContactPage() {
  const contactForm = await fetchPayloadContactForm();

  // Graceful fallback: if Payload returns nothing, ContactFormSection will
  // render with an empty fields array and formId from the GF env var.
  const fields = contactForm?.fields ?? [];
  const formId = contactForm?.id ?? process.env.WP_GRAVITY_FORM_CONTACT_ID;

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ContactFormSection fields={fields} formId={formId} />
      <Footer />
    </div>
  );
}
