const BASE_URL = process.env.PAYLOAD_API_URL;

interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
}

/**
 * Fetch documents from a Payload CMS collection, scoped to a tenant.
 *
 * Returns `null` on any failure (missing env vars, network error, non-2xx) —
 * callers should handle the null case gracefully rather than crashing.
 */
export async function fetchFromPayload<T>(
  collection: string,
  siteId: string,
  sortOrDepth?: string | number,
  depth?: number,
): Promise<T[] | null> {
  // Allow callers to pass `sort` as the third arg and `depth` as the fourth,
  // or `depth` as the third arg (when no sort is needed).
  let sort: string | undefined;
  let resolvedDepth: number | undefined;

  if (typeof sortOrDepth === "number") {
    resolvedDepth = sortOrDepth;
  } else {
    sort = sortOrDepth;
    resolvedDepth = depth;
  }

  if (!BASE_URL) {
    console.error("[fetchFromPayload] PAYLOAD_API_URL is not set");
    return null;
  }

  try {
    let url = `${BASE_URL}/api/${collection}?where[site][equals]=${siteId}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    if (resolvedDepth !== undefined) {
      url += `&depth=${resolvedDepth}`;
    }

    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      console.error(
        `[fetchFromPayload] ${collection}: HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = (await res.json()) as PayloadListResponse<T>;
    return json.docs;
  } catch (error) {
    console.error(`[fetchFromPayload] ${collection}: fetch failed`, error);
    return null;
  }
}

import type { SiteSettings } from "./payload-types";

/**
 * Fetch the single SiteSettings document for the given site.
 *
 * The `site` field on the site-settings collection has `unique: true`, so at
 * most one document exists per site. Returns the first document or `null` on
 * any failure — callers should fall back to hardcoded defaults.
 */
export async function fetchSiteSettings(
  siteId: string,
): Promise<SiteSettings | null> {
  const docs = await fetchFromPayload<Record<string, unknown>>(
    "site-settings",
    siteId,
  );
  const doc = docs?.[0];
  if (!doc) return null;

  // Payload nests fields inside tab groups (hero, whyOnePage, etc.), so we
  // must reach into each group object rather than reading from the doc root.
  const hero = doc.hero as Record<string, unknown> | undefined;
  const whyOnePage = doc.whyOnePage as Record<string, unknown> | undefined;
  const howItWorks = doc.howItWorks as Record<string, unknown> | undefined;
  const trust = doc.trust as Record<string, unknown> | undefined;
  const cta = doc.cta as Record<string, unknown> | undefined;
  const footer = doc.footer as Record<string, unknown> | undefined;
  const custom = doc.custom as Record<string, unknown> | undefined;

  // Pick only known fields so the object survives RSC serialisation
  // (raw Payload responses carry extra fields like createdAt / updatedAt
  // that can cause hydration mismatches across the server–client boundary).
  const picked: SiteSettings = {
    id: String(doc.id ?? ""),
    site:
      typeof doc.site === "string"
        ? doc.site
        : String((doc.site as { id?: string })?.id ?? ""),
    heroHeadline:
      typeof hero?.heroHeadline === "string" ? hero.heroHeadline : null,
    heroSubheadline:
      typeof hero?.heroSubheadline === "string" ? hero.heroSubheadline : null,
    whyOnePageTitle:
      typeof whyOnePage?.whyOnePageTitle === "string"
        ? whyOnePage.whyOnePageTitle
        : null,
    whyOnePageParagraph:
      typeof whyOnePage?.whyOnePageParagraph === "string"
        ? whyOnePage.whyOnePageParagraph
        : null,
    howItWorksTitle:
      typeof howItWorks?.howItWorksTitle === "string"
        ? howItWorks.howItWorksTitle
        : null,
    howItWorksParagraph:
      typeof howItWorks?.howItWorksParagraph === "string"
        ? howItWorks.howItWorksParagraph
        : null,
    trustSectionTitle:
      typeof trust?.trustSectionTitle === "string"
        ? trust.trustSectionTitle
        : null,
    trustSectionParagraph:
      typeof trust?.trustSectionParagraph === "string"
        ? trust.trustSectionParagraph
        : null,
    ctaTitle: typeof cta?.ctaTitle === "string" ? cta.ctaTitle : null,
    ctaParagraph:
      typeof cta?.ctaParagraph === "string" ? cta.ctaParagraph : null,
    ctaButtonText:
      typeof cta?.ctaButtonText === "string" ? cta.ctaButtonText : null,
    ctaCaption:
      typeof cta?.ctaCaption === "string" ? cta.ctaCaption : null,
    footerCopy:
      typeof footer?.footerCopy === "string" ? footer.footerCopy : null,
    customFields: Array.isArray(custom?.customFields)
      ? (custom.customFields as Array<Record<string, unknown>>).map((f) => ({
          key: String(f.key ?? ""),
          value: String(f.value ?? ""),
        }))
      : null,
  };

  // Round-trip through JSON to guarantee a dead-plain object — no prototype
  // chain oddities, no Symbols, nothing that can trip RSC serialisation.
  return JSON.parse(JSON.stringify(picked)) as SiteSettings;
}

/**
 * Look up a value from the Custom Fields array by key.
 *
 * @param settings - The SiteSettings document (or null).
 * @param key      - The custom-field key to look up.
 * @param fallback - The default string returned when the key is absent,
 *                   settings is null, or customFields is undefined.
 */
export function getCustomField(
  settings: SiteSettings | null,
  key: string,
  fallback: string,
): string {
  if (!settings?.customFields) return fallback;
  const entry = settings.customFields.find((f) => f.key === key);
  return entry?.value ?? fallback;
}
