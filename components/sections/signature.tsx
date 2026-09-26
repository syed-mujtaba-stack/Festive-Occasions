"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/registry";
import { prefersReducedMotion, whenNearViewport } from "@/lib/motion";
import { FestiveImage } from "@/components/ui/festive-image";

/**
 * Signature transformation — "FROM EMPTY SPACE → TO CHRISTMAS MAGIC"
 * Pinned scroll experience tuned to exactly 2 smooth scrolls:
 * - When image is small (initial state): All text is completely hidden.
 * - Scroll 1: Image expands to half-size (50%), slowly revealing "FROM EMPTY SPACE".
 * - Scroll 2: Image expands to full screen (100%), revealing "TO CHRISTMAS MAGIC" & description.
 * - Scrolling backwards: Text fades out and hides as the image shrinks.
 */
export function Signature() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }
      const el = scope.current;
      if (!el) return;

      let stopProximity: (() => void) | null = null;

      const ctx = gsap.context((self) => {
        stopProximity = whenNearViewport(
          el,
          () => {
            self.add(() => {
              const isMobile = window.innerWidth < 768;

              const startClip = isMobile
                ? "inset(12% 6% 14% 6% round 18px)"
                : "inset(18% 24% 22% 24% round 24px)";
              const midClip = isMobile
                ? "inset(6% 3% 7% 3% round 10px)"
                : "inset(9% 12% 11% 12% round 14px)";
              const endClip = "inset(0% 0% 0% 0% round 0px)";

              // 2 scrolls total: ~85vh pinned distance
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: el,
                  start: "top top",
                  end: "+=85vh",
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                  snap: {
                    snapTo: [0, 0.5, 1],
                    duration: { min: 0.25, max: 0.5 },
                    delay: 0.05,
                    ease: "power1.inOut",
                  },
                },
                defaults: { ease: "none" },
              });

              // --- IMAGE EXPANSION ---
              // Stage 1 (0 -> 0.5): Adhi image open hoti hai
              tl.fromTo(
                "[data-sig-frame]",
                { clipPath: startClip },
                { clipPath: midClip, duration: 0.5, ease: "power1.inOut" },
                0
              )
              // Stage 2 (0.5 -> 1.0): Puri image khul jati hai
              .to(
                "[data-sig-frame]",
                { clipPath: endClip, duration: 0.5, ease: "power1.inOut" },
                0.5
              )

              // --- VEIL (deepens as the image opens, to seat the copy) ---
              .fromTo(
                "[data-sig-veil]",
                { opacity: 0.7 },
                { opacity: 1, duration: 1, ease: "power1.inOut" },
                0
              )

              // --- TEXT REVEAL: Image choti hone par text 100% hide rehta hai,
              //     jaise hi image bari hoti hai slow slow text ata hai ---
              // 1. Eyebrow starts appearing as image starts expanding (0.15 -> 0.45)
              .fromTo(
                "[data-sig-eyebrow]",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                0.15
              )
              // 2. "FROM EMPTY SPACE" slowly fades in during first scroll (0.2 -> 0.5)
              .fromTo(
                "[data-sig-title-1]",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                0.2
              )
              // 3. "TO CHRISTMAS MAGIC" blossoms during second scroll (0.5 -> 0.8)
              .fromTo(
                "[data-sig-title-2]",
                { opacity: 0, y: 30, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
                0.5
              )
              // 4. Description paragraph fades in smoothly (0.58 -> 0.88)
              .fromTo(
                "[data-sig-copy]",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                0.58
              )
              ;
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
      className="relative overflow-hidden bg-night text-ivory select-none"
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
            sizes="100vw"
          />
        </div>

        {/* Veil — a single flat wash, no gradient. The client photos are all
            high-key (measured centre-band luminance 0.79–1.0), so the copy
            needs a real even darkening to clear WCAG on large display type.
            Kept as one flat colour so the photo is never muddied by stops. */}
        <div
          data-sig-veil
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-night/60"
        />

        {/* Overlaid editorial copy (completely hidden at start) */}
        <div className="container-site relative z-10 py-24 text-center pointer-events-none">
          <p
            data-sig-eyebrow
            className="text-label mb-6 text-champagne-soft opacity-0 [text-shadow:0_1px_10px_rgba(23,19,18,0.95)]"
          >
            The Festive Occasions Transformation
          </p>

          <h2 className="text-h1 [text-shadow:0_2px_24px_rgba(23,19,18,0.85)]">
            <span
              data-sig-title-1
              className="block opacity-0"
            >
              FROM EMPTY SPACE
            </span>
            <span
              data-sig-title-2
              className="mt-2 block text-champagne-soft opacity-0"
            >
              TO CHRISTMAS MAGIC
            </span>
          </h2>

          <p
            data-sig-copy
            className="mx-auto mt-8 max-w-xl text-lead text-ivory/90 opacity-0 [text-shadow:0_1px_14px_rgba(23,19,18,0.9)]"
          >
            We begin with the space itself — its architecture, light and
            proportions — then dress it in a full, considered Christmas
            composition. One design team, from first sketch to final golden
            light.
          </p>


        </div>
      </div>
    </section>
  );
}