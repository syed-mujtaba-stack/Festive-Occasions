"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

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

/** Respect reduced motion globally for ScrollTrigger-driven effects. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}