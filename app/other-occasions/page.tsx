import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { whatsappLink } from "@/lib/site";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Other Occasions & Festive Styling",
  description:
    "Beyond Christmas — festive styling for other occasions on enquiry. Tell us about your celebration and we'll confirm how we can help.",
  alternates: { canonical: "/other-occasions" },
  keywords: [
    "Other festive occasions decoration",
    "New Year decoration Dubai",
    "Private celebration styling UAE",
    "Venue festive decoration Dubai",
  ],
  openGraph: {
    title: "Other Occasions | Festive Occasions",
    description:
      "Festive styling for occasions beyond Christmas, confirmed on enquiry.",
    url: "/other-occasions",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.ornamentsTwinkling.src}`,
        alt: images.ornamentsTwinkling.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Other Occasions | Festive Occasions",
    description:
      "Festive styling for occasions beyond Christmas, confirmed on enquiry.",
    images: [`${siteConfig.url}${images.ornamentsTwinkling.src}`],
  },
};

export default function OtherOccasionsPage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="Other Occasions" path="/other-occasions" />
      <PageHero
        eyebrow="Other Occasions"
        title="The season doesn't end at Christmas."
        lead="From New Year to private celebrations, a festive space makes the moment. Tell us about your occasion and we'll confirm what we can style for you."
        image="ornamentsTwinkling"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Beyond Christmas"
                title="The occasions we can discuss."
                description="We confirm scope with you before any commitment — nothing is assumed."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                {[
                  {
                    title: "New Year Celebrations",
                    copy: "Glow-up a home, rooftop or venue for the countdown — lighting and finishing that photograph beautifully.",
                  },
                  {
                    title: "Private Celebrations",
                    copy: "Birthdays, anniversaries and family gatherings dressed with a considered festive hand.",
                  },
                  {
                    title: "Seasonal & Venue Styling",
                    copy: "Seasonal touches for hotels, restaurants and retail spaces beyond the Christmas window.",
                  },
                ].map((o, i) => (
                  <div key={o.title} className="border-b hairline py-7 first:pt-0">
                    <div className="flex items-baseline gap-4">
                      <span className="text-label text-champagne">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-espresso">
                          {o.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                          {o.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 border-y hairline py-10 lg:flex-row lg:items-center lg:gap-16">
              <div>
                <h3 className="font-display text-2xl text-espresso">
                  Tell us your date and space.
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-cocoa">
                  Share the occasion, date, location and what you have in mind —
                  we will confirm exactly what we can arrange for you.
                </p>
              </div>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink(
                  "Hi Festive Occasions, I'd like to discuss festive styling for another occasion."
                )}
                external
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                Discuss Your Occasion
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <FinalCTA />
    </PageShell>
  );
}