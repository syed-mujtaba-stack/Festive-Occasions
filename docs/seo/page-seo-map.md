# Page SEO Map — Festive Occasions

One clear primary intent per page (brief §17–19). All metadata implemented via
Next Metadata API. Canonical = self-referencing. Title template from root
layout: `"%s | Festive Occasions"`.

## Route → intent → status

| Route | Primary intent | Title focus | Status |
|---|---|---|---|
| `/` | Brand + broad "Christmas decoration Dubai" | Festive Occasions — luxury editorial | ✅ |
| `/christmas-decoration-dubai` | Pillar: Christmas Decoration Dubai | Christmas Decoration Company Dubai | ✅ |
| `~~/christmas-tree-decoration-dubai~~` | Folded into pillar (308 redirect) | — | ✅ merged |
| `/christmas-villa-decoration-dubai` | Villa styling | Christmas Villa Decoration Dubai | ✅ |
| `/christmas-home-decoration-dubai` | Homes | Christmas Home Decoration Dubai | ✅ |
| `/christmas-office-decoration-dubai` | Offices | Christmas Office Decoration Dubai | ✅ |
| `/christmas-corporate-decoration-dubai` | Corporate | Christmas Corporate Decoration Dubai | ✅ |
| `/christmas-lighting-dubai` | Lighting | Christmas Lighting Dubai | ✅ |
| `/outdoor-christmas-decoration-dubai` | Outdoor | Outdoor Christmas Decoration Dubai | ✅ |
| `/christmas-decoration-uae` | Regional (UAE-wide) | Christmas Decoration UAE | ✅ |
| `/gallery` | Portfolio | Gallery — Festive Occasions | ✅ |
| `/about` | Brand story | About | ✅ |
| `/contact` | Conversion | Contact / Get a Quote | ✅ |
| `/areas-we-serve` | Local coverage | Areas We Serve — Dubai & UAE | ✅ |
| `/other-occasions` | Extended services | Other Occasions | ✅ |

## Per-page requirements (checklist, all pages)

- [x] Unique `<title>` (no keyword stuffing)
- [x] Unique meta description (~150–160 chars, honest)
- [x] Canonical (`alternates.canonical`)
- [x] Single H1 (editorial, matches intent)
- [x] Logical H2/H3 hierarchy
- [x] OpenGraph + Twitter (root layout provides)
- [x] Service JSON-LD — 7 service pages (serviceType, areaServed, provider, offers)
- [x] FAQPage JSON-LD — service pages (mirrors visible FAQ)
- [x] BreadcrumbList JSON-LD — service pages
- [x] Organization + WebSite JSON-LD — homepage
- [x] Navbar/Footer chrome on every route (PageShell) — fixed missing nav on inner pages
- [ ] Descriptive alt text (audit during QA)

## Not doing

- No thin location doorway pages (`/areas-we-serve` stays honest copy).
- No fake ratings/reviews/locations in titles or schema.
- No duplicate-titled pages; each service page has genuine unique copy
  (source: `lib/service-pages.ts`).