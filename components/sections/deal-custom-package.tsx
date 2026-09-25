"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  FaWhatsapp,
  FaCheck,
  FaCrown,
  FaTree,
  FaHome,
  FaCity,
  FaBriefcase,
  FaHotel,
  FaRibbon,
  FaPalette,
  FaCalendarAlt,
  FaCoins,
} from "react-icons/fa";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const SPACE_OPTIONS = [
  { id: "villa", label: "Luxury Villa", icon: FaHome },
  { id: "apartment", label: "Apartment / Penthouse", icon: FaCity },
  { id: "office", label: "Corporate Office", icon: FaBriefcase },
  { id: "venue", label: "Hotel / Grand Venue", icon: FaHotel },
];

const TREE_OPTIONS = [
  { id: "6ft", label: "6 ft Signature Tree", desc: "Classic proportion for living room or reception" },
  { id: "7-8ft", label: "7–8 ft Grand Tree", desc: "High presence for villas and open-plan spaces" },
  { id: "9-10ft", label: "9–10 ft Imperial Tree", desc: "High-ceiling showstopper with luxury ornaments" },
  { id: "12ft+", label: "12+ ft Atrium Tree", desc: "Grand commercial or double-height villa" },
  { id: "notree", label: "Exterior Only (No Tree)", desc: "Lighting, garlands & facade styling" },
];

const DECOR_ELEMENTS = [
  "Entrance Wreath & Garland",
  "Grand Staircase Garland",
  "Dining Table Styling",
  "Outdoor / Garden Lighting",
  "Fireplace & Mantle Garland",
  "Holiday Accessories & Accents",
];

const THEME_OPTIONS = [
  "Classic Crimson & Warm Gold",
  "Champagne & Emerald Green",
  "Frosted Silver & Nordic White",
  "Royal Velvet & Burgundy",
  "Custom Bespoke Theme",
];

const TIMEFRAME_OPTIONS = [
  "Mid-November (Early Setup)",
  "Early December (Prime Season)",
  "Mid-December (Holiday Rush)",
];

const BUDGET_OPTIONS = [
  "AED 6,000 – 12,000",
  "AED 12,000 – 25,000",
  "AED 25,000 – 45,000",
  "AED 45,000+ (Ultra Bespoke)",
  "Discuss Directly with Owner",
];

