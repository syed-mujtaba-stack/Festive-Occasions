# Image Assets — Festive Occasions

## Status: Transitional imagery (CC0 / public domain)

All site images are currently high-quality festive decoration photos
downloaded from **Openverse** (CC0 / public-domain search pool; downloads come
from the source CDN, e.g. `live.staticflickr.com`). No attribution is
required, and the source + license per file is recorded in
`.unsplash-cache/openverse/downloads-record.json`.

> ⚠️ **These are placeholders, not the client's real work.**
> Swap with real client project photos before final launch. Every section has
> its own dedicated image slot — no section reuses another's photos. Update the
> `src` per slot in `lib/images.ts` and every section, gallery and card updates
> from that single source.

## Downloader quality pipeline (`scripts/download-christmas-images.js`)

- Queries target the **Christmas-decoration niche** per slot, with alt queries
  for thin result pools (Openverse cc0/pdm often returns 0 for long tail).
- `BAD_TITLE` regex rejects obviously unrelated/archival subjects (military,
  museums, lakes, plants, shops, monks, courthouses, etc.).
- `GOOD_TITLE` regex **prefers** candidates whose title/tags carry festive
  keywords (christmas, xmas, wreath, bauble, lights, etc.); falls back to any
  non-BAD pick so thin pools still fill.
- Every file is transcoded through sharp (max 2400px, q82) and validated with
  a minimum 900px edge; tiny product shots are rejected and the next candidate
  tried.
- The runs are resumable: existing files are skipped, and the `used` source set
  (from `downloads-record.json`) prevents re-picking the same image across
  slots/runs.
- `search()` caches up to **3 pages (60 results)** per query under
  `.unsplash-cache/openverse/` (git-ignored) so rich queries aren't exhausted at
  20 results; per-query caches are deleted + refetched when a thin pool is
  exhausted.
- Review runs (~5 total, 2026-09-23) re-picked every slot until on-disk titles
  carried festive keywords. Slots exhausted by the `used` set are pointed at
  richer cached pools (`christmas party decoration`, `christmas lights street
  evening`) with spread offsets — confirmed workable candidates are dumped via
  `scripts/list-candidates.js` (read-only metadata review since this toolchain
  cannot visually inspect images).

## Current slate (2026-09-23)

- 53 image slots (hero, intro, CTA, audiences, packages, services, detail strip,
  blogs, support pages) + 12 client photos.
- **All 53 slots populated** — `DONE ok=53 fail=0` on the final sizing run.
  Re-picks for the last 6 gaps + 6 questionable files came from the rich cached
  `christmas party decoration` / `christmas lights street evening` pools
  (e.g. Carnaby Street lights, Faneuil Hall, Madrid Alcalá/Plaza Mayor,
  rawpixel "Free Christmas …" product shots).
- Client-requested `audience-venue.jpg` was **deleted**; slot re-filled with an
  on-topic Christmas-market photo (transitional placeholder — client swaps later).
- Record note: 41 of 53 slots have `downloads-record.json` entries. The 12
  "(no record)" files (hero, intro, CTA, some pkg/svc/pillar slots) predate the
  record-writing downloader — they are verified on disk and pass size checks.
- 24/7 hours + weekend-closed wording verified and used in `lib/site.ts`,
  contact JSON-LD and footer (see `docs/seo/schema-plan.md`, `docs/qa/seo-qa.md`).
- Diagnostics: `scripts/diag-images.js` (53-slot state dump) and
  `scripts/list-candidates.js` (dump pickable cached candidates) — keep both;
  they are read-only and useful for future image swaps.

## Where images live

- Manifest: `lib/images.ts` (single place to swap `src` per slot)
- Transitional files: `public/images/christmas/*.jpg` (CC0 / public domain)
- Real client photos: `public/images/client/client-01.jpg … client-12.jpg`

## Section → image slot map

| Section / page | Manifest key (file) |
|---|---|
| Hero (home + internal) | `hero` (`hero-signature.jpg`) |
| Home intro | `homeIntro` (`home-intro.jpg`) |
| Signature details | `signatureDetails` (`signature-details.jpg`) |
| Final CTA glow | `finalCtaGlow` (`final-cta-glow.jpg`) |
| Audiences — villa | `audienceVilla` (`audience-villa.jpg`) |
| Audiences — office | `audienceOffice` (`audience-office.jpg`) |
| Audiences — venue | `audienceVenue` (`audience-venue.jpg`) |
| Package cards | `pkgCheers` / `pkgFancy` / `pkgLuxury` |
| Services index + heroes | `svcComplete` … `svcOutdoor` (7) |
| Service page details | `detailPillar1-3` … `detailOutdoor1-3` (21) |
| Blog covers | `blog1` … `blog8` |
| Support page heroes | `pageAreas`, `pageAbout`, `pageAboutPortrait`, `pageContact`, `pageOther`, `pageUae`, `pageBlog` |
| Gallery (client) | `client01` … `client12` |

## Replacing with client photos

1. Client supplies real project photos (see `docs/client/client-data-required.md`).
2. Save to `public/images/` (e.g. `public/images/client/client-13.jpg`).
3. Update the matching entry in `lib/images.ts` (`src` → new file) — gallery
   and every section update automatically.
4. Add up to 35 total gallery entries in `lib/gallery.ts` (client photos lead
   the set; styling imagery stays only as transitional fills).
5. Remove the transitional file from `public/images/christmas/` once swapped.

**Do not** publish the site with transitional styling imagery alone — the
portfolio and gallery must show the client's actual verified work.