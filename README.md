# High6 Next.js Cookie Consent Module

Reusable GDPR-style cookie consent module for Next.js websites, especially Headless WordPress + Next.js builds.

## What this includes

- Cookie consent banner
- Cookie settings modal with toggle switches
- Accept all / Reject all / Customize
- Consent storage with version + timestamp (localStorage)
- GA4, GTM, and Meta Pixel gated by consent
- ConsentGate wrapper for Headless WordPress embeds
- Floating Cookie Settings icon (global, fixed position)
- Category examples displayed in settings modal
- Example YouTube, Google Maps, and external form embed components

## File structure

```
app/
├── components/consent/
│   ├── ConsentGate.tsx            # Wrapper that blocks children until consent granted
│   ├── ConsentProvider.tsx        # React context + state management
│   ├── ConsentScriptLoader.tsx    # Loads GA/GTM/Meta Pixel based on consent
│   ├── CookieConsentBanner.tsx    # First-visit banner
│   ├── CookiePolicyContent.tsx    # Reusable cookie policy page content
│   ├── CookieSettingsLink.tsx     # Floating icon button (opens modal)
│   ├── CookieSettingsModal.tsx    # Full settings modal with toggles
│   ├── ExternalFormEmbed.tsx      # Consent-gated external form
│   ├── GoogleMapEmbed.tsx         # Consent-gated Google Maps
│   ├── PrivacyPolicyContent.tsx   # Reusable privacy policy page content
│   └── YouTubeEmbed.tsx           # Consent-gated YouTube
└── lib/consent/
    ├── consent-config.ts          # Per-site configuration
    ├── consent-storage.ts         # localStorage read/write + version check
    └── consent-types.ts           # TypeScript types
```

## Requirements

- Next.js App Router
- Tailwind CSS
- TypeScript
- `@/*` alias pointing to project root (configured in `tsconfig.json`)

Install dependency:

```bash
npm install @next/third-parties
```

## Installation

Copy the `app/components/consent` and `app/lib/consent` folders into your Next.js project.

### Create policy pages

The consent module includes reusable content components for Privacy Policy and Cookie Policy pages. You need to create two route files in your project:

**`app/(pages)/privacy-policy/page.tsx`**

```tsx
import { Header } from '@/app/components/layout/Header';
import { FooterWrapper } from '@/app/components/layout/FooterWrapper';
import { PrivacyPolicyContent } from '@/app/components/consent/PrivacyPolicyContent';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="w-[90%] mx-auto max-w-[1316px]">
            <PrivacyPolicyContent />
          </div>
        </section>
      </main>
      <FooterWrapper />
    </div>
  );
}
```

**`app/(pages)/cookie-policy/page.tsx`**

```tsx
import { Header } from '@/app/components/layout/Header';
import { FooterWrapper } from '@/app/components/layout/FooterWrapper';
import { CookiePolicyContent } from '@/app/components/consent/CookiePolicyContent';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="w-[90%] mx-auto max-w-[1316px]">
            <CookiePolicyContent />
          </div>
        </section>
      </main>
      <FooterWrapper />
    </div>
  );
}
```

> **Note:** Adjust the Header, Footer, and Banner imports to match your project's layout components. The content components (`PrivacyPolicyContent`, `CookiePolicyContent`) are generic and project-agnostic.

## Add to `app/layout.tsx`

```tsx
import { ConsentProvider } from '@/app/components/consent/ConsentProvider'
import { CookieConsentBanner } from '@/app/components/consent/CookieConsentBanner'
import { CookieSettingsLink } from '@/app/components/consent/CookieSettingsLink'
import { CookieSettingsModal } from '@/app/components/consent/CookieSettingsModal'
import { ConsentScriptLoader } from '@/app/components/consent/ConsentScriptLoader'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ConsentProvider>
          {children}

          <CookieConsentBanner />
          <CookieSettingsLink />
          <CookieSettingsModal />
          <ConsentScriptLoader />
        </ConsentProvider>
      </body>
    </html>
  )
}
```

