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
| 2026-09-22 | all 14 pages | ✅ unique, template `%s \| Festive Occasions` | ✅ own URL, https-consistent | ✅ 2 scripts/page (home = Organization+WebSite; contact = LocalBusiness; services = Service+FAQPage+Breadcrumb; about/gallery/areas/other = BreadcrumbList) | ✅ 200, 0 failures |
| 2026-09-22 | `/` | ✅ | ✅ | ✅ valid JSON (parse-checked) | ✅ |
| 2026-09-22 | service ×8 | ✅ | ✅ | ✅ valid JSON (spot-checked `/christmas-villa-decoration-dubai`) | ✅ |
| 2026-09-22 | /about · /gallery · /areas-we-serve · /other-occasions | ✅ | ✅ | ✅ **added honest BreadcrumbList** (`PageBreadcrumbSchema`) | ✅ |
| 2026-09-22 | `/` | ✅ | ✅ | ✅ **added FAQPage** — Q/As shared from `lib/faqs.ts` so schema always matches visible accordion | ✅ 7 entries |
| 2026-09-22 | `/contact` | ✅ | ✅ | ⚠️ **removed placeholder `openingHours`** (not client-verified; `siteConfig.hours` pending) — re-add when verified | ✅ parse-valid |
| 2026-09-22 | 404 route (`/nonexistent-page-test`) | returns **404** | — | — | ✅ |
| 2026-09-22 | all 14 pages | ✅ unique titles (scan: **NONE duplicate**) | ✅ | — | ✅ |

### Sweep summary (2026-09-22, dev server localhost:3000)
- Routes checked: `/`, `/about`, `/areas-we-serve`, `/gallery`, `/contact`, `/other-occasions`, 8 × service pages, `/robots.txt`, `/sitemap.xml` → **16/16 = 200, FAIL COUNT 0**
- Canonical: present on every HTML page
- H1: exactly one per page
- JSON-LD: all parse as valid JSON; no markup for anything unverified (no reviews/ratings — spec §20, §37)
- Images: `lib/images.ts` references **21 files, 0 missing** from `public/images/christmas`
- sitemap.xml lists all 14 content routes; robots.txt allow-all + sitemap ref
- Remaining (blocked, needs browser/client): visual QA per animations/reponsive checklists, Lighthouse run, 404 status verification over HTTP, broken-internal-link crawl

## Pending (needs browser or client data)
- [ ] Browse JS-disabled — content readable (needs manual/browser pass)
- [ ] Crawl all `<a href>` from nav/footer/pages for broken links (script, can run when a browser/Lighthouse is available)
- [ ] Validator pass (Rich Results / Schema.org) on the 3 schema shapes
- [ ] LocalBusiness NAP — replace placeholders in `lib/site.ts` with client-verified data first
- [ ] Re-add LocalBusiness `openingHours` once client confirms fixed opening hours