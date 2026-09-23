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