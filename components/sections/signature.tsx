"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/registry";
import { prefersReducedMotion, whenNearViewport } from "@/lib/motion";
import { FestiveImage } from "@/components/ui/festive-image";

/**
 * Signature transformation — pinned scroll experience.
 * "AN EMPTY SPACE → (scroll) → TO CHRISTMAS MAGIC"
 * The image starts cropped (clip-path) and minimal; decor elements appear;
 * the frame expands to full as the user scrolls through the pinned section.
 */
export function Signature() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        // Reduced motion: show final state, no pin.
        return;
      }
      const el = scope.current;
      if (!el) return;

      let stopProximity: (() => void) | null = null;

      // Pinned section below the fold — build the pin + timeline only as
      // the stage approaches (positive margin), never during initial load.
      const ctx = gsap.context(() => {
        stopProximity = whenNearViewport(
          el,
          () => {
            ctx.add(() => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  start: "top top",
                  end: "+=160%",
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                },
                defaults: { ease: "none" },
              });

              tl.fromTo(
                "[data-sig-frame]",
                { clipPath: "inset(18% 24% 22% 24% round 24px)" },
                { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.2 }
              )
                .fromTo(
                  "[data-sig-title-item]",
                  { opacity: 0, y: 60 },
                  { opacity: 1, y: 0, duration: 0.28, stagger: 0.12 },
                  0
                )
                .fromTo(
                  "[data-sig-copy]",
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.2 },
                  0.9
                )
                .fromTo(
                  "[data-sig-decor]",
                  { opacity: 0, scale: 0.85 },
                  { opacity: 1, scale: 1, duration: 0.25, stagger: 0.08 },
                  1.15
                );
            });
          },
          700
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
      className="relative overflow-hidden bg-night text-ivory"
      aria-label="From empty space to Christmas magic"
    >
      {/* Stage */}
      <div className="relative flex min-h-[100svh] items-center justify-center">
        {/* Expanding frame */}
        <div
          data-sig-frame
          className="absolute inset-0 will-change-[clip-path]"
          style={{ clipPath: "inset(18% 24% 22% 24% round 24px)" }}
        >
          <FestiveImage
            image="signatureDetails"
            priority
            sizes="100vw"
          />
        </div>

        {/* Veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />

        {/* Overlaid editorial copy */}
        <div className="container-site relative z-10 py-24 text-center">
          <p className="text-label mb-6 text-champagne" data-sig-decor>
            The Festive Occasions Transformation
          </p>

          <h2 className="text-h1">
            <span data-sig-title-item className="block">FROM EMPTY SPACE</span>
            <span data-sig-title-item className="mt-2 block text-champagne">
              TO CHRISTMAS MAGIC
            </span>
          </h2>

          <p data-sig-copy className="mx-auto mt-8 max-w-xl text-lead text-ivory/75">
            We begin with the space itself — its architecture, light and
            proportions — then dress it in a full, considered Christmas
            composition. One design team, from first sketch to final golden
            light.
          </p>

          <div data-sig-decor className="mt-10 flex justify-center gap-3">
            {["01", "02", "03", "04"].map((n) => (
              <span
                key={n}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/40 text-label text-champagne"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}