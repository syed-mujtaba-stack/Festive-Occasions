"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * GSAP animation core.
 *
 * NOTE: SplitText deliberately does NOT register here — it is the single
 * heaviest GSAP plugin and is only used by the homepage hero. It gets a
 * direct `gsap/SplitText` import + local registration so every other page
 * (blog, about, contact, gallery, packages, terms, …) ships zero SplitText.
 *
 * `prefersReducedMotion` and `JsDriver` now live in `@/lib/motion` (a
 * dependency-free module) so scroll-reveal / smooth-scroll / preloader
 * don't drag GSAP into the entry bundle.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };