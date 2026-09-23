import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { QuoteForm } from "@/components/contact/quote-form";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site";
import { images } from "@/lib/images";
import { FaWhatsapp, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact & Quote | Festive Occasions Dubai",
  description:
    "Contact Festive Occasions for Christmas decoration in Dubai — request a quote via WhatsApp, phone or email for homes, villas, offices and commercial spaces.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Festive Occasions | Christmas Decoration Dubai",
    description:
      "Request a quote for bespoke Christmas decoration in Dubai — WhatsApp, call or email.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.officeLobbyTree.src}`,
        alt: images.officeLobbyTree.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Festive Occasions | Christmas Decoration Dubai",
    description:
      "Request a quote for bespoke Christmas decoration in Dubai — WhatsApp, call or email.",
    images: [`${siteConfig.url}${images.officeLobbyTree.src}`],
  },
};

const contactMethods = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: whatsappLink(),
    external: true,
  },
  {
    icon: FaPhone,
    label: "Call",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: FaClock,
    label: "Hours",
    value: siteConfig.hours,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Service area",
    value: siteConfig.serviceArea.join(" · "),
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Business Centre, Sharjah Publishing City Free Zone",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    areaServed: siteConfig.serviceArea,
    // openingHours: only added once the client confirms fixed hours
    // (schema-plan rule — never publish placeholder/unverified hours).
    priceRange: "$$",
    sameAs: Object.values(siteConfig.social).filter((u) => !u.endsWith("/")),
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's plan your festive space."
        lead="Tell us about your home, villa, office or venue — we'll design a bespoke Christmas scheme around it and share a clear proposal."
        image="officeLobbyTree"
      />

      <Section id="contact">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            {/* Left — contact methods */}
            <ScrollReveal>
              <SectionHeading
                eyebrow="Reach us"
                title="Every conversation starts here."
                description="The fastest way to reach us is WhatsApp — our team responds directly with availability and next steps."
              />

              <div className="mt-10 flex flex-col">
                {contactMethods.map((m, i) => {
                  const Icon = m.icon;
                  const inner = (
                    <>
                      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-white/70 text-champagne transition-colors duration-500 group-hover:bg-champagne group-hover:text-espresso">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-warm-gray transition-colors duration-500 group-hover:text-champagne">
                          {m.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[1.02rem] font-medium text-espresso">
                          {m.value}
                        </span>
                      </span>
                      {m.href && (
                        <span
                          aria-hidden
                          className="text-champagne/0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-champagne"
                        >
                          →
                        </span>
                      )}
                    </>
                  );
                  return m.href ? (
                    <a
                      key={m.label}
                      href={m.href}
                      {...(m.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group border-b hairline py-6 first:border-t first:pt-0 last:border-b-0 transition-colors duration-500 hover:border-champagne/60"
                    >
                      <span className="flex items-center gap-5">
                        {inner}
                      </span>
                    </a>
                  ) : (
                    <div
                      key={m.label}
                      className="flex items-center gap-5 border-b hairline py-6 first:border-t first:pt-0 last:border-b-0"
                    >
                      {inner}
                    </div>
                  );
                })}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="whatsapp" href={whatsappLink()} external size="lg">
                    <FaWhatsapp className="h-4 w-4" aria-hidden />
                    WhatsApp Us Now
                  </Button>
                  <Button variant="outline" href={`tel:${siteConfig.phone}`} size="lg">
                    <FaPhone className="h-4 w-4" aria-hidden />
                    Call Us
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal y={30} delay={0.1}>
              <QuoteForm />
            </ScrollReveal>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}