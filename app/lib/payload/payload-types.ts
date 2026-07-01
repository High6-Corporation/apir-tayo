/** Payload REST API response shapes for the apir-tayo tenant. */

export interface PayloadFAQ {
  id: string;
  question: string;
  answer: string;
  order?: number | null;
}

export interface PayloadTestimonial {
  id: string;
  quote: string;
  name: string;
  position: string;
  image?: { id: string; url: string } | string | null;
}

export interface PayloadPortfolioItem {
  id: string;
  title: string;
  category: string;
  url: string;
  image?: { id: string; url: string } | string | null;
}

export interface PayloadPricingPlan {
  id: string;
  label: string;
  items?: { item: string; id?: string | null }[] | null;
  order?: number | null;
}

/** A single field definition inside a CustomCollection's `fields` JSON array. */
export interface CustomCollectionField {
  name: string;
  type: "text" | "richtext" | "number" | "media" | "url" | "toggle";
  required: boolean;
  label?: string;
}

/** A custom-collections document — defines the dynamic schema for one collection. */
export interface CustomCollection {
  id: string;
  site: string | { id: string; name?: string };
  name: string;
  slug?: string | null;
  fields: CustomCollectionField[];
}

/** A custom-collection-entries document — one row of data under a collection. */
export interface CustomCollectionEntry {
  id: string;
  site: string | { id: string; name?: string };
  parentCollection: string | { id: string; name?: string };
  data: Record<string, unknown>;
}

export interface SiteSettings {
  id: string;
  site: string | { id: string; name?: string };

  // --- hero tab ---
  heroHeadline?: string | null;
  heroSubheadline?: string | null;

  // --- why one page tab ---
  whyOnePageTitle?: string | null;
  whyOnePageParagraph?: string | null;

  // --- how it works tab ---
  howItWorksTitle?: string | null;
  howItWorksParagraph?: string | null;

  // --- trust tab ---
  trustSectionTitle?: string | null;
  trustSectionParagraph?: string | null;

  // --- cta tab ---
  ctaTitle?: string | null;
  ctaParagraph?: string | null;
  ctaButtonText?: string | null;
  ctaCaption?: string | null;

  // --- footer tab ---
  footerCopy?: string | null;

  // --- custom tab ---
  customFields?: { key: string; value: string; id?: string | null }[] | null;
}
