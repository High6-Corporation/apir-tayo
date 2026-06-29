import dynamic from "next/dynamic";
import { Navigation } from "@/app/components/navigation/Navigation";
import { HeroSection } from "@/app/components/sections/homepage/HeroSection";
import { Footer } from "@/app/components/sections/homepage/Footer";
import { fetchFromPayload, fetchSiteSettings } from "@/app/lib/payload";
import type {
  PayloadFAQ,
  PayloadTestimonial,
  PayloadPortfolioItem,
  PayloadPricingPlan,
  SiteSettings,
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
  const siteId = process.env.PAYLOAD_SITE_ID;

  let faqs: PayloadFAQ[] = [];
  let testimonials: PayloadTestimonial[] = [];
  let projects: PayloadPortfolioItem[] = [];
  let plans: PayloadPricingPlan[] = [];
  let siteSettings: SiteSettings | null = null;

  if (siteId) {
    const [faqsData, testimonialsData, projectsData, plansData, settingsData] =
      await Promise.all([
        fetchFromPayload<PayloadFAQ>("faqs", siteId, "order"),
        fetchFromPayload<PayloadTestimonial>("testimonials", siteId, 1),
        fetchFromPayload<PayloadPortfolioItem>("portfolio-items", siteId, 1),
        fetchFromPayload<PayloadPricingPlan>("pricing-plans", siteId, "order"),
        fetchSiteSettings(siteId),
      ]);
    if (faqsData) faqs = faqsData;
    if (testimonialsData) testimonials = testimonialsData;
    if (projectsData) projects = projectsData;
    if (plansData) plans = plansData;
    if (settingsData) siteSettings = settingsData;
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <HeroSection
        heroHeadline={siteSettings?.heroHeadline ?? null}
        heroSubheadline={siteSettings?.heroSubheadline ?? null}
      />
      <WhyOnePageSection
        whyOnePageParagraph={siteSettings?.whyOnePageParagraph ?? null}
      />
      <PricingSection plans={plans} />
      <HowItWorksSection
        howItWorksTitle={siteSettings?.howItWorksTitle ?? null}
        howItWorksParagraph={siteSettings?.howItWorksParagraph ?? null}
      />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <TrustSection
        trustSectionTitle={siteSettings?.trustSectionTitle ?? null}
        trustSectionParagraph={siteSettings?.trustSectionParagraph ?? null}
      />
      <FAQSection faqs={faqs} />
      <CTASection
        ctaTitle={siteSettings?.ctaTitle ?? null}
        ctaParagraph={siteSettings?.ctaParagraph ?? null}
        ctaButtonText={siteSettings?.ctaButtonText ?? null}
        ctaCaption={siteSettings?.ctaCaption ?? null}
      />
      <Footer footerCopy={siteSettings?.footerCopy ?? null} />
    </div>
  );
}
