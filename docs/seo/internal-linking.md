# Internal Linking — Festive Occasions

Goal: clear hierarchy, crawlable paths, contextual anchor text (brief §21). No
orphan pages — every route reachable from nav + at least one contextual link.

## Hierarchy

```
Homepage
 └─▶ /christmas-decoration-dubai   (pillar — linked from hero, services, "Christmas" nav)
      ├─▶ /christmas-tree-decoration-dubai
      ├─▶ /christmas-villa-decoration-dubai
      ├─▶ /christmas-home-decoration-dubai
      ├─▶ /christmas-office-decoration-dubai
      ├─▶ /christmas-corporate-decoration-dubai
      ├─▶ /christmas-lighting-dubai
      └─▶ /outdoor-christmas-decoration-dubai
```

## Link sources (existing)

| From | To | Anchor |
|---|---|---|
| Navbar | pillar page | "Christmas" |
| Navbar | gallery, about, contact | — |
| Navbar CTA | `/contact` | GET A QUOTE |
| Homepage services rows | each service page | numbered rows (services data) |
| Homepage pillars CTA | `/contact` | GET A QUOTE / WHATSAPP |
| Service pages (template) | sibling services | "Explore: Villa · Home · Office …" |
| Service pages | gallery, contact | contextual CTAs |
| Footer | all service pages + company pages | descriptive anchors |
| FloatingActions | WhatsApp / call | — |

## Anchor-text rules

- Descriptive, keyword-relevant but natural: "Christmas Tree Decoration Dubai",
  "Villa Christmas Styling" — never "click here".
- Every service page links **up** to the pillar page and **across** to sibling
  services (breadcrumb-friendly).
- Contact/WhatsApp reachable from every page.

## To polish (SEO phase — completed 2026-09-22)

- [x] Breadcrumb nav component on service pages (visual + BreadcrumbList schema).
- [x] "Explore related services" block on every service page (4 sibling links).
- [x] Contextual in-copy links — sibling services linked from each page's
  related-services block; pillar-up links in breadcrumbs.
- [ ] Verify no dead links after any URL change (`docs/seo/url-migration.md`).