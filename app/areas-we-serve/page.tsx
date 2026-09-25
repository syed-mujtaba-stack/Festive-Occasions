import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { whatsappLink, siteConfig } from "@/lib/site";
import { images } from "@/lib/images";
import { FaWhatsapp } from "react-icons/fa";
import { PackagesSection } from "@/components/sections/packages";

export const metadata: Metadata = {
  title: "Areas We Serve in Dubai & UAE",
  description:
    "Festive Occasions provides Christmas decoration across Dubai and the UAE. Confirm whether we cover your area on enquiry.",
  alternates: { canonical: "/areas-we-serve" },
  keywords: [
    "Christmas decoration Dubai coverage",
    "Christmas decorators Sharjah",
    "Christmas decoration service areas UAE",
    "Christmas decorators near me Dubai",
  ],
  openGraph: {
    title: "Areas We Serve | Festive Occasions",
    description:
      "Christmas decoration across Dubai and the UAE — confirm coverage for your area on enquiry.",
    url: "/areas-we-serve",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.pageAreas.src}`,
        alt: images.pageAreas.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Areas We Serve | Festive Occasions",
    description:
      "Christmas decoration across Dubai and the UAE — confirm coverage for your area on enquiry.",
    images: [`${siteConfig.url}${images.pageAreas.src}`],
  },
};

const coverage = [
  {
    title: "Sharjah",
    copy: "Our registered base — the business is located in Sharjah Publishing City Free Zone, and installations are planned and dispatched from here.",
  },
  {
    title: "Dubai",
    copy: "Residential villas, apartments, offices and venues across the city — confirmed coverage and dates on enquiry.",
  },
  {
    title: "Wider UAE",
    copy: "Projects across the Emirates are handled on enquiry, so the schedule and logistics are planned properly.",
  },
];

export default function AreasWeServePage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="Areas We Serve" path="/areas-we-serve" />
      <PageHero
        eyebrow="Areas We Serve"
        title="Serving Dubai and the UAE."
        lead="We work across Dubai and the Emirates. Tell us where your property is and we'll confirm coverage for your dates."
        image="pageAreas"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Coverage"
                title="Where we decorate."
                description="Every project is scheduled around your space — confirmed coverage and dates on enquiry."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                {coverage.map((c, i) => (
                  <div
                    key={c.title}
                    className="border-b hairline py-7 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-label text-champagne-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-espresso">
                          {c.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                          {c.copy}
                        </p>
                        {c.title === "Wider UAE" && (
                          <Link
                            href="/christmas-decoration-uae"
                            className="mt-3 inline-flex items-center gap-2 text-label text-champagne-deep transition-colors hover:text-espresso"
                          >
                            Nationwide projects
                            <span aria-hidden>→</span>
                          </Link>
                        )}
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
                  Not sure if we cover your area?
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-cocoa">
                  Just ask — share your community or building address and we
                  will confirm coverage and availability for your dates. No
                  pressure, clear answer.
                </p>
              </div>
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink(
                  `Hi Festive Occasions, do you cover ${siteConfig.serviceArea[0]} for Christmas decoration?`
                )}
                external
              >
                <FaWhatsapp className="h-4 w-4" aria-hidden />
                Ask About Your Area
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
      <PackagesSection linkToPage cards />
    </PageShell>
  );
}