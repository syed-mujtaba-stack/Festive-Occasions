"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/ui/star-rating";
import type { Review } from "@/lib/reviews";

const CARD_WIDTH = 360; // px - card width including padding
const CARD_GAP = 24; // px - gap between cards
const STEP = CARD_WIDTH + CARD_GAP; // 384px per slide

/**
 * Premium Testimonial Card — consistent height, elegant typography
 */
function TestimonialCard({ review, index }: { review: Review; index: number }) {
  // Truncate quote to maintain consistent card height
  const maxQuoteLength = 280;
  const displayQuote = review.quote.length > maxQuoteLength
    ? review.quote.slice(0, maxQuoteLength).trim() + "…"
    : review.quote;

  // Get initials for avatar
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <figure 
      className={cn(
        "relative flex h-full w-[360px] shrink-0 flex-col rounded-2xl",
        "bg-gradient-to-br from-background via-background to-cream/50",
        "border border-espresso/10",
        "shadow-soft",
        "p-6 md:p-7",
        "transition-all duration-500 ease-out",
        "hover:shadow-glow hover:border-champagne/20 hover:-translate-y-1",
        "focus-within:ring-2 focus-within:ring-champagne/50 focus-within:outline-none"
      )}
      style={{ minHeight: "320px" }}
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
          <span className="font-display text-4xl leading-none text-champagne/30 shrink-0" aria-hidden="true">
            {"\u201C"}
          </span>
          <Stars value={review.rating} size="text-sm" className="shrink-0" />
        </div>

        {/* Review text — clamped for consistent height */}
        <blockquote className="mt-4 flex-1 flex flex-col justify-center min-h-[140px]">
          <p className="text-base md:text-lg leading-relaxed text-espresso font-light tracking-wide">
            {displayQuote}
          </p>
        </blockquote>

        {/* Footer with avatar, name, and service label */}
        <figcaption className="mt-6 pt-4 border-t border-espresso/10 flex items-center gap-3 flex-shrink-0">
          {/* Avatar with initials */}
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-full bg-champagne/15 flex items-center justify-center border border-champagne/20"
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
            {review.detail && (
              <p className="text-[11px] mt-0.5 text-champagne-deep font-medium uppercase tracking-wider">
                {review.detail}
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
 * Premium Carousel Indicators — refined progress indicator
 */
function CarouselIndicators({ 
  total, 
  currentIndex, 
  onSelect,
  isPaused 
}: { 
  total: number; 
  currentIndex: number; 
  onSelect: (index: number) => void;
  isPaused: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
      {/* Previous/Next arrows for desktop */}
      <button
        onClick={() => onSelect((currentIndex - 1 + total) % total)}
        className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-espresso/10 text-espresso/60 hover:text-champagne hover:border-champagne/30 hover:bg-champagne/5 transition-all duration-300 shadow-soft"
        aria-label="Previous testimonial"
        aria-controls="testimonial-track"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Dots indicator — refined */}
      <div className="flex items-center justify-center gap-1.5" role="tablist">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "relative h-2 w-2 rounded-full transition-all duration-500 ease-out",
              i === currentIndex
                ? "bg-champagne w-10 shadow-[0_0_0_2px_rgba(198,161,91,0.3)]"
                : "bg-espresso/15 hover:bg-champagne/40"
            )}
            style={{
              transform: i === currentIndex ? "scale(1)" : "scale(0.8)",
            }}
          >
            {/* Active dot inner glow */}
            {i === currentIndex && (
              <span 
                className="absolute inset-[-2px] rounded-full bg-champagne/20 animate-pulse" 
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>

      {/* Next arrow */}
      <button
        onClick={() => onSelect((currentIndex + 1) % total)}
        className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-espresso/10 text-espresso/60 hover:text-champagne hover:border-champagne/30 hover:bg-champagne/5 transition-all duration-300 shadow-soft"
        aria-label="Next testimonial"
        aria-controls="testimonial-track"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Premium Auto-Sliding Carousel — smooth, elegant, accessible
 */
function TestimonialCarouselInner({ reviews }: { reviews: Review[] }) {
  const [translateX, setTranslateX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; translateX: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const total = reviews.length;
  const visibleCards = 3; // Desktop
  const maxIndex = Math.max(0, total - 1);

  // Create extended reviews for infinite loop (duplicate first visibleCards at end)
  const extendedReviews = [...reviews, ...reviews.slice(0, visibleCards)];
  const extendedTotal = extendedReviews.length;

  // Auto-slide logic
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused && !isDragging) {
        setCurrentIndex((prev) => (prev + 1) % total);
      }
    }, 5000); // 5 seconds per card — slow and premium
  }, [isPaused, isDragging, total]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start auto-slide after initial delay
  useEffect(() => {
    if (total < 4) return;
    const timeoutId = setTimeout(startAutoSlide, 2000);
    return () => {
      clearTimeout(timeoutId);
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide, total]);

  // Restart auto-slide when pause state changes
  useEffect(() => {
    if (!isPaused && !isDragging) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return stopAutoSlide;
  }, [isPaused, isDragging, startAutoSlide, stopAutoSlide]);

  // Smooth translateX animation when index changes
  useEffect(() => {
    const targetX = -currentIndex * STEP;
    setTranslateX(targetX);
  }, [currentIndex]);

  // Handle drag/swipe
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, translateX });
    stopAutoSlide();
    // Cancel CSS transition during drag
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!dragStart || !trackRef.current) return;
    const deltaX = dragStart.x - clientX;
    const newX = dragStart.translateX - deltaX;
    // Add resistance at boundaries
    const maxTranslate = -maxIndex * STEP;
    const minTranslate = STEP * visibleCards; // Allow slight over-scroll
    const boundedX = Math.max(maxTranslate - 100, Math.min(minTranslate, newX));
    setTranslateX(boundedX);
  };

  const handleDragEnd = () => {
    if (!dragStart) return;
    setIsDragging(false);
    setDragStart(null);
    // Restore transition
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }
    // Snap to nearest card based on drag direction and distance
    const dragDistance = dragStart.translateX - translateX;
    const threshold = CARD_WIDTH * 0.3;
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
    // Restart auto-slide after a delay
    setTimeout(startAutoSlide, 3000);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    setIsPaused(false);
    handleDragEnd();
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel viewport with gradient masks */}
      <div className="relative overflow-hidden">
        {/* Left gradient mask */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/90 to-transparent z-10"
          aria-hidden="true"
        />
        {/* Right gradient mask */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/90 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Carousel track */}
        <div
          ref={trackRef}
          id="testimonial-track"
          role="region"
          aria-label="Client testimonials carousel"
          className="flex gap-6 will-change-transform"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging 
              ? "none" 
              : "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {extendedReviews.map((review, i) => (
            <TestimonialCard key={`${review.name}-${i}-${review.rating}`} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* Indicators */}
      <CarouselIndicators
        total={total}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
        isPaused={isPaused || isDragging}
      />

      {/* Pause indicator */}
      {(isPaused || isDragging) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-champagne/70 font-medium px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-champagne/20 shadow-soft animate-fade-in">
          {isDragging ? "Dragging…" : "Paused — hover to resume"}
        </div>
      )}
    </div>
  );
}

