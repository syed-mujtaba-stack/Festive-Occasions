# Implementation Plan — Festive Occasions

## Phases (from spec)

- **Phase 0 — Safety** ✅ branch + deps (done)
- **Phase 1 — Audit** — docs/audit/* (repository-audit, current-website-audit, assets-audit, seo-audit)
- **Phase 2 — Research** — competitors, keywords, UX patterns (docs/seo/*)
- **Phase 3 — Planning** — vision, IA, page-plan, component-plan, design system, animation system, implementation (docs/planning, docs/design, docs/animation)
- **Phase 4 — Design Foundation** — fonts, colors, spacing, buttons, navigation, containers, typography
- **Phase 5 — Homepage** — Navbar, Hero, Intro, Services, Signature animation, Gallery, CTA, Footer → **STOP for visual review**
- **Phase 6 — Polish Homepage** — spacing, typography, animation, image treatment, mobile, performance
- **Phase 7 — Service Pages** — pillar + tree, villa, home, office, corporate, lighting, outdoor
- **Phase 8 — Supporting Pages** — gallery, about, contact, areas, other-occasions
- **Phase 9 — SEO** — metadata, canonical, schema, sitemap, robots, internal links, alt, content
- **Phase 10 — Local SEO** — Google Business Profile (client), NAP, service areas
- **Phase 11 — Performance** — images, fonts, JS, GSAP, video (docs/performance/performance-plan.md)
- **Phase 12 — QA** — responsive, animation, SEO, performance, final walkthrough (docs/qa/*)

## Current status

| Phase | Status |
|---|---|
| 0 Safety | ✅ branch + deps |
| 1-3 Audit/Research/Planning | ✅ docs complete — **docs restructured to brief layout 2026-09-22** (audit, planning, design, animation, seo, performance, qa dirs) |
| 4 Design Foundation | ✅ tokens + utilities (globals.css: palette, type scale, shadows, easings) |
| 5 Homepage | ✅ built & committed (3edfe48) — reviewed |
| 6 Polish Homepage | ✅ real imagery integrated (Unsplash manifest, 9.5 MB set) — polish pass pending |
| 7 Service Pages | ✅ pillar + 7 service pages built (ServicePageTemplate + lib/service-pages.ts) |
| 8 Supporting Pages | ✅ gallery (filters), about, contact (quote form + LocalBusiness schema), areas-we-serve, other-occasions |
| 9 SEO | ✅ **done (committed next)** — sitemap.ts, robots.ts, branded 404, icon.svg, Service/FAQPage/Breadcrumb JSON-LD per service page, Organization+WebSite JSON-LD home, breadcrumbs + related-services, **fixed missing Navbar/Footer on all inner pages (PageShell)**, skip-link |
| 9b Content Hub | ✅ **blog added 2026-09-23** — /blog index + 6 guides (packages/pricing, villa, trees, office/corporate, outdoor/lighting, booking timeline); Article+FAQPage schema per post; canonical; sitemap routes; nav+footer links; client-verified copy only |
| 10 Local SEO | ⏳ pending client data (GBP = client action; NAP placeholders in lib/site.ts) |
| 11 Performance | 🔶 code-level groundwork done 2026-09-22 (font weights trimmed 10→4 Cormorant, 5→3 Manrope; AVIF/WebP config; poweredByHeader off) — **Lighthouse blocked** (no browser session); run when browser available |
| 12 QA | 🔶 code-level sweep done 2026-09-22 (16/16 routes 200·canonical·H1·schema; JSON-LD parse-valid; 0 broken links; 21/21 images) — visual/animation/reduced-motion QA blocked (needs browser) |

## Definition of done (checked at end)

Premium UI • Responsive • GSAP animations • smooth scrolling • hero polished • gallery polished • services polished • mobile polished • real content • no fake reviews/claims • SEO metadata • technical SEO • local SEO foundation • schema • sitemap • robots • canonicals • internal linking • optimized images • accessibility • Lighthouse checked • build passes • no critical console errors • no broken routes • no horizontal overflow • WhatsApp/call/quote form work • final client walkthrough.