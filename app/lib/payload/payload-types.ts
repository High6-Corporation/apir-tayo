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
