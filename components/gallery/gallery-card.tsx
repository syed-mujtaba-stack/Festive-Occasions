"use client";

import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

/**
 * GalleryCard — pure image tile for the marquee strip.
 * No text overlays, no captions. Just the photograph.
 * Clicking opens the lightbox when `onSelect` is provided; otherwise it
 * renders as a static tile (used on service-page grids).
 */
export function GalleryCard({
  project,
  index,
  onSelect,
}: {
  project: GalleryProject;
  index: number;
  onSelect?: (index: number) => void;
}) {
  const tile = (
    <>
      {/* Image */}
      <div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-110">
        <FestiveImage
          image={project.image}
          sizes="(max-width: 640px) 260px, 300px"
        />
      </div>

      {/* Hover overlay: subtle champagne shimmer */}
      <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-night/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Hover: "View" label */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
        <span className="rounded-full border border-champagne/60 bg-night/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-champagne backdrop-blur-sm">
          View
        </span>
      </div>
    </>
  );

  if (!onSelect) {
    return (
      <figure
        aria-hidden
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
        style={{ contain: "layout paint" }}
      >
        {tile}
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`${project.title} — open in full view`}
      className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-night"
      style={{ contain: "layout paint" }}
    >
      {tile}
    </button>
  );
}