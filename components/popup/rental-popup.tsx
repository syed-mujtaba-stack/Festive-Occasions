"use client";

import { useState, useEffect } from "react";
import { FaTree, FaHome, FaGift, FaSnowflake } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RENTAL_OFFER = {
  title: "Rental Christmas Decoration",
  subtitle: "25th October → 25th January",
  description:
    "Budget-friendly festive schemes for rented properties. Non-damaging installation & removal on your dates.",
  whatsappLink: "https://wa.me/971564284444?text=Hi%20Festive%20Occasions,%20I'd%20like%20to%20enquire%20about%20rental%20Christmas%20decoration",
  offerPeriod: "25th October → 25th January",
};

export function RentalPopup() {
  const [show, setShow] = useState(true);
  const [autoShow, setAutoShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAutoShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => setShow(false);

  if (!show && !autoShow) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500"
      style={{
        opacity: show || autoShow ? 1 : 0,
        pointerEvents: show || autoShow ? "auto" : "none",
      }}
    >
      <div
        className="rental-popup bg-night text-white rounded-2xl w-full max-w-md mx-4 transform scale-100 transition-transform duration-500"
        style={{
          transform: show || autoShow ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className="flex items-start justify-between px-8 py-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {RENTAL_OFFER.title}
            </h3>
            <p className="text-white/60 text-sm subtitle">
              {RENTAL_OFFER.subtitle}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/40 hover:text-white transition-colors rounded-lg p-2"
            aria-label="Close popup"
          >
            <FaTree className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <p className="text-white/70 text-base mb-8 leading-relaxed flex items-center gap-2">
          <FaGift className="h-5 w-5 text-emerald-400" />
          {RENTAL_OFFER.description}
        </p>

        {/* Features list */}
        <ul className="space-y-3 text-white/60 text-sm mb-8">
          <li>
            <FaHome className="h-4 w-4 mr-2 text-emerald-400" />
            Non-damaging installation for rented properties
          </li>
          <li>
            <FaSnowflake className="h-4 w-4 mr-2 text-emerald-400" />
            Install Oct 25 - Remove Jan 25
          </li>
          <li>
            <FaTree className="h-4 w-4 mr-2 text-emerald-400" />
            Expert styling and professional finish
          </li>
        </ul>

        {/* WhatsApp CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <a
            href={RENTAL_OFFER.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-emerald-500 px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <FaTree className="inline-block h-5 w-5 shrink-0 text-night" />
            <span>WhatsApp for a Quote</span>
          </a>
          <Button
            variant="outline-light"
            onClick={handleDismiss}
            className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            Close
          </Button>
        </div>

        {/* Offer period badge */}
        <div className="mt-6 text-xs text-white/50 flex items-center gap-2">
          <FaTree className="h-3.5 w-3.5 text-emerald-400" />
          Offer valid: {RENTAL_OFFER.offerPeriod}
        </div>
      </div>
    </div>
  );
}