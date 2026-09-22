"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";
import { FestiveImage } from "@/components/ui/festive-image";

/**
 * Who We Decorate For — typography + image interaction (brief §08).
 * Oversized display rows; the adjacent image swaps to the active audience.
 * Reduced motion: rows are static, image follows focus (no motion loops).
 */
const audiences = [
  {
    title: "Homes & Villas",
    copy: "Living rooms, entrances, staircases and gardens — polished, warm and unmistakably festive.",
    image: "livingroomCandles" as const,
  },
  {
    title: "Corporate & Commercial",
    copy: "Lobbies, offices and branded installations that impress clients and lift the whole team.",
    image: "officeLobbyTree" as const,
  },
  {
    title: "Hospitality & Retail",
    copy: "Hotels, restaurants, cafés and retail spaces — Instagrammable festive moments your guests remember.",
    image: "tableSetting" as const,
  },
];

export function Audiences() {
  const [active, setActive] = useState(0);

  return (
    <Section id="who-we-decorate-for">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Who We Decorate For"
            title={
              <>
                One studio. Every kind of <em className="text-champagne not-italic">space.</em>
              </>
            }
            description="We work across residential, corporate and hospitality environments — from a single statement tree to a full property transformation."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Typography rows */}
          <div
            aria-label="Audiences we decorate for"
            className="flex flex-col"
          >
            {audiences.map((a, i) => (
              <ScrollReveal key={a.title} y={24} delay={i * 0.05}>
                <button
                  type="button"
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-baseline justify-between gap-6 border-t hairline py-7 text-left transition-colors duration-500 lg:py-8",
                    i === audiences.length - 1 && "border-b hairline",
                    active === i ? "border-champagne/40" : "border-espresso/10"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-[clamp(2.2rem,4.5vw,3.9rem)] leading-[1.02] tracking-[-0.015em] transition-all duration-500",
                      active === i
                        ? "text-espresso"
                        : "text-espresso/45 group-hover:text-espresso/75"
                    )}
                  >
                    {a.title}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "text-label text-champagne transition-all duration-500",
                      active === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    )}
                  >
                    0{i + 1}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive image */}
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            {audiences.map((a, i) => (
              <div
                key={a.title}
                aria-hidden={active !== i}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  active === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.04]"
                )}
              >
                <FestiveImage image={a.image} sizes="40vw" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent"
                />
              </div>
            ))}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-6 text-label text-ivory"
            >
              {audiences[active].title}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}