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
