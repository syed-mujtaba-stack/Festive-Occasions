"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — desktop-only champagne dot + trailing ring (brief §8).
 * Disabled on touch devices, small screens, and for reduced-motion users.
 * Pure transform + lerp (no layout thrash); pointer-events: none so it
 * never blocks interaction. Interactive elements ("a", "button", details)
 * expand the ring on hover.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || !wide || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current + eased positions
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], summary, [data-cursor]"
      );
      hovering = Boolean(interactive);
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.7 : 1})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-champagne will-change-transform"
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-6 -mt-6 h-12 w-12 rounded-full border border-champagne/40 will-change-transform"
      />
    </div>
  );
}