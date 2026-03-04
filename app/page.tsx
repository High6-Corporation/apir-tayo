import { Navigation } from "@/app/components/navigation/Navigation";
import { HeroSection } from "@/app/components/sections/homepage/HeroSection";
import { WhyOnePageSection } from "@/app/components/sections/homepage/WhyOnePageSection";
import { PricingSection } from "@/app/components/sections/homepage/PricingSection";
import { HowItWorksSection } from "@/app/components/sections/homepage/HowItWorksSection";
import { PortfolioSection } from "@/app/components/sections/homepage/PortfolioSection";
import { TestimonialsSection } from "@/app/components/sections/homepage/TestimonialsSection";
import { TrustSection } from "@/app/components/sections/homepage/TrustSection";
import { FAQSection } from "@/app/components/sections/homepage/FAQSection";
import { CTASection } from "@/app/components/sections/homepage/CTASection";
import { Footer } from "@/app/components/sections/homepage/Footer";

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyOnePageSection />
      <PricingSection />
      <HowItWorksSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TrustSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
