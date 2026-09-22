# Information Architecture — Festive Occasions

## Principles
- One primary search intent per page; no thin doorway pages.
- Depth ≤ 2 from the homepage to any service page.
- Every page must be reachable via at least one contextual path beyond the nav.
- Lead-gen (WhatsApp / call / quote) reachable from every page (nav CTA,
  FloatingActions, footer, in-page CTAs).

## Tree

```
/  (HOMEPAGE — brand statement + journey)
├── Christmas section   ──▶ /christmas-decoration-dubai   (PILLAR)
│     ├── /christmas-tree-decoration-dubai
│     ├── /christmas-villa-decoration-dubai
│     ├── /christmas-home-decoration-dubai
│     ├── /christmas-office-decoration-dubai
│     ├── /christmas-corporate-decoration-dubai
│     ├── /christmas-lighting-dubai
│     └── /outdoor-christmas-decoration-dubai
├── Portfolio           ──▶ /gallery
├── Brand               ──▶ /about  ·  /areas-we-serve  ·  /other-occasions
└── Conversion          ──▶ /contact
```

## Navigation (desktop)
`Logo · Christmas · Services · Gallery · About · Contact · [GET A QUOTE]`
- "Christmas" → pillar page. "Services" → homepage `#services` anchor today;
  brief prefers a dedicated services hub — decision in page-plan.

## Content model (single source of truth)
- `lib/site.ts` → NAP, WhatsApp link builder
- `lib/services.ts` → service list used by homepage, footer, service pages
- `lib/service-pages.ts` → per-page unique copy for 8 service routes
- `lib/gallery.ts` → portfolio projects (placeholder-tagged)
- `lib/images.ts` → image manifest (single swap point for client photos)

## Conversion path (every page)
1. GET A QUOTE → `/contact` or homepage `#quote`
2. WHATSAPP US → pre-filled wa.me message
3. CALL US → mobile FloatingActions + footer