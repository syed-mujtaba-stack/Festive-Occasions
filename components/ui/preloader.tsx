"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/animations/registry";
import { finishPreloader } from "@/lib/preloader";

/**
 * Preloader — "The Seal Opens" (3-act cinematic intro on every full load).
 *
 *  Act 1 (0.0s)  FO monogram seal: champagne ring draws in, hairline inner
 *                ring follows, four-point sparkle pops, soft glow blooms.
 *  Act 2 (0.9s)  Eyebrow + "Festive Occasions" masked-line rise; italic serif
 *                counter 00→100 with a champagne progress hairline.
 *  Act 3 (2.2s)  Content release, then two ivory curtains slide up to reveal
 *                the page — the hero timeline starts on the same beat.
 *
 * Rendering / safety gates (brief rules):
 *  - SSR renders the overlay so the first painted frame IS the loader
 *    (no content flash).
 *  - Plays on every fresh page load (client-side navigation never remounts
 *    the root layout, so it only re-appears on reloads).
 *  - No-JS → <noscript> style in layout hides the overlay (never stuck).
 *  - Reduced motion → CSS media query hides instantly; effect also
 *    releases the hero promise.
 *  - Scroll is locked while visible, restored on completion.
 *  - The wordmark uses a non-heading element so SSR emits no duplicate H1.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reduced motion → never show the loader, release the hero instantly.
    if (prefersReducedMotion()) {
      finishPreloader();
      setGone(true);
      return;
    }

    const scopeEl = scope.current;
    const counterEl = counterRef.current;
    if (!scopeEl || !counterEl) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const q = gsap.utils.selector(scopeEl);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const count = { n: 0 };

    // ── Act 1 — the seal ─────────────────────────────────────────────
    tl.fromTo(
      q("[data-seal-ring]"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" },
      0
    )
      .fromTo(
        q("[data-seal-ring-inner]"),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" },
        0.18
      )
      .fromTo(
        q("[data-seal-letters]"),
        { autoAlpha: 0, scale: 0.86, y: 6 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.55 },
        0.3
      )
      .fromTo(
        q("[data-seal-sparkle]"),
        { autoAlpha: 0, scale: 0.4, rotate: -40 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" },
        0.42
      )
      .fromTo(
        q("[data-seal-glow]"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.0, ease: "power2.out" },
        0.25
      );

    // ── Act 2 — wordmark + counter ───────────────────────────────────
    tl.fromTo(
      q("[data-pl-eyebrow]"),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      0.75
    )
      .fromTo(
        q("[data-pl-line]"),
        { yPercent: 115 },
        { yPercent: 0, duration: 0.7, stagger: 0.12 },
        0.85
      )
      .to(
        count,
        {
          n: 100,
          duration: 1.0,
          ease: "power2.inOut",
          onUpdate: () => {
            counterEl.textContent = String(Math.round(count.n)).padStart(2, "0");
          },
        },
        1.15
      )
      .fromTo(
        q("[data-pl-progress]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: "power2.inOut" },
        1.15
      );

    // ── Act 3 — curtains lift, hero takes over ───────────────────────
    tl.to(
      q("[data-pl-content]"),
      { autoAlpha: 0, y: -18, duration: 0.42, ease: "power2.in" },
      2.15
    )
      .add(() => finishPreloader(), 2.12)
      .to(
        q("[data-curtain-top]"),
        { yPercent: -101, duration: 0.95, ease: "power4.inOut" },
        2.2
      )
      .to(
        q("[data-curtain-bottom]"),
        { yPercent: 101, duration: 0.95, ease: "power4.inOut" },
        2.2
      )
      .add(() => {
        document.body.style.overflow = prevOverflow;
        setGone(true);
      }, 3.2);

    return () => {
      document.body.style.overflow = prevOverflow;
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={scope}
      aria-hidden
      className="fo-preloader fixed inset-0 z-[120] overflow-hidden bg-ivory"
    >
      {/* Ivory curtains — the full-screen veil that lifts at Act 3 */}
      <div
        data-curtain-top
        className="absolute inset-x-0 top-0 h-1/2 bg-ivory"
      />
      <div
        data-curtain-bottom
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ivory"
      />
      {/* Champagne seam where the curtains meet */}
      <div aria-hidden className="absolute inset-x-0 top-1/2 z-20 h-px bg-champagne/40" />

      {/* Center content */}
      <div
        data-pl-content
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
      >
        {/* Ambient glow */}
        <div
          data-seal-glow
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,161,91,0.12)_0%,transparent_62%)]"
        />

        {/* Seal — FO monogram */}
        <div className="relative h-24 w-24">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <circle
              data-seal-ring
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeDasharray="1"
              pathLength="1"
              className="text-champagne"
            />
            <circle
              data-seal-ring-inner
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="1"
              pathLength="1"
              className="text-champagne/40"
            />
          </svg>

          {/* Sparkle — brand favicon motif */}
          <svg
            data-seal-sparkle
            viewBox="0 0 24 24"
            className="absolute -top-[5px] left-1/2 h-5 w-5 -translate-x-1/2 text-champagne"
            aria-hidden
          >
            <path
              d="M12 1.5c.85 5.2 3.3 7.9 10.5 10.5C15.3 14.6 12.85 17.3 12 22.5c-.85-5.2-3.3-7.9-10.5-10.5C8.7 9.4 11.15 6.7 12 1.5z"
              fill="currentColor"
            />
          </svg>

          <span
            data-seal-letters
            className={[
              "absolute inset-0 grid place-items-center",
              "font-display text-3xl italic tracking-[-0.02em] text-champagne",
            ].join(" ")}
          >
            FO
          </span>
        </div>

        {/* Wordmark — masked line rise (div, not h1: SSR already has a real H1) */}
        <div className="mt-9 flex flex-col items-center">
          <p
            data-pl-eyebrow
            className="text-label mb-4 text-cocoa"
          >
            Christmas Decoration · Dubai
          </p>
          <div className="block overflow-hidden leading-none">
            <span className="block overflow-hidden pb-1">
              <span
                data-pl-line
                className="block font-display text-[clamp(1.9rem,6vw,3.2rem)] italic tracking-[0.02em] text-espresso"
              >
                Festive Occasions
              </span>
            </span>
          </div>
        </div>

        {/* Counter + progress hairline */}
        <div className="mt-10 flex w-full max-w-[220px] items-center gap-5">
          <span
            data-pl-progress
            className="h-px flex-1 origin-left bg-champagne/70"
          />
          <span
            ref={counterRef}
            className="font-display text-xl italic leading-none text-champagne"
          >
            00
          </span>
        </div>
      </div>
    </div>
  );
}