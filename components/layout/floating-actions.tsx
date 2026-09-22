"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { siteConfig, whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp + Call actions. On mobile, keeps them visible at the
 * bottom corner above the sticky bottom bar. On desktop, bottom-right.
 */
export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-5 z-[70] flex flex-col gap-3 sm:right-6">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1faa55] text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#178a45]"
      >
        <FaWhatsapp className="h-5 w-5" />
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label={`Call ${siteConfig.phoneDisplay}`}
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-night text-ivory shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-champagne hover:text-espresso"
      >
        <FaPhoneAlt className="h-[0.95rem] w-[0.95rem]" />
      </a>
    </div>
  );
}