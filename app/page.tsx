import { Navigation } from "@/app//components/navigation/Navigation";
import { HeroSection } from "@/app//components/hero/HeroSection";
import { WhyOnePageSection } from "@/app//components/why-one-page/WhyOnePageSection";
import { PricingSection } from "@/app//components/pricing/PricingSection";
import { HowItWorksSection } from "@/app//components/how-it-works/HowItWorksSection";
import { PortfolioSection } from "@/app//components/portfolio/PortfolioSection";
import { TestimonialsSection } from "@/app//components/testimonials/TestimonialsSection";
import { TrustSection } from "@/app//components/trust/TrustSection";
import { FAQSection } from "@/app//components/faq/FAQSection";
import { CTASection } from "@/app//components/cta/CTASection";
import { Footer } from "@/app//components/footer/Footer";

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
