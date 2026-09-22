"use client";

import { useRef } from "react";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/registry";

/**
 * Process — vertical editorial timeline.
 * Steps are placeholders to be confirmed by the client.
 */
const steps = [
  {
    n: "01",
    title: "Consultation",
    copy: "We visit or review your space, understand your vision and the areas you want to transform.",
  },
  {
    n: "02",
    title: "Space & Style",
    copy: "We study your architecture, light and existing décor, then define a palette and theme that belongs there.",
  },
  {
    n: "03",
    title: "Design Proposal",
    copy: "A considered scheme with your tree, styling, lighting and decorative details — clearly scoped.",
  },
  {
    n: "04",
    title: "Installation",
    copy: "Our team installs on schedule, working carefully around your home, office or venue.",
  },
  {
    n: "05",
    title: "Christmas Ready",
    copy: "You arrive to a finished, polished transformation — and same-standard removal after the season.",
  },
];

export function ProcessSection() {
  const scope = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = scope.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      // Fill the timeline line + activate each step dot as it enters view.
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      if (!steps.length) return;

      const fill = q("[data-step-fill]")[0];

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 1,
          },
          defaults: { ease: "none" },
        })
        .fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: 1 });

      steps.forEach((step, i) => {
        const dot = step.querySelector("[data-step-dot]");
        gsap.to(dot, {
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          backgroundColor: "var(--color-champagne)",
          duration: 0.4,
        });
      });
    },
    { scope }
  );

  return (
    <Section id="process" tone="cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="How It Works"
                title={
                  <>
                    From first hello to <em className="text-champagne not-italic">Christmas ready.</em>
                  </>
                }
                description="A clear process that keeps your home or business running while we transform it."
              />
            </div>
          </ScrollReveal>

          <ol ref={scope} className="relative">
            <div
              aria-hidden
              className="absolute bottom-6 left-[1.1rem] top-2 w-px bg-champagne/30"
            >
              <div
                data-step-fill
                className="h-full w-full origin-top scale-y-0 bg-champagne"
              />
            </div>
            {steps.map((s, i) => (
              <ScrollReveal key={s.n} as="li" y={30} delay={i * 0.05}>
                <div data-step className="group relative flex gap-7 pb-14">
                  <span className="relative z-10 flex h-8 w-4 shrink-0 items-center justify-center">
                    <span
                      data-step-dot
                      className="h-2.5 w-2.5 rounded-full border-2 border-champagne bg-cream transition-colors duration-300 group-hover:bg-champagne"
                    />
                  </span>
                  <div>
                    <p className="text-label text-champagne">{s.n}</p>
                    <h3 className="mt-2 font-display text-[1.6rem] text-espresso">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-cocoa">
                      {s.copy}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}