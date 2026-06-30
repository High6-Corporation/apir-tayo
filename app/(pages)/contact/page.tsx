import { Navigation } from "@/app/components/navigation/Navigation";
import { Footer } from "@/app/components/sections/homepage/Footer";
import ContactFormSection from "@/app/components/sections/contact/ContactFormSection";

// ISR: Regenerate page every 1 hour (3600 seconds).
// Page-level revalidate is required because the Gravity Forms env vars
// (WP_SITE_URL, WP_GRAVITY_FORM_CONTACT_ID, WP_GRAVITY_API_KEY,
// WP_GRAVITY_API_SECRET) are intentionally NOT available at build time
// (they live only in the VPS .env file). Without this export, the page
// would be fully static with empty fields baked in from the build step.
export const revalidate = 3600;

export default async function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