/**
 * Main Published Reviews Component
 * Handles 0, 1-3, and 4+ review states
 */
export function PublishedReviews({ reviews = [] }: { reviews: Review[] }) {
  // Sort by rating descending (highest first), then by name for stability
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));

  if (sortedReviews.length === 0) {
    return (
      <div className="relative z-10">
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-espresso/20 bg-background/60 p-10 md:p-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/10 text-champagne-deep" aria-hidden="true">
            <Stars value={5} size="text-2xl" className="opacity-60" />
          </div>
          <p className="font-display text-2xl md:text-3xl italic leading-snug text-espresso">
            No reviews yet — be the first.
          </p>
          <p className="max-w-sm text-base leading-relaxed text-cocoa">
            Had us decorate your space? Click "Share Your Experience" and your review will
            appear here for everyone to see.
          </p>
        </div>
      </div>
    );
  }

  // 1-3 reviews: static grid with premium cards
  if (sortedReviews.length < 4) {
    return (
      <div className="relative z-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1140px] mx-auto">
          {sortedReviews.map((review, i) => (
            <TestimonialCard key={`${review.name}-${i}`} review={review} index={i} />
          ))}
        </div>
      </div>
    );
  }

  // 4+ reviews: premium auto-sliding carousel
  return (
    <div className="relative z-10">
      <TestimonialCarouselInner reviews={sortedReviews} />
    </div>
  );
}

/**
 * TestimonialCarousel — exported for use in TestimonialsLive
 */
export function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  return <PublishedReviews reviews={reviews} />;
}