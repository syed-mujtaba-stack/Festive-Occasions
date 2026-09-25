import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FestiveImage } from "@/components/ui/festive-image";
import { PageShell } from "@/components/layout/page-shell";
import { FAQ } from "@/components/sections/faq";
import { PackagesSection } from "@/components/sections/packages";
import { FinalCTA } from "@/components/sections/final-cta";
import { BackToHome } from "@/components/ui/back-to-home";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { galleryProjects } from "@/lib/gallery";
import type { ServicePage } from "@/lib/service-pages";
import { siteConfig, whatsappLink } from "@/lib/site";
import { images } from "@/lib/images";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { services } from "@/lib/services";

/** Static metadata for a service page (slug is fixed at build time). */
const pageKeywords: Record<string, string[]> = {
  "christmas-decoration-dubai": [
    "Christmas Decorators Dubai",
    "Christmas Decorators in Dubai",
    "Christmas Decorators near me",
    "Christmas Decoration Company Dubai",
    "Christmas Decoration Services Dubai",
    "Professional Christmas Decorators Dubai",
  ],
  "christmas-villa-decoration-dubai": [
    "Villa Christmas Decorators Dubai",
    "Villa Christmas Decoration Dubai",
    "Villa Christmas Decoration Services",
  ],
  "christmas-home-decoration-dubai": [
    "Home Christmas Decoration Dubai",
    "Christmas Home Decorators Dubai",
    "Christmas Decorators near me",
  ],
  "christmas-office-decoration-dubai": [
    "Office Christmas Decorators Dubai",
    "Office Christmas Decoration Dubai",
    "Corporate Christmas Decoration Dubai",
  ],
  "christmas-corporate-decoration-dubai": [
    "Corporate Christmas Decorators Dubai",
    "Corporate Christmas Decoration Dubai",
    "Christmas Decoration Company Dubai",
  ],
  "christmas-lighting-dubai": [
    "Christmas Lighting Dubai",
    "Christmas Lights Decoration Dubai",
    "Outdoor Christmas Lights Dubai",
  ],
  "outdoor-christmas-decoration-dubai": [
    "Outdoor Christmas Decoration Dubai",
    "Outdoor Christmas Decorators Dubai",
    "Christmas Decorators near me",
  ],
};

export function servicePageMetadata(page: ServicePage): Metadata {
  const ogImage = `${siteConfig.url}${images[page.heroImage].src}`;
  return {
    title: page.title,
    description: page.metaDescription,
    keywords: pageKeywords[page.slug] ?? [
      "Christmas Decoration Dubai",
      "Christmas Decorators Dubai",
    ],
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.title} | Festive Occasions`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "website",
      images: [
        {
          url: ogImage,
          alt: images[page.heroImage].alt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | Festive Occasions`,
      description: page.metaDescription,
      images: [ogImage],
    },
  };
}

