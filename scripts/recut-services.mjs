import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "node:fs";

/**
 * "What We Do" service images — re-cut to the frame they actually render in.
 *
 * WHY THIS EXISTS
 * The service stage renders every image inside a fixed 4:5 portrait frame
 * (components/sections/services.tsx, desktop stage AND mobile list). The
 * photos were never cut for that frame: several were cut to 16:9 landscape,
 * and one was built by upscaling a 590x609 file to 1600x1200. object-cover
 * then had to crop 45-60% of what was left, so the browser magnified a small,
 * already-soft region — the image looked cut off and blurry at the same time.
 *
 * This script re-cuts each slot to exactly 4:5 from its master, so the frame
 * crops NOTHING. Output masters are named svc-<slot>-45.jpg to keep the
 * frame-specific cuts separate from the gallery's project-NN.jpg photos.
 *
 * Frame maths (lg stage, 1440px viewport):
 *   right column of grid-cols-[0.92fr_1.08fr], pl-6vw/pr-7vw
 *   -> ~634 CSS px wide, 4:5 -> ~792 CSS px tall
 *   -> 2x DPR needs ~1268 x 1584 device px.
 *
 * RESOLUTION IS CAPPED BY THE SOURCE, not by this script. Where a slot's
 * master is only ~740px wide (a WhatsApp thumbnail), the cut is correctly
 * framed but still soft at 2x — that needs a better photo from the client,
 * not better code. The report below flags exactly which slots those are.
 *
 * Usage:  node scripts/recut-services.mjs           (all slots)
 *         node scripts/recut-services.mjs svcHome   (one slot)
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, "../public/Client Provider/Client Provider");
const OUT = path.join(__dirname, "../public/images/client-work");

const TARGET_W = 1200;
const TARGET_H = 1500; // 4:5 — must match aspect-[4/5] in services.tsx
const TARGET_RATIO = TARGET_W / TARGET_H; // 0.80
const NEEDS_2X = 880; // device px the 440px slot wants at 2x DPR
const SOFT_BELOW = 880; // flag if the cut is narrower than this

// The same seven photos also back each service page's PageHero, which is a
// full-bleed 100vw x 62svh band (~2.6:1). A 4:5 master dropped into that
// frame keeps only ~28% of its height, so every hero needs its own wide cut.
const HERO_W = 2400;
const HERO_H = 1350; // 16:9 — crops gracefully across viewport ratios
const HERO_RATIO = HERO_W / HERO_H;

/**
 * slot -> { raw, bias, note }
 *   raw   = original in public/Client Provider/Client Provider
 *   bias  = vertical focal bias, 0 = top, 0.5 = centre, 1 = bottom.
 *           Low values keep Christmas tree tops and hanging baubles in frame.
 *
 * Every raw here is a 24.5MP (4284x5712) original that is NOT used anywhere
 * on the homepage — the homepage gallery shows only the first six projects,
 * so these nine were sitting unused. Using them means the seven service
 * slides get photos that do not appear in the Portfolio section above them.
 *
 * One exception: svcLighting is a 1086x1448 WhatsApp export, not a 24.5MP
 * original. It was re-pointed at the client's request; the reason is on that
 * slot below.
 *
 * Nine candidates, seven slots — IMG_4910 and IMG_5058 are left as spares.
 *
 * IMG_4652, IMG_4682 and IMG_5058 were removed at the client's request. The
 * svc-corporate-* files had already been cut from IMG_4682 by an earlier run,
 * which is why the photo survived here after the raw was deleted — those two
 * exports were re-cut from unused photos by scripts/recut-corporate.mjs, which
 * is now the source of truth for this slot. The svcOffice slot is disabled:
 * its raw (IMG_4652) is gone and nothing on disk derives from it.
 */
/**
 * `heroRaw` / `heroBias` control the 16:9 PageHero master only — the 4:5 rail
 * crop above always comes from `raw`. Two rules now hold for all seven heroes:
 *
 *  1. The hero is NEVER the same photo as that page's own homepage rail slide.
 *     Each is flagged with the page it would otherwise have duplicated.
 *  2. `heroBias: 0.5` centres the 16:9 band. The heroes used to be cut at
 *     bias 0.14–0.18, which took the band off the TOP of a 3:4 portrait — so
 *     they showed roofline and ceiling while the blog heroes, which hand the
 *     whole photo to `object-cover`, showed the middle where the decoration
 *     actually is. Centring is what makes the two look the same.
 */
