"use client";

import { useEffect } from "react";
import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

/**
 * GalleryLightbox — full-screen editorial project view.
 * Keyboard: Esc closes, ←/→ navigate. Body scroll is locked while open.
 * Reduces gracefully: content still appears instantly; overlay is night +
 * soft blur, honest metadata only.
 */
export function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryProject[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const project = items[index];

  // Lock body scroll + keyboard controls while open.
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onNavigate]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — full project view`}
      className="fixed inset-0 z-[95] flex flex-col bg-night/95 backdrop-blur-md"
    >
      {/* Header: counter + close */}
      <div className="flex items-center justify-between px-6 py-5 lg:px-10">
        <p className="text-label text-champagne">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project view"
          className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne"
        >
          <span aria-hidden className="text-lg leading-none">
            ✕
          </span>
        </button>
      </div>

      {/* Stage */}
      <div className="flex flex-1 items-center gap-4 overflow-hidden px-6 pb-6 lg:px-10">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          aria-label="Previous project"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne lg:grid"
        >
          ←
        </button>

        <figure className="relative mx-auto h-full w-full max-w-4xl">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-card">
            <FestiveImage
              image={project.image}
              fill
              sizes="(max-width: 1024px) 100vw, 64vw"
            />
            {/* Grounded vignette */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent"
            />
          </div>
        </figure>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          aria-label="Next project"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne lg:grid"
        >
          →
        </button>
      </div>

      {/* Meta */}
      <div className="px-6 pb-10 lg:px-10">
        <p className="flex items-center gap-3 text-label text-champagne">
          <span aria-hidden className="h-px w-8 bg-champagne/60" />
          {project.category}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-3xl leading-tight text-ivory">
            {project.title}
          </h3>
          <p className="text-sm text-ivory/50">{project.year}</p>
        </div>
      </div>

      {/* Mobile prev/next */}
      <div className="flex justify-center gap-3 pb-8 lg:hidden">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="border hairline-dark rounded-full px-6 py-3 text-sm text-ivory transition-colors hover:text-champagne"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          className="border hairline-dark rounded-full px-6 py-3 text-sm text-ivory transition-colors hover:text-champagne"
        >
          Next →
        </button>
      </div>
    </div>
  );
}