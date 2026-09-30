import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TestimonialsLive } from "@/components/sections/testimonials-live";
import { publishedReviews } from "@/lib/reviews";

/**
 * Testimonials — premium client experiences section.
 * Redesigned with luxury Christmas decoration aesthetic.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="light" className="relative overflow-hidden">
      {/* Subtle ambient glow behind the section */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] h-[80vw] max-h-[1000px] rounded-full bg-champagne/5 blur-3xl" 
        aria-hidden="true"
      />
      
      {/* Subtle festive pattern overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cpath d=%27M60 10c5 0 10 2 12 5 2 3 3 7 3 12s-2 10-5 12c-3 2-7 3-12 3-5 0-10-2-12-5-2-3-3-7-3-12s2-10 5-12c3-2 7-3 12-3z%27 fill=%27none%27 stroke=%27%23c6a15b%27 stroke-width=%270.5%27/%3E%3C/svg%3E')]" 
        aria-hidden="true"
      />

      <Container>
        {/* Section Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal y={30}>
            <span className="inline-flex items-center gap-2 text-label text-champagne-deep font-medium tracking-widest uppercase">
              <span className="w-10 h-px bg-champagne" aria-hidden="true"></span>
              CLIENT EXPERIENCES
            </span>
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.08}>
            <SectionHeading
              eyebrow=""
              title="Loved by Clients Across Dubai"
              align="center"
              className="mt-4"
            />
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-cocoa max-w-2xl mx-auto">
              From private villas to luxury hospitality spaces, our Christmas installations 
              are designed to make every celebration unforgettable.
            </p>
          </ScrollReveal>

          {/* Trust Indicator */}
          <ScrollReveal y={20} delay={0.24} className="mt-10">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-background/80 backdrop-blur-sm border border-espresso/10 shadow-soft">
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                <span className="text-champagne" aria-hidden="true">★</span>
                <span className="text-champagne" aria-hidden="true">★</span>
                <span className="text-champagne" aria-hidden="true">★</span>
                <span className="text-champagne" aria-hidden="true">★</span>
                <span className="text-champagne" aria-hidden="true">★</span>
              </div>
              <span className="text-espresso font-medium">5.0 Average Rating</span>
              <span className="w-px h-6 bg-espresso/10" aria-hidden="true"></span>
              <span className="text-warm-gray-deep text-sm">Trusted by our Christmas decoration clients</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative z-10 mt-16">
          <TestimonialsLive initial={publishedReviews} />
        </div>
      </Container>
    </Section>
  );
}