const SLOTS = {
  svcComplete: {
    raw: "IMG_3974 (1).jpg",
    // project-05.jpg — the only 24.5MP LANDSCAPE original in the library, so a
    // 16:9 hero keeps 75% of its height instead of the 42% a portrait gives.
    heroRaw: "project-05.jpg",
    heroBias: 0.5,
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 590x609 WhatsApp substitute upscaled to 1600x1200.",
  },
  svcVilla: {
    raw: "IMG_3986 (1).jpg",
    // IMG_4684 = project-21.jpg, g21 "Villa Staircase & Foyer Decoration".
    // 3024px still clears the 2048px the hero requests.
    heroRaw: "IMG_4684 (1).jpg",
    heroBias: 0.5,
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 1086x1448 PNG.",
  },
  svcHome: {
    raw: "IMG_4633 (1).jpg",
    // IMG_3152 = project-11.jpg, g11 "Private Residence — Tree & Ornaments"
    // [Home Decoration] — a residential subject, matching this page.
    heroRaw: "IMG_3152 (1).jpg",
    heroBias: 0.5,
    bias: 0.25,
    note: "24.5MP, unused on homepage. Was a 736x1104 source upscaled to 2400x1350.",
  },
  // svcOffice and svcCorporate are intentionally absent — their raws
  // (IMG_4652 / IMG_4682) were removed at the client's request. The corporate
  // slot is regenerated by scripts/recut-corporate.mjs instead, which uses two
  // different unused photos (one per output ratio) rather than one raw.
  svcLighting: {
    // Re-pointed off IMG_4722 (project-22) at the client's request. IMG_4722 is a
    // garland-and-bauble archway around a dark front door — a DOOR DECOR shot, not a
    // lighting shot, which is why slide 06 read as "another entrance photo".
    //
    // Now cut from "WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg" (project-47): a
    // villa at dusk whose rooflines, terraces and garden are outlined in warm
    // cascading icicle lighting, with a lit reindeer on the roof. It is the only
    // genuine facade/garden ILLUMINATION shot in the library, and it matches the
    // slide copy ("Facade, garden and entrance lighting ... after dark") exactly.
    //
    // It was previously the 04 Office slide's photo (scripts/recut-removed-slots.mjs),
    // so moving it here vacates 04 for a real office interior. Net effect on the
    // homepage: this photo now appears once, here, instead of once on the wrong
    // slide. It still overlaps gallery tile g42, which is a /gallery-page repeat,
    // not a homepage-internal one.
    //
    raw: "WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg",
    // The 16:9 PageHero keeps its own source: IMG_3519 (project-12, 24.5MP,
    // g12 "Luxury Villa Living Room Scheme"), so the service page and this rail
    // slide stay different photographs. heroRaw lets the two exports diverge
    // without duplicating this slot's config.
    heroRaw: "IMG_3519 (1).jpg",
    heroBias: 0.5,
    bias: 0.3,
    // 1086x1448 is 0.75, so a 4:5 window can only come off the height — 91px of it.
    // Spreading that evenly leaves a heavy foreground hedge filling the bottom 40%
    // of the frame with nothing in it, which reads as an empty shot rather than a
    // lighting shot. `frame.dropBottom` spends the whole trim on the bottom instead,
    // giving 998x1248: the roofline lighting, the lit reindeer and the entrance
    // pillars all read, and the hedge drops to a green base. 998px still clears the
    // 880px the 440px slot wants at 2x, so nothing is upscaled.
    frame: { dropBottom: 200 },
    note: "4:5 window is 998x1248 (keeps 100%w/86%h); 998px clears the 880px the slot wants at 2x.",
  },
  svcOutdoor: {
    raw: "IMG_4898 (1).jpg",
    // IMG_5256 = project-36.png, g36 "Illuminated Garden & Facade Tree"
    // [Lighting & Outdoor] — the closest subject match to an outdoor page.
    //
    // This replaced IMG_6394 (project-41.jpg), which is the homepage hero
    // background: the two heroes were showing the identical photo. At 1320px
    // this source needs a 1.55x upscale at the 2048px the hero requests, so
    // the export itself is capped at 1320 (never upscaled on disk) and the
    // hero's dark gradient hides what softness there is. IMG_5257 (g37 "Warm
    // White Fairy Light Canopy") and IMG_5251 (g31 "Bespoke Doorway Garland")
    // are the other conflict-free options at the same resolution.
    heroRaw: "IMG_5256.PNG",
    heroBias: 0.5,
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 738x909 WhatsApp thumbnail.",
  },
};

/**
 * Build a crop window of exactly `ratio` from a source, honouring a vertical
 * focal bias (0 = top, 0.5 = centre, 1 = bottom) when trimming top/bottom,
 * and centring when trimming the sides.
 *
 * `frame` overrides that automatic window for a slot where the centred window
 * puts something unwanted in shot. It is expressed in PIXELS trimmed off the
 * finished frame, so the exact cut is auditable in review:
 *   skipLeft   - pixels shaved off the LEFT edge before framing
 *   dropBottom - pixels shaved off the BOTTOM edge before framing
 * The `ratio` window is re-derived from whatever is left, so the output stays
 * exactly `ratio` whatever the trim.
 */
