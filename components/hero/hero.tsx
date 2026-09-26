"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaPhoneAlt, FaBolt } from "react-icons/fa";
import { SnowFall } from "@/components/animations/snow-fall";
import { FestiveSparkles } from "@/components/animations/festive-sparkles";
import { siteConfig, whatsappLink, telLink } from "@/lib/site";


export function Hero() {
  return (
    <section
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
      aria-label="Festive Occasions Introduction"
    >
      {/* Full-Bleed Luxury Dubai Christmas Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/client-work/project-41.jpg"
          alt="Luxury Christmas Decoration in Dubai — Festive Occasions"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Luxury Vignette & Contrast Overlay so text is crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-transparent to-black/50" />
      </div>

      {/* Christmas Animations: Falling Snow & Twinkling Sparkles */}
      <SnowFall flakeCount={46} className="z-10" />
      <FestiveSparkles className="z-10" />

      <div className="container-site relative z-20 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Clear, Professional & High-Converting Pitch */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
              Magical Christmas <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#e8c988] via-[#fff1cf] to-[#dfba73] bg-clip-text text-transparent">
                Decoration in Dubai
              </span>
            </h1>
            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-8 drop-shadow">
              Bespoke festive decoration for luxury villas, commercial spaces,
              corporate offices, and hotels across Dubai & UAE. Fully managed from
              custom design to professional installation and seamless January takedown.
            </p>

            {/* High-Converting Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span>WhatsApp Instant Quote</span>
              </a>

              <Link
                href="/packages"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-black/50 hover:bg-black/70 text-white font-semibold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Packages & Pricing</span>
              </Link>

              <a
                href={telLink()}
                className="inline-flex sm:hidden items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/40 text-white/90 text-xs border border-white/15"
              >
                <FaPhoneAlt className="h-3.5 w-3.5 text-champagne" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* Trust Footer line */}
            <p className="mt-4 text-xs text-white/70">
              <FaBolt aria-hidden className="mr-1.5 inline-block h-3.5 w-3.5 text-champagne" />
              Instant response via WhatsApp · Free site visit & custom design proposal
            </p>
          </div>

          {/* Right Column: Luxury Santa Showcase Card with Real Work Badge */}
          <div className="lg:col-span-4 relative mt-4 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* Santa Luxury Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-2 border-[#dfba73]/50 bg-black/60 backdrop-blur-xl p-3.5 transition-transform duration-500 hover:-translate-y-1">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3.5">
                  <Image
                    src="/images/client-work/project-35.png"
                    alt="Luxury Christmas tree with all-red ornaments — Festive Occasions Dubai real client work"
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 340px"
                    className="object-cover object-top"
                  />

                </div>

                <div className="px-1 text-center">
                  <h3 className="text-base font-serif font-bold text-white">
                    Luxury Installations
                  </h3>
                  <p className="text-xs text-champagne mt-0.5 font-light">
                    Luxury Christmas Decorations · Dubai
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-white/80">
                    <span>Bespoke Villas</span>
                    <span>Grand Trees</span>
                    <span>Lighting</span>
                  </div>
                </div>
              </div>

              {/* 100% Real Client Work Badge */}
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-stone-900/95 backdrop-blur-md border border-[#dfba73]/50 px-3.5 py-2 shadow-xl flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white font-medium">
                  50+ Luxury Villas Transformed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}