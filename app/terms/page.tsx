import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { PageShell } from "@/components/layout/page-shell";
import { BackToHome } from "@/components/ui/back-to-home";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";

/**
 * Terms of Service — plain, honest booking terms. Nothing invented: deposit
 * and scheduling specifics are confirmed in writing with each quote.
 * Noindexed: compliance page, not a search target.
 */
export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "How quoting, booking, installation and removal work with Festive Occasions — plain terms confirmed in writing with your quote.",
  alternates: { canonical: "/terms" },
  robots: {
    index: false,
    follow: true,
  },
};

const sections = [
  {
    heading: "Our service",
    body: "Festive Occasions designs, styles, installs and removes bespoke Christmas and festive decoration for homes, villas, offices and commercial venues across Dubai and the UAE. Every project is quoted on its own scope — nothing is bundled or assumed.",
  },
  {
    heading: "Quotes and pricing",
    body: "Quotes are prepared from the details you share about your space, scale and styling direction, and our published packages (from AED 6,000 + VAT) give a transparent starting point. VAT is added where applicable. A written quote reflects the scope confirmed at the time it is issued.",
  },
  {
    heading: "Booking and payment",
    body: "Dates are confirmed in writing with your booking, and any deposit required to hold a date is stated at the point of booking. Payment terms are confirmed alongside your quote before any commitment is made.",
  },
  {
    heading: "Client responsibilities",
    body: "On the scheduled dates we need access to the property and, for installations requiring power or lighting, working electrical points. Share anything we should know about your space (access, pets, specific areas) before installation day so the schedule runs smoothly.",
  },
  {
    heading: "Installation and removal",
    body: "Our team installs the completed scheme on schedule and removes everything carefully after the festive period, leaving the property as we found it. Removal inclusion is confirmed in your quote.",
  },
  {
    heading: "Content and images",
    body: "All copy, design and imagery on this website belong to Festive Occasions unless stated otherwise. Finished installations may be photographed and published in our portfolio with permission.",
  },
  {
    heading: "Contact",
    body: `Questions about these terms? Reach us at ${siteConfig.email} or ${siteConfig.phoneDisplay} — we will answer directly.`,
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          url: `${siteConfig.url}/terms`,
          inLanguage: "en-AE",
          isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
        }}
      />
      <section className="relative flex min-h-[42svh] items-end overflow-hidden bg-night">
        <div className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/85 to-[#171312]/60" />
        <Container className="relative z-10 pb-14 pt-36">
          <BackToHome className="mb-6" />
          <p className="text-label mb-5 flex items-center gap-4 text-champagne-deep">
            <span className="h-px w-10 bg-champagne" aria-hidden />
            Festive Occasions · Terms
          </p>
          <h1 className="text-h1 max-w-3xl text-ivory">Terms of Service</h1>
          <p className="mt-5 max-w-xl text-lead text-ivory/75">
            Plain terms for quoting, booking and delivery — confirmed in
            writing with your quote.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            {sections.map((s) => (
              <div key={s.heading} className="border-b hairline py-8 first:pt-0">
                <h2 className="font-display text-2xl text-espresso">
                  {s.heading}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cocoa">
                  {s.body}
                </p>
              </div>
            ))}
            <p className="mt-8 text-xs text-warm-gray-deep">
              Last updated: September 2026. We will update this page if our
              working terms change, and will always reflect what is confirmed
              in writing with your project.
            </p>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}