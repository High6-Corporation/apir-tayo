import { Navigation } from "@/app/components/navigation/Navigation";
import { Footer } from "@/app/components/sections/homepage/Footer";
import ContactFormSection from "@/app/components/sections/contact/ContactFormSection";


export default async function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
