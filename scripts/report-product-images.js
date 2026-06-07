import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve(process.cwd(), 'src', 'data', 'catalog.ts');
const mapPath = path.resolve(process.cwd(), 'src', 'data', 'productFileMap.ts');
const base = 'http://localhost:8081';

const catalog = fs.readFileSync(catalogPath, 'utf8');
const mapFile = fs.readFileSync(mapPath, 'utf8');
const m = mapFile.match(/productFileMap\s*=\s*(\{[\s\S]*\})\s*as/);
const mapObj = m ? JSON.parse(m[1]) : {};

// match p(presets.something, "slug", "Display Name",
const regex = /p\(presets\.[a-zA-Z0-9_]+,\s*"([a-z0-9\-]+)",\s*"([^"]+)"/g;
const rows = [];
let match;
while ((match = regex.exec(catalog))) {
  const slug = match[1];
  const name = match[2];
  const filename = mapObj[slug] || `${slug}.jpeg`;
  const url = `${base}/assets/products/${encodeURIComponent(filename)}`;
  rows.push({ slug, name, filename, url });
}

(async () => {
  for (const r of rows) {
    try {
      const res = await fetch(r.url, { method: 'GET' });
      r.status = res.status;
      r.contentType = res.headers.get('content-type') || '';
    } catch (e) {
      r.status = 'ERR';
      r.contentType = '';
    }
  }
  // print any where contentType not image
  const nonImages = rows.filter(x => x.status !== 200 || !/^image\//.test(x.contentType));
  console.log('Total products:', rows.length);
  console.log('Non-image or missing:', nonImages.length);
  nonImages.forEach(x => console.log(x.slug, '->', x.filename, x.status, x.contentType, ' — ', x.name));
})();
