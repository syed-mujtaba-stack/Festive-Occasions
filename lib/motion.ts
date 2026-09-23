"use client";

import { useEffect } from "react";

/**
 * Lightweight, dependency-free motion helpers.
 * Deliberately isolated from `@/animations/registry` so that components
 * which only need a matchMedia check (smooth scroll, preloader gate,
 * reveal observer) never pull GSAP / ScrollTrigger / SplitText into the
 * initial bundle.
 */

/** Respect reduced motion globally (no GSAP dependency). */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Marks <html> as js-enabled so [data-reveal] initial hidden states
 * apply only when JS is active (progressive enhancement + no flash).
 */
export function JsDriver() {
  useEffect(() => {
    document.documentElement.classList.add("js-enabled");
  }, []);

  return null;
}

/**
 * Run `fn` once — the first time `el` approaches the viewport (the root
 * is expanded by `marginPx` on both vertical edges, so gated sections get
 * their triggers built in advance of actually being seen). Falls back to
 * running `fn` immediately when IntersectionObserver is unavailable or the
 * element is already inside the margin. Returns a cancel function.
 *
 * Below-the-fold scroll work (ScrollTrigger measurement, pin setup,
 * timeline construction) is expensive during the initial load window and
 * is pure waste for anyone who never scrolls there — gate it on approach.
 */
export function whenNearViewport(
  el: Element,
  fn: () => void,
  marginPx = 500
): () => void {
  if (
    typeof window === "undefined" ||
    typeof IntersectionObserver === "undefined"
  ) {
    return () => {};
  }

  // Already inside the expanded viewport? Don't wait for an observer tick.
  const rect = el.getBoundingClientRect();
  if (rect.top <= window.innerHeight + marginPx && rect.bottom >= -marginPx) {
    fn();
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    {
      // Positive margin = fire before the element enters the viewport;
      // a small negative margin = fire only once the user starts scrolling
      // (used for sections sitting exactly one viewport below the fold).
      rootMargin: `${marginPx}px 0px ${marginPx}px 0px`,
      threshold: 0,
    }
  );
  io.observe(el);
  return () => io.disconnect();
}