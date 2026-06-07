import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

const dir = path.resolve(process.cwd(), 'public', 'assets', 'products');
const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile());

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function run() {
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    const base = path.basename(f, ext);
    const slug = slugify(base);
    const inPath = path.join(dir, f);

    if (ext === '.heic' || ext === '.heif') {
      const outName = `${slug}.jpeg`;
      const outPath = path.join(dir, outName);
      if (!fs.existsSync(outPath)) {
        try {
          await sharp(inPath).jpeg({ quality: 85 }).toFile(outPath);
          console.log('Converted', f, '->', outName);
        } catch (e) {
          console.error('Error converting', f, e.message);
        }
      }
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const outName = `${slug}${ext}`;
      const outPath = path.join(dir, outName);
      if (outName !== f && !fs.existsSync(outPath)) {
        fs.copyFileSync(inPath, outPath);
        console.log('Copied', f, '->', outName);
      }
    } else {
      // skip non-image files (mp4 etc.)
    }
  }

  // regenerate the product map
  try {
    execSync('node scripts/generate-product-map.js', { stdio: 'inherit' });
  } catch (e) {
    console.error('Failed to regenerate product map:', e.message);
  }
}

run().then(() => console.log('Done')).catch(err => console.error(err));