function cropFor(m, ratio, bias, frame) {
  if (frame) {
    const left = frame.skipLeft ?? 0;
    const height = m.height - (frame.dropBottom ?? 0);
    let width = Math.round(height * ratio);
    if (left + width > m.width) {
      width = m.width - left;
      return { left, top: 0, width, height: Math.round(width / ratio) };
    }
    return { left, top: 0, width, height };
  }
  const srcRatio = m.width / m.height;
  if (srcRatio > ratio) {
    const w = Math.round(m.height * ratio);
    return { left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height };
  }
  const h = Math.round(m.width / ratio);
  return { left: 0, top: Math.round((m.height - h) * bias), width: m.width, height: h };
}

/** Resolve a source name against the raw-originals folder first, then against
 *  the client-work exports. A few hero sources are full-resolution exports that
 *  have no matching original on disk (e.g. project-05.jpg, whose low-res
 *  stand-in original IMG_2546 is only 736x1104), so both roots are needed. */
function resolveSource(name) {
  for (const root of [RAW, OUT]) {
    const p = path.join(root, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function write(src, crop, outW, dest) {
  await sharp(src)
    .extract(crop)
    .resize({ width: outW, height: Math.round(outW / (crop.width / crop.height)), fit: "cover" })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, dest));
  return Math.round(fs.statSync(path.join(OUT, dest)).size / 1024);
}

async function recut(slot, { raw, heroRaw, heroBias, bias = 0.3, frame, note = "" }) {
  const stem = slot.replace(/^svc/, "").toLowerCase();
  const src = path.join(RAW, raw);

  if (!fs.existsSync(src)) {
    console.log(`  FAIL  ${slot} — raw source missing: ${raw}`);
    return { slot, ok: false };
  }

  const m = await sharp(src).metadata();

  // — 4:5 master for the services stage —
  const crop = cropFor(m, TARGET_RATIO, bias, frame);
  const outW = Math.min(TARGET_W, crop.width); // never upscale
  const stageDest = `svc-${stem}-45.jpg`;
  const stageKb = await write(src, crop, outW, stageDest);

  // — 16:9 master for each service page's full-bleed PageHero —
  // `heroRaw` lets the hero come from a different original than the rail, so
  // the service page and the homepage slide stop showing the same photo.
  const heroSrc = heroRaw ? resolveSource(heroRaw) : src;
  if (heroRaw && !heroSrc) {
    console.log(`  FAIL  ${slot} — heroRaw source missing: ${heroRaw}`);
    return { slot, ok: false };
  }
  const hm = heroRaw ? await sharp(heroSrc).metadata() : m;
  const heroCrop = cropFor(hm, HERO_RATIO, heroBias ?? bias * 0.6);
  const heroOutW = Math.min(HERO_W, heroCrop.width);
  const heroDest = `svc-${stem}-hero.jpg`;
  const heroKb = await write(heroSrc, heroCrop, heroOutW, heroDest);

  const flags = [];
  if (outW < SOFT_BELOW) {
    flags.push(`SOFT at 2x — stage cut is ${outW}px, wants ${NEEDS_2X}px`);
  }
  const keptW = Math.round((crop.width / m.width) * 100);
  const keptH = Math.round((crop.height / m.height) * 100);
  if (keptW < 75 || keptH < 75) {
    flags.push(`4:5 crop keeps ${keptW}%w / ${keptH}%h`);
  }

  console.log(
    `  ${flags.length ? "WARN" : " OK "}  ${slot.padEnd(13)} ${String(m.width + "x" + m.height).padEnd(11)} ` +
      `stage ${outW}x${Math.round(outW / TARGET_RATIO)} (${stageKb} KB)  hero ${heroOutW}x${Math.round(heroOutW / HERO_RATIO)} (${heroKb} KB)` +
      (flags.length ? `\n        !! ${flags.join(" | ")}` : "")
  );
  return { slot, ok: true, outW, flags };
}

const only = process.argv.slice(2);
const entries = Object.entries(SLOTS).filter(
  ([k]) => !only.length || only.includes(k)
);

console.log(
  `Re-cutting ${entries.length} service slot(s) to 4:5 (target ${TARGET_W}x${TARGET_H}, never upscaled)\n`
);

const results = [];
for (const [slot, cfg] of entries) results.push(await recut(slot, cfg));

const soft = results.filter((r) => r.flags?.length);
console.log(`\nDone. ${results.length - soft.length} sharp, ${soft.length} need a better source photo:`);
for (const r of soft) console.log(`  - ${r.slot}: ${r.flags.join("; ")}`);
