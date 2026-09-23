# Current Website Audit — Festive Occasions

Audited: 2026-09-22 · Branch `feature/premium-christmas-revamp` · Next.js 16.3.5

## What exists today

All of the below is committed and `npm run build` passes. Dev server verified
on `http://localhost:3000` — all routes return 200 with correct H1s.

### Routes (14 static)

| Route | Type | Status |
|---|---|---|
| `/` | Homepage | ✅ cinematic hero, intro, services list, signature pin, audiences, gallery, process, why-us, FAQ, final CTA |
| `/christmas-decoration-dubai` | Pillar service | ✅ absorbs former tree service |
| `/christmas-villa-decoration-dubai` | Service | ✅ |
| `/christmas-home-decoration-dubai` | Service | ✅ |
| `/christmas-office-decoration-dubai` | Service | ✅ |
| `/christmas-corporate-decoration-dubai` | Service | ✅ |
| `/christmas-lighting-dubai` | Service | ✅ |
| `/outdoor-christmas-decoration-dubai` | Service | ✅ |
| `/gallery` | Portfolio | ✅ numbered editorial grid (35 looks) |
| `/about` | Brand | ✅ |
| `/areas-we-serve` | Local | ✅ honest coverage copy |
| `/contact` | Lead gen | ✅ WhatsApp quote form + LocalBusiness JSON-LD |
| `/other-occasions` | Extended | ✅ |

### Global layer
- Navbar: transparent over hero → dark/blur after scroll; full-screen mobile menu.
- Footer: services columns, company links, contact NAP.
- FloatingActions: WhatsApp + call (mobile).
- `JsDriver` progressive-enhancement, `SmoothScroll` (Lenis, disabled for reduced motion).

### Design tokens (app/globals.css)
- Color: ivory, cream, espresso, night, cocoa, warm-gray + champagne, champagne-soft, burgundy, evergreen. Bright red/green avoided.
- Type: Cormorant Garamond (display) + Manrope (body), fluid clamps.
- Radius, shadows (soft/card/glow), easing tokens, container 1280px, hairline borders.
- `[data-reveal]` hidden states only under `.js-enabled`; reduced-motion restores visibility.

### Imagery
- 22 verified Unsplash images in `public/images/christmas/` (~9.5 MB), served via
  `next/image` through `lib/images.ts` manifest + `<FestiveImage>` component.
  Marked transitional in docs — client photos replace them (see `assets-audit.md`).
- Hero = night exterior lights (landscape, dark, cinematic).

## Gaps vs. the brief (implementation phase)

1. **SEO phase (11) not started** — no `sitemap.ts`, `robots.ts`, custom 404,
   favicon, per-page Service/FAQ JSON-LD, BreadcrumbList, or internal-linking pass.
2. **Custom cursor** (brief §8) — optional desktop-only, not implemented.
3. **Micro-interactions polish** — present but not exhaustive (no underline
   animations / nav reveal choreography).
4. **Analytics events** (brief §23) — none instrumented.
5. **Performance** — fonts/images fine, but no Lighthouse benchmark yet.
6. **Accessibility pass** — focus styles + aria present; full keyboard/a11y QA pending.
7. **Mobile signature experience** — reduced-motion respected and mobile works,
   but no dedicated mobile-specific choreography beyond the desktop one.

## Preserve
- The design token system (color/type/spacing) — it matches the brief's palette.
- Hero timeline + signature pin experience (two of the three "memorable moments").
- Service page template + data layer (`lib/service-pages.ts`).
- Honest placeholder policy (no fabricated reviews/projects/locations).
- Progressive enhancement + reduced-motion handling.

## Replace / improve
- Services on homepage are currently a hover list — brief §04 asks for a
  cinematic **pinned service storytelling** experience. Consider upgrading.
- Gallery homepage section is a masonry grid — brief §06 asks for large
  **editorial project presentations**.
- Testimonials carve-out exists but is empty (correct — verify with client).