> **Important:** The font variable classNames from `next/font/google` must be applied to the `<body>` tag for the consent module's UI (and the rest of your site) to render fonts correctly. This is not specific to the consent module — it's a Next.js requirement. If your fonts aren't loading, make sure the `<body>` has the font variable classes applied. Example:
> ```tsx
> <body className={`${yourFont.variable} ${anotherFont.variable} font-body`}>
> ```

## Per-website configuration

Edit:

```txt
app/lib/consent/consent-config.ts
```

Update:

```ts
companyName: 'Client Company'
privacyPolicyUrl: '/privacy-policy'
cookiePolicyUrl: '/cookie-policy'
```

### Cookie categories

Each category includes `title`, `description`, and `examples`:

```ts
categories: {
  necessary: {
    title: 'Necessary',
    description: 'Required for the website to work properly. These cannot be disabled.',
    examples: 'Session cookies, authentication tokens, CSRF protection',
  },
  analytics: {
    title: 'Analytics',
    description: 'Helps us understand website traffic and user behavior.',
    examples: 'Google Analytics, page view tracking, scroll depth',
  },
  marketing: {
    title: 'Marketing',
    description: 'Used for ads, remarketing, and conversion tracking.',
    examples: 'Meta Pixel, Google Ads, remarketing tags',
  },
  preferences: {
    title: 'Preferences',
    description: 'Saves user preferences like language and display settings.',
    examples: 'Language selection, theme settings, layout preferences',
  },
  embedded: {
    title: 'Embedded Content',
    description: 'Allows third-party content like videos, maps, and forms.',
    examples: 'YouTube videos, Google Maps, Gravity Forms',
  },
}
```

### Environment variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

Only add the IDs the website actually uses.

#### `NEXT_PUBLIC_GA_ID` — Google Analytics 4

- Direct GA4 integration using `@next/third-parties`
- Tracks page views and user behavior
- Gated by **Analytics** consent
- Get it from: Google Analytics > Admin > Data Streams > Measurement ID
- Format: `G-XXXXXXXXXX`

#### `NEXT_PUBLIC_GTM_ID` — Google Tag Manager

- A tag container that can deploy GA4, Meta Pixel, and other marketing scripts from one dashboard
- **Optional** — only needed if you want to manage tags through GTM instead of loading them directly
- If you already set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` directly, you don't need GTM
- Gated by **Analytics** consent
- Get it from: Google Tag Manager > Container > ID
- Format: `GTM-XXXXXXX`

#### `NEXT_PUBLIC_META_PIXEL_ID` — Meta (Facebook) Pixel

- Tracks conversions, remarketing, and ad performance for Meta ads
- Gated by **Marketing** consent
- Get it from: Meta Events Manager > Datasets > Pixel ID
- Format: numeric string (e.g. `915560037625537`)

> **Important:** All `NEXT_PUBLIC_*` variables are inlined at **build time**. After adding or changing them, you must rebuild the app (`npm run build`) for changes to take effect.

## Consent storage

- Storage key: `arta_cookie_consent`
- Location: `localStorage` (client-side only, not sent with HTTP requests)
- Stored data: consent state + `version` + `updatedAt` timestamp
- **Expiration:** consent auto-expires after `consentMaxAgeDays` (default: 365 days). After expiration, the banner re-appears.
- Version check: if `consent-config.ts` version changes, previous consent is invalidated and the banner re-appears
- Event dispatched on save: `h6-consent-updated` (CustomEvent with consent detail)

### Why localStorage instead of cookies?

- Consent state is only needed client-side (by `ConsentProvider` and `ConsentScriptLoader`)
- No server-side rendering depends on consent state
- `localStorage` doesn't bloat HTTP requests (cookies get sent with every request)
- Most GDPR consent tools (CookieBot, OneTrust) use the same approach

### Consent expiration (GDPR compliance)

GDPR recommends re-asking consent every 6–12 months. The `consentMaxAgeDays` config controls this:

```ts
// consent-config.ts
consentMaxAgeDays: 365  // Re-ask after 1 year
```

When consent expires:
1. The stale localStorage entry is removed
2. `getStoredConsent()` returns `null`
3. Banner re-appears for the user

## Important Headless WordPress rule

Do not allow tracking scripts or third-party embeds to load directly from WordPress content.

Avoid raw embeds like:

```tsx
<div dangerouslySetInnerHTML={{ __html: post.content }} />
```

For embeds that can set cookies or load third-party requests, use approved components:

```tsx
import { YouTubeEmbed } from '@/app/components/consent/YouTubeEmbed'
import { GoogleMapEmbed } from '@/app/components/consent/GoogleMapEmbed'
import { ExternalFormEmbed } from '@/app/components/consent/ExternalFormEmbed'

