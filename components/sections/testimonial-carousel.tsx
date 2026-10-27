"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/ui/star-rating";
import type { Review } from "@/lib/reviews";

/**
 * Premium Testimonial Card — uniform height, luxury festive styling
 */
function TestimonialCard({ review, index }: { review: Review; index: number }) {
  // Truncate quote if needed to maintain clean card height
  const maxQuoteLength = 280;
  const displayQuote =
    review.quote.length > maxQuoteLength
      ? review.quote.slice(0, maxQuoteLength).trim() + "…"
      : review.quote;

  // Get initials for avatar
  const initials = review.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "★";

  return (
    <figure
      className={cn(
        "relative flex h-[330px] w-[340px] sm:w-[380px] shrink-0 flex-col rounded-2xl",
        "bg-gradient-to-br from-background via-background to-cream/50",
        "border border-espresso/10",
        "shadow-soft",
        "p-6 md:p-7",
        "transition-all duration-300 ease-out",
        "hover:shadow-glow hover:border-champagne/30 hover:-translate-y-1.5",
        "focus-within:ring-2 focus-within:ring-champagne/50 focus-within:outline-none"
      )}
      data-index={index}
    >
      {/* Subtle decorative quote mark in background */}
      <div
        className="pointer-events-none absolute top-4 right-4 w-20 h-20 opacity-[0.04] text-champagne"
        aria-hidden="true"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
          <path d="M20 25c10 0 20 8 20 20s-8 20-20 20-20-8-20-20 8-20 20-20zm30 0c10 0 20 8 20 20s-8 20-20 20-20-8-20-20 8-20 20-20z" />
        </svg>
      </div>

      {/* Card content */}
      <div className="relative flex flex-col h-full z-10">
        {/* Header with quote mark and stars */}
        <div className="flex items-start justify-between gap-4">
          <span
            className="font-display text-3xl leading-none text-champagne/40 shrink-0 select-none"
            aria-hidden="true"
          >
            {"\u201C"}
          </span>
          <Stars value={review.rating} size="text-sm" className="shrink-0" />
        </div>

        {/* Review text — vertical centering */}
        <blockquote className="mt-4 flex-1 flex flex-col justify-center min-h-[130px]">
          <p className="text-base sm:text-[1.05rem] leading-relaxed text-espresso font-light tracking-wide line-clamp-5">
            {displayQuote}
          </p>
        </blockquote>

        {/* Footer with avatar, name, and service label */}
        <figcaption className="mt-4 pt-4 border-t border-espresso/10 flex items-center gap-3 flex-shrink-0">
          {/* Avatar with initials */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full bg-champagne/15 flex items-center justify-center border border-champagne/25 shadow-xs"
            aria-hidden="true"
          >
            <span className="text-xs font-semibold text-champagne-deep tracking-wider">
              {initials}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-espresso truncate">
              {review.name}
            </p>
            {review.detail ? (
              <p className="text-[11px] mt-0.5 text-champagne-deep font-medium uppercase tracking-wider truncate">
                {review.detail}
              </p>
            ) : (
              <p className="text-[11px] mt-0.5 text-warm-gray-deep font-medium uppercase tracking-wider truncate">
                Verified Client
              </p>
            )}
          </div>
        </figcaption>
      </div>

      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent rounded-t-2xl"
        aria-hidden="true"
      />
    </figure>
  );
}

/**
 * Auto-Scrolling Testimonial Carousel — continuous smooth horizontal scroll.
 * Sides blur/mask completely removed per client request.
 * Pauses seamlessly on hover/focus so clients can easily read cards.
 */
export function PublishedReviews({ reviews = [] }: { reviews: Review[] }) {
  // Sort reviews: 5-star reviews first, stable order
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  }, [reviews]);

  // Build a repeat list to ensure seamless, glitch-free infinite scrolling on any screen width
  const loopList = useMemo(() => {
    if (sortedReviews.length === 0) return [];
    let list = [...sortedReviews];
    while (list.length < 6) {
      list = [...list, ...sortedReviews];
    }
    return list;
  }, [sortedReviews]);

  if (sortedReviews.length === 0) {
    return (
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-espresso/20 bg-background/60 p-8 md:p-12 text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne/10 text-champagne-deep"
            aria-hidden="true"
          >
            <Stars value={5} size="text-xl" className="opacity-70" />
          </div>
          <p className="font-display text-2xl md:text-3xl italic leading-snug text-espresso">
            No reviews yet — be the first.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-cocoa">
            Had us decorate your space? Click &ldquo;Share Your Experience&rdquo; and your review will appear here for everyone to see.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full">
      {/* 
        NO GRADIENT MASKS / NO BLUR OVERLAYS.
        Sides are 100% crisp and clear as requested by the client.
      */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="reviews-marquee-track">
          {/* First set of cards */}
          {loopList.map((review, i) => (
            <TestimonialCard
              key={`review-a-${review.name}-${i}`}
              review={review}
              index={i}
            />
          ))}
          {/* Second duplicate set for seamless infinite loop */}
          {loopList.map((review, i) => (
            <TestimonialCard
              key={`review-b-${review.name}-${i}`}
              review={review}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Helpful subtle indicator */}
      <div className="mt-8 flex items-center justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-espresso/10 bg-background/80 px-4 py-1.5 text-xs text-cocoa shadow-soft backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Continuous live reviews · Hover or tap any card to pause
        </span>
      </div>
    </div>
  );
}

/**
 * TestimonialCarousel — primary export used in TestimonialsLive
 */
export function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  return <PublishedReviews reviews={reviews} />;
}
