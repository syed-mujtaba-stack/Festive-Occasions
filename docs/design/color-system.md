# Color System — Festive Occasions

Source of truth: `app/globals.css` `:root` + `@theme inline`. Christmas is
communicated through imagery, lighting, texture and atmosphere — **not** bright
red/green. Palette is warm luxury editorial.

## Neutrals (primary surfaces)

| Token | Hex | Use |
|---|---|---|
| `--color-ivory` | `#FBF8F3` | Primary background (warm ivory) |
| `--color-cream` | `#F3EDE3` | Soft cream — cards, alternates |
| `--color-espresso` | `#262020` | Primary text / headings |
| `--color-night` | `#171312` | Near-black — hero overlay, footer |
| `--color-cocoa` | `#6B5D50` | Muted secondary text on light |
| `--color-warm-gray` | `#93877A` | Tertiary text / captions |

## Accents (used sparingly)

| Token | Hex | Use |
|---|---|---|
| `--color-champagne` | `#C6A15B` | Champagne gold — CTAs, eyebrows, lines, hovers |
| `--color-champagne-soft` | `#E5D3AC` | Gold tints, hairlines |
| `--color-burgundy` | `#6E2C33` | Muted burgundy — subtle accents |
| `--color-evergreen` | `#1F3A2D` | Deep evergreen — winter accents |

## Functional tokens

- `--color-foreground` = espresso; `--color-background` = ivory.
- Shadows: `--shadow-soft`, `--shadow-card`, `--shadow-glow` (champagne-tinted).
- Hairline borders (`hairline` utility) for editorial dividers.

## Rules

- **Gold must be subtle** — never the dominant color; it marks actions and lines.
- Dark sections use `night`/`espresso` with champagne-soft accents for contrast.
- Text contrast: text on ivory must be espresso/cocoa (never warm-gray for body);
  warm-gray reserved for captions/meta. WCAG AA maintained.
- No gradients where a flat editorial surface is stronger; no neon anywhere.