"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ReviewModal } from "@/components/sections/review-modal";
import { PublishedReviews } from "@/components/sections/published-reviews";
import type { Review } from "@/lib/reviews";

/**
 * TestimonialsLive — single client owner of the live reviews list.
 *
 * - Seeds state with the curated reviews from the server (lib/reviews.ts)
 *   so the section renders instantly, even before JS hydration.
 * - On mount, hydrates any submitted reviews stored on the server
 *   (data/reviews.json via GET /api/reviews) without a reload.
 * - After a visitor posts, `handlePosted` appends the review straight from
 *   the POST response — it shows up in the grid immediately (reload-free).
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
      {/* Rate-Us call to action */}
      <ScrollReveal delay={0.05} className="mt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-lg border hairline bg-background p-8 text-center">
          <p className="font-display text-2xl italic leading-snug text-espresso">
            Had your festive setup delivered by Festive Occasions?
          </p>
          <p className="max-w-md text-sm leading-relaxed text-cocoa">
            A 30-second review — rating and a few honest words — helps other
            Dubai families choose with confidence, and guides us to keep
            improving.
          </p>
          <ReviewModal ctaLabel="Rate Us" onPosted={handlePosted} />
        </div>
      </ScrollReveal>

      {/* Published reviews */}
      <div className="mt-12">
        <PublishedReviews reviews={reviews} />
      </div>
    </>
  );
}