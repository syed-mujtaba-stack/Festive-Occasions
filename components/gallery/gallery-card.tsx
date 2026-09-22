"use client";

import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

const ratioClass = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  tall: "aspect-[3/4]",
} as const;

/**
 * GalleryCard — editorial project tile.
 * Caption is always visible (bottom gradient), hover adds a cinematic zoom,
 * a deep veil and an arrow nudge. When `onSelect` is provided the tile is a
 * button that opens the project in a lightbox; otherwise it renders as a
 * static figure (used on service pages).
 */
export function GalleryCard({
  project,
  index,
  onSelect,
}: {
  project: GalleryProject;
  index?: number;
  onSelect?: (index: number) => void;
}) {
  const inner = (
    <>
      <div className={ratioClass[project.ratio]}>
        <div className="absolute inset-0 scale-[1.03] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.09]">
          <FestiveImage
            image={project.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Veil — always visible, deepens on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Project number — top left */}
      {index !== undefined && (
        <span
          aria-hidden
          className="absolute left-5 top-4 font-display text-lg italic leading-none text-ivory/60 transition-colors duration-500 group-hover:text-champagne"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <span
        aria-hidden
        className="absolute right-5 top-4 h-[3px] w-[3px] -translate-y-1/2 rotate-45 bg-champagne/90"
      />

      {/* Caption — always visible */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <p className="text-label text-champagne transition-colors duration-500 group-hover:text-champagne-soft">
            {project.category}
          </p>
          <p className="mt-2 font-display text-2xl leading-tight text-ivory transition-transform duration-500 group-hover:-translate-y-0.5">
            {project.title}
          </p>
          <p className="mt-1.5 text-sm text-ivory/60">{project.year}</p>
        </div>
        {onSelect && (
          <span
            aria-hidden
            className="mb-1 grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full border border-ivory/25 text-champagne opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            ↗
          </span>
        )}
      </div>
    </>
  );

  if (!onSelect) {
    return (
      <figure
        className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-card"
        style={{ contain: "layout paint" }}
      >
        {inner}
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index ?? 0)}
      aria-label={`${project.title} — ${project.category}, open in lightbox`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl text-left shadow-card outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
      style={{ contain: "layout paint" }}
    >
      {inner}
    </button>
  );
}