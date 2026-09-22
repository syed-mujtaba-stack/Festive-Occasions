import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { PageHero } from "@/components/ui/page-hero";
import { WhyUs } from "@/components/sections/why-us";
import { ProcessSection } from "@/components/sections/process";
import { FinalCTA } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About | Festive Occasions Dubai Christmas Decoration Studio",
  description:
    "Festive Occasions is a premium Christmas decoration studio in Dubai — designing, styling and installing festive schemes for homes, villas, offices and commercial spaces.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Festive Occasions",
    description:
      "A premium Christmas decoration studio in Dubai — bespoke schemes designed around every space.",
    url: "/about",
    type: "website",
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio for the season's finest details."
        lead="Festive Occasions is a premium Christmas decoration studio in Dubai — designing, styling and installing festive schemes around the way you live and work."
        image="outdoorHouseLights"
      />

      {/* Story */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <ScrollReveal>
              <h2 className="font-display text-[2.4rem] leading-tight text-espresso">
                Christmas, composed
                <em className="block text-champagne not-italic">around your space.</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-[1.02rem] leading-relaxed text-cocoa">
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
                <p>
                  Every project is documented honestly — the spaces we decorate,
                  and how we decorate them.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section id="values" tone="cream">
        <Container>
          <ScrollReveal>
            <h2 className="text-h2 text-espresso">What guides the work</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} y={24} delay={i * 0.05}>
                <article className="h-full border hairline bg-white/60 p-8 transition-all duration-500 hover:border-champagne/50 hover:shadow-soft">
                  <span className="text-label text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[1.5rem] text-espresso">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">
                    {v.copy}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <WhyUs />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}