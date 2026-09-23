# Visual QA — Festive Occasions

Run during Phase 12 (and after any design change). Reference: brief §32.

## The 200K test

> "Agar main 200k pay kar raha hota, kya mujhe ye premium lagti?"

If any section fails this test → redesign it. The failure modes to watch:

- Generic template feel (cards everywhere, SaaS layout)
- Cheap Christmas template (bright red/green, clipart, snowflake clutter)
- "Developer portfolio" over-animation (particles, 3D, excessive glows)

## Section-by-section checklist

### Hero
- [ ] Feels cinematic — large typography dominates viewport
- [ ] Media reveal + slow settle, ~1s, no flash of unstyled content
- [ ] Eyebrow `FESTIVE OCCASIONS · DUBAI · UAE` → H1 → copy → CTAs hierarchy
- [ ] Nav transparent over hero, readable

### Brand statement / Intro
- [ ] Oversized editorial statement (WE DON'T DECORATE SPACES…)
- [ ] Split composition balanced; image art direction consistent
- [ ] Copy concise, human, not AI-sounding

### Services
- [ ] Editorial rows, not generic cards; numbers elegant
- [ ] Hover interactions subtle and purposeful
- [ ] Pillar-to-service clarity preserved (anchors to service pages)

### Signature transformation
- [ ] Pinned moment is the strongest memory of the site
- [ ] Empty→full transformation believable, no "fake before/after" claims
- [ ] No broken pinning / jumping on scroll (test both directions)

### Gallery
- [ ] Luxury editorial, not a stock-photo dump
- [ ] Filters usable; images consistent tonal world (warm golden light)

### Process / Why us / FAQ / CTA
- [ ] Process timeline elegant; FAQ typography premium (left heading / right accordion)
- [ ] Final CTA full-screen cinematic

### Footer / global
- [ ] Footer complete (NAP, services, links), premium not cluttered
- [ ] No orphan links

## Consistency audits
- One visual world: all images share warm/golden/night-lit aesthetic.
- Gold used sparingly; ivory/espresso dominant.
- Type is the hero; spacing generous.

## Method
- Screenshot at 1440/1920 and 375/390 — verify art direction per breakpoint.
- Compare against `docs/design/*` tokens; no off-palette stray colors.
- Final sign-off requires the client's visual review at localhost.

## Image review — 2026-09-23 (transitional slate, 53/53 slots)
- All 53 seasonal slots were re-picked from CC0/pdm pools; rejects (military,
  museum accession numbers, White House repeats, government press photos,
  phonetography, low-res, church "Hanging of the Greens", off-topic lightpanels)
  were removed and re-picked from rich cached pools. `audience-venue.jpg`
  deleted per client, slot re-filled with an on-topic Christmas-market photo.
- Final sizing run: `DONE ok=53 fail=0` — every slot has a file on disk.
- ⚠️ This agent cannot visually inspect pixels (read tool returns
  image-not-supported): quality review is **metadata-based** (titles, tags,
  dimensions, sources). A human eyeball pass over
  `public/images/christmas/*.jpg` before final client review is strongly
  recommended — a printable contact sheet can be generated if desired.
- All imagery is *placeholder*: swap for client's real project photos per the
  manifest (`lib/images.ts`) before launch.