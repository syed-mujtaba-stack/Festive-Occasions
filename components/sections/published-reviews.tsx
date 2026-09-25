"use client";

import { useCallback, useState } from "react";
import { Stars } from "@/components/ui/star-rating";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { Review } from "@/lib/reviews";

/**
 * PublishedReviews — infinite horizontal-scroll testimonials marquee.
 *
 * Reviews glide right → left in one or two rows (reusing the gallery
 * marquee pattern: a quadrupled track shifted exactly -25% = one full
 * copy for a seamless loop). Cards are compact, so the strip reads as an
 * elegant ribbon instead of big stacked blocks. Hover/touch pauses the
 * row; reduced-motion users get a static strip (global reduced-motion CSS
 * collapses the animation to a single instant).
 */

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[260px] shrink-0 flex-col rounded-xl border hairline bg-background p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 hover:shadow-glow sm:w-[300px] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <span aria-hidden className="font-display text-4xl leading-none text-champagne/60">
          “
        </span>
        <Stars value={review.rating} size="text-sm" />
      </div>
      <blockquote className="mt-3 flex-1">
        <p className="text-[0.95rem] leading-relaxed text-espresso">
          {review.quote}
        </p>
      </blockquote>
      <figcaption className="mt-5 border-t hairline pt-3">
        <p className="text-sm font-semibold text-espresso">{review.name}</p>
        {review.detail ? (
          <p className="text-label mt-1 text-warm-gray-deep">{review.detail}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function MarqueeRow({ reviews, speed }: { reviews: Review[]; speed: number }) {
  const [paused, setPaused] = useState(false);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  // Quadruple the track so the -25% shift loops seamlessly.
  const items = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      {/* Edge fades into the cream section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-cream to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-cream to-transparent sm:w-24"
      />

      <div
        className="flex w-max gap-4 will-change-transform"
        style={{
          animation: `marquee-ltr ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export function PublishedReviews({ reviews = [] }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <ScrollReveal delay={0.08}>
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-espresso/25 bg-background/60 p-8 text-center">
          <Stars value={5} size="text-lg" className="opacity-60" />
          <p className="font-display text-xl italic text-espresso">
            No reviews yet — be the first.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-cocoa">
            Had us decorate your space? Click “Rate Us” and your review will
            appear here for everyone to see.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  // Split into up to two rows for a fuller ribbon.
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)].filter(
    (row) => row.length > 0
  );

  return (
    <div className="space-y-5">
      {rows.map((row, i) => (
        <MarqueeRow key={i} reviews={row} speed={i === 0 ? 32 : 38} />
      ))}
    </div>
  );
}