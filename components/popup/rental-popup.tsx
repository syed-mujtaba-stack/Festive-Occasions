"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaTree, FaHome, FaGift, FaSnowflake } from "react-icons/fa";

const RENTAL_OFFER = {
  title: "Rental Christmas Decoration",
  subtitle: "25th October → 25th January",
  description:
    "Budget-friendly festive schemes for rented properties. Non-damaging installation & removal on your dates.",
  whatsappLink: "https://wa.me/971564284444?text=Hi%20Festive%20Occasions,%20I'd%20like%20to%20enquire%20about%20rental%20Christmas%20decoration",
  offerPeriod: "25th October → 25th January",
};

export function RentalPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const dismissedRef = useRef(false);
  const popupRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity duration-200"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Popup content */}
      <div
        ref={popupRef}
        className={`relative z-10 w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-[#1a1716] rounded-2xl border border-white/10 shadow-2xl transition-all duration-200 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        {/* Close button (X icon) - top right */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 z-30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Title with subtle accent */}
          <h3
            id="popup-title"
            className="text-lg font-bold text-white mb-1 tracking-tight"
          >
            {RENTAL_OFFER.title}
            <span className="text-emerald-400 text-xs font-normal ml-1">🌲</span>
          </h3>
          <p className="text-white/60 text-sm mb-4">
            {RENTAL_OFFER.subtitle}
          </p>

          {/* Description with gift icon */}
          <p className="text-white/70 text-base leading-relaxed mb-6 flex items-center gap-2">
            <FaGift className="h-4 w-4 text-emerald-400 shrink-0" />
            {RENTAL_OFFER.description}
          </p>

          {/* Features list - clean rows with rounded icon boxes */}
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-lg bg-emerald-500/15 p-2">
                <FaHome className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-white/60 text-sm">Non-damaging installation for rented properties</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-lg bg-emerald-500/15 p-2">
                <FaSnowflake className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-white/60 text-sm">Install Oct 25 - Remove Jan 25</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 rounded-lg bg-emerald-500/15 p-2">
                <FaTree className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <span className="text-white/60 text-sm">Expert styling and professional finish</span>
            </li>
          </ul>

          {/* WhatsApp and Close button on same row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href={RENTAL_OFFER.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FaTree className="h-4 w-4 text-night shrink-0" />
              <span>WhatsApp for a Quote</span>
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 text-center"
            >
              Close
            </button>
          </div>

          {/* Offer period badge */}
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-emerald-300 font-medium">
              Offer valid: {RENTAL_OFFER.offerPeriod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}