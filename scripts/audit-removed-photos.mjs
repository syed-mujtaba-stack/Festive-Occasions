import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

/**
 * Audit: confirm none of the client photos removed at the client's request
 * survive anywhere under public/ — not just as files with matching names, but
 * as re-cropped derivatives.
 *
 * A plain filename search is not enough. scripts/recut-services.mjs had already
 * cut 4:5 and 16:9 exports from IMG_4652 and IMG_4682, and those crops no longer
 * resemble the source frame, so a whole-image signature misses them entirely
 * (that is how the corporate slide survived a previous removal pass). For each
 * candidate we instead re-crop the SOURCE at the candidate's aspect ratio, over a
 * range of vertical focal biases, and compare — so a derivative scores ~1 while
 * an unrelated photo scores 50+.
 *
 * Usage: node scripts/audit-removed-photos.mjs <dir-with-the-3-originals.jpg>
 */

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/audit-removed-photos.mjs <dir containing IMG_4652.jpg IMG_4682.jpg IMG_5058.jpg>");
  process.exit(1);
}

const RAWS = ["IMG_4652", "IMG_4682", "IMG_5058"];
const N = 24;
const BIASES = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const THRESHOLD = 12; // mean abs grey diff; matches score ~1, unrelated ~50+

const grid = async (buf) =>
  (await sharp(buf).resize(N, N, { fit: "fill" }).greyscale().raw().toBuffer({ resolveWithObject: true })).data;

const dist = (a, b) => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
  return s / a.length;
};

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, acc);
    else if (/\.(jpg|jpeg|png)$/i.test(e.name)) acc.push(f);
  }
  return acc;
}

/** Crop window of exactly `ratio` from a source, honouring a vertical bias. */
function cropFor(m, ratio, bias) {
  const srcRatio = m.width / m.height;
  if (srcRatio > ratio) {
    const w = Math.round(m.height * ratio);
    return { left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height };
  }
  const h = Math.round(m.width / ratio);
  return { left: 0, top: Math.round((m.height - h) * bias), width: m.width, height: h };
}

const all = walk("public");
const sources = RAWS.filter((n) => fs.existsSync(path.join(dir, `${n}.jpg`)));
console.log(`Scanning ${all.length} images under public/ against ${sources.length} removed photo(s).`);
console.log(`Method: re-crop source at candidate ratio, ${BIASES.length} focal biases, ${N}x${N} grey grid.`);
console.log(`Match threshold: mean abs diff < ${THRESHOLD}\n`);

if (!sources.length) {
  console.error("No source originals found — pass the directory holding them.");
  process.exit(1);
}

let total = 0;
for (const name of sources) {
  const SRC = path.join(dir, `${name}.jpg`);
  const sm = await sharp(SRC).metadata();
  const cache = new Map();
  const hits = [];

  for (const file of all) {
    const m = await sharp(file).metadata().catch(() => null);
    if (!m) continue;
    const ratio = m.width / m.height;
    const cand = await grid(fs.readFileSync(file));
    let best = Infinity;

    for (const bias of BIASES) {
      const region = cropFor(sm, ratio, bias);
      const key = `${region.left},${region.top},${region.width},${region.height}`;
      if (!cache.has(key)) cache.set(key, await grid(await sharp(SRC).extract(region).toBuffer()));
      const d = dist(cache.get(key), cand);
      if (d < best) best = d;
    }
    if (best < THRESHOLD) hits.push({ file: file.replace(/\\/g, "/"), d: best });
  }

  hits.sort((a, b) => a.d - b.d);
  console.log(`${name}: ${hits.length ? "" : "CLEAN — not present anywhere"}`);
  for (const h of hits) console.log(`   ${h.d.toFixed(2).padStart(6)}  ${h.file}`);
  total += hits.length;
  console.log("");
}

console.log(
  total
    ? `FAIL — ${total} file(s) still contain a removed photo.`
    : `PASS — none of the removed photos exist anywhere under public/.`
);
process.exit(total ? 1 : 0);
