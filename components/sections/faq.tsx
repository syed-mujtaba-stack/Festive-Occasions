"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { faqEntries, type FaqEntry } from "@/lib/faqs";

/**
 * FAQ — answers must be based on actual services (spec 30).
 * Placeholder answers are intentionally conservative; client verifies.
 * Q/A pairs shared from lib/faqs.ts so the visible accordion always
 * matches the FAQPage schema rendered on the homepage.
 */
const faqs: FaqEntry[] = faqEntries;

export function FAQ({ questions = faqs }: { questions?: FaqEntry[] }) {
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
                    Everything you might <em className="text-champagne-deep not-italic">ask.</em>
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