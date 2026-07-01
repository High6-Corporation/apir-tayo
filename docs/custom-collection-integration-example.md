# Custom Collection Integration — Reference Example

> **Date:** July 2026
> **Scope:** apir-tayo ↔ payload-poc
> **Status:** Validated against real data; test route removed. Fetch utilities are the reusable integration point.

---

## 1. Overview

Payload CMS supports **dynamic, user-defined collections** via the Custom Collections feature. A content editor creates a collection schema in the Payload admin (name + field definitions), then adds entries under it. The apir-tayo frontend fetches both the schema and entries over Payload's REST API and renders them generically based on field type.

This document is a reference for wiring custom collections into any Next.js page or section. The fetch utilities in `app/lib/payload/` are designed to be composed into existing pages — you do not need a dedicated test route.

---

## 2. Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  fetchCustomCollections(siteId)                              │
│    GET /api/custom-collections?where[site][equals]={siteId}  │
│    → CustomCollection[]  (schema: name, slug, fields[])      │
│    → Pick the collection you need by slug or name            │
└──────────────────────────┬──────────────────────────────────┘
                           │ collection.id
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  fetchCustomCollectionEntries(siteId, collectionId)          │
│    GET /api/custom-collection-entries                        │
│      ?where[site][equals]={siteId}                           │
│      &where[parentCollection][equals]={collectionId}         │
│    → CustomCollectionEntry[]  (data: Record<string, any>)     │
└──────────────────────────┬──────────────────────────────────┘
                           │ for each media-type field
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  fetchMediaUrl(mediaId)                                      │
│    GET /api/media/{id}?depth=0                               │
│    → string | null  (absolute URL for <img> src)             │
│                                                              │
│  Payload returns media URLs as relative paths (e.g.          │
│  /api/media/file/photo.png). fetchMediaUrl() prepends        │
│  PAYLOAD_API_URL so the caller gets an absolute URL ready    │
│  for use in an <img> tag — no client-side resolution needed. │
│                                                              │
│  Needed because custom-collection entries store raw Payload  │
│  media document IDs inside their `data` JSON. Unlike regular │
│  collections where `depth > 0` populates the media object    │
│  inline, dynamic JSON fields always store just the ID.       │
└─────────────────────────────────────────────────────────────┘
```

All three functions return `null` on any failure (missing env var, network error, non-2xx) — pages must render gracefully even when Payload is unreachable.

---

## 3. TypeScript Interfaces

```typescript
// From app/lib/payload/payload-types.ts

interface CustomCollectionField {
  name: string; // kebab-case, e.g. "full-name"
  type: "text" | "richtext" | "number" | "media" | "url" | "toggle";
  required: boolean;
  label?: string; // human-readable, e.g. "Full Name"
}

interface CustomCollection {
  id: string;
  site: string | { id: string; name?: string };
  name: string; // e.g. "Team Members"
  slug?: string | null;
  fields: CustomCollectionField[]; // the dynamic schema
}

