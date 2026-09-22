# URL Migration — Festive Occasions

Status: **No production URLs exist yet** — the site is not yet deployed under
festiveoccasions.ae. All current routes are new and target-optimized, so no
redirects are required today.

## Current route inventory (canonical, stable)

| Route | Notes |
|---|---|
| `/` | Home |
| `/christmas-decoration-dubai` | Pillar |
| `/christmas-tree-decoration-dubai` | Service |
| `/christmas-villa-decoration-dubai` | Service |
| `/christmas-home-decoration-dubai` | Service |
| `/christmas-office-decoration-dubai` | Service |
| `/christmas-corporate-decoration-dubai` | Service |
| `/christmas-lighting-dubai` | Service |
| `/outdoor-christmas-decoration-dubai` | Service |
| `/gallery` | Portfolio |
| `/about` | Brand |
| `/contact` | Conversion |
| `/areas-we-serve` | Local |
| `/other-occasions` | Extended |

## Rules if a URL ever changes (pre-launch SEO)

1. Prefer keeping slugs stable — they already match target intents.
2. If a rename is required: add a 301 redirect (platform-level, e.g. Vercel
   `next.config` redirects or hosting rewrite) before losing the old route.
3. Update all internal links (`lib/service-pages.ts`, footer, nav, homepage
   data) in the same commit.
4. Update `sitemap.ts` + canonicals +
   `docs/seo/page-seo-map.md`.
5. Record the change in this file (old → new → redirect type) for the audit
   trail.

## Migration log

| Date | Old | New | Redirect |
|---|---|---|---|
| 2026-09-22 | — (none) | current inventory above | n/a |