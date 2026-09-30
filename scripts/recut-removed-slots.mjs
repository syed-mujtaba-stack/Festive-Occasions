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
    // 04 Office slide.
    //
    // Re-pointed off "WhatsApp Image 2026-09-26 at 6.18.40 PM.jpeg" (project-47)
    // at the client's request: that photo is a RESIDENTIAL villa facade at dusk —
    // roofline icicle lights, a lit reindeer, palm trees. Correct subject for the
    // Lighting slide, wrong one for Office, and the client reported the mismatch.
    // It has moved to the 06 Lighting slot in scripts/recut-services.mjs.
    //
    // Now cut from IMG_5258 = project-38.jpg: a commercial interior — floor-to-ceiling
    // glazing, curved lobby seating, architectural wall panelling and a large
    // commercial-scale tree. It is the only genuinely office/corporate INTERIOR in
    // the whole library that the homepage does not already show. (The other two
    // commercial photos, project-27 and project-01, are both already on the
    // homepage as the Audiences card and a featured gallery tile, so reusing
    // either would have re-introduced a duplicate the client had already rejected.)
    //
    // 1319x1638 is 0.805 and 4:5 is 0.80, so a centred window would trim only 9px
    // of width and the whole height would survive. Centring is not wanted here:
    // the source has a cut-off figure on its far LEFT edge and a view of building
    // work through the left-hand glazing, and both sit right where the 4:5 frame
    // needs its width. `frame.skipLeft` shaves 210px off the left before the 4:5
    // window is derived, which drops the window to 1109x1386, removes both, and
    // still holds the tree whole with its star topper.
    dest: 'svc-office-45.jpg',
    src: 'IMG_5258.PNG',
    from: RAW,
    ratio: 4 / 5,
    bias: 0.5,
    frame: { skipLeft: 210 },
    outW: 1200,
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

/**
 * Crop window of exactly `ratio` from a source.
 *
 * `bias` is the usual vertical focal bias (0 = top, 0.5 = centre, 1 = bottom).
 *
 * `frame` overrides that automatic window for the one cut where the centred
 * window puts something unwanted in shot. It is expressed in PIXELS trimmed off
 * the finished frame, so the exact cut is auditable in review:
 *   skipLeft   - pixels shaved off the LEFT edge before framing
 *   dropBottom - pixels shaved off the BOTTOM edge before framing
 * Trimming either edge shrinks the available source area, and the `ratio`
 * window is then re-derived from what is left, so the output is always exactly
 * `ratio` whatever the trim.
 */
function cropFor(m, ratio, bias, frame) {
  if (frame) {
    const left = frame.skipLeft ?? 0;
    const height = m.height - (frame.dropBottom ?? 0);
    let width = Math.round(height * ratio);
    // If that width overruns what is left of the source after skipLeft, clamp to
    // the available width and derive the height from it instead.
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

for (const { dest, src, from, ratio, bias, frame, outW, was } of CUTS) {
  const input = path.join(from, src);
  const m = await sharp(input).metadata();
  const crop = cropFor(m, ratio, bias, frame);
  // Never upscale: a `frame` trim can leave the window narrower than `outW`.
  const targetW = Math.min(outW, crop.width);

  await sharp(input)
    .extract(crop)
    .resize({ width: targetW, kernel: 'lanczos3' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, dest));

  const done = await sharp(path.join(OUT, dest)).metadata();
  const { size } = await stat(path.join(OUT, dest));
  const keptW = Math.round((crop.width / m.width) * 100);
  const keptH = Math.round((crop.height / m.height) * 100);
  const upscaled = targetW > m.width ? `  UPSCALED from ${m.width}px` : '';

  console.log(
    `${dest.padEnd(24)} was ${was}  <-  ${src}\n` +
      `  ${m.width}x${m.height} -> ${done.width}x${done.height} (${(done.width / done.height).toFixed(2)}), ` +
      `keeps ${keptW}%w/${keptH}%h, ${Math.round(size / 1024)} KB${upscaled}`
  );
}

console.log('\nAll four exports are now free of IMG_4652 / IMG_4682.');
