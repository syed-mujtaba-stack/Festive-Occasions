"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";

/**
 * Lightbox is only ever needed after a click — load it lazily (client-only).
 */
const GalleryLightbox = dynamic(
  () =>
    import("@/components/gallery/gallery-lightbox").then(
      (m) => m.GalleryLightbox
    ),
  { ssr: false }
);

// Split projects into two rows
const half = Math.ceil(galleryProjects.length / 2);
const rowA = galleryProjects.slice(0, half);   // Row 1: left → right
const rowB = galleryProjects.slice(half);       // Row 2: right → left

/**
 * A single infinite-marquee row.
 * direction: "left" = scrolls right-to-left (standard), "right" = scrolls left-to-right.
 * Pauses on hover and on touch start; resumes on mouse leave / touch end.
 */
function MarqueeRow({
  projects,
  direction,
  speed = 35,
  onSelect,
  projectOffset = 0,
}: {
  projects: typeof galleryProjects;
  direction: "left" | "right";
  speed?: number;
  onSelect: (index: number) => void;
  projectOffset?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Quadruple the items so the seamless loop has plenty of runway
  const items = [...projects, ...projects, ...projects, ...projects];

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  const animName = direction === "left" ? "marquee-ltr" : "marquee-rtl";
  // Speed: lower number = faster. 35s for ~half of 41 items feels premium.
  const duration = `${speed}s`;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      {/* Left/right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-night to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((project, i) => {
          // Map back to the real project index for the lightbox
          const realIndex =
            (projectOffset + (i % projects.length)) % galleryProjects.length;
          return (
            <GalleryCard
              key={`${project.id}-${i}`}
              project={project}
              index={realIndex}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * GalleryGrid — two-row infinite horizontal marquee.
 * Row 1 scrolls left → right, Row 2 scrolls right → left.
 * Hover or touch pauses the row. Click opens the full-screen lightbox.
 */
export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-4">
      {/* Row 1 — Left to Right */}
      <MarqueeRow
        projects={rowA}
        direction="left"
        speed={40}
        onSelect={setLightbox}
        projectOffset={0}
      />

      {/* Row 2 — Right to Left */}
      <MarqueeRow
        projects={rowB}
        direction="right"
        speed={38}
        onSelect={setLightbox}
        projectOffset={half}
      />

      {/* Full-screen lightbox */}
      {lightbox !== null && (
        <GalleryLightbox
          items={galleryProjects}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}