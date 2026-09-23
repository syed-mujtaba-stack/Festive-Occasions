# Schema Plan — Festive Occasions

Structured data via `<script type="application/ld+json">` rendered in page
components (React, no server-only lib). **Only client-verified data** — no
invented addresses, reviews, ratings, or prices (brief §20, §37).

## Schema inventory — current vs planned

| Schema | Where | Status |
|---|---|---|
| `HomeAndConstructionBusiness` (LocalBusiness type) | `/contact` — now `@id /#business` in same graph | ✅ exists |
| `Service` | each of the 8 service pages (`@graph` with FAQPage + BreadcrumbList) | ✅ done |
| `FAQPage` | service-page FAQs (mirrors visible accordion) | ✅ done |
| `BreadcrumbList` | each service page (Home → Pillar → page) | ✅ done |
| `Organization` + `WebSite` | homepage (`@graph`) | ✅ done |
| FAQPage (homepage FAQ) | `/` matches home FAQ block — Q/As shared from `lib/faqs.ts` (single source with visible accordion) | ✅ done |

## Service schema shape (planned)

```jsonc
{
  "@type": "Service",
  "name": "Christmas Villa Decoration Dubai",
  "serviceType": "Christmas Decoration",
  "provider": { "@type": "Business", "name": "Festive Occasions", "url": "https://festiveoccasions.ae" },
  "areaServed": { "@type": "Place", "name": "Dubai, UAE" },
  "description": "<page meta description>",
  "url": "<canonical url>",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
}
```

## FAQPage shape (planned)

Uses the exact Q/A pairs rendered in the visible FAQ accordion — never hidden
Q/As (matches Google guidelines).

## LocalBusiness (extends existing /contact)

- `name`, `url`, `telephone`, `email`, `address` (only if client provides),
  `areaServed`, `openingHours` (only client-verified hours), `sameAs` (only
  real social accounts).
- ✅ 2026-09-23: `openingHoursSpecification` added — enquiries/bookings 24/7
  online (opens 00:00–closes 23:59 all days); office closed Sat & Sun, weekend
  replies may be slower. Mirrors visible contact-page copy.
- No `aggregateRating` / review markup until real Google reviews exist.

## Rules

- One coherent graph per page; no conflicting entities.
- Keep JSON-LD in sync with visible copy + `lib/site.ts` (single NAP source).