/** schema.org graph for a service page — Service, FAQPage, BreadcrumbList. */
function servicePageJsonLd(page: ServicePage): Record<string, unknown> {
  const pageUrl = `${siteConfig.url}/${page.slug}`;
  const isPillar = page.slug === "christmas-decoration-dubai";
  const breadcrumb = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    ...(isPillar
      ? []
      : [
          {
            "@type": "ListItem",
            position: 2,
            name: "Christmas Decoration Dubai",
            item: `${siteConfig.url}/christmas-decoration-dubai`,
          },
        ]),
    {
      "@type": "ListItem",
      position: isPillar ? 2 : 3,
      name: page.title,
      item: pageUrl,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.title,
        serviceType: "Christmas Decoration",
        description: page.metaDescription,
        url: pageUrl,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteConfig.url}/#business`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: { "@type": "City", name: "Dubai" },
        audience: {
          "@type": "Audience",
          audienceType: "Homes, villas, offices and commercial spaces",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumb,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function ServicePageTemplate({ page }: { page: ServicePage }) {
  const related = services
    .filter((s) => s.href !== `/${page.slug}`)
    .slice(0, 4);

  return (
    <PageShell>
      {/* Structured data — Service + FAQPage + BreadcrumbList */}
      <JsonLd data={servicePageJsonLd(page)} />

      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-night">
        <div className="absolute inset-0">
          <FestiveImage image={page.heroImage} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/45 to-[#171312]/20" />
        <Container className="relative z-10 pb-20 pt-40">
          <BackToHome className="mb-7" />
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-ivory/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-champagne"
                >
                  Home
                </Link>
              </li>
              {page.slug !== "christmas-decoration-dubai" && (
                <>
                  <li aria-hidden="true" className="text-champagne/60">
                    /
                  </li>
                  <li>
                    <Link
                      href="/christmas-decoration-dubai"
                      className="transition-colors hover:text-champagne"
                    >
                      Christmas Decoration
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="text-champagne/60">
                /
              </li>
              <li aria-current="page" className="text-champagne">
                {page.title}
              </li>
            </ol>
          </nav>
          <p className="text-label mb-5 flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne" aria-hidden />
            Festive Occasions · {page.eyebrow}
          </p>
          <h1 className="text-h1 max-w-4xl text-ivory">{page.title}</h1>
        </Container>
      </section>

      {/* Introduction */}
      <Section id="introduction">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionHeading eyebrow="The Service" title={page.intro.heading} />
            <div className="flex flex-col justify-center gap-8">
              <p className="text-lead text-cocoa">{page.intro.body}</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="dark" href="/contact">
                  Get a Free Quote
                </Button>
                <Button variant="whatsapp" href={whatsappLink()} external>
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Packages */}
      <PackagesSection linkToPage cards />

      {/* What we decorate */}
      <Section id="what-we-decorate" tone="cream">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Spaces"
              title={page.whatWeDecorate.heading}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.whatWeDecorate.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b hairline pb-5 text-[0.95rem] font-medium text-espresso"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Service details */}
      <Section id="details">
        <Container>
          <ScrollReveal>
            <SectionHeading eyebrow="How It Works" title="Designed, styled, delivered." />
          </ScrollReveal>
          <div className="mt-14 flex flex-col">
            {page.details.map((d, i) => (
              <div
                key={d.number}
                className="grid gap-8 border-t hairline py-12 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`flex flex-col justify-center ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <p className="text-label text-champagne-deep">{d.number}</p>
                  <h3 className="mt-3 font-display text-[2rem] text-espresso">
                    {d.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-cocoa">
                    {d.body}
                  </p>
                </div>
                <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-card">
                    <FestiveImage
                      image={d.image}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Styles */}
      <Section id="styles" tone="dark">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Themes"
              title="Christmas styles we craft."
              tone="dark"
              description="Every scheme can be composed in your preferred direction — or designed custom around your interior."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-3">
              {page.styles.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-ivory/20 px-6 py-3 text-sm font-medium text-ivory/80 transition-colors hover:border-champagne hover:text-champagne"
                >
                  {s}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Gallery */}
      <Section id="gallery">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="Recent festive transformations."
            />
          </ScrollReveal>
          <ScrollReveal y={30} delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryProjects.slice(0, 6).map((project, i) => (
                <div key={project.id} className="h-full">
                  <GalleryCard project={project} index={i} />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Related services — internal linking */}
      <Section id="related-services" tone="cream">
        <Container>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Explore"
              title="More festive services."
              description="Every service can stand alone or be composed into one complete festive transformation."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  className="group flex items-center justify-between gap-4 rounded-lg border hairline bg-background p-6 transition-all duration-300 hover:border-champagne hover:shadow-soft"
                >
                  <div>
                    <p className="text-label text-champagne-deep">{s.number}</p>
                    <h3 className="mt-2 font-display text-xl leading-tight text-espresso group-hover:text-espresso">
                      {s.title} {s.subtitle}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className="text-champagne transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQ questions={page.faqs} />

      {/* CTA */}
      <FinalCTA />
    </PageShell>
  );
}