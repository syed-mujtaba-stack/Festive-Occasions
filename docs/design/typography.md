# Typography — Festive Occasions

Source of truth: `app/globals.css` tokens. Loaded via `next/font/google` in
`app/layout.tsx` — **Cormorant Garamond** (display) + **Manrope** (body).

## Families (max 2 — per brief)

| Role | Font | Weights used |
|---|---|---|
| Display | Cormorant Garamond (serif, editorial) | 300/400/500 + italic |
| Body | Manrope (modern sans) | 400/500/600/700 |

## Fluid scale (Tailwind v4 tokens → utilities)

| Token | Value | Usage |
|---|---|---|
| `--text-hero` | `clamp(3rem, 8vw, 7rem)` | Homepage H1 |
| `--text-h1` | `clamp(2.5rem, 5.5vw, 4.5rem)` | Page H1s |
| `--text-h2` | `clamp(2rem, 4vw, 3.25rem)` | Section titles |
| `--text-h3` | `clamp(1.35rem, 2.5vw, 1.9rem)` | Card / service titles |
| `--text-lead` | `clamp(1.125rem, 1.6vw, 1.375rem)` | Intro/lead copy |
| `--text-body` | `1rem` | Body |
| `--text-meta` | `0.75rem–0.8125rem`, uppercase, letter-spacing | Eyebrows, labels, meta |

## Rules

- Typography is a **major visual element** — large display headings with generous
  whitespace; hero H1 may occupy a large portion of the viewport.
- Letter-spacing: tighter on display, wider (uppercase) on eyebrows/labels.
- Emphatic words inside headings get italic serif + `text-champagne`
  (e.g. `styled as one.`).
- Controlled line lengths: body copy ≤ ~65ch.
- Headings animation via GSAP SplitText only where it adds editorial value;
  underlying text stays accessible (aria handling), never hidden to SEO.

## Implementation notes

- All headings use `font-display` (Cormorant); all UI text (nav, buttons,
  labels, meta) uses `font-sans` (Manrope).
- No third font family added for icons — icon set is `react-icons` (inline SVG,
  inherits currentColor).