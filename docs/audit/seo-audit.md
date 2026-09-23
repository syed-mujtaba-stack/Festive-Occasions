# SEO Audit — Festive Occasions

Audited: 2026-09-22 (pre-SEO-phase state)

## What is already in place

### Per-page metadata (via Next Metadata API)
Every indexable page exports `metadata` with:
- unique `title` (template `"%s | Festive Occasions"` from root layout)
- unique `description`
- `alternates.canonical` pointing to its own path
- `openGraph` (title, description, url, type)

Pages with metadata: home, 8 service pages, gallery, about, contact,
areas-we-serve, other-occasions. Root layout also sets `keywords`, `twitter`,
`robots (index/follow)`, `metadataBase`.

### Structured data
- Only `/contact` has JSON-LD today: `HomeAndConstructionBusiness` schema with
  name, url, phone, email, serviceArea, openingHours. NAP values are placeholders.
- No Service, FAQPage, BreadcrumbList, Organization, or WebSite schema yet.
- ✅ Updated 2026-09-23: `openingHoursSpecification` client-verified (24/7 online
  enquiries; office closed Sat & Sun). See `docs/seo/schema-plan.md` for the
  full current schema inventory.

## Missing (Phase 9 — completed 2026-09-22)

| Item | Where | Priority | Status |
|---|---|---|---|
| `app/sitemap.ts` | all routes + siteConfig.url, static | High | ✅ done |
| `app/robots.ts` | allow all, sitemap ref | High | ✅ done |
| `app/not-found.tsx` | premium branded 404 | High | ✅ done |
| `app/icon.svg` | branded sparkle favicon | Medium | ✅ done |
| Service JSON-LD | each service page (serviceType, areaServed, provider, offers→contact) | High | ✅ done |
| FAQPage JSON-LD | pages with FAQ (home, service pages) | High | ✅ done (service pages) |
| BreadcrumbList JSON-LD | service + inner pages | Medium | ✅ done (service pages) |
| Organization / WebSite JSON-LD on `/` | home | Medium | ✅ done |
| LocalBusiness `@id` alignment | `/contact` now shares `/#business` with home graph | — | ✅ done |
| Internal-linking pass | breadcrumbs + related-services block on all service pages | High | ✅ done |
| **Navbar/Footer on inner pages** | **gallery, about, contact, areas, other-occasions + all service pages were missing chrome — fixed via shared `PageShell`** | Critical | ✅ done |
| Skip-link + `main-content` targets | root layout + all pages | Medium | ✅ done |
| Heading audit | exactly one H1 per page, logical H2/H3 | QA | ⏳ Phase 12 |
| Alt text audit | all images have descriptive alt | QA | ⏳ Phase 12 |

## Known caution
- No fake ratings, reviews, addresses, or hours. Schema must only reflect
  client-verified information (see `docs/client/client-data-required.md`).
- No doorway location pages — `/areas-we-serve` stays honest.

## URL inventory (stable, no fragile slugs yet)
- All keys in the home URL structure are already target-optimized slugs
  (`/christmas-decoration-dubai`, `/christmas-villa-decoration-dubai`, …).
- 2026-09-23: `/christmas-tree-decoration-dubai` retired → 308 → pillar; tree
  phrasing removed per client. Details: `docs/seo/url-migration.md`.