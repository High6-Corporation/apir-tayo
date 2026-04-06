import { Navigation } from "@/app/components/navigation/Navigation";
import { ContactSection } from "@/app/components/sections/contact/ContactSection";
import { Footer } from "@/app/components/sections/homepage/Footer";
import { getFormFields } from "@/app/library/wordpress/contact-us/action";


// ISR: Regenerate page every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function ContactPage() {
  const formFields = await getFormFields();
  
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ContactSection formFields={formFields} />
      <Footer />
    </div>
  );
}
