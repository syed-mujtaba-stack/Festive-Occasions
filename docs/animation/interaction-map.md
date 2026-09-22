# Interaction Map — Festive Occasions

Every animation must have a purpose (brief §10). Layer: `animations/registry.ts`
registers GSAP/ScrollTrigger/SplitText + `useGSAP`, `JsDriver`
(progressive enhancement), `prefersReducedMotion()`. Per-component timelines
live inline via `useGSAP` in each section (scope-scoped for cleanup).

## Desktop interactions

| # | Element | Trigger | Effect | Purpose |
|---|---|---|---|---|
| 1 | Navbar | page load / scroll | Transparent over hero → dark blur after scroll; reveal slide | Orientation, wayfinding |
| 2 | Hero media | load | Scale 1.05 → 1 (cinematic settle) | First impression — "200k feel" |
| 3 | Hero text | load | Staggered eyebrow → H1 lines → copy → CTAs (~1s total) | Cinematic entrance, hierarchy |
| 4 | Intro / section text | scroll into view | `[data-reveal]` fade+rise (ScrollReveal) | Editorial pacing |
| 5 | Services rows | hover | Number → champagne, title lift, image scale, arrow shift | Signals interactivity |
| 6 | Signature section | scroll | Pinned; clip-path inset → full; decor elements appear; title items stagger | Memorable transformation moment |
| 7 | Gallery images | hover | Subtle scale + label reveal | Portfolio hover quality |
| 8 | Buttons | hover/focus | Border fill transition + arrow movement | Premium CTA feel |
| 9 | FAQ accordion | click | Height/opacity spring | Clean disclosure |
| 10 | Process steps | scroll | Sequential number/text reveal | Communicates method |
| 11 | Smooth scroll (Lenis) | — | Inertia scrolling; disabled for reduced-motion | Cinematic pacing |

## Mobile-only adjustments

- No Lenis on touch; native scroll.
- Pinned signature section simplified (clip reveals reduced, no heavy scrub).
- FloatingActions (WhatsApp + call) always visible — the primary conversion path.

## Reduced-motion

- `prefersReducedMotion()` → skip pinned timelines; `[data-reveal]` elements
  rendered visible statically (CSS handles via `.js-enabled` gating); no Lenis.
- Content is **never** animation-dependent.

## Rules

- Animate only `transform` + `opacity` (compositor-friendly).
- Use `useGSAP` with `scope` + ScrollTrigger cleanup; kill on unmount.
- Scrub timelines: `ease: 'none'`, cap pinned distance (`+=160%` max).
- No independent ScrollTriggers counted in the dozens — reuse ScrollReveal.