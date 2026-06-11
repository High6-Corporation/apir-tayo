# Project Audit

> Generated: 2026-06-08
> Stack: Next.js 16 + React 19 + TypeScript
> Root: /Users/josh/work/apir-tayo

---

## Architecture

### Overview

Apirtayo is a high-performance marketing website for a web design agency specializing in one-page websites. Built with Next.js App Router, it features GDPR-compliant cookie consent, WordPress/Gravity Forms integration for contact handling, and consent-gated analytics tracking (GA4, GTM, Meta Pixel). The site is optimized for speed with dynamic imports, modern image optimization, and production deployment via PM2.

### Stack

- **Runtime**: Node.js
- **Framework**: Next.js 16.2.6 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Font**: Plus Jakarta Sans (Google Fonts, optimized)
- **Key dependencies**: 
  - `@next/third-parties` — GA4/GTM integration
  - `lucide-react` — Icon library
- **External services**: 
  - WordPress/Gravity Forms API (headless contact form backend)
  - CleanTalk (bot detection and spam prevention)
  - Google Analytics (GA4) — consent-gated
  - Google Tag Manager (GTM) — consent-gated
  - Meta Pixel — consent-gated
- **Build/deploy**: 
  - `next build` + `next start`
  - PM2 process manager (production on port 3002 at `/home/projects/apirtayo`)
  - Production optimizations: console removal, compression, security headers

### Structure pattern

Component-based Next.js App Router architecture with route groups for organization. Features are grouped by domain (consent, navigation, sections, etc.). Uses server actions for form submissions and dynamic imports for below-fold sections to optimize performance.

### Entry points

- `app/layout.tsx` — Root layout with global styles, consent providers, and metadata
- `app/page.tsx` — Homepage with dynamically imported marketing sections
- `next.config.ts` — Production configuration with image optimization and security headers
- `ecosystem.config.cjs` — PM2 production deployment configuration

---

## Features

### Cookie Consent System (GDPR Compliance)

Full-featured GDPR-style cookie consent module with banner, settings modal, category-based toggles (necessary, functional, analytics, marketing), localStorage persistence with versioning, and consent-gated script loading. Includes reusable ConsentGate wrappers for third-party embeds (YouTube, Google Maps, external forms).

### Marketing Homepage

Multi-section one-page website optimized for conversions with Hero, Why One Page, Pricing, How It Works, Portfolio with gallery, Testimonials, Trust indicators, FAQ, CTA, and Footer sections. Uses dynamic imports for below-fold content to improve initial page load performance.

### Contact Form Integration

Server-side integration with WordPress Gravity Forms API for contact form submission. Includes CleanTalk bot detection, field validation, phone number formatting, and error handling. Form submissions are processed via Next.js server actions.

### Analytics Tracking

Consent-gated tracking scripts for Google Analytics (GA4), Google Tag Manager, and Meta Pixel. Scripts only load after user grants appropriate consent category (analytics/marketing). Managed via ConsentScriptLoader component.

### Utility and Legal Pages

Route groups organize utility pages (404, coming-soon, maintenance, thank-you) and legal pages (contact, cookie-policy, privacy-policy). Cookie and privacy policy content components are reusable across the site.

### Performance Optimizations

Production-ready configuration with AVIF/WebP image formats, 1-year cache TTL for optimized images, dynamic imports for below-fold sections, font optimization with swap display strategy, and SWC compiler with console.log removal in production.

---

## File Map

> Legend: 📁 directory 📄 file

📄 .env — Environment variables (CleanTalk, WordPress API, analytics IDs) — **not committed**
📄 .gitignore — Git ignore rules (node_modules, .next, logs, IDE configs)
📄 ecosystem.config.cjs — PM2 deployment config (port 3002, production environment)
📄 next-env.d.ts — Next.js TypeScript declarations
📄 next.config.ts — Next.js configuration with image optimization, security headers, compression
📄 package.json — Dependencies and npm scripts (dev, build, start, lint)
📄 postcss.config.mjs — PostCSS configuration for Tailwind CSS v4
📄 README.md — Project documentation for High6 Next.js Cookie Consent Module
📄 tsconfig.json — TypeScript compiler configuration with @ alias

