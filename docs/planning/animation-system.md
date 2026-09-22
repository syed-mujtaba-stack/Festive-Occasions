# Animation System — Festive Occasions

## Stack

- GSAP + ScrollTrigger
- @gsap/react (useGSAP — auto cleanup)
- SplitText (text reveal for editorial headings)
- Lenis (smooth scrolling, optional — enabled only when it improves feel)

## Animation hierarchy (never animate everything)

| Level | Area | Quality |
|---|---|---|
| 1 | Hero | Highest — cinematic timeline |
| 2 | Major sections | Scroll storytelling (scrub, pin) |
| 3 | Components | Micro-interactions (hover, arrow) |
| 4 | Decorative | Minimal |

## Hero timeline (homepage)

```
0.0   hero media scale 1.08 (settles to 1)
0.2   overlay reveal
0.4   eyebrow
0.6   H1 line 1
0.75  H1 line 2
0.9   description
1.1   CTA buttons
1.3   decorative detail
```

No bounce, no crazy rotation, no excessive zoom, no random particles. Cinematic.

## Signature transformation section

Concept: "AN EMPTY SPACE → (scroll) → decor elements appear → image expands → TO CHRISTMAS MAGIC"
Implementation: pinned ScrollTrigger + scrub, image scale, clip-path, typography reveal.
Uses `trigger`, `scrub`, `pin` style experience (documented in GSAP skill).

## Key rules

- Always `gsap.registerPlugin(ScrollTrigger)` before use
- Scrub: always `ease: 'none'`
- Use `useGSAP` in React (never raw useEffect for GSAP triggers)
- Animate only `transform` and `opacity` (perf) unless truly needed
- `prefers-reduced-motion`: remove parallax, reduce transitions, remove cursor effects, simplify ScrollTrigger
- SplitText for headings only where it adds editorial value; keep the DOM accessible (aria-hidden on split spans, original text visible to screen readers via `split` config with `aria` handling)

## Utilities

```
animations/hero.ts        — createHeroTimeline({scope})
animations/scroll.ts      — useScrollReveal(targets)  (fade-up on enter, once)
animations/textReveal.ts  — useTextReveal(headingRef)
animations/hover.ts       — magnetic/arrow micro-interactions (desktop only)
```
Only create utilities that genuinely improve maintainability — no premature abstraction.

## Reduced motion

Respect `prefers-reduced-motion: reduce`. Content must remain fully accessible.