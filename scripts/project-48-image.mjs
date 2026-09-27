import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import { stat } from 'node:fs/promises';

/**
 * project-48 - client-supplied photo added to the gallery on request.
 *
 *   "WhatsApp Image 2026-09-26 at 3.36..jpeg" -> project-48.jpg
 *
 * The double dot in the filename is genuinely in the file, not a typo.
 *
 * DUPLICATE-NESS: this file is pixel-identical to `img.png` in the same folder
 * (MAD 0.00 comparing 3:4 crops, against a known-different control at 60).
 * They are the same photograph saved twice. `img.png` is no longer referenced
 * by anything — it used to be the source for `svc-office-hero.jpg`, which
 * scripts/recut-removed-slots.mjs re-pointed at IMG_5096 (project-27.jpg) to
 * kill a 1.77x upscale. So exporting from either filename yields the same
 * bytes, and this photo is NOT currently visible anywhere on the site: adding
 * it to the gallery introduces no overlap. See the note on `client48` in
 * lib/images.ts.
 *
 * The source is 1086x1448 = exactly 0.75, the same 3:4 the gallery tiles use
 * (components/gallery/gallery-card.tsx, `aspect-[3/4]`), so no crop and no
 * padding are needed — the whole photo stays visible.
 *
 * Kept at native width. A tile is ~430px wide at 4 columns on a 1440px screen,
 * so a 2x display wants 860px and the source is 1086px. Upscaling past that
 * would only add bytes: WhatsApp has already compressed this.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '../public/Client Provider/Client Provider');
const out = path.join(__dirname, '../public/images/client-work');

const SRC = 'WhatsApp Image 2026-09-26 at 3.36..jpeg';
const DEST = 'project-48.jpg';

const src = path.join(base, SRC);
const dest = path.join(out, DEST);

const m = await sharp(src).metadata();
const ratio = m.width / m.height;
console.log(`source: ${m.width}x${m.height} (${m.format}) ratio ${ratio.toFixed(3)}`);

const TILE = 3 / 4;
const drift = Math.abs(ratio - TILE);
if (drift > 0.01) {
  throw new Error(
    `source ratio ${ratio.toFixed(3)} is not the gallery tile's ${TILE.toFixed(3)} ` +
      `(off by ${drift.toFixed(3)}) - this script assumes no crop or padding is needed`
  );
}
console.log(`target: ${m.width}x${m.height} (3:4) - already the tile's shape, nothing cropped`);
console.log(`  gallery tile aspect-[3/4] : 430px wide at 4 cols on 1440px -> 860px for 2x`);
console.log(`  source is ${m.width}px -> ${(m.width / 860).toFixed(2)}x headroom, no upscale needed`);

// Straight re-encode: strips EXIF/location metadata, normalises to progressive
// JPEG. No resize - the pixels are already the right size.
await sharp(src)
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toFile(dest);

const done = await sharp(dest).metadata();
const { size } = await stat(dest);
console.log(
  `-> ${dest} (${done.width}x${done.height}, ratio ${(done.width / done.height).toFixed(2)}, ` +
    `${Math.round(size / 1024)} KB)`
);
