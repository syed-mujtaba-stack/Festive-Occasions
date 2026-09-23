"use client";

import { useState } from "react";
import { galleryProjects } from "@/lib/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/**
 * GalleryGrid — numbered editorial gallery.
 * Unfiltered by design: the full set of 35 looks reads as one continuous
 * numbered showcase. Tiles re-reveal in a stagger; clicking a tile or its
 * "Explore Look" CTA opens a full-screen lightbox (keyboard navigable).
 * Data mixes real client installation photos with current styling imagery —
 * captions stay neutral until the client's full set lands.
 */
export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="mt-14">
      {/* Editorial count line */}
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <p className="text-label text-cocoa">
          The set —{" "}
          <span className="text-champagne">
            {String(galleryProjects.length).padStart(2, "0")}
          </span>{" "}
          looks, numbered in order
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryProjects.map((project, i) => (
          <div key={project.id} className="h-full">
            <ScrollReveal y={28} delay={(i % 3) * 0.06}>
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
          items={galleryProjects}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNavigate={setLightbox}
        />
      )}
    </div>
  );
}