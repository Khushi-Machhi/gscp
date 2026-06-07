import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.resolve(process.cwd(), 'public', 'assets', 'products');
const videos = ['VID20260314153410 (1).mp4', 'VID20260314153410.mp4'];

async function makePlaceholder(name) {
  const out = path.join(dir, name.replace(/\.[^.]+$/, '.jpeg'));
  const svg = `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="48" fill="#374151">Video thumbnail</text>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#6b7280">${name}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(out);
  console.log('Wrote', out);
}

async function run() {
  for (const v of videos) {
    const p = path.join(dir, v);
    if (fs.existsSync(p)) {
      await makePlaceholder(v);
    }
  }
  // regenerate product map
  try {
    const { execSync } = await import('child_process');
    execSync('node scripts/generate-product-map.js', { stdio: 'inherit' });
  } catch (e) {
    console.error('Could not regenerate product map:', e.message);
  }
}

run().catch(e => console.error(e));
