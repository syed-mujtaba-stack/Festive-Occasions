import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { galleryProjects } from "@/lib/gallery";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Christmas Decoration Portfolio & Gallery",
  description:
    "A selection of festive Christmas decoration schemes — villas, homes, offices and commercial settings styled around their space by Festive Occasions Dubai.",
  alternates: { canonical: "/gallery" },
  keywords: [
    "Christmas decoration gallery Dubai",
    "Christmas decoration portfolio UAE",
    "Festive install photos Dubai",
    "Christmas decoration inspiration Dubai",
  ],
  openGraph: {
    title: "Christmas Decoration Portfolio | Festive Occasions",
    description:
      "Festive schemes for villas, homes, offices and commercial spaces — styled around their space.",
    url: "/gallery",
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
    title: "Christmas Decoration Portfolio | Festive Occasions",
    description:
      "Festive schemes for villas, homes, offices and commercial spaces — styled around their space.",
    images: [`${siteConfig.url}${images.hero.src}`],
  },
};

/** ImageGallery + ImageObject schema — one ImageObject per project photo. */
function galleryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Festive Occasions Christmas Decoration Portfolio",
    description:
      "A curated set of Christmas decoration looks — villas, homes, offices and commercial settings in Dubai and the UAE, composed around each space.",
    url: `${siteConfig.url}/gallery`,
    isAccessibleForFree: true,
    image: galleryProjects.map((project) => {
      const img = images[project.image];
      return {
        "@type": "ImageObject",
        contentUrl: `${siteConfig.url}${img.src}`,
        caption: project.title,
        representativeOfPage: false,
      };
    }),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export default function GalleryPage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="Gallery" path="/gallery" />
      <JsonLd data={galleryJsonLd()} />
      <PageHero
        eyebrow="Portfolio"
        title="Festive transformations, by space."
        lead="A selection of schemes across villas, homes, offices and commercial settings — each designed around its architecture, light and character."
        image="hero"
      />

      {/* Full-width marquee gallery — no container wrap so it bleeds edge to edge */}
      <section id="gallery" className="bg-night py-16 overflow-hidden">
        <GalleryGrid />
      </section>

      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}