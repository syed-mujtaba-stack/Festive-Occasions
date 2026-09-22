# Animation QA — Festive Occasions

Run during Phase 12. Reference: brief §40, `docs/animation/*`.

## Test conditions

| Scenario | Check |
|---|---|
| Initial load | Hero timeline completes, no flicker, no FOUC (JsDriver gates `[data-reveal]`) |
| Slow scroll | Pins/scrubs track scroll 1:1, no lag |
| Fast scroll | No broken pinning, triggers don't stack |
| Reverse scroll | Timeline reverses cleanly (scrub), no jumps |
| Resize | Recalculate ScrollTriggers (ScrollTrigger.refresh on resize), no clipped content |
| Refresh / route change | No duplicate ScrollTriggers, cleanup works (useGSAP) |
| Back / forward | State restored; no stuck pins |
| Reduced motion | All scroll/cursor effects disabled; content fully visible statically |
| Mobile / touch | Native scroll ok, no Lenis on touch, pinned section simplified, no horizontal overflow |

## Failure symptoms to hunt
- Flicker / jumping on scroll
- Broken pinning (section resets mid-scroll)
- Duplicate triggers (animation runs twice)
- Layout shift from hidden→shown reveal states
- Horizontal overflow from animated elements (check with devtools at 375)
- Console errors (check zero)

## Tools
- DevTools performance recording during scroll — verify no long tasks.
- `prefers-reduced-motion` emulation in DevTools.
- Mobile device emulation for touch scrolling.

## Rules being verified
- Only `transform`/`opacity` animated.
- `ease: "none"` on all scrub timelines.
- ScrollReveal reused instead of dozens of bespoke triggers.
- SplitText headings remain accessible (aria-handled, text not hidden).

## Log (run results)
| Date | Page | Result | Notes |
|---|---|---|---|
| — | — | — | to be filled in Phase 12 |