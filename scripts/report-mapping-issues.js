import fs from 'fs';
import path from 'path';
const mapPath = path.resolve(process.cwd(), 'src', 'data', 'productFileMap.ts');
const catalogPath = path.resolve(process.cwd(), 'src', 'data', 'catalog.ts');
const mapFile = fs.readFileSync(mapPath, 'utf8');
const m = mapFile.match(/productFileMap\s*=\s*(\{[\s\S]*\})\s*as/);
const mapObj = m ? JSON.parse(m[1]) : {};
const catFile = fs.readFileSync(catalogPath,'utf8');
// find product slugs by simple regex
const slugRegex = /p\([^,]+,\s*"([a-z0-9\-]+)"/g;
let match; const productSlugs = [];
while((match = slugRegex.exec(catFile))) productSlugs.push(match[1]);

const problematic = [];
for(const slug of productSlugs){
  const filename = mapObj[slug];
  if(!filename){
    problematic.push({slug, reason:'no mapping', filename:null});
    continue;
  }
  // detect spaces, trailing dot before extension, parentheses, uppercase letters
  if(/\s/.test(filename) || /\.$/.test(filename) || /[A-Z]/.test(filename) || /\(|\)/.test(filename)){
    problematic.push({slug, filename, reason: 'contains spaces/uppercase/paren'});
  }
}

console.log('Total product slugs checked:', productSlugs.length);
console.log('Problematic count:', problematic.length);
problematic.forEach(p => console.log(p.slug, '→', p.filename, '-', p.reason));
