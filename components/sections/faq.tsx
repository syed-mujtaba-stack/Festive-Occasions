"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/**
 * FAQ — answers must be based on actual services (spec 30).
 * Placeholder answers are intentionally conservative; client verifies.
 */
const faqs = [
  {
    q: "What Christmas decoration services do you offer in Dubai?",
    a: "We design and install bespoke Christmas decoration for homes, villas, offices and commercial spaces — including tree styling, interior schemes, outdoor lighting and full property transformations.",
  },
  {
    q: "Do you decorate villas for Christmas?",
    a: "Yes. Villa decoration is one of our core services — entrance, living areas, dining, staircase, garden and outdoor lighting composed into one cohesive scheme.",
  },
  {
    q: "Do you decorate offices and commercial spaces?",
    a: "Yes. We decorate office lobbies, receptions, meeting areas and employee spaces, and we deliver branded installations for corporate venues and events.",
  },
  {
    q: "Can you create a custom Christmas theme?",
    a: "Yes. Every project begins with your space and style. We design custom palettes and themes rather than applying a fixed template.",
  },
  {
    q: "Do you provide installation and removal?",
    a: "Yes. Our team handles the full cycle — installation on schedule and careful removal after the festive period.",
  },
  {
    q: "How early should I book Christmas decoration?",
    a: "We recommend booking as early as possible, while capacity is available. Contact us to check availability for your dates.",
  },
  {
    q: "Which areas in Dubai do you serve?",
    a: "We serve Dubai and surrounding UAE areas. Get in touch with your location and we will confirm whether we cover it.",
  },
];

export function FAQ({ questions = faqs }: { questions?: typeof faqs }) {
  return (
    <Section id="faq" tone="cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Questions"
                title={
                  <>
                    Everything you might <em className="text-champagne not-italic">ask.</em>
                  </>
                }
              />
            </div>
          </ScrollReveal>

          <div className="flex flex-col">
            {questions
              .filter((f) => f.a.length > 0)
              .map((f, i) => (
                <ScrollReveal key={f.q} as="div" y={20} delay={i * 0.03}>
                  <details className="group border-b hairline py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-xl text-espresso transition-colors group-open:text-espresso">
                        {f.q}
                      </h3>
                      <span
                        aria-hidden
                        className="mt-1 shrink-0 text-champagne transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-cocoa">
                      {f.a}
                    </p>
                  </details>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}