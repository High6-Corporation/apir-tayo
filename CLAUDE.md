# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Production server (PM2 runs this on port 3002)
npm run lint     # ESLint
```

There are no tests in this project.

## Architecture

**Stack:** Next.js 16 App Router + React 19 + TypeScript 5 + Tailwind CSS v4.

This is a marketing/landing-page site for Apirtayo, a web design agency. It's a single-page site with additional utility and legal pages. The backend is a headless WordPress instance at `apirtayo.beta03.site` — contact form submissions go to WordPress Gravity Forms via its REST API.

### Route groups

- `app/(pages)/` — content pages: `/contact`, `/cookie-policy`, `/privacy-policy`
- `app/(minors)/` — utility pages: `/404`, `/coming-soon`, `/maintenance`, `/thank-you`
- `app/(portal)/` — **Phase 1:** Portal auth pages: `/portal/login`. Minimal layout (no shared nav/shell).

### Portal Auth (Phase 1)

Client portal authentication against Payload CMS:

- **Login page:** `app/(portal)/portal/login/page.tsx` — client component, calls `POST {PAYLOAD_API_URL}/api/portal-clients/login`, persists session via `/api/portal/session`, redirects to `/portal/chat`
- **Session API:** `app/api/portal/session/route.ts`
  - `POST` — sets two httpOnly cookies: `portal_token` (Payload JWT) and `portal_tenant_id` (resolved from `user.tenant.id`)
  - `DELETE` — clears both cookies (logout)
- **Collection:** `portal-clients` in payload-poc — auth-enabled, tenant relationship, admin-only access
- **Env var:** `NEXT_PUBLIC_PAYLOAD_API_URL` (already present in `.env.local`)

### Portal Chat (Phase 2–5)

Protected chat UI that lets authenticated portal clients interact with the Payload CMS AI agent.

- **Proxy:** `proxy.ts` — protects `/portal/chat`, redirects to `/portal/login` when `portal_token` cookie is absent (matcher: `/portal/chat` only)
- **Chat page:** `app/(portal)/portal/chat/page.tsx` — server component, reads `portal_tenant_id` and `portal_token` from httpOnly cookies, fetches the tenant name from Payload's `/api/tenants/{id}` (using `PAYLOAD_API_URL` server env var with JWT auth), passes `tenantName` and `tenantId` to `<ChatWindow>`. Falls back to "Your Portal" if the fetch fails. Redirects to `/portal/login` if cookie is missing (defense-in-depth).
- **Tenant name display (Phase 5):** The header shows `"{tenantName} — AI-powered content management"` instead of the generic subtitle.
- **Capabilities panel (Phase 5):** A "What can I do?" button in the header opens a modal overlay listing supported actions (What I can help you with: 5 items) and unsupported actions (What I cannot do: 5 items with prohibition styling). Replaces the static disclaimer banner from Phase 2–4. Collapsed by default, dismissible via close button or backdrop click.
- **ChatWindow:** `app/(portal)/portal/chat/ChatWindow.tsx` — client component with message history (scrollable, role-labeled "You"/"Agent"), text input, send button, logout button, paperclip/attach button, and capabilities panel trigger. Accepts `tenantName` and `tenantId` as props. Sends messages to the proxy route at `/api/portal/agent`.
- **Confirmation flow (Phase 4):** When the agent returns `{ status: "pending_confirmation", proposal: {...} }`, the ChatWindow displays the proposed change (current → new value) and a Confirm button. The user must click Confirm or type "confirm" to execute. Typing anything else cancels the pending proposal with a notice. On confirm, sends `{ message, confirmed: true, proposal }` to the proxy.
- **ProposalPayload (Phase 5):** Now includes optional `id` field alongside `slug` (for FAQ/testimonial/portfolio actions that use record IDs). Confirmation messages use `id ?? slug` as the record identifier.
- **Image upload (Phase 5):** Paperclip icon button next to Send opens a hidden `<input accept="image/*">`. On file select: shows thumbnail preview + filename above the input, Send button changes to "Send with Image". On send: uploads the file to `/api/portal/upload` first, receives `{ mediaId, url }`, then sends the message to the agent with `[image mediaId: ${mediaId}]` appended so DeepSeek can emit `link_image` actions. Previews are shown in the message bubble. Upload errors abort the agent call gracefully.
- **Smart Record Resolution (Phase 6):** When the agent returns `{ status: "needs_selection", records: [...] }`, the ChatWindow displays a numbered list of records (label + preview — internal IDs never shown). The client selects by typing a number or part of the name. On match: appends `[resolved id: <id>]` to the original message invisibly and re-sends it to the agent, which then emits the correct specific action. The `SelectionContext` interface stores `{ collection, records, originalMessage }`. Empty collections show a friendly message (`status: "empty_collection"`). Three placeholder states: default, pending selection, and pending proposal.
- **Agent proxy:** `app/api/portal/agent/route.ts` — POST handler that reads `portal_token` and `portal_tenant_id` from httpOnly cookies, forwards the request to `POST {PAYLOAD_API_URL}/api/agent` with body `{ message, tenantId, confirmed, proposal }` and header `Authorization: JWT <portal_token>`. Returns 401 if cookies are missing, 502 on upstream error. Passes through `confirmed` and `proposal` fields from the client body.
- **Upload proxy (Phase 5):** `app/api/portal/upload/route.ts` — POST handler accepting multipart/form-data (`file`), reads `portal_token` and `portal_tenant_id` from cookies, forwards file + tenantId to `POST {PAYLOAD_API_URL}/api/agent-upload` as multipart/form-data with `Authorization: JWT <portal_token>`. Returns `{ mediaId, url }` or 401/502 on error.
- **Logout:** The logout button in ChatWindow calls `DELETE /api/portal/session` and redirects to `/portal/login`

Auth flow: Login → `/api/portal/session` sets cookies → proxy checks cookie → chat page reads cookie → ChatWindow calls proxy → proxy reads cookies → forwards to Payload agent

The `@/*` TS path alias resolves to the project root.

### Component organization

Components are grouped by domain under `app/components/`:

- **`consent/`** — GDPR cookie consent system (banner, modal, provider, script loader, embed wrappers)
- **`sections/homepage/`** — Marketing sections (Hero, Pricing, FAQ, Portfolio, etc.)
- **`sections/contact/`** — Contact form and section wrapper
- **`navigation/`** — Site header with desktop/mobile nav
- **`shared/`** — Reusable UI primitives (Buttons, Icons, DeferredAnimationStyles)

### Consent system

The cookie consent module is the most architecturally significant system. It uses React Context (`ConsentProvider`) to gate third-party scripts and embeds:

1. `ConsentProvider` (context) — manages consent state, reads/writes `localStorage` key `apirtayo_cookie_consent`
2. `ConsentScriptLoader` — conditionally loads GA4/GTM/Meta Pixel based on consent categories
3. `ConsentGate` — wraps children, blocking render until the matching consent category is granted
4. Category-specific embed wrappers: `YouTubeEmbed`, `GoogleMapEmbed`, `ExternalFormEmbed`

Consent config is in `app/lib/consent/consent-config.ts`. Changing the `version` field invalidates all stored consent and re-shows the banner. Consent auto-expires after `consentMaxAgeDays` (default 365).

### Contact form flow

Form submissions go through a server action (`app/lib/gravity-forms/contactform.ts`):

1. Client collects form data + CleanTalk bot-detection token
2. `submitDynamicFormAction` (server action) validates: honeypot check → CleanTalk token required → per-field validation (email format, phone digits-only, max lengths)
3. CleanTalk API validates the token at `moderate.cleantalk.org/api2.0` (fails closed — blocks submission on any API error)
4. Valid submissions POST to `{WP_SITE_URL}/wp-json/gf/v2/forms/{formId}/submissions` with Basic auth
5. On success, redirect to `/thank-you`

Required env vars for the contact form: `WP_SITE_URL`, `WP_GRAVITY_FORM_CONTACT_ID`, `WP_GRAVITY_API_KEY`, `WP_GRAVITY_API_SECRET`, `CLEANTALK_API_KEY`.

### Performance patterns

- Below-fold homepage sections use `next/dynamic` with `ssr: true` (code-split but still server-rendered for SEO)
- Font uses `display: "swap"` to prevent invisible text during load
- `next.config.ts` strips `console.log` in production, compresses responses, sets 1-year cache for images and static assets
- Security headers applied globally: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### Deployment

PM2 manages the Node process on a VPS at `/home/projects/apirtayo`, running `npm start -- -p 3002` as user `appuserwebsite`.

CI/CD via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): push to `master` → GHA builds (Node 22, `npm ci` + `npm run build`) → rsyncs `.next/` to VPS → SSH pulls latest source, runs `npm ci --omit=dev`, and `pm2 reload apirtayo`. Build-time `NEXT_PUBLIC_*` vars are injected as GitHub Secrets in the `production` environment.

### Key env vars

| Variable                     | Purpose                                        |
| ---------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_GA_ID`          | Google Analytics 4 measurement ID (build-time) |
| `NEXT_PUBLIC_GTM_ID`         | Google Tag Manager container ID (build-time)   |
| `NEXT_PUBLIC_META_PIXEL_ID`  | Meta Pixel ID (build-time)                     |
| `WP_SITE_URL`                | WordPress backend URL                          |
| `WP_GRAVITY_FORM_CONTACT_ID` | Gravity Forms form ID for contact submissions  |
| `WP_GRAVITY_API_KEY`         | Gravity Forms REST API consumer key            |
| `WP_GRAVITY_API_SECRET`      | Gravity Forms REST API consumer secret         |
| `CLEANTALK_API_KEY`          | CleanTalk anti-spam API key                    |

## Payload CMS Integration (feat/payload-cms)

This branch integrates Payload CMS as the headless content backend, replacing hardcoded
content in homepage sections. The Payload instance runs separately at `http://localhost:3000`
(local) and will be deployed independently in production.

### Architecture direction

- Payload CMS is the single backend serving multiple frontends (multi-tenant)
- apir-tayo is the first frontend connected to it, scoped to its own tenant
- Contact form (Gravity Forms) stays unchanged for now

### New env vars

| Variable              | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| `PAYLOAD_API_URL`     | Payload CMS base URL (e.g. http://localhost:3000) |
| `PAYLOAD_TENANT_SLUG` | This site's tenant slug in Payload                |

### Integration approach

Homepage section components under `app/components/sections/homepage/` will have their
hardcoded content replaced with data fetched from Payload's REST API, tenant-scoped.
WordPress is no longer used for content — only Gravity Forms contact submission remains.
