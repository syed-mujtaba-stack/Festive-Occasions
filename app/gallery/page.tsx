import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
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

      <Section id="gallery">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="The Work"
              title="Every space, composed differently."
              description="A selection of festive schemes from recent installations — from a single signature tree to complete villa and office transformations."
            />
          </ScrollReveal>
          <GalleryGrid />
        </Container>
      </Section>

      {/* Trust line (honest, per spec 33-34) */}
      <Section tone="cream">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col gap-8 border-t hairline pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <p className="font-display text-4xl italic leading-tight text-espresso lg:text-5xl">
                A note on
                <br />
                this gallery
              </p>
              <div className="max-w-2xl">
                <p className="text-[1.05rem] leading-relaxed text-cocoa">
                  The gallery mixes real Festive Occasions installation
                  photos with styling imagery used across the site — every
                  look is composed around its space, from statement tree to
                  final styling detail.
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-cocoa/80">
                  Final project photos and captions will replace the styling
                  imagery as the studio confirms the full set. Everything
                  shown is verified by our team before publication.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <FAQ />
      <FinalCTA />
    </PageShell>
  );
}