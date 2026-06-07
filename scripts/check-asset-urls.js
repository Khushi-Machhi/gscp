import fs from 'fs';
import path from 'path';
const mapPath = path.resolve(process.cwd(), 'src', 'data', 'productFileMap.ts');
const mapFile = fs.readFileSync(mapPath, 'utf8');
const m = mapFile.match(/productFileMap\s*=\s*(\{[\s\S]*\})\s*as/);
const mapObj = m ? JSON.parse(m[1]) : {};

const base = process.env.DEV_BASE || 'http://localhost:8082';

(async () => {
  const results = [];
  for (const [key, filename] of Object.entries(mapObj)) {
    const encoded = encodeURIComponent(filename).replace(/%2F/g, '/');
    const url = `${base}/assets/products/${encoded}`;
    try {
      const res = await fetch(url);
      const ct = res.headers.get('content-type') || '';
      results.push({ key, filename, status: res.status, contentType: ct });
    } catch (err) {
      results.push({ key, filename, status: 'ERR', contentType: '' });
    }
  }
  const nonImage = results.filter(r => r.status !== 200 || !/^image\//.test(r.contentType));
  console.log('Total checked:', results.length);
  console.log('Non-image or non-200 responses:', nonImage.length);
  nonImage.slice(0,100).forEach(m => console.log(m.status, m.contentType, m.filename));
})();
