import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '../public/Client Provider/Client Provider');
const out = path.join(__dirname, '../public/images/client-work');

async function cropTo43(src, dest, label) {
  const m = await sharp(src).metadata();
  console.log(`${label}: source ${m.width}x${m.height}`);
  // 4:3 crop — take full width, crop height to width*(3/4)
  const targetH = Math.min(Math.floor(m.width * 0.75), m.height);
  const top = Math.floor((m.height - targetH) * 0.25); // slight top bias to keep tree tops
  await sharp(src)
    .extract({ left: 0, top, width: m.width, height: targetH })
    .resize({ width: 1600, height: 1200, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90, progressive: true })
    .toFile(dest);
  console.log(`  -> ${dest} (1600x1200)`);
}

// Basic package (pkgCheers) -> project-04.jpg
await cropTo43(
  path.join(base, 'WhatsApp Image 2026-09-27 at 12.57.13 AM.jpeg'),
  path.join(out, 'project-04.jpg'),
  'Basic (pkgCheers)'
);

// Fancy package (pkgFancy) -> project-23.jpg
await cropTo43(
  path.join(base, 'WhatsApp Image 2026-09-27 at 12.57.41 AM.jpeg'),
  path.join(out, 'project-23.jpg'),
  'Fancy (pkgFancy)'
);

// Section 01 Complete Transformation (svcComplete) -> project-35
// Moved to scripts/project-35-image.mjs: this source is near-square (590x609),
// so the 4:3 `cropTo43` below cut the top and bottom off it. That export is now
// written at full frame and letterboxed by its containers instead of cropped.

console.log('All done.');
