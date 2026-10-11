"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaHome,
} from "react-icons/fa";
import { FestiveImage } from "@/components/ui/festive-image";
import type { GalleryProject } from "@/lib/gallery";

/**
 * GalleryLightbox — full-screen editorial project view.
 * Portaled to document.body to ensure it appears on top of all headers and navbars.
 * Provides clear "Close", "Back to Gallery", and "Back to Home" navigation.
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
  const [mounted, setMounted] = useState(false);
  const project = items[index];

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted || !project) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — full project view`}
      className="fixed inset-0 z-[99999] flex flex-col bg-night/98 backdrop-blur-xl text-ivory overflow-y-auto"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ivory/10 bg-night/90 px-4 py-3.5 backdrop-blur-md sm:px-8 sm:py-4">
        {/* Back / Home Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-champagne transition-all duration-200 hover:border-champagne hover:bg-champagne hover:text-night"
            aria-label="Back to gallery"
          >
            <FaArrowLeft className="h-3 w-3" />
            <span>Back to Gallery</span>
          </button>

          <Link
            href="/"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ivory/80 transition-all duration-200 hover:border-champagne hover:text-champagne"
            aria-label="Go to homepage"
          >
            <FaHome className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>

        {/* Counter */}
        <p className="text-xs font-semibold uppercase tracking-widest text-champagne/90">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>

        {/* Prominent Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project view"
          className="inline-flex items-center gap-1.5 rounded-full border border-ivory/25 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-ivory transition-all duration-200 hover:border-red-400 hover:bg-red-500/20 hover:text-white"
        >
          <FaTimes className="h-3.5 w-3.5" />
          <span>Close</span>
        </button>
      </header>

      {/* Main Content Stage */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-4 sm:px-8 sm:py-6">
        {/* Stage Wrapper */}
        <div className="relative flex w-full max-w-5xl flex-1 items-center justify-center">
          {/* Desktop Prev Button */}
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            aria-label="Previous project"
            className="hidden lg:grid absolute left-0 z-10 h-12 w-12 place-items-center rounded-full border border-ivory/20 bg-night/80 text-ivory shadow-lg transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-night"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          {/* Large Image Frame */}
          <figure className="relative mx-auto flex h-[62vh] w-full max-w-3xl items-center justify-center sm:h-[68vh] lg:h-[72vh]">
            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl">
              <FestiveImage
                image={project.image}
                fill
                fit="contain"
                priority
                sizes="(max-width: 768px) 96vw, (max-width: 1200px) 85vw, 1200px"
              />
            </div>
          </figure>

          {/* Desktop Next Button */}
          <button
            type="button"
            onClick={() => onNavigate((index + 1) % items.length)}
            aria-label="Next project"
            className="hidden lg:grid absolute right-0 z-10 h-12 w-12 place-items-center rounded-full border border-ivory/20 bg-night/80 text-ivory shadow-lg transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-night"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Project Metadata */}
        <div className="mt-4 w-full max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-champagne">
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-xl sm:text-2xl lg:text-3xl font-medium text-ivory">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs text-ivory/50">{project.year}</p>
        </div>

        {/* Navigation & Action Controls for Mobile / Tablet */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 pb-4">
          <button
            type="button"
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory transition-colors hover:border-champagne hover:text-champagne"
          >
            <FaChevronLeft className="h-3 w-3" />
            Previous
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-champagne transition-colors hover:bg-champagne hover:text-night"
          >
            <FaTimes className="h-3 w-3" />
            Close View
          </button>

          <button
            type="button"
            onClick={() => onNavigate((index + 1) % items.length)}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory transition-colors hover:border-champagne hover:text-champagne"
          >
            Next
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </main>
    </div>
  );

  return createPortal(content, document.body);
}