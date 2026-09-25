import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TestimonialsLive } from "@/components/sections/testimonials-live";
import { publishedReviews } from "@/lib/reviews";

/**
 * Testimonials — live reviews section (spec 29, real reviews only).
 * Visitors rate & review via the Rate-Us modal; TestimonialsLive owns the
 * published list so a new review appears in the grid the moment it posts —
 * no page reload. The server-side seed renders first, live submissions
 * hydrate on the client.
 */
export function Testimonials() {
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
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-cocoa">
            Every review below is from a real completed project. Share yours —
            it goes live here the moment you submit.
          </p>
        </ScrollReveal>

        <TestimonialsLive initial={publishedReviews} />
      </Container>
    </Section>
  );
}