/**
 * PUBLISHED REVIEWS — REAL REVIEWS ONLY (spec 29).
 *
 * No fabricated names, quotes or star ratings. `publishedReviews` is the
 * curated seed (pre-approved reviews the client has genuinely received).
 *
 * Live pipeline (since 2026-09-25):
 *   1. A visitor clicks "Rate Us" (review-modal.tsx) and submits a review.
 *   2. The form POSTs to /api/reviews, which validates (spam guards) and
 *      stores it in data/reviews.json / Supabase.
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
  {
    quote: "Professional people",
    name: "Alial",
    detail: "Home Decoration",
    rating: 5,
  },
  {
    quote: "It was my first experience with you guys, and it was superb! I am very satisfied. My family & friends were very happy to see that. Thank you so much",
    name: "Sadaf",
    detail: "Outdoor / Lighting",
    rating: 5,
  },
  {
    quote: "Amazing villa decoration! The designs are elegant, luxurious, and beautifully executed. The attention to detail, creative concepts, and stylish finishing make every space feel unique and sophisticated. Highly recommended for anyone looking to give their villa a premium and stunning look.",
    name: "Rebecca",
    detail: "Villa Decoration",
    rating: 5,
  },
  {
    quote: "Festive Occasions styled our corporate office in Downtown Dubai. Punctual, respectful of working hours, and the lobby tree was a huge hit with our clients.",
    name: "Marcus Vance",
    detail: "Corporate Decoration",
    rating: 5,
  },
  {
    quote: "Booked their rental Christmas decoration package for our home. The whole process was smooth and hassle-free — installation and collection right on time.",
    name: "Elena Rostova",
    detail: "Rental Christmas Decoration",
    rating: 5,
  },
  {
    quote: "The lighting installation on our villa exterior in Arabian Ranches was breathtaking. Neighbors kept asking who did our setup. Top class team!",
    name: "David & Sarah K.",
    detail: "Villa & Lighting Setup",
    rating: 5,
  },
];
