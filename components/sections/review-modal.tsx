"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaStar, FaTimes } from "react-icons/fa";
import { ReviewForm } from "@/components/sections/review-form";
import type { Review } from "@/lib/reviews";

interface LenisGlobal {
  __lenis?: {
    stop: () => void;
    start: () => void;
  } | null;
}

/**
 * Rate-Us button + review modal.
 * Uses createPortal to escape any parent CSS transforms (like ScrollReveal),
 * and safely pauses Lenis background scrolling so the user can scroll
 * through the review form naturally without the background moving.
 */
export function ReviewModal({
  ctaLabel = "Share Your Experience",
  onPosted,
}: {
  ctaLabel?: string;
  onPosted: (review: Review) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(() => {
    document.body.style.overflow = "hidden";
    // Pause Lenis virtual scroll while modal is active
    if (typeof window !== "undefined") {
      (window as unknown as LenisGlobal).__lenis?.stop();
    }
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    document.body.style.overflow = "";
    // Resume Lenis smooth scroll
    if (typeof window !== "undefined") {
      (window as unknown as LenisGlobal).__lenis?.start();
    }
    setOpen(false);
  }, []);

  // Cleanup on unmount if modal was unmounted while open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        (window as unknown as LenisGlobal).__lenis?.start();
      }
    };
  }, []);

  // Keyboard navigation (ESC key)
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);

    const t = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, closeModal]);

  const modalContent = open && mounted ? (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Full viewport backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Luxury Modal Container */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-[500px] max-h-[88vh] bg-[#171412] text-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-[#c6a15b]/35 outline-none flex flex-col overflow-hidden animate-slide-up my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rv-modal-title"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute -top-24 right-1/4 w-64 h-64 rounded-full bg-[#c6a15b]/15 blur-3xl"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="relative px-5 pt-5 pb-3.5 sm:px-7 sm:pt-6 sm:pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#dfba73]">
              <FaStar className="h-3 w-3 text-amber-400" />
              Festive Occasions Client Review
            </span>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close review form"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-200 hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a15b] cursor-pointer"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>

          <h3
            id="rv-modal-title"
            className="mt-2 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white"
          >
            Rate Your Experience
          </h3>
          <p className="mt-1 text-xs text-white/70 leading-relaxed">
            Your honest review helps Dubai families and businesses choose with confidence.
          </p>
        </div>

        {/* Scrollable Form Body - Isolated scroll container */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5 overscroll-contain"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <ReviewForm onClose={closeModal} onPosted={onPosted} />
        </div>

        {/* Trust Footer */}
        <div className="px-5 py-3 sm:px-7 border-t border-white/10 bg-black/30 shrink-0">
          <p className="text-center text-xs text-white/60 flex items-center justify-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-amber-400">
              <FaStar className="h-2.5 w-2.5" />
              <FaStar className="h-2.5 w-2.5" />
              <FaStar className="h-2.5 w-2.5" />
              <FaStar className="h-2.5 w-2.5" />
              <FaStar className="h-2.5 w-2.5" />
            </span>
            <span>Real verified reviews across Dubai & UAE</span>
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2.5 rounded-xl bg-espresso px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso/90 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne active:scale-95 cursor-pointer"
      >
        <span aria-hidden className="text-champagne">
          <FaStar className="h-4 w-4" />
        </span>
        {ctaLabel}
      </button>

      {mounted && typeof document !== "undefined" && modalContent
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}