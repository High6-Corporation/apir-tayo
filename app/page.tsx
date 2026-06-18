import dynamic from "next/dynamic";
import { Navigation } from "@/app/components/navigation/Navigation";
import { HeroSection } from "@/app/components/sections/homepage/HeroSection";
import { Footer } from "@/app/components/sections/homepage/Footer";

// Dynamically import below-fold sections for better performance
const WhyOnePageSection = dynamic(
  () => import("@/app/components/sections/homepage/WhyOnePageSection").then((mod) => mod.WhyOnePageSection),
  { ssr: true }
);

const PricingSection = dynamic(
  () => import("@/app/components/sections/homepage/PricingSection").then((mod) => mod.PricingSection),
  { ssr: true }
);

const HowItWorksSection = dynamic(
  () => import("@/app/components/sections/homepage/HowItWorksSection").then((mod) => mod.HowItWorksSection),
  { ssr: true }
);

const PortfolioSection = dynamic(
  () => import("@/app/components/sections/homepage/PortfolioSection").then((mod) => mod.PortfolioSection),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import("@/app/components/sections/homepage/TestimonialsSection").then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

const TrustSection = dynamic(
  () => import("@/app/components/sections/homepage/TrustSection").then((mod) => mod.TrustSection),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/app/components/sections/homepage/FAQSection").then((mod) => mod.FAQSection),
  { ssr: true }
);

const CTASection = dynamic(
  () => import("@/app/components/sections/homepage/CTASection").then((mod) => mod.CTASection),
  { ssr: true }
);

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
