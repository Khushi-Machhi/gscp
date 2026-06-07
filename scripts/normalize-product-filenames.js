import fs from 'fs';
import path from 'path';

const dir = path.resolve(process.cwd(), 'public', 'assets', 'products');
const originalsDir = path.join(dir, 'originals');
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

let created = 0;
for (const f of files) {
  // skip files in originals directory
  if (f === 'originals') continue;
  const ext = path.extname(f).toLowerCase();
  const base = path.basename(f, ext);
  const slug = slugify(base);
  const target = `${slug}${ext}`;
  const src = path.join(dir, f);
  const dst = path.join(dir, target);
  if (f === target) continue;
  if (!fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    console.log('Created slug copy:', f, '->', target);
    created++;
  }
}
console.log('Created', created, 'slugified copies');
