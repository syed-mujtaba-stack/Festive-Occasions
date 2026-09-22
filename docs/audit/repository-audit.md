# Repository Audit — Festive Occasions

Last updated: 2026-09-22 — supersedes the initial scaffold audit below. See
also `docs/audit/current-website-audit.md` for the built site state.

## Repository audit (2026-09-22 — current build)

- **Framework:** Next.js 16.3.5 (App Router), React 19.2.8, TypeScript 5
- **Styling:** Tailwind CSS v4 (@tailwindcss/postcss)
- **Dependencies:** gsap 3.15, @gsap/react 2.1, lenis 1.3, react-icons 5.7, clsx, tailwind-merge
- **Routes (14 static):** `/` + 8 service pages + gallery, about, contact, areas-we-serve, other-occasions
- **Animations:** `animations/registry.ts` (GSAP/ScrollTrigger/SplitText + useGSAP + JsDriver + prefersReducedMotion) + Lenis SmoothScroll + per-section useGSAP timelines
- **Data layer:** `lib/site.ts` (NAP/WhatsApp), `lib/services.ts`, `lib/service-pages.ts`, `lib/gallery.ts`, `lib/images.ts` (image manifest)
- **Images:** 22 Unsplash-verified photos in `public/images/christmas/` (~9.5 MB), served via next/image + FestiveImage
- **Branch:** `feature/premium-christmas-revamp` — commits 3edfe48, 51cf606, b369ada

## Live site audit

- No production deployment configured yet (no vercel/custom domain in repo).
- Dev server verified: all routes 200, correct H1s.
- Pending: client-verified NAP before launch; `docs/seo/url-migration.md` records route stability.

## Assets audit

- `docs/audit/assets-audit.md` — full licensed image inventory + replacement procedure.
- **No client images provided yet** — manifest (`lib/images.ts`) is the single swap point.

## Technical SEO audit (to implement — Phase 9)

- sitemap.xml (via `app/sitemap.ts`) — planned
- robots.txt (via `app/robots.ts`) — planned
- Canonical URLs — ✅ present per page
- Clean URLs, semantic HTML, heading hierarchy, alt text — ✅ built, QA pending
- 404 page (premium branded) — planned
- OpenGraph + Twitter metadata — ✅ root layout
- Structured data — /contact LocalBusiness ✅; Service/FAQPage/BreadcrumbList planned (docs/seo/schema-plan.md)

## Dependencies

Installed: `gsap`, `@gsap/react`, `lenis`, `react-icons`. No vulnerabilities (npm audit clean).