export function DealCustomPackage() {
  const [selectedSpace, setSelectedSpace] = useState("Luxury Villa");
  const [selectedTree, setSelectedTree] = useState("7–8 ft Grand Tree");
  const [selectedDecor, setSelectedDecor] = useState<string[]>([
    "Entrance Wreath & Garland",
    "Grand Staircase Garland",
  ]);
  const [selectedTheme, setSelectedTheme] = useState("Classic Crimson & Warm Gold");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Early December (Prime Season)");
  const [selectedBudget, setSelectedBudget] = useState("AED 12,000 – 25,000");

  const toggleDecor = (item: string) => {
    setSelectedDecor((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Build the clean WhatsApp message payload for the Owner
  const generateWhatsAppMessage = () => {
    const lines = [
      "*CUSTOM PACKAGE DEAL INQUIRY*",
      "Hi Festive Occasions, I would like to negotiate a Custom Package deal directly with the Owner:",
      "",
      `• Property Type: ${selectedSpace}`,
      `• Tree Scale: ${selectedTree}`,
      `• Theme / Palette: ${selectedTheme}`,
      `• Preferred Dates: ${selectedTimeframe}`,
      `• Target Budget: ${selectedBudget}`,
      "",
      "• Included Decor Elements:",
      selectedDecor.length > 0
        ? selectedDecor.map((d) => `  - ${d}`).join("\n")
        : "  - Tailored by styling team",
      "",
      "Could the Owner please review my custom preferences and provide a direct deal & availability?",
    ];
    return lines.join("\n");
  };

  const dealUrl = whatsappLink(generateWhatsAppMessage());

  return (
    <Section id="deal-custom-package" tone="dark" className="relative overflow-hidden py-24 text-ivory">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#dfba73]/10 via-night to-night pointer-events-none" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-1.5 text-xs uppercase tracking-widest text-champagne mb-4">
              <FaCrown className="text-champagne h-3.5 w-3.5" />
              <span>Direct Owner Deal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Deal Custom Package
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
              Build your customized festive composition below — select your property, tree scale, decor items and theme, then connect directly with the Owner on WhatsApp to finalize your deal.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Interactive Package Builder */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Property Type */}
            <ScrollReveal delay={0.05}>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider mb-4">
                  <FaHome className="h-4 w-4" /> 1. Select Space Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPACE_OPTIONS.map((space) => {
                    const isSelected = selectedSpace === space.label;
                    const Icon = space.icon;
                    return (
                      <button
                        key={space.id}
                        type="button"
                        onClick={() => setSelectedSpace(space.label)}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer",
                          isSelected
                            ? "border-champagne bg-champagne/15 text-white shadow-[0_0_15px_rgba(223,186,115,0.2)] scale-[1.02]"
                            : "border-white/10 bg-white/5 text-ivory/70 hover:border-white/20 hover:text-white"
                        )}
                      >
                        <Icon className={cn("text-2xl mb-2.5 transition-colors", isSelected ? "text-champagne" : "text-ivory/60")} />
                        <span className="text-xs sm:text-sm font-medium leading-tight">{space.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Tree Scale */}
            <ScrollReveal delay={0.1}>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider mb-4">
                  <FaTree className="h-4 w-4" /> 2. Choose Tree Scale
                </label>
                <div className="space-y-2.5">
                  {TREE_OPTIONS.map((tree) => {
                    const isSelected = selectedTree === tree.label;
                    return (
                      <button
                        key={tree.id}
                        type="button"
                        onClick={() => setSelectedTree(tree.label)}
                        className={cn(
                          "w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300",
                          isSelected
                            ? "border-champagne bg-champagne/15 text-white shadow-sm"
                            : "border-white/10 bg-white/5 text-ivory/75 hover:border-white/25 hover:text-white"
                        )}
                      >
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-white">{tree.label}</p>
                          <p className="text-xs text-ivory/60 mt-0.5">{tree.desc}</p>
                        </div>
                        <div
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                            isSelected
                              ? "border-champagne bg-champagne text-night"
                              : "border-white/30"
                          )}
                        >
                          {isSelected && <FaCheck className="h-3 w-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Decor Elements (Multi-select) */}
            <ScrollReveal delay={0.15}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider">
                    <FaRibbon className="h-4 w-4" /> 3. Select Inclusions / Decor Elements
                  </label>
                  <span className="text-xs text-ivory/60">Multi-select</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {DECOR_ELEMENTS.map((item) => {
                    const isSelected = selectedDecor.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDecor(item)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 text-left",
                          isSelected
                            ? "border-champagne bg-champagne/15 text-champagne shadow-sm"
                            : "border-white/10 bg-white/5 text-ivory/70 hover:border-white/20 hover:text-white"
                        )}
                      >
                        <span>{item}</span>
                        <div
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ml-2",
                            isSelected
                              ? "border-champagne bg-champagne text-night"
                              : "border-white/30"
                          )}
                        >
                          {isSelected && <FaCheck className="h-2.5 w-2.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Color Theme & Installation Timeframe */}
            <ScrollReveal delay={0.2}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider mb-3">
                    <FaPalette className="h-4 w-4" /> 4. Color Theme
                  </label>
                  <div className="space-y-2">
                    {THEME_OPTIONS.map((theme) => {
                      const isSelected = selectedTheme === theme;
                      return (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setSelectedTheme(theme)}
                          className={cn(
                            "w-full text-left p-2.5 rounded-lg border text-xs sm:text-sm transition-all duration-200",
                            isSelected
                              ? "border-champagne bg-champagne/15 text-white font-medium"
                              : "border-white/10 bg-white/5 text-ivory/70 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {theme}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider mb-3">
                    <FaCalendarAlt className="h-4 w-4" /> 5. Preferred Dates
                  </label>
                  <div className="space-y-2">
                    {TIMEFRAME_OPTIONS.map((time) => {
                      const isSelected = selectedTimeframe === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTimeframe(time)}
                          className={cn(
                            "w-full text-left p-2.5 rounded-lg border text-xs sm:text-sm transition-all duration-200",
                            isSelected
                              ? "border-champagne bg-champagne/15 text-white font-medium"
                              : "border-white/10 bg-white/5 text-ivory/70 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 6. Budget Range */}
            <ScrollReveal delay={0.25}>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-champagne uppercase tracking-wider mb-3">
                  <FaCoins className="h-4 w-4" /> 6. Target Budget Range
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {BUDGET_OPTIONS.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={cn(
                          "px-3.5 py-2 rounded-full border text-xs sm:text-sm transition-all duration-200",
                          isSelected
                            ? "border-champagne bg-champagne text-night font-bold shadow-md"
                            : "border-white/15 bg-white/5 text-ivory/70 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Live Deal Card & WhatsApp CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-champagne/40 bg-[#121914] p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold">
                      Your Customized Selection
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      Custom Deal Summary
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <FaCheck className="h-4 w-4" />
                  </span>
                </div>

                {/* Summary Items */}
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-ivory/60">Property:</span>
                    <span className="font-medium text-white text-right">{selectedSpace}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-ivory/60">Tree Scale:</span>
                    <span className="font-medium text-white text-right">{selectedTree}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-ivory/60">Theme:</span>
                    <span className="font-medium text-champagne text-right">{selectedTheme}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-ivory/60">Timeline:</span>
                    <span className="font-medium text-white text-right">{selectedTimeframe}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-ivory/60">Target Budget:</span>
                    <span className="font-semibold text-emerald-400 text-right">{selectedBudget}</span>
                  </div>
                  <div>
                    <span className="text-ivory/60 block mb-2">Decor Inclusions ({selectedDecor.length}):</span>
                    {selectedDecor.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedDecor.map((d) => (
                          <span
                            key={d}
                            className="inline-block rounded-md bg-white/10 px-2 py-1 text-[11px] text-ivory/90"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-ivory/40 italic">None selected (standard styling)</span>
                    )}
                  </div>
                </div>

                {/* Action Deal Button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={dealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FaWhatsapp className="h-6 w-6 shrink-0" />
                    <span>Deal with Owner on WhatsApp</span>
                  </a>
                  <p className="mt-3 text-center text-[11px] text-ivory/50">
                    Direct WhatsApp response from the studio owner. Custom pricing & confirmed dates.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
