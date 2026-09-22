# Local SEO & Schema Plan — Festive Occasions

## Local SEO foundation

Needs (verified by client):
- Consistent business name: **Festive Occasions**
- Phone (WhatsApp + call), email
- Service area (Dubai + UAE regions served)
- Opening hours
- Google Business Profile (claimed & managed)
- Social profiles
- Local content (real project locations only)
- `NAP` (Name, Address, Phone) consistency across the web

"Do not guarantee 'near me' ranking — Google varies by location/context."

## Location strategy

Location pages ONLY if:
1. Festive Occasions genuinely serves that area, AND
2. Each page has genuinely useful unique content.

No mass-generated doorway pages. Google emphasizes helpful, people-first content.

## Schema plan (JSON-LD — accurate info only)

| Schema | Where | Notes |
|---|---|---|
| `LocalBusiness` (or `ProfessionalService`/`HomeAndConstructionBusiness`) | `/` + `/contact` | name, url, phone, email, geo/serviceArea, openingHours, sameAs |
| `Organization` | `/` | brand foundation |
| `WebSite` | `/` | name, url, potentialAction SearchAction (if search exists) |
| `WebPage` | all pages | via Next metadata |
| `Service` | each service page | serviceType, provider, areaServed, description |
| `BreadcrumbList` | inner pages | breadcrumb trail |
| `FAQPage` | pages with FAQ | question/answer from real FAQ |

## Strict rules

- Never: fake rating, fake reviews, fake price, fake address, fake hours.
- Only publish schema that matches reality.
- `sameAs`: only real social/external profiles client confirms.