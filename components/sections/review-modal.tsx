"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { ReviewForm } from "@/components/sections/review-form";
import type { Review } from "@/lib/reviews";

/**
 * Rate-Us button + review modal.
 * Click → a focused form screen (dialog) opens where visitors write their
 * review and rating. Submitted via /api/reviews; the published review is
 * handed to `onPosted` so it appears in the testimonials grid instantly.
 */
export function ReviewModal({
  ctaLabel = "Rate Us",
  onPosted,
}: {
  ctaLabel?: string;
  onPosted: (review: Review) => void;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-md bg-espresso px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg transition-all hover:-translate-y-0.5 hover:bg-espresso/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        <span aria-hidden className="text-champagne">
          <FaStar className="h-4 w-4" />
        </span>
        {ctaLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-night/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rv-modal-title"
            tabIndex={-1}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border hairline bg-background p-6 shadow-2xl outline-none sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close review form"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-warm-gray-deep transition-colors hover:bg-espresso/5 hover:text-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            <h3 id="rv-modal-title" className="pr-8 font-serif text-2xl text-espresso">
              Rate your experience
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cocoa">
              Please rate your Festive Occasions experience — the design, the
              installation and the final result. Your honest review helps other
              Dubai families choose with confidence.
            </p>

            <ReviewForm onClose={() => setOpen(false)} onPosted={onPosted} />
          </div>
        </div>
      )}
    </>
  );
}