import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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
    "Christmas Tree Decoration Dubai",
    "Villa Christmas Decoration Dubai",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Decoration Dubai | Festive Occasions",
    description:
      "Bespoke Christmas decoration for homes, villas, offices and commercial spaces across Dubai.",
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