"use client";

import { useState } from "react";
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

const INITIAL_COUNT = 32;

/**
 * GalleryGrid — responsive luxury photo grid.
 * Displays all photos with uniform aspect ratio, filling every row cleanly
 * without multi-column vertical collapse or empty slot gaps.
 * Clicking any image opens the full-screen lightbox.
 */
export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll
    ? galleryProjects
    : galleryProjects.slice(0, INITIAL_COUNT);

  const remaining = galleryProjects.length - INITIAL_COUNT;

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      {/* Uniform responsive grid: no empty holes or column imbalance.
          4 columns from lg up (client request — was 5 at lg and 6 at xl).
          Dropping to 4 makes each tile roughly 50% larger at 1440px, so the
          portfolio reads as a considered set of large photographs rather than
          a dense contact sheet. 2 on phones, 3 from sm. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((project, i) => (
          <div key={project.id} className="w-full">
            <GalleryCard
              project={project}
              index={i}
              onSelect={setLightbox}
              /* Tracks the grid above (2 / 3 / 4 columns). The steps are set so
               * 2x is covered at each size: a tile is ~170px on a phone, ~240px
               * on a tablet, ~333px at 1440px and ~453px at 1920px. */
              sizes="(max-width: 640px) 170px, (max-width: 1024px) 240px, (max-width: 1600px) 340px, 460px"
            />
          </div>
        ))}
      </div>

      {/* Load More button */}
      {!showAll && remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="group relative overflow-hidden rounded-full border border-champagne/40 bg-transparent px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-champagne transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-night"
          >
            <span className="relative z-10">
              Load More — {remaining} more photos
            </span>
          </button>
        </div>
      )}

      {/* Full-screen lightbox */}
      {lightbox !== null && (
        <GalleryLightbox
          items={visible}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}
