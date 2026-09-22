# Layout System — Festive Occasions

## Grid & container

- Max container: `1280px` (`--container`) — centered, generous side padding on
  mobile (`px-5`–`px-8` scale).
- Components live in `components/ui/section.tsx`:
  - `<Section>` — semantic `<section>` with `tone` ("ivory" | "cream" | "night"
    | "espresso"), vertical rhythm (`py-24 md:py-36`), optional `id` for anchors.
  - `<Container>` — the 1280px wrapper.
  - `hairline` utility — 1px editorial border (`rgba(38,32,32,0.12)`).

## Vertical rhythm

- Section spacing: `py-20 → py-28 → py-36` scaling up with breakpoints.
- Headings get generous `leading-tight`; body `leading-relaxed`.

## Breakpoints (mobile intentional, not shrunken desktop)

| Breakpoint | Notes |
|---|---|
| < 640 | Single column; stacked CTAs; full-bleed imagery; simplified pinned effects |
| 640–1023 | Two-column splits where valuable |
| 1024+ | Editorial grids: hero split, service rows, gallery grids |

## Rows & compositions

- **Hero:** full-bleed media + overlay, content column-left, `min-h-[100svh]`.
- **Split sections:** `lg:grid-cols-2` (copy left / image right) with `gap` and
  staggered reveals (see `intro.tsx`, `about`).
- **Service index (homepage):** editorial numbered rows — `border-t hairline`,
  number · title · excerpt · image · arrow; hover state lifts title/gold.
- **Gallery:** responsive grid — `2 cols @sm, 3 @lg`; filterable, client-side.
- **Footer:** 4-column desktop, stacked mobile, NAP + services columns.

## Whitespace

Whitespace is a first-class design element — prefer more space over more
elements. Cards are flat (no heavy shadows on light surfaces); depth comes from
imagery and typography, not box styling.