"use client";

import { useMemo, useState } from "react";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
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

/** Filterable gallery grid (client). Data remains placeholder-tagged. */
export function GalleryGrid() {
  const [active, setActive] = useState<Filter>("All");

  const items = useMemo(
    () =>
      active === "All"
        ? galleryProjects
        : galleryProjects.filter((p) => p.category === active),
    [active]
  );

  return (
    <div className="mt-14">
      {/* Filter bar */}
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter gallery by space type"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              active === f
                ? "border-champagne bg-champagne text-espresso"
                : "border-espresso/15 text-cocoa hover:border-champagne hover:text-espresso"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((project, i) => (
          <div
            key={project.id}
            className={
              i === 1 || i === 4
                ? "lg:col-span-2 lg:row-span-1"
                : i === 2
                  ? "lg:row-span-2"
                  : ""
            }
          >
            <div className="h-full">
              <GalleryCard project={project} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}