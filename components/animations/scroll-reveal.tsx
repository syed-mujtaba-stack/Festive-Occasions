"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ScrollReveal — fades content up into view once as the user scrolls.
 *
 * Zero-animation-library by design: an IntersectionObserver toggles an
 * `.is-revealed` class and globals.css transitions the [data-reveal] state
 * with pure CSS. The previous implementation created a GSAP ScrollTrigger
 * per element — on pages with dozens of reveals that forced a layout read
 * (getBoundingClientRect) for every trigger during load and kept GSAP +
 * ScrollTrigger + useGSAP in every page's bundle. This removes all of that
 * from the initial hydration path.
 *
 * Behaviour parity:
 *  - no JS         → content fully visible (`.js-enabled` never applied)
 *  - reduced motion → CSS media query forces `opacity: 1; transform: none`
 *  - JS + motion   → element slides/fades in when it enters the viewport
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  as: Tag = "div",
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "figure" | "li" | "article";
  stagger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = stagger
      ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-item]"))
      : [el];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          const index = targets.indexOf(target);
          target.style.transitionDelay = `${
            delay + (stagger ? index * 0.1 : 0)
          }s`;
          target.classList.add("is-revealed");
          io.unobserve(target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [delay, stagger]);

  return (
    <Tag
      ref={ref as never}
      data-reveal="up"
      style={{ "--reveal-y": `${y}px` } as CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}