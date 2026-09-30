"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/ui/star-rating";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import type { Review } from "@/lib/reviews";

/**
 * PublishedReviews — elegant auto-sliding carousel for testimonials.
 * 
 * 1-3 reviews: static grid
 * 4+ reviews: smooth auto-sliding carousel showing 3 cards at a time,
 *   uniform size, seamless transitions, pauses on hover.
 */

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-lg border hairline bg-background p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne/50 hover:shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <span aria-hidden className="font-display text-2xl leading-none text-champagne/50">
          "
        </span>
        <Stars value={review.rating} size="text-sm" />
      </div>
      <blockquote className="mt-2 flex-1 min-h-0">
        <p className="text-sm leading-snug text-espresso">
          {review.quote}
        </p>
      </blockquote>
      <figcaption className="mt-3 border-t hairline pt-2">
        <p className="text-xs font-semibold text-espresso">{review.name}</p>
        {review.detail ? (
          <p className="text-[10px] mt-0.5 text-warm-gray-deep">{review.detail}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function StaticGrid({ reviews }: { reviews: Review[] }) {
  return (
    <ScrollReveal delay={0.08}>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </ScrollReveal>
  );
}

function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const total = reviews.length;
  const cardWidth = 300; // px
  const gap = 24; // 1.5rem = 24px
  const step = cardWidth + gap; // 324px per slide

  // Auto-slide logic
  useEffect(() => {
    if (total < 4) return;

    const startSliding = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex(prev => (prev + 1) % total);
        }
      }, 4000);
    };

    const timeoutId = setTimeout(startSliding, 1500);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, isPaused]);

  // Smooth translateX animation when index changes
  useEffect(() => {
    const targetX = -currentIndex * step;
    setTranslateX(targetX);
  }, [currentIndex, step]);

  // Pause on hover/touch
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Create infinite loop by duplicating first 3 cards at the end
  const extendedReviews = [...reviews, ...reviews.slice(0, 3)];

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      {/* Carousel track with smooth transform */}
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {extendedReviews.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>

      {/* Gradient masks on sides */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === currentIndex 
                ? "bg-champagne w-6" 
                : "bg-espresso/20 hover:bg-champagne/50"
            )}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-champagne/60 font-medium px-2 py-1 bg-background/80 backdrop-blur rounded-full">
          Paused — hover to resume
        </div>
      )}
    </div>
  );
}

export function PublishedReviews({ reviews = [] }: { reviews: Review[] }) {
  // Sort by rating descending (highest first), then by name for stability
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));

  if (sortedReviews.length === 0) {
    return (
      <ScrollReveal delay={0.08}>
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-espresso/25 bg-background/60 p-8 text-center">
          <Stars value={5} size="text-lg" className="opacity-60" />
          <p className="font-display text-xl italic text-espresso">
            No reviews yet — be the first.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-cocoa">
            Had us decorate your space? Click "Rate Us" and your review will
            appear here for everyone to see.
          </p>
        </div>
      </ScrollReveal>
    );
  }

  // 1-3 reviews: static grid
  if (sortedReviews.length < 4) {
    return <StaticGrid reviews={sortedReviews} />;
  }

  // 4+ reviews: smooth auto-sliding carousel
  return <TestimonialCarousel reviews={sortedReviews} />;
}