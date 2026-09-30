"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ReviewModal } from "@/components/sections/review-modal";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import type { Review } from "@/lib/reviews";

/**
 * TestimonialsLive — single client owner of the live reviews list.
 * 
 * - Seeds state with the curated reviews from the server (lib/reviews.ts)
 *   so the section renders instantly, even before JS hydration.
 * - On mount, hydrates any submitted reviews stored on the server
 *   (data/reviews.json via GET /api/reviews) without a reload.
 * - After a visitor posts, `handlePosted` appends the review straight from
 *   the POST response — it shows up in the carousel immediately (reload-free).
 */
export function TestimonialsLive({ initial }: { initial: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);

  // Hydrate live submissions already stored server-side (one-time).
  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad"))))
      .then((data: { reviews?: Review[] }) => {
        if (!cancelled && Array.isArray(data.reviews)) setReviews(data.reviews);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePosted = (review: Review) =>
    setReviews((prev) => [...prev, review]);

  return (
    <>
      {/* Rate-Us call to action — premium styled */}
      <ScrollReveal delay={0.05} className="mt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-espresso/10 bg-background/90 backdrop-blur-sm p-8 md:p-10 text-center shadow-soft">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne/10 text-champagne-deep" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <p className="font-display text-2xl md:text-3xl italic leading-snug text-espresso">
              Had your festive setup delivered by Festive Occasions?
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa mx-auto">
              A 30-second review — rating and a few honest words — helps other
              Dubai families choose with confidence, and guides us to keep
              improving.
            </p>
          </div>
          <ReviewModal ctaLabel="Share Your Experience" onPosted={handlePosted} />
        </div>
      </ScrollReveal>

      {/* Published reviews carousel */}
      <ScrollReveal className="mt-12" y={30}>
        <TestimonialCarousel reviews={reviews} />
      </ScrollReveal>
    </>
  );
}