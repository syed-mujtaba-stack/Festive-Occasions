import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/ui/page-hero";
import { FestiveImage } from "@/components/ui/festive-image";
import { PageBreadcrumbSchema } from "@/components/seo/page-breadcrumb";
import { WhyUs } from "@/components/sections/why-us";
import { ProcessSection } from "@/components/sections/process";
import { PackagesSection } from "@/components/sections/packages";
import { FinalCTA } from "@/components/sections/final-cta";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Christmas Decoration Studio Dubai",
  description:
    "Meet Festive Occasions, a Dubai-based Christmas decoration studio. We plan, style and install festive schemes for homes, villas and offices across the UAE.",
  alternates: { canonical: "/about" },
  keywords: [
    "About Festive Occasions",
    "Christmas decoration studio Dubai",
    "Festive decoration specialists UAE",
    "Christmas decorators company Dubai",
  ],
  openGraph: {
    title: "About Festive Occasions",
    description:
      "A Dubai-based Christmas decoration studio — festive schemes planned around every space we work with.",
    url: "/about",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}${images.pageAbout.src}`,
        alt: images.pageAbout.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Festive Occasions",
    description:
      "A Dubai-based Christmas decoration studio — festive schemes planned around every space we work with.",
    images: [`${siteConfig.url}${images.pageAbout.src}`],
  },
};

const values = [
  {
    title: "Space-first design",
    copy: "We begin with the architecture, light and character of your space — never a copied template.",
  },
  {
    title: "Premium finishing",
    copy: "Curated materials, precise styling and a considered palette in every layer of the scheme.",
  },
  {
    title: "Honest process",
    copy: "Clear scoping, clear schedules and a final walkthrough — you always know what to expect.",
  },
  {
    title: "Selected for Dubai",
    copy: "From villas and residences to offices and venues — a studio sized for UAE spaces.",
  },
];

const promises = [
  {
    n: "I",
    text: "Clear scoping before any work begins — the scheme, the schedule and the cost set in writing.",
  },
  {
    n: "II",
    text: "Careful installation and removal — your property treated with the same respect as the décor.",
  },
  {
    n: "III",
    text: "Honest documentation of every project — the spaces we decorate, and how we decorate them.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageBreadcrumbSchema name="About" path="/about" />
      <PageHero
        eyebrow="About"
        title="A studio for the season's finest details."
        lead="Festive Occasions is a Christmas decoration studio based in Dubai — planning and installing festive schemes that are composed around the way you live and work."
        image="pageAbout"
      />

      {/* Story — editorial manifesto */}
      <Section>
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl">
              <p className="eyebrow text-champagne-deep">The Story</p>
              <h2 className="mt-10 font-display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-[1.02] tracking-[-0.015em] text-espresso">
                Christmas, composed
                <em className="block text-champagne-deep not-italic">
                  around your space.
                </em>
              </h2>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            {/* Body + pull-quote */}
            <div>
              <div className="space-y-5 text-[1.05rem] leading-relaxed text-cocoa">
                <p>
                  Most festive decoration is applied to a space.
                  We believe it should be composed with it — tree proportions,
                  palette, light and placement all considered against your
                  architecture and your existing interior.
                </p>
                <p>
                  From a single statement tree to a full villa, office or venue
                  transformation, we handle the complete cycle: consultation,
                  design, installation and careful removal after the season.
                </p>
              </div>

              {/* Pull-quote */}
              <ScrollReveal delay={0.1}>
                <blockquote className="mt-12 border-l-2 border-champagne pl-6">
                  <p className="font-display text-2xl italic leading-snug text-espresso lg:text-[1.9rem]">
                    &ldquo;Decoration dresses a room.
                    We shape the mood of the whole season.&rdquo;
                  </p>
                </blockquote>
              </ScrollReveal>
            </div>

            {/* Portrait image — composed, honest caption */}
            <ScrollReveal delay={0.15} y={36}>
              <figure className="group relative overflow-hidden rounded-2xl shadow-card">
                <div className="relative aspect-[4/5]">
                  <div className="absolute inset-0 scale-[1.02] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]">
                    <FestiveImage
                      image="pageAboutPortrait"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="absolute bottom-4 left-4 rounded-full border hairline-dark bg-night/60 px-4 py-1.5 text-label text-ivory/80 backdrop-blur-sm">
                  Composed around its space — not applied to it
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Values — editorial numbered rows, not cards */}
      <Section id="values" tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-champagne-deep">What Guides the Work</p>
                <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-tight text-espresso">
                  Four principles, held{" "}
                  <em className="text-champagne-deep not-italic">on every project.</em>
                </h2>
                <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cocoa">
                  Small enough to care, precise enough to finish — these are
                  the values every scheme is measured against.
                </p>
              </div>
            </ScrollReveal>

            <ol className="flex flex-col">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} as="li" y={20} delay={i * 0.05}>
                  <div className="group flex items-baseline gap-6 border-t hairline py-8 transition-colors duration-500 first:border-t-0 lg:gap-10 lg:py-9">
                    <span className="font-display text-3xl italic leading-none text-champagne-deep transition-colors duration-500 group-hover:text-champagne lg:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-espresso transition-colors duration-500 group-hover:text-cocoa lg:text-[1.7rem]">
                        {v.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                        {v.copy}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Working promise — dark editorial band */}
      <Section tone="dark" className="relative overflow-hidden bg-night text-ivory">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_10%,rgba(198,161,91,0.10),transparent_70%)]"
        />
        <Container className="relative py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <ScrollReveal>
                <p className="eyebrow text-champagne">A Working Promise</p>
                <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-tight text-ivory">
                  The standard we hold{" "}
                  <em className="text-champagne not-italic">ourselves to.</em>
                </h2>
              </ScrollReveal>
            </div>

            <ol className="flex flex-col">
              {promises.map((p, i) => (
                <ScrollReveal key={p.n} as="li" delay={i * 0.06}>
                  <div className="flex items-start gap-6 border-t hairline-dark py-7 first:border-t-0 lg:gap-10">
                    <span className="font-display text-2xl italic leading-none text-champagne">
                      {p.n}
                    </span>
                    <p className="max-w-md text-[1.02rem] leading-relaxed text-ivory/75">
                      {p.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <PackagesSection linkToPage cards />
      <WhyUs />
      <ProcessSection />
      <FinalCTA />
    </PageShell>
  );
}