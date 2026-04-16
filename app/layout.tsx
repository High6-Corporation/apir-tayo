import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DeferredAnimationStyles from "./components/shared/DeferredAnimationStyles";
import "./globals.css";

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
      <body
        className="antialiased"
        suppressHydrationWarning
        style={{
          // Inline critical styles to prevent white screen
          backgroundColor: '#ffffff',
          color: '#030213',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {children}
        <DeferredAnimationStyles />
      </body>
    </html>
  );
}
