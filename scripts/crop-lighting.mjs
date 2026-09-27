import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '../public/Client Provider/Client Provider/IMG_4722 (1).jpg');
const dest = path.join(__dirname, '../public/images/client-work/project-40.jpg');

const meta = await sharp(src).metadata();
console.log('Source:', meta.width, 'x', meta.height);

// Landscape crop: take full width, crop from top-third to capture the lit arch
const cropTop = Math.floor(meta.height * 0.05);
const cropHeight = Math.min(Math.floor(meta.width * 0.5625), meta.height - cropTop); // 16:9 ratio

await sharp(src)
  .extract({ left: 0, top: cropTop, width: meta.width, height: cropHeight })
  .resize({ width: 2400, height: 1350, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 90, progressive: true })
  .toFile(dest);

console.log('Done -> project-40.jpg 2400x1350');
