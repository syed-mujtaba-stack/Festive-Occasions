"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/animations/registry";
import { cn } from "@/lib/utils";

/**
 * ScrollReveal — fades content up into view once as the user scrolls.
 * Leverages [data-reveal] initial states from globals.css; GSAP animates
 * to the natural position. Reduced-motion users see content instantly.
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

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", ref.current!)
        : el;

      gsap.fromTo(
        targets,
        { y },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.1 : undefined,
          scrollTrigger: {
            trigger: ref.current!,
            start: "top 86%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref as never}
      data-reveal="up"
      className={cn(className)}
      style={{ opacity: 1 }}
    >
      {children}
    </Tag>
  );
}