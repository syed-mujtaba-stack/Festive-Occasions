"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth scrolling — disabled for reduced-motion users.
 * Keeps scroll-driven GSAP scrub/pin sections feeling cinematic.
 *
 * Lenis itself is loaded via a runtime `import()` so the package is
 * code-split into its own lazy chunk and never blocks initial hydration.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let disposed = false;

    import("lenis")
      .then(({ default: LenisCtor }) => {
        if (disposed) return;

        lenis = new LenisCtor({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      })
      // Lenis is tiny and trusted, but if the chunk ever fails we simply
      // fall back to native scrolling — never block the page.
      .catch(() => {});

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}