# Schema Plan — Festive Occasions

Structured data via `<script type="application/ld+json">` rendered in page
components (React, no server-only lib). **Only client-verified data** — no
invented addresses, reviews, ratings, or prices (brief §20, §37).

## Schema inventory — current vs planned

| Schema | Where | Status |
|---|---|---|
| `HomeAndConstructionBusiness` (LocalBusiness type) | `/contact` | ✅ exists (NAP placeholders) |
| `Service` | each of the 8 service pages | ⏳ to add |
| `FAQPage` | homepage FAQ + service-page FAQs | ⏳ to add |
| `BreadcrumbList` | service pages + inner pages | ⏳ to add |
| `Organization` | homepage / global | ⏳ to add |
| `WebSite` | global (SearchAction optional) | ⏳ optional |

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
- No `aggregateRating` / review markup until real Google reviews exist.

## Rules

- One coherent graph per page; no conflicting entities.
- Keep JSON-LD in sync with visible copy + `lib/site.ts` (single NAP source).