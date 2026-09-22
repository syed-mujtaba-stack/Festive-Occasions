/**
 * FAQ entries — single source shared by the visible FAQ accordion and the
 * homepage FAQPage schema (schema must mirror visible Q/As only, never
 * hidden ones). Placeholder answers are intentionally conservative;
 * the client verifies before launch (docs/seo/schema-plan.md).
 */
export const faqEntries = [
  {
    q: "What Christmas decoration services do you offer in Dubai?",
    a: "We design and install bespoke Christmas decoration for homes, villas, offices and commercial spaces — including tree styling, interior schemes, outdoor lighting and full property transformations.",
  },
  {
    q: "Do you decorate villas for Christmas?",
    a: "Yes. Villa decoration is one of our core services — entrance, living areas, dining, staircase, garden and outdoor lighting composed into one cohesive scheme.",
  },
  {
    q: "Do you decorate offices and commercial spaces?",
    a: "Yes. We decorate office lobbies, receptions, meeting areas and employee spaces, and we deliver branded installations for corporate venues and events.",
  },
  {
    q: "Can you create a custom Christmas theme?",
    a: "Yes. Every project begins with your space and style. We design custom palettes and themes rather than applying a fixed template.",
  },
  {
    q: "Do you provide installation and removal?",
    a: "Yes. Our team handles the full cycle — installation on schedule and careful removal after the festive period.",
  },
  {
    q: "How early should I book Christmas decoration?",
    a: "We recommend booking as early as possible, while capacity is available. Contact us to check availability for your dates.",
  },
  {
    q: "Which areas in Dubai do you serve?",
    a: "We serve Dubai and surrounding UAE areas. Get in touch with your location and we will confirm whether we cover it.",
  },
];

export type FaqEntry = (typeof faqEntries)[number];