// The publisher calls this before copying built files into the public document root.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = new URL('../dist/', import.meta.url);
const files = dir => readdirSync(dir).flatMap(name => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const dist = root.pathname;
for (const file of files(dist).filter(p => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  assert(html.includes('<html lang="fa" dir="rtl">'), `${file}: Persian direction`);
  for (const [, asset] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)) {
    const path = join(dist, decodeURI(asset));
    assert(existsSync(path) || existsSync(join(path, 'index.html')), `${file}: missing ${asset}`);
  }
}
console.log('Built Persian pages and local links/assets verified');
