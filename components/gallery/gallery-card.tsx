"use client";

import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

/** Ratio-aware card image stage — portrait 3/4, landscape 4/3, tall 3/5. */
const CARD_RATIO: Record<GalleryProject["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  tall: "aspect-[3/5]",
};

/**
 * GalleryCard — numbered editorial project card.
 * Each card leads with a large index numeral over the image, then a minimal
 * caption (category + title) and an explicit "Explore Look ↗" CTA. The whole
 * card is a button that opens the project in the lightbox when `onSelect` is
 * provided; otherwise it renders as a static card (service pages).
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
      {/* Image stage — ratio follows the project data */}
      <div className={`${CARD_RATIO[project.ratio]} relative overflow-hidden`}>
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

        {/* Project number — large editorial numeral, top left */}
        {index !== undefined && (
          <span
            aria-hidden
            className="absolute left-4 top-3 font-display text-2xl italic leading-none text-ivory transition-colors duration-500 group-hover:text-champagne"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          aria-hidden
          className="absolute right-4 top-4 h-[3px] w-[3px] -translate-y-1/2 rotate-45 bg-champagne"
        />
      </div>

      {/* Minimal caption + CTA */}
      <div className="flex flex-1 flex-col gap-1.5 p-6">
        <h3 className="font-display text-[1.35rem] leading-snug text-espresso transition-colors duration-500 group-hover:text-cocoa">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-cocoa/60">
          {project.category} · {project.year}
        </p>
        {onSelect && (
          <span className="mt-auto inline-flex items-center gap-2.5 pt-4 text-label text-champagne transition-colors duration-500 group-hover:text-espresso">
            Explore Look
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              ↗
            </span>
          </span>
        )}
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
      aria-label={`${project.title} — ${project.category}, explore look in lightbox`}
      className={`${cardClasses} outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ivory`}
      style={{ contain: "layout paint" }}
    >
      {inner}
    </button>
  );
}