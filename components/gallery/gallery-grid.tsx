"use client";

import { useMemo, useState } from "react";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";

const filters = [
  "All",
  "Villa Decoration",
  "Home Decoration",
  "Office Decoration",
  "Christmas Tree",
  "Lighting & Outdoor",
  "Corporate & Hospitality",
] as const;

type Filter = (typeof filters)[number];

/**
 * GalleryGrid — editorial filterable projects.
 * Hairline underline tabs with index numerals + live result count; tiles
 * re-reveal in a stagger when the filter changes; clicking a tile opens a
 * full-screen lightbox (keyboard navigable). Data remains placeholder-tagged.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () =>
      active === "All"
        ? galleryProjects
        : galleryProjects.filter((p) => p.category === active),
    [active]
  );

  return (
    <div className="mt-14">
      {/* Editorial filter bar */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div
          role="group"
          aria-label="Filter gallery by space type"
          className="flex flex-wrap items-center gap-x-7 gap-y-2"
        >
          {filters.map((f, i) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex items-baseline gap-2 py-2 text-sm font-medium uppercase tracking-[0.09em] transition-colors duration-300",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-500",
                  "hover:after:scale-x-100",
                  isActive
                    ? "text-espresso after:scale-x-100"
                    : "text-cocoa hover:text-espresso"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "font-display text-xs italic transition-colors duration-300",
                    isActive ? "text-champagne" : "text-champagne/50"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f}
              </button>
            );
          })}
        </div>

        {/* Live result count */}
        <p className="text-label text-cocoa">
          Showing{" "}
          <span className="text-champagne">
            {String(items.length).padStart(2, "0")}
          </span>{" "}
          of {String(galleryProjects.length).padStart(2, "0")}
        </p>
      </div>

      {/* Card grid — key remounts so cards stagger-reveal on filter change */}
      <div
        key={active}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((project, i) => (
          <div key={project.id} className="h-full">
            <ScrollReveal y={28} delay={i * 0.06}>
              <div className="h-full">
                <GalleryCard
                  project={project}
                  index={i}
                  onSelect={setLightbox}
                />
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* Full-screen editorial view */}
      {lightbox !== null && (
        <GalleryLightbox
          items={items}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}