<YouTubeEmbed src={videoEmbedUrl} />
<GoogleMapEmbed src={mapEmbedUrl} />
<ExternalFormEmbed src={formEmbedUrl} />
```

Recommended WordPress ACF fields:

- `video_embed_url`
- `map_embed_url`
- `form_embed_url`
- `embed_type`

Then render the correct React component in Next.js.

## Remove hardcoded scripts

Remove direct script loading from:

- `app/layout.tsx`
- `app/head.tsx`
- WordPress global header/footer script fields
- WordPress page/post content
- Theme/plugin custom script injection

Do not directly load:

- Google Analytics
- Google Tag Manager
- Meta Pixel
- TikTok Pixel
- LinkedIn Insight Tag
- Microsoft Clarity
- Hotjar
- Chat widgets
- Tracking pixels

Load them through `ConsentScriptLoader` only.

## QA checklist

### First visit

- Open site in incognito.
- Banner should appear.
- Before consent, these should not load in DevTools > Network:
  - `google-analytics.com`
  - `googletagmanager.com`
  - `connect.facebook.net`
  - `facebook.com/tr`
  - `clarity.ms`
  - `hotjar.com`
  - `tiktok.com`
  - `linkedin.com`

### Reject all

- Banner disappears.
- Analytics does not load.
- Marketing scripts do not load.
- Embedded third-party content remains blocked.

### Accept all

- Banner disappears.
- GA/GTM loads if configured.
- Meta Pixel loads if configured.
- Embedded content becomes available.

### Customize

Test:

- Analytics ON, Marketing OFF
- Analytics OFF, Marketing ON
- Embedded ON, Analytics OFF
- Reject all from modal
- Accept all from modal
- Save preferences

### Testing Marketing consent (Meta Pixel)

1. Add `NEXT_PUBLIC_META_PIXEL_ID` to `.env` and rebuild
2. Clear consent: DevTools > Application > Local Storage > delete `arta_cookie_consent` > reload
3. **Reject All** — open DevTools Network, filter `facebook` → no requests to `connect.facebook.net`
4. Clear again, reload → **Customize** → toggle only Marketing ON → Save
   - Network should show a request to `connect.facebook.net/en_US/fbevents.js`
   - Console: `fbq` should be a function
5. **Accept All** — same as step 4
6. **Customize** → Marketing OFF → Save → reload
   - No `connect.facebook.net` requests
   - `window.fbq` should be `undefined`

### Floating cookie icon

- Icon is visible on all pages (fixed bottom-left).
- Clicking opens the settings modal.
- Updated consent choices are saved.

### Version reset

Change `version: '1.0'` to `version: '1.1'` in `consent-config.ts`.

Expected:

- Previous consent is ignored.
- Banner appears again.

## Definition of done

- Banner works.
- Settings modal works with toggle switches.
- Floating cookie icon works globally.
- Category examples are shown in the modal.
- Consent is stored with version and timestamp.
- GA/GTM/Meta Pixel do not load before consent.
- WordPress third-party embeds are gated.
- No tracking scripts remain hardcoded outside the consent module.
