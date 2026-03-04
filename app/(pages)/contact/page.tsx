import { Navigation } from "@/app/components/navigation/Navigation";
import { ContactSection } from "@/app/components/sections/contact/ContactSection";
import { Footer } from "@/app/components/sections/homepage/Footer";

// ISR: Regenerate page every 1 hour (3600 seconds)
export const revalidate = 3600;

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <ContactSection />
      <Footer />
    </div>
  );
}
