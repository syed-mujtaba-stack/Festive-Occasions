"use client";

import { useRef } from "react";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/registry";

/**
 * Process — editorial vertical timeline with a scroll-driven step counter.
 *
 * Desktop: the left column is sticky — a large champagne step number
 * (01 → 05) crossfades as you scroll through the steps, while the right
 * timeline draws a gold line and ignites each step dot.
 * Mobile + reduced-motion: rows carry their own inline numbers; no
 * counter stage, no scrub.
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

      const rows = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      const nums = gsap.utils.toArray<HTMLElement>("[data-step-num]", el);
      if (!rows.length) return;

      const fill = q("[data-step-fill]")[0] as HTMLElement;
      const N = rows.length;
      const win = 1 / N;

      // First counter number starts visible.
      if (nums.length) gsap.set(nums[0], { autoAlpha: 1, scale: 1 });
      if (fill) gsap.set(fill, { scaleY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          end: "bottom 55%",
          scrub: 1,
        },
        defaults: { ease: "none" },
      });

      // Gold line draws down the timeline.
      tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);

      // Counter crossfade: 01 → 02 → … → 05
      nums.forEach((num, i) => {
        if (i === 0) return;
        tl.fromTo(
          num,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: win * 0.5, ease: "power2.out" },
          i * win
        ).to(
          num,
          { autoAlpha: 0, y: -24, duration: win * 0.5, ease: "power2.in" },
          (i + 1) * win - win * 0.5
        );
      });

      // Step dots ignite as their row enters.
      rows.forEach((row, i) => {
        const dot = row.querySelector("[data-step-dot]");
        const inPos = i * win;
        const outPos = (i + 1) * win;
        tl.fromTo(
          dot,
          { autoAlpha: 0.35, scale: 1 },
          { autoAlpha: 1, scale: 1.35, duration: win * 0.4, ease: "power2.out" },
          inPos
        ).to(dot, { scale: 1, duration: win * 0.3 }, outPos - win * 0.3);
      });
    },
    { scope }
  );

  return (
    <Section id="process" tone="cream" className="overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          {/* Sticky left: heading + scroll-driven step counter */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="How It Works"
                title={
                  <>
                    From first hello to <em className="text-champagne not-italic">Christmas ready.</em>
                  </>
                }
                description="A clear five-step process that keeps your home or business running while we transform it."
              />

              <div className="process-num-stage relative mt-12 h-32">
                {steps.map((s) => (
                  <div
                    key={s.n}
                    data-step-num
                    className="absolute inset-0 flex flex-col justify-end"
                  >
                    <span className="font-display text-[clamp(5rem,8vw,7.5rem)] italic leading-none text-champagne">
                      {s.n}
                    </span>
                    <span className="mt-3 text-label text-warm-gray">
                      Step {s.n} of 05
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 hidden text-[0.9rem] tracking-wide text-cocoa/60 lg:block">
                Design &middot; Styling &middot; Installation &middot; Removal
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <ol ref={scope} className="relative">
            <div
              aria-hidden
              className="absolute bottom-0 left-[1.08rem] top-0 w-px bg-champagne/25"
            >
              <div
                data-step-fill
                className="h-full w-full origin-top scale-y-0 bg-champagne"
              />
            </div>

            {steps.map((s, i) => (
              <ScrollReveal key={s.n} as="li" y={30} delay={i * 0.05}>
                <div data-step className="group relative flex gap-8 pb-16 pl-12 lg:pb-20">
                  {/* Dot on the rail */}
                  <span
                    aria-hidden
                    className="absolute left-[1.08rem] top-1 flex h-[3px] w-[3px] -translate-x-1/2 items-center justify-center"
                  >
                    <span
                      data-step-dot
                      className="h-2.5 w-2.5 rounded-full border-2 border-champagne bg-cream transition-colors duration-300 group-hover:bg-champagne"
                    />
                  </span>

                  <div>
                    <p className="process-row-num text-label text-champagne">
                      Step {s.n}
                    </p>
                    <h3 className="mt-2 font-display text-[1.75rem] leading-tight text-espresso lg:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-lead text-cocoa">
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