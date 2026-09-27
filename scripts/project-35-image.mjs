import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import { stat } from 'node:fs/promises';

/**
 * project-35 — client-supplied photo reused in the hero, the gallery and the
 * "Installation & removal" / corporate detail blocks.
 *
 *   "WhatsApp Image 2026-09-27 at 12.58.04 AM.jpeg" -> project-35.jpg
 *
 * The source is 590x609 (0.97 — near square) but the frames it sits in are
 * portrait 3:4 (gallery tiles) and 4:3 (service-page details), so
 * scripts/crop-packages.mjs used to force it through a 4:3 `extract` +
 * `fit: 'cover'` resize. That cut the top and bottom off the photo and then
 * upscaled 590px -> 1600px, shipping as project-35.png (3.5 MB) which the CSS
 * frames then cropped a second time. Roughly a quarter of the photo was not
 * visible on any page.
 *
 * Instead of cropping, the whole frame is kept and padded out to the 3:4 the
 * gallery tiles use: a blurred, darkened copy of the photo fills the padding
 * top and bottom, so `object-cover` fills the tile edge to edge while the
 * actual photo stays 100% intact. That also keeps this tile the same shape as
 * every other one in the gallery.
 *
 * Kept at native width (590px) on purpose — a lanczos upscale to 1600px would
 * add megabytes of weight without adding real detail, since WhatsApp has
 * already compressed the source. A larger original would be needed for crisp
 * rendering at the 50vw service-page frame.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '../public/Client Provider/Client Provider');
const out = path.join(__dirname, '../public/images/client-work');

const SRC = 'WhatsApp Image 2026-09-27 at 12.58.04 AM.jpeg';
const DEST = 'project-35.jpg';

const src = path.join(base, SRC);
const dest = path.join(out, DEST);

const m = await sharp(src).metadata();
console.log(`source: ${m.width}x${m.height} (${m.format}) ratio ${(m.width / m.height).toFixed(3)}`);

// Target 3:4 — the shape every gallery tile uses. The photo fits by width, so
// the padding lands above and below rather than eating into the sides.
const canvasW = m.width;
const canvasH = Math.round((canvasW * 4) / 3);
const padTop = Math.round((canvasH - m.height) / 2);

console.log(
  `target: ${canvasW}x${canvasH} (3:4) — photo centred, ${padTop}px pad ` +
    `top and bottom, no pixels cropped`
);

// Frames that still letterbox this 3:4 file get `fit: "contain"`:
//   - hero: aspect-square, blurred backdrop (components/hero/hero.tsx)
//   - service detail: aspect-[4/3] via images.ts `fit`
for (const [label, target] of [
  ['hero aspect-square', 1],
  ['service detail aspect-[4/3]', 4 / 3],
  ['gallery tile aspect-[3/4]', 3 / 4],
]) {
  console.log(`  ${label} (${target.toFixed(2)}): ${target === 3 / 4 ? 'covers exactly, no crop' : 'contained, no crop'}`);
}

// The untouched photo, at native resolution.
const foreground = await sharp(src).toBuffer();

// Blurred + darkened copy of the same photo, scaled to cover the whole canvas.
const background = await sharp(src)
  .resize(canvasW, canvasH, { fit: 'cover', position: 'centre' })
  .blur(30)
  .modulate({ brightness: 0.5, saturation: 0.9 })
  .toBuffer();

await sharp(background)
  .composite([{ input: foreground, top: padTop, left: 0 }])
  // Strips EXIF/location metadata, normalises to progressive JPEG.
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toFile(dest);

const done = await sharp(dest).metadata();
const { size } = await stat(dest);
console.log(
  `-> ${dest} (${done.width}x${done.height}, ratio ${(done.width / done.height).toFixed(2)}, ` +
    `${Math.round(size / 1024)} KB) — was project-35.png at 3.5 MB`
);
