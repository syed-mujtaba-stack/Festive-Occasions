"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { prefersReducedMotion, whenNearViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Process — editorial vertical timeline with a scroll-driven step counter.
 *
 * Desktop: the left sticky column hosts a large champagne step number
 * (01 → 05). Only ONE number is ever mounted as visible (React state +
 * ScrollTrigger onUpdate), so numbers can never collide. The right
 * timeline draws a gold line and ignites each step dot with the same
 * timeline.
 * Mobile + reduced-motion: rows carry their own inline numbers.
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
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = scope.current;
    if (!el) return;

    // GSAP/ScrollTrigger load lazily so /about (and any other inner page)
    // never pulls the animation core into its initial bundle. The
    // scroll-driven counter is progressive enhancement only — the static
    // markup is fully styled without it. The whole setup is additionally
    // gated until the section approaches the viewport.
    let cancelled = false;
    let kill: (() => void) | null = null;

    const start = () => {
      (async () => {
        try {
          const { gsap, ScrollTrigger } = await import("@/animations/registry");
          if (cancelled) return;

          const q = gsap.utils.selector(el);

        const timeline = q("[data-process-timeline]")[0] as HTMLElement;
        const rows = gsap.utils.toArray<HTMLElement>("[data-step]", el);
        if (!timeline || rows.length === 0) return;

        const fill = q("[data-step-fill]")[0] as HTMLElement | undefined;
        const N = rows.length;
        const win = 1 / N;

        if (!fill) return;

        gsap.set(fill, { scaleY: 0 });

        // Gold line draws down the timeline + dots ignite per row.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timeline,
            start: "top 72%",
            end: "bottom 55%",
            scrub: 1,
          },
          defaults: { ease: "none" },
        });

        tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);

        rows.forEach((row, i) => {
          const dot = row.querySelector("[data-step-dot]");
          if (!dot) return;
          const inPos = i * win;
          const outPos = (i + 1) * win;
          tl.fromTo(
            dot,
            { autoAlpha: 0.35, scale: 1 },
            { autoAlpha: 1, scale: 1.35, duration: win * 0.4, ease: "power2.out" },
            inPos
          ).to(dot, { scale: 1, duration: win * 0.3 }, outPos - win * 0.3);
        });

        // Drive the step counter from scroll progress — the single source
        // of truth for which number is visible.
        const st = ScrollTrigger.create({
          trigger: timeline,
          start: "top 72%",
          end: "bottom 55%",
          onUpdate: (self) => {
            const idx = Math.min(
              N - 1,
              Math.max(0, Math.floor(self.progress * N))
            );
            setActive(idx);
          },
        });

        kill = () => {
          st.kill();
          tl.kill();
        };
      } catch {
        // Static markup is fully styled — the animation simply never runs.
      }
      })();
    };

    const stopProximity = whenNearViewport(el, start, 400);

    return () => {
      cancelled = true;
      stopProximity();
      kill?.();
    };
  }, []);

  return (
    <Section id="process" tone="cream">
      <Container>
        <div
          ref={scope}
          className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24"
        >
          {/* Sticky left: heading + scroll-driven step counter */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="How It Works"
                title={
                  <>
                    From first hello to <em className="text-champagne-deep not-italic">Christmas ready.</em>
                  </>
                }
                description="A clear five-step process that keeps your home or business running while we transform it."
              />

              <div className="process-num-stage relative mt-12 h-40 overflow-hidden">
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 flex flex-col justify-end transition-all duration-500 ease-out",
                      active === i
                        ? "translate-y-0 opacity-100 delay-100"
                        : "translate-y-6 opacity-0"
                    )}
                  >
                    <span className="font-display text-[clamp(5rem,8vw,7.5rem)] italic leading-none text-champagne-deep">
                      {s.n}
                    </span>
                    <span className="mt-3 text-label text-warm-gray-deep">
                      Step {s.n} of 05
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 hidden text-[0.9rem] tracking-wide text-cocoa lg:block">
                Design &middot; Styling &middot; Installation &middot; Removal
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <ol data-process-timeline className="relative">
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
                    <p className="process-row-num text-label text-champagne-deep">
                      Step {s.n}
                    </p>
                    <h3
                      className={cn(
                        "mt-2 font-display text-[1.75rem] leading-tight transition-colors duration-500 lg:text-3xl",
                        active === i
                          ? "text-espresso lg:text-cocoa"
                          : "text-espresso lg:text-espresso/45"
                      )}
                    >
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