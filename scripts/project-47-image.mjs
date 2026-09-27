import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import { stat } from 'node:fs/promises';

/**
 * project-47 - client-supplied photo added to the gallery on request.
 *
 *   "WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg" -> project-47.jpg
 *
 * The source is 1086x1448, which is exactly 0.75 - the same 3:4 the gallery
 * tiles use (components/gallery/gallery-card.tsx, `aspect-[3/4]`). So unlike
 * project-35 this needs no padding and no crop: the photo is already the shape
 * the frame wants, and the whole of it stays visible.
 *
 * Kept at native width. A gallery tile is ~430px wide at 4 columns on a 1440px
 * screen, so a 2x display wants 860px and the source is 1086px - enough
 * headroom that an upscale would only add bytes, not detail, on a source
 * WhatsApp has already compressed.
 *
 * KNOWN OVERLAP, kept deliberately: this is the same photo as
 * `svc-office-45.jpg` (the homepage "What We Do" rail, slide 04, Office
 * Christmas) - confirmed by reproducing that 4:5 cut and comparing pixels
 * (MAD 0.24 against a known-different control at 72). The client asked for it
 * to go into the gallery and to leave the rail alone, so the photo now appears
 * twice on the homepage. See the note on `client47` in lib/images.ts.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '../public/Client Provider/Client Provider');
const out = path.join(__dirname, '../public/images/client-work');

const SRC = 'WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg';
const DEST = 'project-47.jpg';

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

// Sizes that frames this file actually ask for.
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
