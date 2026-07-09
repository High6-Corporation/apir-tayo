import type { CustomCollection, CustomCollectionEntry } from "./payload-types";

const BASE_URL = process.env.PAYLOAD_API_URL;

interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
}

/**
 * Fetch all custom-collections documents scoped to a site.
 *
 * Returns the raw Payload REST response so the caller can pick whichever
 * collection it needs. Returns `null` on any failure — callers should render
 * a graceful empty state rather than crashing.
 */
export async function fetchCustomCollections(
  siteId: string,
): Promise<CustomCollection[] | null> {
  if (!BASE_URL) {
    console.error("[fetchCustomCollections] PAYLOAD_API_URL is not set");
    return null;
  }

  try {
    const url = `${BASE_URL}/api/custom-collections?where[site][equals]=${siteId}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(
        `[fetchCustomCollections] HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = (await res.json()) as PayloadListResponse<CustomCollection>;
    return json.docs;
  } catch (error) {
    console.error("[fetchCustomCollections] fetch failed", error);
    return null;
  }
}

/**
 * Fetch all entries for a single custom collection.
 *
 * Returns `null` on any failure — same contract as fetchFromPayload. The page
 * must render even when Payload is unreachable.
 */
export async function fetchCustomCollectionEntries(
  siteId: string,
  collectionId: string,
): Promise<CustomCollectionEntry[] | null> {
  if (!BASE_URL) {
    console.error("[fetchCustomCollectionEntries] PAYLOAD_API_URL is not set");
    return null;
  }

  try {
    const url =
      `${BASE_URL}/api/custom-collection-entries` +
      `?where[site][equals]=${siteId}` +
      `&where[parentCollection][equals]=${collectionId}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(
        `[fetchCustomCollectionEntries] HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json =
      (await res.json()) as PayloadListResponse<CustomCollectionEntry>;
    return json.docs;
  } catch (error) {
    console.error("[fetchCustomCollectionEntries] fetch failed", error);
    return null;
  }
}

/**
 * Resolve a Payload media document ID to its full URL.
 *
 * Custom-collection entries store raw media IDs inside their `data` JSON
 * (e.g. `{ "photo": "671a1b2c..." }`). Unlike other collections where
 * `depth > 0` populates the media object inline, dynamic JSON fields always
 * store just the ID — so we need a separate round-trip to resolve them.
 *
 * Returns `null` on any failure so the page can fall back to a placeholder.
 */
export async function fetchMediaUrl(mediaId: string): Promise<string | null> {
  if (!BASE_URL) {
    console.error("[fetchMediaUrl] PAYLOAD_API_URL is not set");
    return null;
  }

  try {
    const url = `${BASE_URL}/api/media/${mediaId}?depth=0`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error(
        `[fetchMediaUrl] media/${mediaId}: HTTP ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const doc = (await res.json()) as { url?: string; filename?: string };
    const rawUrl = doc.url;
    if (!rawUrl) return null;

    // Payload returns media URLs as relative paths (e.g. /api/media/file/...).
    // Prepend the Payload base URL so the caller gets an absolute URL usable
    // in an <img> tag — same logic as resolveImageUrl() in the section components.
    if (rawUrl.startsWith("/")) {
      return `${BASE_URL.replace(/\/$/, "")}${rawUrl}`;
    }
    return rawUrl;
  } catch (error) {
    console.error(`[fetchMediaUrl] media/${mediaId}: fetch failed`, error);
    return null;
  }
}

/**
 * Resolve an array of Payload category document IDs to their titles.
 *
 * Custom-collection entries with a `category` field type store an array of
 * raw category IDs inside their `data` JSON (e.g. `{ "category": ["id1", "id2"] }`).
 * Unlike regular collections where `depth > 0` populates relationship objects
 * inline, dynamic JSON fields always store just the ID — so we need a separate
 * round-trip to resolve them into human-readable names.
 *
 * Returns a `Record<categoryId, title>` mapping on success, `null` on any
 * failure so the page can fall back to displaying raw IDs.
 */
export async function fetchCategoryNames(
  categoryIds: string[],
): Promise<Record<string, string> | null> {
  if (!BASE_URL) {
    console.error("[fetchCategoryNames] PAYLOAD_API_URL is not set");
    return null;
  }

  if (categoryIds.length === 0) return {};

  try {
    const results = await Promise.all(
      categoryIds.map(async (id) => {
        try {
          const url = `${BASE_URL}/api/categories/${id}?depth=0`;
          const res = await fetch(url, { next: { revalidate: 3600 } });

          if (!res.ok) {
            console.error(
              `[fetchCategoryNames] categories/${id}: HTTP ${res.status} ${res.statusText}`,
            );
            return { id, title: null };
          }

          const doc = (await res.json()) as { title?: string };
          return { id, title: (doc.title as string) || id };
        } catch {
          console.error(`[fetchCategoryNames] categories/${id}: fetch failed`);
          return { id, title: null };
        }
      }),
    );

    const names: Record<string, string> = {};
    for (const { id, title } of results) {
      if (title) names[id] = title;
    }
    return names;
  } catch (error) {
    console.error("[fetchCategoryNames] fetch failed", error);
    return null;
  }
}
