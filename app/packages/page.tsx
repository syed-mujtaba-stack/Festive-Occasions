import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { PackagesSection } from "@/components/sections/packages";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Christmas Decoration Packages & Prices | Festive Occasions Dubai",
  description:
    "Christmas decoration packages in Dubai — Christmas Cheers from AED 6,000, Fancy from AED 15,000 and Luxury from AED 25,000, plus bespoke styling. Prices exclude VAT.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Christmas Decoration Packages | Festive Occasions",
    description:
      "Price-anchored Christmas collections from AED 6,000 + VAT — Cheers, Fancy and Luxury, with bespoke styling on request.",
    url: "/packages",
    type: "website",
  },
};

export default function PackagesPage() {
  const packagesJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Festive Occasions Christmas Decoration Packages",
    description:
      "Price-anchored Christmas decoration collections for homes, villas, offices and venues in Dubai.",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Christmas Cheers",
        description: "6 ft Christmas tree with ornaments, one table garland, one basic door wreath.",
        price: "6000",
        priceCurrency: "AED",
      },
      {
        "@type": "Offer",
        name: "Christmas Fancy",
        description: "7–8 ft Christmas tree with ornaments, staircase garland, door wreath, table set-up styling.",
        price: "15000",
        priceCurrency: "AED",
      },
      {
        "@type": "Offer",
        name: "Christmas Luxury",
        description: "9–10 ft tree with luxury ornaments, door wreath with garlands, staircase garlands, table set-up styling, curated seasonal accessories, outdoor entrance garlands.",
        price: "25000",
        priceCurrency: "AED",
      },
    ],
  };

  return (
    <PageShell>
      <PageBreadcrumbSchema name="Packages" path="/packages" />
      <JsonLd data={packagesJsonLd} />
      <PageHero
        eyebrow="Packages"
        title="The Christmas collection."
        lead="Three considered collections — Cheers, Fancy and Luxury — each styled around your space. Plus bespoke design for spaces that ask for more."
        image="hero"
      />

      <PackagesSection id="packages" />

      {/* Why a package, not a quote-free guess — honest reassurance */}
      <Section tone="cream">
        <Container>
          <ScrollReveal>
            <div className="grid gap-10 border-t hairline pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              <h2 className="font-display text-4xl italic leading-tight text-espresso lg:text-5xl">
                How packages work.
              </h2>
              <div className="flex max-w-2xl flex-col gap-6">
                <p className="text-[1.05rem] leading-relaxed text-cocoa">
                  Every package is installed by our own styling team — the tree,
                  garlands, wreaths and styling details are delivered, dressed
                  and positioned in your space. Prices are from-quotes: your
                  final quote reflects the exact scale, colour direction and
                  proportions of your property.
                </p>
                <p className="text-[0.95rem] leading-relaxed text-cocoa/80">
                  Send a few photos of your space and your preferred dates on
                  WhatsApp — we&apos;ll confirm the right package (or shape a
                  bespoke quote) for your setting before you commit.
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