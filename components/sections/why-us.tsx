"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/**
 * Why Festive Occasions — editorial numbered list (brief §30: NOT a card grid).
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-20">
          <div>
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
            <ScrollReveal delay={0.12}>
              <p className="mt-8 hidden max-w-sm text-[0.95rem] leading-relaxed text-cocoa lg:block">
                No cardboard baubles, no rushed installs. Every project passes
                through the same hands — ours — from the first sketch to the
                final walkthrough.
              </p>
            </ScrollReveal>
          </div>

          <ol className="flex flex-col">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} as="li" y={20} delay={i * 0.04}>
                <div className="group flex items-baseline gap-6 border-t hairline py-6 transition-colors duration-500 first:border-t-0 lg:gap-10 lg:py-7">
                  <span className="text-label text-champagne/70 transition-colors duration-500 group-hover:text-champagne">
                    0{i + 1}
                  </span>
                  <h3 className="w-[38%] shrink-0 font-display text-xl text-espresso transition-colors duration-500 group-hover:text-cocoa lg:text-2xl">
                    {p.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-cocoa">
                    {p.copy}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}