"use client";

import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

const ratioClass = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  tall: "aspect-[3/4]",
} as const;

/**
 * GalleryCard — editorial project card.
 * The image sits at the top (cinematic zoom on hover), with the project
 * metadata on a soft card body below: category, title, year and a view
 * arrow. When `onSelect` is provided the card opens the project in a
 * lightbox; otherwise it renders as a static card (service pages).
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
      {/* Image stage */}
      <div className={`${ratioClass[project.ratio]} relative overflow-hidden`}>
        <div className="absolute inset-0 scale-[1.03] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]">
          <FestiveImage
            image={project.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Grounding veil */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        />

        {/* Project number — top left */}
        {index !== undefined && (
          <span
            aria-hidden
            className="absolute left-4 top-3.5 font-display text-base italic leading-none text-ivory/70 transition-colors duration-500 group-hover:text-champagne"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          aria-hidden
          className="absolute right-4 top-4 h-[3px] w-[3px] -translate-y-1/2 rotate-45 bg-champagne"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-1.5 p-6">
        <p className="text-label text-champagne transition-colors duration-500 group-hover:text-champagne-soft">
          {project.category}
        </p>
        <h3 className="font-display text-[1.35rem] leading-snug text-espresso transition-colors duration-500 group-hover:text-cocoa">
          {project.title}
        </h3>
        <div className="mt-auto flex items-end justify-between gap-4 pt-3">
          <p className="text-sm text-cocoa/60">{project.year}</p>
          {onSelect && (
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-champagne transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-espresso"
            >
              ↗
            </span>
          )}
        </div>
      </div>
    </>
  );

  const cardClasses =
    "group flex h-full w-full flex-col overflow-hidden rounded-2xl border hairline bg-white/60 text-left shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-champagne/60 hover:shadow-card";

  if (!onSelect) {
    return (
      <figure className={cardClasses} style={{ contain: "layout paint" }}>
        {inner}
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index ?? 0)}
      aria-label={`${project.title} — ${project.category}, open in lightbox`}
      className={`${cardClasses} outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ivory`}
      style={{ contain: "layout paint" }}
    >
      {inner}
    </button>
  );
}