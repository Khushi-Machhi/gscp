import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { execSync } from 'child_process';

const originalsDir = path.resolve(process.cwd(), 'public', 'assets', 'products', 'originals');
const outDir = path.resolve(process.cwd(), 'public', 'assets', 'products');

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
  if (!fs.existsSync(originalsDir)) {
    console.error('Originals directory not found:', originalsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(originalsDir).filter(f => fs.statSync(path.join(originalsDir, f)).isFile());

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    const base = path.basename(f, ext);
    const slug = slugify(base);
    const inPath = path.join(originalsDir, f);
    const outName = `${slug}.jpeg`;
    const outPath = path.join(outDir, outName);

    if (ext === '.heic' || ext === '.heif') {
      if (fs.existsSync(outPath)) {
        console.log('Skipped (exists):', outName);
        continue;
      }
      try {
        await sharp(inPath).jpeg({ quality: 90 }).toFile(outPath);
        console.log('Converted:', f, '->', outName);
      } catch (err) {
        console.error('Failed to convert', f, err.message);
      }
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      // copy non-heic images from originals back if needed
      const copyName = `${slug}${ext}`;
      const copyPath = path.join(outDir, copyName);
      if (!fs.existsSync(copyPath)) {
        fs.copyFileSync(inPath, copyPath);
        console.log('Copied:', f, '->', copyName);
      } else {
        console.log('Skipped copy (exists):', copyName);
      }
    } else {
      console.log('Skipping non-image original:', f);
    }
  }

  try {
    execSync('node scripts/generate-product-map.js', { stdio: 'inherit' });
    execSync('node scripts/check-asset-urls.js', { stdio: 'inherit' });
  } catch (e) {
    console.error('Post-conversion scripts failed:', e.message);
  }
}

run().then(() => console.log('Done')).catch(err => { console.error(err); process.exit(1); });
