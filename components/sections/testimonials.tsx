"use client";

import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/**
 * Testimonials — REAL REVIEWS ONLY (spec 29).
 * No fabricated names, quotes or star ratings. This array is intentionally
 * empty until the client supplies verified reviews (Google Business Profile
 * or client-provided testimonials). The section is hidden until populated.
 */
const reviews: {
  quote: string;
  name: string;
  detail: string;
}[] = [
  // REPLACE with verified reviews from the client. Example structure:
  // { quote: "…", name: "Verified client", detail: "Villa Decoration, Dubai" },
];

export function Testimonials() {
  if (reviews.length === 0) return null;

  return (
    <Section id="testimonials" tone="cream">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Client Words"
            title={
              <>
                What our clients <em className="text-champagne-deep not-italic">say.</em>
              </>
            }
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <ScrollReveal key={r.name} y={26} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-lg border hairline bg-background p-8">
                <blockquote className="flex-1">
                  <p className="font-display text-xl italic leading-relaxed text-espresso">
                    “{r.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t hairline pt-5">
                  <p className="text-sm font-semibold text-espresso">{r.name}</p>
                  <p className="text-label mt-1 text-warm-gray-deep">{r.detail}</p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}