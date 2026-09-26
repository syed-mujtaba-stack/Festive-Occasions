"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/registry";
import { prefersReducedMotion, whenNearViewport } from "@/lib/motion";

/**
 * The Statement — oversized editorial brand moment (brief §02).
 * "WE DON'T DECORATE SPACES. WE TRANSFORM THEM."
 * Lines are masked and rise with the scroll; champagne rule + meta fade in.
 * Reduced-motion users see the final state immediately.
 */
export function Statement() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = scope.current;
      if (!el) return;

      let stopProximity: (() => void) | null = null;

      // The statement sits exactly one viewport below the hero and is
      // purely scroll-scrubbed — its trigger/timeline is created once the
      // user actually starts scrolling (negative margin = fire on the
      // first scroll tick), so initial-load main-thread time stays free.
      const ctx = gsap.context((self) => {
        stopProximity = whenNearViewport(
          el,
          () => {
            self.add(() => {
              const q = gsap.utils.selector(el);

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  end: "center 58%",
                  scrub: 1,
                },
                defaults: { ease: "power3.out" },
              });

              tl.fromTo(
                q("[data-st-line]"),
                { yPercent: 115 },
                { yPercent: 0, duration: 1, stagger: 0.14 },
                0
              )
                .fromTo(
                  q("[data-st-rule]"),
                  { scaleX: 0 },
                  { scaleX: 1, duration: 0.9 },
                  0.55
                )
                .fromTo(
                  q("[data-st-meta]"),
                  { autoAlpha: 0, y: 24 },
                  { autoAlpha: 1, y: 0, duration: 0.8 },
                  0.6
                );
            });
          },
          -2
        );
      }, scope);

      return () => {
        stopProximity?.();
        ctx.revert();
      };
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-label="The Festive Occasions philosophy"
      className="relative overflow-hidden bg-night text-ivory"
    >
      {/* Subtle champagne glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_8%,rgba(182,150,74,0.10),transparent_70%)]"
      />

      <div className="container-site relative py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[1.9fr_1fr] lg:gap-20">
          {/* Statement type */}
          <div>
            <p className="eyebrow text-champagne">The Studio Philosophy</p>
            {/* The three copy lines are manually broken and each sits in an
                `overflow-hidden` mask, so the type must resolve to one visual
                line per span at every breakpoint. The longest line
                ("SPACES. WE TRANSFORM") measures 10.485em in Cormorant
                Garamond 400 at tracking -0.02em, and the statement column
                caps at ~734px once the 1280px container is reached — hence
                4rem is the ceiling, not a token like .text-display. */}
            <h2 className="mt-10 font-display text-[clamp(1.65rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-st-line className="block will-change-transform">
                  WE DON&rsquo;T DECORATE
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-st-line className="block will-change-transform">
                  SPACES. WE{" "}
                  <em className="italic text-champagne">TRANSFORM</em>
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-st-line className="block will-change-transform">
                  THEM.
                </span>
              </span>
            </h2>
          </div>

          {/* Meta column */}
          <div className="flex flex-col justify-end gap-8 lg:pb-3">
            <span
              data-st-rule
              aria-hidden
              className="block h-px w-24 origin-left bg-champagne"
            />
            <div data-st-meta className="max-w-md">
              <p className="text-lead text-ivory/75">
                Every scheme begins with the space itself — its architecture,
                light and character — then becomes a considered Christmas
                composition. Not off-the-shelf décor, but a transformation
                designed to feel like it was always meant to be there.
              </p>
              <p className="mt-6 text-label text-champagne">
                Design &middot; Styling &middot; Installation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}