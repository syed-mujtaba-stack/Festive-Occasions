"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaTree, FaWhatsapp, FaTimes } from "react-icons/fa";

const RENTAL_OFFER = {
  title: "Rental Christmas Decoration",
  subtitle: "October → 25th January",
  tagline: "Budget-friendly festive schemes for your home.",
  stepsHeading: "How it works…!",
  steps: [
    {
      num: 1,
      text: "Select the area you want to decorate and send us door / stairs / table picture to visualize",
    },
    {
      num: 2,
      text: "We will send quotation, approve it",
    },
    {
      num: 3,
      text: "Get the installation done",
    },
    {
      num: 4,
      text: "Complete the payment",
    },
    {
      num: 5,
      text: "We will collect it back on your given dates in January",
    },
  ],
  footerNote: "Expert styling and professional finish",
  whatsappLink:
    "https://wa.me/971564284444?text=Hi%20Festive%20Occasions,%20I'd%20like%20to%20enquire%20about%20rental%20Christmas%20decoration",
};

export function RentalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dismissedRef = useRef(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show popup after 15 seconds delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissedRef.current) {
        setIsOpen(true);
      }
    }, 15000); // 15 seconds delay
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dismissedRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  }, []);

  // Keyboard ESC handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      data-lenis-prevent="true"
      className={`fixed inset-0 z-[9999] overflow-y-auto transition-opacity duration-200 ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Full viewport backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-200"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Centering wrapper with safe padding to ensure no clipping on laptop screens */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-5 py-6 sm:py-8">
        <div
          ref={popupRef}
          data-lenis-prevent="true"
          className={`relative z-10 w-full max-w-[470px] bg-[#171412] text-white rounded-2xl sm:rounded-3xl border border-[#c6a15b]/35 shadow-[0_25px_80px_rgba(0,0,0,0.9)] transition-all duration-200 overflow-hidden my-auto ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          {/* Ambient Top Glow */}
          <div
            className="pointer-events-none absolute -top-20 right-1/4 w-52 h-52 rounded-full bg-emerald-500/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Close button (X icon) - always cleanly visible */}
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a15b]"
            aria-label="Close popup"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>

          {/* Card Body with perfectly balanced padding */}
          <div className="p-4 sm:p-6 pt-4 sm:pt-5">
            {/* Header Date Badge */}
            <div className="flex items-center gap-2 mb-1.5 pr-8">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <FaTree className="h-2.5 w-2.5" />
                {RENTAL_OFFER.subtitle}
              </span>
            </div>

            {/* Title */}
            <h3
              id="popup-title"
              className="text-xl sm:text-2xl font-serif font-bold text-white mb-1 tracking-tight"
            >
              {RENTAL_OFFER.title}
            </h3>

            {/* Tagline */}
            <p className="text-[#e5d3ac] text-xs sm:text-sm font-medium mb-3.5">
              {RENTAL_OFFER.tagline}
            </p>

            {/* How it works section */}
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 mb-3.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#dfba73] mb-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfba73]" />
                {RENTAL_OFFER.stepsHeading}
              </h4>

              <ol className="space-y-2 sm:space-y-2.5">
                {RENTAL_OFFER.steps.map((step) => (
                  <li key={step.num} className="flex items-start gap-2.5">
                    <span className="shrink-0 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs font-bold flex items-center justify-center mt-0.5">
                      {step.num}
                    </span>
                    <span className="text-white/85 text-[11px] sm:text-xs leading-relaxed">
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Benefit Note */}
            <div className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-emerald-950/40 border border-emerald-500/25 px-3 py-2 mb-3.5 text-xs text-emerald-300 font-medium">
              <span className="text-emerald-400">✦</span>
              <span>{RENTAL_OFFER.footerNote}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href={RENTAL_OFFER.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="h-4 w-4 shrink-0" />
                <span>WhatsApp for Quote</span>
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white/75 hover:text-white transition-all cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}