import dynamic from "next/dynamic";
import { Navigation } from "@/app/components/navigation/Navigation";
import { HeroSection } from "@/app/components/sections/homepage/HeroSection";
import { Footer } from "@/app/components/sections/homepage/Footer";
import { fetchFromPayload } from "@/app/lib/payload";
import type {
  PayloadFAQ,
  PayloadTestimonial,
  PayloadPortfolioItem,
  PayloadPricingPlan,
} from "@/app/lib/payload";

// Dynamically import below-fold sections for better performance
const WhyOnePageSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/WhyOnePageSection").then(
      (mod) => mod.WhyOnePageSection,
    ),
  { ssr: true },
);

const PricingSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/PricingSection").then(
      (mod) => mod.PricingSection,
    ),
  { ssr: true },
);

const HowItWorksSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/HowItWorksSection").then(
      (mod) => mod.HowItWorksSection,
    ),
  { ssr: true },
);

const PortfolioSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/PortfolioSection").then(
      (mod) => mod.PortfolioSection,
    ),
  { ssr: true },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { ssr: true },
);

const TrustSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/TrustSection").then(
      (mod) => mod.TrustSection,
    ),
  { ssr: true },
);

const FAQSection = dynamic(
  () =>
    import("@/app/components/sections/homepage/FAQSection").then(
      (mod) => mod.FAQSection,
    ),
  { ssr: true },
);

const CTASection = dynamic(
  () =>
    import("@/app/components/sections/homepage/CTASection").then(
      (mod) => mod.CTASection,
    ),
  { ssr: true },
);

export default async function Page() {
  const tenantId = process.env.PAYLOAD_TENANT_ID;

  let faqs: PayloadFAQ[] = [];
  let testimonials: PayloadTestimonial[] = [];
  let projects: PayloadPortfolioItem[] = [];
  let plans: PayloadPricingPlan[] = [];

  if (tenantId) {
    const [faqsData, testimonialsData, projectsData, plansData] =
      await Promise.all([
        fetchFromPayload<PayloadFAQ>("faqs", tenantId, "order"),
        fetchFromPayload<PayloadTestimonial>("testimonials", tenantId, 1),
        fetchFromPayload<PayloadPortfolioItem>("portfolio-items", tenantId, 1),
        fetchFromPayload<PayloadPricingPlan>(
          "pricing-plans",
          tenantId,
          "order",
        ),
      ]);
    if (faqsData) faqs = faqsData;
    if (testimonialsData) testimonials = testimonialsData;
    if (projectsData) projects = projectsData;
    if (plansData) plans = plansData;
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <HeroSection />
      <WhyOnePageSection />
      <PricingSection plans={plans} />
      <HowItWorksSection />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <TrustSection />
      <FAQSection faqs={faqs} />
      <CTASection />
      <Footer />
    </div>
  );
}