📁 app/
  📄 globals.css — Global styles and Tailwind directives
  📄 icon.png — Favicon
  📄 layout.tsx — Root layout with consent providers, metadata, font configuration
  📄 not-found.tsx — Custom 404 error page
  📄 page.tsx — Homepage with dynamically imported sections
  
  📁 (minors)/ — Route group for utility pages
    📁 404/ — 404 error page route
      📄 page.tsx — Styled 404 page component
    📁 coming-soon/ — Coming soon page route
      📄 page.tsx — Coming soon page component
    📁 maintenance/ — Maintenance mode page route
      📄 page.tsx — Maintenance page component
    📁 thank-you/ — Form submission thank you page route
      📄 page.tsx — Thank you page component
  
  📁 (pages)/ — Route group for content pages
    📁 contact/ — Contact page route
      📄 page.tsx — Contact page with form
    📁 cookie-policy/ — Cookie policy page route
      📄 page.tsx — Cookie policy page with reusable content component
    📁 privacy-policy/ — Privacy policy page route
      📄 page.tsx — Privacy policy page with reusable content component
  
  📁 components/
    📁 consent/ — GDPR cookie consent system
      📄 ConsentGate.tsx — Wrapper that blocks children until consent granted
      📄 ConsentProvider.tsx — React context + state management for consent
      📄 ConsentScriptLoader.tsx — Loads GA4/GTM/Meta Pixel based on consent
      📄 CookieConsentBanner.tsx — First-visit consent banner
      📄 CookiePolicyContent.tsx — Reusable cookie policy content
      📄 CookieSettingsLink.tsx — Floating settings icon button
      📄 CookieSettingsModal.tsx — Full settings modal with category toggles
      📄 ExternalFormEmbed.tsx — Consent-gated external form embed
      📄 GoogleMapEmbed.tsx — Consent-gated Google Maps embed
      📄 PrivacyPolicyContent.tsx — Reusable privacy policy content
      📄 YouTubeEmbed.tsx — Consent-gated YouTube embed
    
    📁 hooks/ — Custom React hooks
      📄 useScrollAnimation.ts — Scroll-triggered animation hook
    
    📁 navigation/ — Site navigation components
      📄 Navigation.tsx — Main site navigation header
    
    📁 sections/ — Page section components
      📁 contact/ — Contact page sections
        📄 ContactForm.tsx — Contact form component with Gravity Forms integration
        📄 ContactFormSection.tsx — Contact form section wrapper
      
      📁 homepage/ — Homepage marketing sections
        📄 CTASection.tsx — Call-to-action section
        📄 FAQSection.tsx — Frequently asked questions section
        📄 Footer.tsx — Site footer with links and social
        📄 HeroSection.tsx — Above-fold hero section
        📄 HowItWorksSection.tsx — Process explanation section
        📄 PortfolioGallery.tsx — Portfolio image gallery component
        📄 PortfolioSection.tsx — Portfolio showcase section
        📄 PricingSection.tsx — Pricing plans section
        📄 TestimonialsSection.tsx — Customer testimonials section
        📄 TrustSection.tsx — Trust indicators and social proof
        📄 WhyOnePageSection.tsx — Benefits of one-page websites section
    
    📁 shared/ — Reusable UI components
      📄 Buttons.tsx — Button component variants
      📄 DeferredAnimationStyles.tsx — Deferred animation style injection
      📄 Icons.tsx — Icon component library
  
  📁 lib/ — Utility libraries and integrations
    📁 cleantalk/ — CleanTalk spam protection integration
      📄 cleantalkscript.ts — CleanTalk bot detector script loader hook
    
    📁 consent/ — Consent management utilities
      📄 consent-config.ts — Per-site consent configuration
      📄 consent-storage.ts — localStorage read/write with versioning
      📄 consent-types.ts — TypeScript types for consent system
    
    📁 gravity-forms/ — WordPress Gravity Forms API integration
      📄 contactform.ts — Server action for form submission with validation

📁 public/ — Static assets
  📄 file.svg — File icon
  📄 globe.svg — Globe icon
  📄 next.svg — Next.js logo
  📄 vercel.svg — Vercel logo
  📄 window.svg — Window icon
  📁 assets/ — Images and media assets

---

## Audit log

| Date       | Type       | Summary                                       |
| ---------- | ---------- | --------------------------------------------- |
| 2026-06-08 | Full audit | Initial generation for CI/CD pipeline context |