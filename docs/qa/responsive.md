# Responsive QA — Festive Occasions

## Breakpoint targets

Test at: **375 · 390 · 414 · 768 · 1024 · 1280 · 1440 · 1920**

Rule: mobile compositions are *intentionally designed*, not shrunk desktop.

## Homepage checklist (current build)

| Area | Desktop 1440/1920 | Tablet 768/1024 | Mobile 375/390/414 |
|---|---|---|---|
| Navbar | transparent → solid on scroll, full links | links visible | hamburger + full-screen menu |
| Hero | full-viewport, split lines, CTAs row | stacked | stacked, large display type fits |
| Intro | 2-col grid | stacked | stacked |
| Services | 5-col list w/ hover image | 4-col | number/title stacked |
| Signature | pinned clip-path scroll | pinned | pinned (verify no jump) |
| Audiences | 3-col cards | 3-col | 1-col |
| Gallery | editorial 3-col masonry | 2-col | 1-col |
| Process | sticky heading + timeline | stacked | timeline |
| WhyUs | 3-col cards | 2-col | 1-col |
| FAQ | 2-col sticky + list | stacked | stacked |
| FinalCTA | centered statement | centered | centered |
| Floating actions | bottom-right | bottom-right | above safe area, above mobile bar |
| Footer | 4-col | 2-col | 1-col |

## To verify on device (browser/screenshot)

- [ ] No horizontal overflow at any breakpoint
- [ ] No text clipping in hero H1 (longest word "reimagined." at 375px)
- [ ] Signature pin does not jitter on iOS Safari
- [ ] Mobile menu opens/closes without scroll jump
- [ ] Floating actions don't overlap footer text
- [ ] `prefers-reduced-motion` — all content visible, no pin, no parallax