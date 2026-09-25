/**
 * PUBLISHED REVIEWS — REAL REVIEWS ONLY (spec 29).
 *
 * No fabricated names, quotes or star ratings. `publishedReviews` is the
 * curated seed (pre-approved reviews the client has genuinely received).
 *
 * Live pipeline (since 2026-09-25):
 *   1. A visitor clicks "Rate Us" (review-modal.tsx) and submits a review.
 *   2. The form POSTs to /api/reviews, which validates (spam guards) and
 *      stores it in data/reviews.json.
 *   3. The Testimonials section reads /api/reviews — the review is public
 *      immediately.
 *
 * GET /api/reviews returns the seed + all submitted reviews merged.
 */

export type Review = {
  /** The reviewer's own words, quoted verbatim. */
  quote: string;
  /** Name the reviewer gave. */
  name: string;
  /** e.g. "Christmas Villa Decoration, Dubai" — what/where they reviewed. */
  detail: string;
  /** The reviewer's own 1–5 star choice. */
  rating: number;
};

export const publishedReviews: Review[] = [
  // Add pre-approved reviews here, e.g.:
  // {
  //   quote: "The team transformed our villa into a winter wonderland. Flawless.",
  //   name: "Verified client",
  //   detail: "Christmas Villa Decoration, Dubai",
  //   rating: 5,
  // },
];