import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import { Preloader } from "@/components/ui/preloader";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Christmas Decoration Dubai | Festive Occasions",
    template: "%s | Festive Occasions",
  },
  description:
    "Festive Occasions provides bespoke Christmas decoration in Dubai for homes, villas, offices and commercial spaces. Request a consultation for your festive setup.",
  keywords: [
    "Christmas Decoration Dubai",
    "Christmas Decorators Dubai",
    "Christmas Decorators in Dubai",
    "Christmas Decorators near me",
    "Christmas Decorator Dubai",
    "Christmas Decoration Company Dubai",
    "Christmas Decoration Services Dubai",
    "Professional Christmas Decorators Dubai",
    "Christmas Tree Decorators Dubai",
    "Villa Christmas Decorators Dubai",
    "Office Christmas Decorators Dubai",
    "Luxury Christmas Decoration Dubai",
    "Festive Occasions",
  ],
  openGraph: {
    title: "Christmas Decoration Dubai | Festive Occasions",
    description:
      "Bespoke Christmas decoration for homes, villas, offices and commercial spaces across Dubai.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.hero.src}`,
        alt: images.hero.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Decoration Dubai | Festive Occasions",
    description:
      "Bespoke Christmas decoration for homes, villas, offices and commercial spaces across Dubai.",
    images: [`${siteConfig.url}${images.hero.src}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {/* No-JS gate: hide the preloader overlay when scripting is off
            (it is purely decorative, so it must never block content).
            Reduced-motion hide lives in globals.css under a media query. */}
        <noscript>
          <style>{`.fo-preloader{display:none !important}`}</style>
        </noscript>
        {/* First-impression preloader (SSR-rendered, client-driven) */}
        <Preloader />
        {/* Cinematic film grain — subtle texture overlay (decorative) */}
        <div aria-hidden className="grain" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-champagne focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-espresso"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}