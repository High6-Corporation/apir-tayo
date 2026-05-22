import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DeferredAnimationStyles from "./components/shared/DeferredAnimationStyles";
import "./globals.css";

import { ConsentProvider } from '@/app/components/consent/ConsentProvider'
import { CookieConsentBanner } from '@/app/components/consent/CookieConsentBanner'
import { CookieSettingsLink } from '@/app/components/consent/CookieSettingsLink'
import { CookieSettingsModal } from '@/app/components/consent/CookieSettingsModal'
import { ConsentScriptLoader } from '@/app/components/consent/ConsentScriptLoader'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "High-Converting Websites - Designed to Launch Fast",
  description: "We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.",
  metadataBase: new URL("https://apirtayo.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "High-Converting Websites - Designed to Launch Fast",
    description: "We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.",
    url: "https://apirtayo.com",
    siteName: "Apirtayo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://apirtayo.com/assets/apir-tayo-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Apirtayo - High-Converting Websites Designed to Launch Fast",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Converting Websites - Designed to Launch Fast",
    description: "We design and build stunning one-page websites in Framer — optimized for speed, clarity, and conversions. Perfect for startups, services, and growing brands.",
    images: ["https://apirtayo.com/assets/apir-tayo-banner.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        {/* Preconnect to own origin for self-hosted fonts */}
        <link rel="preconnect" href="https://apirtayo.com" />

        {/* DNS Prefetch for WordPress backend */}
        <link rel="dns-prefetch" href="https://apirtayo.beta03.site" />
      </head>
      <body className="antialiased" suppressHydrationWarning
        style={{
          // Inline critical styles to prevent white screen
          backgroundColor: '#ffffff',
          color: '#030213',
        }}
      >

        <ConsentProvider>
          {children}

          <CookieConsentBanner />
          <CookieSettingsLink />
          <CookieSettingsModal />
          <ConsentScriptLoader />
        </ConsentProvider>
        <DeferredAnimationStyles />
      </body>
    </html>
  );
}
