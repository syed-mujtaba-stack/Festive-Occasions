# Design System — Festive Occasions

All values are design tokens in `app/globals.css` (CSS variables + Tailwind v4 `@theme`). No random values in components — always reference tokens.

## 1. Color system

### Neutrals (primary surfaces)
| Token | Hex | Use |
|---|---|---|
| `--color-ivory` | `#FBF8F3` | Primary background (warm ivory) |
| `--color-cream` | `#F3EDE3` | Soft cream surfaces, cards |
| `--color-espresso` | `#262020` | Primary text / headings |
| `--color-night` | `#171312` | Near black — dark sections, footer, hero overlay |
| `--color-cocoa` | `#6B5D50` | Muted secondary text on light, meta |
| `--color-warm-gray` | `#93877A` | Tertiary text / captions |

### Accents
| Token | Hex | Use |
|---|---|---|
| `--color-champagne` | `#C6A15B` | Champagne gold — CTAs, eyebrows, lines, hover |
| `--color-champagne-soft` | `#E5D3AC` | Gold tints, hairlines |
| `--color-burgundy` | `#6E2C33` | Muted burgundy — accents, badges |
| `--color-evergreen` | `#1F3A2D` | Deep evergreen — secondary accents, winter section |

### Rules
- Avoid bright Christmas red everywhere, neon green, excessive gold, childish colors, excessive gradients.
- Christmas must feel expensive, elegant, warm.

## 2. Typography

Maximum 2 families.

| Role | Font | Weights |
|---|---|---|
| Display (H1, major H2, campaign statements) | **Cormorant Garamond** (serif, editorial) | 300/400/500(+italic) |
| Body (paragraphs, nav, buttons, labels) | **Manrope** (modern sans) | 400/500/600/700 |

### Fluid type scale
- `--text-hero`: clamp(3rem, 8vw, 7rem) — Hero H1
- `--text-h1`: clamp(2.5rem, 5.5vw, 4.5rem)
- `--text-h2`: clamp(2rem, 4vw, 3.25rem)
- `--text-h3`: clamp(1.35rem, 2.5vw, 1.9rem)
- `--text-lead`: clamp(1.125rem, 1.6vw, 1.375rem)
- `--text-body`: 1rem / 1.0625rem
- `--text-small`: 0.875rem
- `--text-label`: 0.6875rem / 0.75rem — uppercase tracked labels

### Letter spacing
- Labels/eyebrows: `0.22em` uppercase
- Display headings: `-0.01em` to `-0.02em`

## 3. Spacing & layout

- Container max-width: `1280px` (`--container`)
- Section spacing: `--section-y: clamp(5rem, 10vw, 8.5rem)` (py)
- Section inner gap: `--section-gap: clamp(2.5rem, 5vw, 4rem)`
- Grid gap base: `1.25rem` / `1.5rem`
- Page gutter (mobile): `1.25rem`; desktop: `2.5rem`

## 4. Borders / radius / shadows

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | small UI |
| `--radius-md` | 12px | cards/pills |
| `--radius-lg` | 20px | large media frames |
| `--radius-full` | 999px | buttons, pills |
| Hairline | `1px solid rgba(38,32,32,0.12)` | borders on light |
| Hairline dark | `1px solid rgba(251,248,243,0.14)` | borders on dark |
| `--shadow-soft` | `0 20px 60px -20px rgba(23,19,18,0.25)` | cards on light |
| `--shadow-card` | `0 30px 80px -30px rgba(23,19,18,0.5)` | media frames |
| `--shadow-glow` | `0 0 0 1px rgba(198,161,91,0.2), 0 20px 60px -20px rgba(198,161,91,0.35)` | CTA hover |

## 5. Buttons

| Variant | Style |
|---|---|
| Primary | Champagne gold bg, espresso text, bold, radius-full, px-7 py-3.5, hover glow |
| Dark | Night/espresso bg, ivory text, hover bg-champagne |
| Outline | Hairline border, text current color, hover border-champagne |
| WhatsApp | `#25D366`-tinted or brand-approved; icon + label |

## 6. Image ratios

- Hero: full-viewport bleed (16:9+ wide)
- Editorial media: 4:5 / 3:4 / 16:10 mixed
- Gallery: masonry — portait 4:5 and landscape 16:10 mix
- Service thumb: 4:5

## 7. Motion

| Token | Value |
|---|---|
| `--ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--ease-out-quart` | cubic-bezier(0.25, 1, 0.5, 1) |
| Fast | 300ms |
| Base | 600ms |
| Slow (hero) | 900–1200ms |
| Scroll scrub | `scrub: 1`, `ease: "none"` |

## 8. Breakpoints

375 / 390 / 414 / 768 / 1024 / 1280 / 1440 / 1920.
Mobile compositions are intentionally designed — not shrunk desktop.

## 9. z-index

- Sticky nav: `50`
- Mobile menu overlay: `60`
- Floating actions (WhatsApp/Call): `70`
- Preloader: `80`