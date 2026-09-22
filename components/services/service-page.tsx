import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FestiveImage } from "@/components/ui/festive-image";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { galleryProjects } from "@/lib/gallery";
import type { ServicePage } from "@/lib/service-pages";
import { whatsappLink } from "@/lib/site";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { FaWhatsapp } from "react-icons/fa";
import type { Metadata } from "next";

/** Static metadata for a service page (slug is fixed at build time). */
export function servicePageMetadata(page: ServicePage): Metadata {
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.title} | Festive Occasions`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "website",
    },
  };
}

export function ServicePageTemplate({ page }: { page: ServicePage }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-night">
        <div className="absolute inset-0">
          <FestiveImage image={page.heroImage} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#171312] via-[#171312]/45 to-[#171312]/20" />
        <Container className="relative z-10 pb-20 pt-40">
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
                  <p className="text-label text-champagne">{d.number}</p>
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
            <div className="mt-12 grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryProjects.slice(0, 6).map((project, i) => (
                <div
                  key={project.id}
                  className={i === 1 || i === 4 ? "lg:col-span-2" : i === 2 ? "lg:row-span-2" : ""}
                >
                  <div className="h-full">
                    <GalleryCard project={project} />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* FAQ */}
      <FAQ questions={page.faqs} />

      {/* CTA */}
      <FinalCTA />
    </>
  );
}