interface CustomCollectionEntry {
  id: string;
  site: string | { id: string; name?: string };
  parentCollection: string | { id: string; name?: string };
  data: Record<string, unknown>; // keyed by field `name`
}
```

---

## 4. Per-Field-Type Rendering

The rendering logic iterates over the collection's `fields` array to build headers, then over each entry's `data` object to render values. Here is the core rendering switch:

```tsx
const renderFieldValue = (field: CustomCollectionField, rawValue: unknown) => {
  switch (field.type) {

    case "text":
    case "number":
      return <span>{String(rawValue ?? "—")}</span>;

    // ⚠️  Richtext is rendered as escaped plain text — NOT HTML.
    //     EntryDataField's richtext type in payload-poc is a generic textarea
    //     input, not a real lexical editor. There is no structured HTML to
    //     trust yet, so dangerouslySetInnerHTML would be unsafe. When a real
    //     rich-text editor is wired in payload-poc, revisit this.
    case "richtext":
      return <span>{String(rawValue ?? "—")}</span>;

    case "url": {
      const href = typeof rawValue === "string" && rawValue.length > 0
        ? rawValue
        : null;
      if (!href) return <span>—</span>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
           className="text-indigo-600 underline hover:text-indigo-800">
          {href}
        </a>
      );
    }

    case "toggle":
      return <span>{rawValue ? "✅ Yes" : "❌ No"}</span>;

    case "media": {
      const resolvedUrl = /* lookup from pre-resolved mediaUrlMap */;
      if (!resolvedUrl) return <span>[media unavailable]</span>;
      return (
        <img src={resolvedUrl} alt=""
             className="max-w-[200px] rounded border object-cover" />
      );
    }

    default:
      return <span>{String(rawValue ?? "—")}</span>;
  }
};
```

**Media pre-resolution pattern** — collect all media field values across all entries, deduplicate, and resolve in parallel before rendering:

```tsx
const mediaUrlMap = new Map<string, string>();
const mediaFieldNames = new Set(
  collection.fields.filter((f) => f.type === "media").map((f) => f.name),
);
const mediaIds = entries.flatMap((e) =>
  mediaFieldNames
    .map((name) => (e.data as Record<string, unknown>)[name])
    .filter((v): v is string => typeof v === "string" && v.length > 0),
);
const results = await Promise.all(
  [...new Set(mediaIds)].map(async (id) => ({
    id,
    url: await fetchMediaUrl(id),
  })),
);
for (const { id, url } of results) {
  if (url) mediaUrlMap.set(id, url);
}
```

---

## 5. ISR Revalidation

Custom collection fetch utilities use `next: { revalidate: 3600 }` (fetch-level, 1 hour). For page-level ISR:

```typescript
export const revalidate = 3600;
```

**Why 3600 and not 60:** Custom collections are expected to change infrequently (team listings, office locations, FAQ variants) — not per-minute content like blog posts or pricing. The 1-hour window matches the contact page convention. For a high-frequency collection, override by passing a custom fetch option or lowering the page-level constant.

Note: fetch-level `next.revalidate` takes precedence over page-level `export const revalidate`. If you mix the utilities into a page that exports `revalidate = 60`, the 3600 in the fetch call will govern — adjust accordingly.

---

## 6. Usage Example (Minimal Page)

```tsx
import {
  fetchCustomCollections,
  fetchCustomCollectionEntries,
  fetchMediaUrl,
} from "@/app/lib/payload";
import type { CustomCollection } from "@/app/lib/payload";

export const revalidate = 3600;

export default async function MyPage() {
  const siteId = process.env.PAYLOAD_SITE_ID;
  if (!siteId) return <p>Configuration error</p>;

  // 1. Find the collection by slug (or name)
  const collections = await fetchCustomCollections(siteId);
  const collection = collections?.find(c => c.slug === "team-members") ?? null;
  if (!collection) return <p>Collection not found</p>;

  // 2. Fetch entries
  const entries = await fetchCustomCollectionEntries(siteId, collection.id);
  if (!entries?.length) return <p>No entries yet</p>;

  // 3. Render (with media pre-resolution as shown in §4)
  return (/* your rendering here */);
}
```

---

## 7. Files Reference

| File                                       | Role                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `app/lib/payload/payload-types.ts`         | `CustomCollection`, `CustomCollectionEntry`, `CustomCollectionField` interfaces |
| `app/lib/payload/fetchCustomCollection.ts` | `fetchCustomCollections()`, `fetchCustomCollectionEntries()`, `fetchMediaUrl()` |
| `app/lib/payload/index.ts`                 | Barrel re-exports (all three functions + types)                                 |

All three utilities follow the same contract as the existing `fetchFromPayload<T>()` in `fetchPayload.ts`: `BASE_URL` from `PAYLOAD_API_URL`, `null` on failure, `console.error` prefix convention, no throwing.

---

## 8. Notes

- **Test route removed.** An earlier test page at `/test-custom-collection` validated the round trip against real Payload admin data. It was removed to avoid leaving a live public route with a raw-data debug panel. This document is the reusable reference.
- **Richtext is plain text.** The `richtext` field type in `EntryDataField` (payload-poc) is a generic `<textarea>` input — not a real lexical/HTML editor. Rendering as HTML would be unsafe. When a proper rich-text editor is added to payload-poc, the rendering switch here should be updated to use `dangerouslySetInnerHTML` with appropriate sanitization.
- **Media is always a doc ID, and `fetchMediaUrl()` returns an absolute URL.** Unlike `testimonial.image` or `portfolio.image` — where setting `depth > 0` on the fetch populates the full media object inline — custom collection entries store raw IDs inside arbitrary JSON. Always resolve via `fetchMediaUrl()`, which fetches the media document and prepends `PAYLOAD_API_URL` to the relative path, matching the `resolveImageUrl()` convention used in section components.
