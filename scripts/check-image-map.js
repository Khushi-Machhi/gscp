import fs from 'fs';
import path from 'path';

const catalogPath = path.resolve(process.cwd(), 'src', 'data', 'catalog.ts');
const mapPath = path.resolve(process.cwd(), 'src', 'data', 'productFileMap.ts');

const catalog = fs.readFileSync(catalogPath, 'utf8');
const mapFile = fs.readFileSync(mapPath, 'utf8');

// extract productFileMap object literal
const m = mapFile.match(/productFileMap\s*=\s*(\{[\s\S]*\})\s*as/);
const mapObj = m ? JSON.parse(m[1]) : {};

// find all occurrences of p(presets..., "slug"
const slugRegex = /p\(presets\.[a-zA-Z0-9_]+,\s*"([a-z0-9\-]+)"/g;
const slugs = new Set();
let match;
while ((match = slugRegex.exec(catalog))) {
  slugs.add(match[1]);
}

const missing = [];
for (const s of slugs) {
  if (!mapObj[s]) missing.push(s);
}

console.log('Total products found:', slugs.size);
console.log('Missing mappings for', missing.length, 'products:');
console.log(missing.join('\n'));
