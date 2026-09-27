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
 * Nine candidates, seven slots — IMG_4910 and IMG_5058 are left as spares.
 */
const SLOTS = {
  svcComplete: {
    raw: "IMG_3974 (1).jpg",
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 590x609 WhatsApp substitute upscaled to 1600x1200.",
  },
  svcVilla: {
    raw: "IMG_3986 (1).jpg",
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 1086x1448 PNG.",
  },
  svcHome: {
    raw: "IMG_4633 (1).jpg",
    bias: 0.25,
    note: "24.5MP, unused on homepage. Was a 736x1104 source upscaled to 2400x1350.",
  },
  svcOffice: {
    raw: "IMG_4652 (1).jpg",
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 738x970 WhatsApp thumbnail.",
  },
  svcCorporate: {
    raw: "IMG_4682 (1).jpg",
    bias: 0.2,
    note: "24.5MP, unused on homepage. Was a 1320x2868 PNG at a 0.46 ratio.",
  },
  svcLighting: {
    raw: "IMG_4722 (1).jpg",
    bias: 0.25,
    note: "24.5MP, unused on homepage. Was cut to 16:9, losing 55% of its width in the 4:5 frame.",
  },
  svcOutdoor: {
    raw: "IMG_4898 (1).jpg",
    bias: 0.3,
    note: "24.5MP, unused on homepage. Was a 738x909 WhatsApp thumbnail.",
  },
};

/** Build a crop window of exactly `ratio` from a source, honouring a
 *  vertical focal bias (0 = top, 0.5 = centre, 1 = bottom) when trimming
 *  top/bottom, and centring when trimming the sides. */
function cropFor(m, ratio, bias) {
  const srcRatio = m.width / m.height;
  if (srcRatio > ratio) {
    const w = Math.round(m.height * ratio);
    return { left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height };
  }
  const h = Math.round(m.width / ratio);
  return { left: 0, top: Math.round((m.height - h) * bias), width: m.width, height: h };
}

async function write(src, crop, outW, dest) {
  await sharp(src)
    .extract(crop)
    .resize({ width: outW, height: Math.round(outW / (crop.width / crop.height)), fit: "cover" })
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, dest));
  return Math.round(fs.statSync(path.join(OUT, dest)).size / 1024);
}

async function recut(slot, { raw, bias = 0.3, note = "" }) {
  const stem = slot.replace(/^svc/, "").toLowerCase();
  const src = path.join(RAW, raw);

  if (!fs.existsSync(src)) {
    console.log(`  FAIL  ${slot} — raw source missing: ${raw}`);
    return { slot, ok: false };
  }

  const m = await sharp(src).metadata();

  // — 4:5 master for the services stage —
  const crop = cropFor(m, TARGET_RATIO, bias);
  const outW = Math.min(TARGET_W, crop.width); // never upscale
  const stageDest = `svc-${stem}-45.jpg`;
  const stageKb = await write(src, crop, outW, stageDest);

  // — 16:9 master for each service page's full-bleed PageHero —
  const heroCrop = cropFor(m, HERO_RATIO, bias * 0.6);
  const heroOutW = Math.min(HERO_W, heroCrop.width);
  const heroDest = `svc-${stem}-hero.jpg`;
  const heroKb = await write(src, heroCrop, heroOutW, heroDest);

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
