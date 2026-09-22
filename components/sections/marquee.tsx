"use client";

import { cn } from "@/lib/utils";

/**
 * Marquee — editorial ticker strip (reduced-motion: static, no loop).
 * Pure CSS animation on a duplicated track; stops when the user prefers
 * reduced motion so no motion is forced on anyone.
 */
const words = [
  "Christmas Decoration",
  "Villas",
  "Homes",
  "Offices",
  "Hotels",
  "Restaurants",
  "Signature Trees",
  "Outdoor Lighting",
  "Dubai · UAE",
];

export function Marquee({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const track = (
    <div
      aria-hidden
      className="marquee-track flex w-max shrink-0 items-center"
    >
      {[...Array(2)].map((_, dup) => (
        <div key={dup} className="flex items-center">
          {words.map((w) => (
            <span key={`${dup}-${w}`} className="flex items-center">
              <span
                className={cn(
                  "px-7 font-display text-[clamp(1.6rem,3vw,2.4rem)] italic leading-none",
                  dark ? "text-ivory/70" : "text-espresso/60"
                )}
              >
                {w}
              </span>
              <span
                aria-hidden
                className={cn(
                  "text-sm",
                  dark ? "text-champagne" : "text-champagne"
                )}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "overflow-hidden border-y py-6 motion-reduce:overflow-x-auto motion-reduce:whitespace-nowrap",
        dark ? "border-ivory/10 bg-night" : "border-espresso/10 bg-background",
        className
      )}
    >
      {track}
    </div>
  );
}