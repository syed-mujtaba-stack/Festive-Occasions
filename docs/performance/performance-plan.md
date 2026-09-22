# Performance Plan — Festive Occasions

Target: excellent Lighthouse without sacrificing visual quality (brief §26).
Baseline benchmark to be recorded during Phase 11.

## Strategy by lever

### 1. Images (biggest lever)
- All photography served via `next/image` (`<FestiveImage>`) — WebP/AVIF,
  responsive `srcset`, explicit dimensions, no CLS.
- Manifest in `lib/images.ts` keeps URLs + sizes in one place.
- Current local set: 22 images ~9.5 MB total — verify optimization (Next
  auto-optimizes; goal: LCP image load ≈ instant on 4G).
- Hero: `priority` + `fetchPriority="high"`, correct `sizes` for 100vw.
- Lazy-load below-the-fold with `loading="lazy"` + decoded fallback color
  (backgroundColor = ivory/espresso to prevent white flash).
- Once client photos arrive (real projects), re-check each file's size before
  adding — cap hero ~300 KB, section images ~120–200 KB (compressed).

### 2. Fonts
- `next/font/google` — self-hosted, `display: swap`, subsetting automatic.
- Two families only (Cormorant Garamond + Manrope), limited weights.
- Preload critical font files via Next's font loader (default behavior).
- No FOUT/FIAT shift: font-display swap + matching fallback metrics.

### 3. JS / bundles
- Keep `"use client"` scope minimal — only animated/section components.
- GSAP is tree-shaken (only ScrollTrigger, SplitText used).
- Lenis smooth-scroll module loaded once; no heavy third-party script tags.
- No analytics/chat scripts added until client-approved (tracking via
  lightweight custom events or deferred snippet only).
- Review bundle via `next build` output + bundle analyzer (add only if gains).

### 4. Motion performance
- Animate only `transform`/`opacity` (compositor-friendly) — enforced in
  `docs/animation/interaction-map.md`.
- ScrollTriggers: reuse ScrollReveal component; pin only Signature section.
- `will-change` used sparingly, removed after animation.

### 5. Core Web Vitals targets
| Metric | Target |
|---|---|
| LCP | ≤ 1.8 s (desktop), hero image |
| CLS | ≤ 0.05 |
| INP | < 200 ms |
| FCP | ≤ 1.5 s |

## Measurement plan (Phase 11)
- Lighthouse (mobile + desktop) on `/`, one service page, `/gallery`.
- Record scores + Web Vitals into `docs/qa/` run log.
- Check: no horizontal overflow, no layout shift on scroll (pinned section),
  no console errors, reduced-motion has no perf hit.
- Re-measure after client images swap.

## Keep-outs
- No multi-megabyte hero video unless client supplies optimized mp4 + poster
  + mobile fallback (not planned now).
- No heavy animation libraries beyond GSAP; no confetti/particle effects.