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

## Missing (to build in SEO phase)

| Item | Where | Priority |
|---|---|---|
| `app/sitemap.ts` | all routes + siteConfig.url, static | High |
| `app/robots.ts` | allow all, sitemap ref | High |
| `app/not-found.tsx` | premium branded 404 page | High |
| favicon / icon (app/icon) | branded mark | Medium |
| Service JSON-LD | each service page (serviceType, areaServed, provider, offers→contact) | High |
| FAQPage JSON-LD | pages with FAQ (home, service pages) | High |
| BreadcrumbList JSON-LD | service + inner pages | Medium |
| Organization / LocalBusiness on `/` | home | Medium |
| Internal-linking pass | homepage→pillar→services, footer, contextual text links | High |
| Heading audit | exactly one H1 per page, logical H2/H3 | QA |
| Alt text audit | all images have descriptive alt | QA |

## Known caution
- No fake ratings, reviews, addresses, or hours. Schema must only reflect
  client-verified information (see `docs/client/client-data-required.md`).
- No doorway location pages — `/areas-we-serve` stays honest.

## URL inventory (stable, no fragile slugs yet)
- All keys in the home URL structure are already target-optimized slugs
  (`/christmas-decoration-dubai`, `/christmas-tree-decoration-dubai`, …).
- `docs/seo/url-migration.md` will record any future rename; today no migration needed.