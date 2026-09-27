import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import { stat } from 'node:fs/promises';

/**
 * Re-cuts the service slots whose photos were removed at the client's request.
 *
 * IMG_4652, IMG_4682 and IMG_5058 were deleted from
 * public/Client Provider/Client Provider/, but scripts/recut-services.mjs had
 * already cut 4:5 and 16:9 exports from two of them, and those crops survive
 * the original being deleted — they no longer resemble the source frame, so a
 * plain file search will not tie them back. The photo was still visible on the
 * homepage service rail (04 Office, 05 Corporate) and on both service pages.
 *
 *   IMG_4682 -> svc-corporate-45.jpg, svc-corporate-hero.jpg
 *   IMG_4652 -> svc-office-45.jpg,   svc-office-hero.jpg
 *
 * Each output is re-cut from an unused client photo, picked per output ratio so
 * nothing is cropped hard. None of these sources appear in the Portfolio
 * gallery or blog, which is the whole point of the service-rail slots.
 *
 * Stages stay at or below their source's own resolution. The two heroes are
 * the exception: every unused source left is a ~1MP WhatsApp export, so they are
 * lanczos-upscaled to 1920px to stay usable full-bleed — the same call made for
 * project-43.jpg. Swap in a 24.5MP original if these ever need to be sharp.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, '../public/Client Provider/Client Provider');
const OUT = path.join(__dirname, '../public/images/client-work');

/** Which removed photo each output used to come from — printed for the audit trail. */
const CUTS = [
  // 05 Corporate slide.
  //
  // Was re-cut from "WhatsApp Image 2026-09-26 at 3.36.29 PM (5)" — but that
  // photo is project-13.jpg, which the homepage ALREADY shows as `audienceVilla`
  // in the Audiences section. The service rail and the Audiences block sit on
  // the same page, so the client saw the identical photo twice and asked for
  // the slide to use something the homepage does not.
  //
  // Now cut from IMG_5098, which is unused on the homepage. It is the next
  // frame in the same shoot as IMG_5096 (project-27.jpg = `audienceOffice`, the
  // commercial reception / wreath photo), so the subject is commercial and
  // hospitality rather than a villa — a better fit for the Corporate Decoration
  // copy than the old atrium-tree alt claimed.
  //
  // 3000x4000 native: the 4:5 crop keeps the full width and 94% of the height,
  // and downscales to 1200x1500 — comfortably sharp at the 440px slot on a 2x
  // display (needs 880px), which the old 738px cut never was.
  {
    dest: 'svc-corporate-45.jpg',
    src: 'IMG_5098.JPG (1).jpeg',
    from: RAW,
    ratio: 4 / 5,
    bias: 0.3,
    outW: 1200,
    was: 'IMG_4682',
  },
  {
    // PageHero master for 05 Corporate.
    //
    // Was project-05.jpg, which is now the 01 Christmas Decoration hero (it is
    // the only 24.5MP landscape in the library and belongs on the flagship
    // page). Re-pointed at IMG_4633 = project-18.jpg, 4284x5712, gallery g18
    // "Hospitality Lounge Festive Setting" [Corporate & Hospitality] — the
    // category match this page needs. Centre-cut (bias 0.5) to match how the
    // blog heroes are framed. Overlaps the homepage's rail slide 03.
    dest: 'svc-corporate-hero.jpg',
    src: 'IMG_4633 (1).jpg',
    from: RAW,
    ratio: 16 / 9,
    bias: 0.5,
    outW: 2400,
    was: 'IMG_4682',
  },
  {
    dest: 'svc-office-45.jpg',
    src: 'WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg',
    from: RAW,
    ratio: 4 / 5,
    bias: 0.3,
    outW: 1086,
    was: 'IMG_4652',
  },
  {
    // PageHero master for 04 Office.
    //
    // Was img.png — 1086x1448, lanczos-upscaled 1.77x to 1920px, which is why
    // this hero read as soft next to the blog heroes. The rail slot above still
    // has to use that tiny source (nothing better survives a 4:5 crop), but the
    // full-bleed hero no longer does: IMG_5096 = project-27.jpg is 3000x4000
    // native, gallery g27 "Commercial Illuminated Wreath Archway"
    // [Corporate & Hospitality]. 3000px clears the 2048px the hero requests, so
    // outW is 2400 with no upscale. Overlaps the homepage's Audiences block.
    dest: 'svc-office-hero.jpg',
    src: 'IMG_5096.JPG (1).jpeg',
    from: RAW,
    ratio: 16 / 9,
    bias: 0.5,
    outW: 2400,
    was: 'IMG_4652',
  },
];

/** Crop window of exactly `ratio` from a source, honouring a vertical focal bias. */
function cropFor(m, ratio, bias) {
  const srcRatio = m.width / m.height;
  if (srcRatio > ratio) {
    const w = Math.round(m.height * ratio);
    return { left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height };
  }
  const h = Math.round(m.width / ratio);
  return { left: 0, top: Math.round((m.height - h) * bias), width: m.width, height: h };
}

for (const { dest, src, from, ratio, bias, outW, was } of CUTS) {
  const input = path.join(from, src);
  const m = await sharp(input).metadata();
  const crop = cropFor(m, ratio, bias);

  await sharp(input)
    .extract(crop)
    .resize({ width: outW, kernel: 'lanczos3' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, dest));

  const done = await sharp(path.join(OUT, dest)).metadata();
  const { size } = await stat(path.join(OUT, dest));
  const keptW = Math.round((crop.width / m.width) * 100);
  const keptH = Math.round((crop.height / m.height) * 100);
  const upscaled = outW > m.width ? `  UPSCALED from ${m.width}px` : '';

  console.log(
    `${dest.padEnd(24)} was ${was}  <-  ${src}\n` +
      `  ${m.width}x${m.height} -> ${done.width}x${done.height} (${(done.width / done.height).toFixed(2)}), ` +
      `keeps ${keptW}%w/${keptH}%h, ${Math.round(size / 1024)} KB${upscaled}`
  );
}

console.log('\nAll four exports are now free of IMG_4652 / IMG_4682.');
