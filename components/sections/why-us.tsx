"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/**
 * Why Festive Occasions — pillars.
 * Only claims we can stand behind; client will verify/expand with specifics.
 */
const pillars = [
  { title: "Bespoke Design", copy: "Every scheme is composed for the space — never a copied template." },
  { title: "Professional Installation", copy: "A trained team that installs and removes on schedule, to detail." },
  { title: "Premium Finish", copy: "Curated materials, precise styling and a polished final walkthrough." },
  { title: "Residential & Commercial", copy: "One studio for homes, villas, offices, hotels and venues." },
  { title: "UAE Service", copy: "Based in Dubai, serving the Emirates with reliable scheduling." },
  { title: "Full Cycle", copy: "Design, styling, installation and post-season removal everywhere." },
];

export function WhyUs() {
  return (
    <Section id="why-us">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Festive Occasions"
            title={
              <>
                Built on craft, delivered <em className="text-champagne not-italic">on time.</em>
              </>
            }
            description="We treat every space like a commission — measured, composed and finished to a high standard."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} y={24} delay={i * 0.05}>
              <article className="group h-full border hairline bg-white/60 p-8 transition-all duration-500 hover:border-champagne/50 hover:shadow-soft">
                <span className="text-label text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.5rem] text-espresso">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa">{p.copy}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}