# SEO QA — Festive Occasions

Run during Phase 12 for **every indexable page**. Reference: brief §41,
`docs/seo/*`.

## Per-page checklist

| Check | How |
|---|---|
| 200 status | curl / dev server |
| Indexable (no noindex leak) | `robots` metadata on root + page |
| Canonical | alternates.canonical = own URL, protocol-consistent |
| Title | unique, matches intent, ≤ ~60 chars (template adds brand) |
| Description | unique, ~150–160 chars, honest |
| H1 | exactly one, matches primary intent |
| H2/H3 | logical hierarchy, content must live under them |
| Content | unique, people-first, matches service copy |
| Internal links | ≥ pillar link + contextual links on service pages |
| Images + alt | every `<FestiveImage>` has descriptive alt |
| OpenGraph / Twitter | present via root layout; check per-page override |
| JSON-LD | valid, accurate only (Service/FAQPage/Breadcrumb as implemented) |
| URL | clean slug, matches intent |

## Technical scans
- [ ] `sitemap.xml` generated at `/sitemap.xml`, lists all 14 routes
- [ ] `robots.txt` — allow all + sitemap reference
- [ ] Custom 404 (`/not-found`) returns 404 status, branded
- [ ] Browse the site with JS disabled — content readable (no animation-gated text)
- [ ] No broken internal links (crawl all `<a href>` from nav/footer/pages)
- [ ] No duplicate titles/descriptions across pages (script or manual)

## Structured data validation
- Test each JSON-LD with Rich Results / Schema validator.
- FAQPage markup matches visible FAQ only.
- LocalBusiness on /contact has real (client-verified) NAP or is marked pending.

## Log (run results)
| Date | Page | Title | Canonical | Schema | Result |
|---|---|---|---|---|---|
| — | — | — | — | — | to be filled in Phase 12 |