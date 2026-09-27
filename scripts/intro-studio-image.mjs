import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

/**
 * "The Studio" section image (lib/images.ts -> homeIntro).
 *
 * Client-approved image was project-05.jpg until commit a19a792 (2026-09-25)
 * swapped it without being asked — that swap is what the client flagged.
 * Reverted to a client-supplied source instead:
 *
 *   "WhatsApp Image 2026-09-27 at 3.50.14 PM.jpeg" -> project-46.jpg
 *
 * Source is 960x1280 (3:4 portrait) and the Intro frame is aspect-[3/4], so
 * the photo fills it with no crop. Kept at native resolution on purpose —
 * a lanczos upscale would add file weight without adding real detail.
 * WhatsApp has already compressed the source; a larger original would be
 * needed for crisp 2x rendering on wide desktop viewports.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '../public/Client Provider/Client Provider');
const out = path.join(__dirname, '../public/images/client-work');

const SRC = 'WhatsApp Image 2026-09-27 at 3.50.14 PM.jpeg';
const DEST = 'project-46.jpg';

const src = path.join(base, SRC);
const dest = path.join(out, DEST);

const m = await sharp(src).metadata();
console.log(`source: ${m.width}x${m.height} (${m.format})`);

// Intro renders aspect-[3/4] (0.75). Warn only if the source deviates enough
// that FestiveImage's object-cover would start cropping real content.
const TARGET_RATIO = 3 / 4;
const sourceRatio = m.width / m.height;
if (Math.abs(sourceRatio - TARGET_RATIO) > 0.05) {
  console.warn(
    `WARNING: source ratio ${sourceRatio.toFixed(2)} does not match the ` +
      `aspect-[3/4] (0.75) frame — the photo will be cropped. ` +
      `Re-crop this source before shipping.`
  );
} else {
  console.log(`ratio ${sourceRatio.toFixed(2)} matches aspect-[3/4] — no crop`);
}

await sharp(src)
  // Strip EXIF/location metadata, normalise to progressive JPEG.
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile(dest);

const done = await sharp(dest).metadata();
const { size } = await import('node:fs').then((fs) =>
  fs.promises.stat(dest)
);
console.log(
  `-> ${dest} (${done.width}x${done.height}, ${Math.round(size / 1024)} KB)`
);
