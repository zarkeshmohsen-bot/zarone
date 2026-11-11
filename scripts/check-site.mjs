// Validate the built site's release-critical links, assets and indexability.
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),dist=join(root,'dist');
const site=JSON.parse(readFileSync(join(root,'content/site.json')));
const projects=JSON.parse(readFileSync(join(root,'content/projects.json')));
const files=dir=>readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?files(path):[path];});
const errors=[];
for(const file of files(dist).filter(p=>p.endsWith('.html')&&!p.endsWith('/qa.html'))){const html=readFileSync(file,'utf8');
 if(!html.includes('<html lang="fa" dir="rtl">'))errors.push(`${file}: missing Persian RTL`);
 if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${file}: expected one H1`);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){const path=join(dist,decodeURI(m[1]));if(!existsSync(path)&&!existsSync(join(path,'index.html')))errors.push(`${file}: missing ${m[1]}`);}
 if(/\/site-[bc]\//.test(file)&&!html.includes('noindex,nofollow'))errors.push(`${file}: preview indexable`);
}
const base=site.sitePublic?'':'/site';
for(const p of projects)if(!existsSync(join(dist,base,`projects/${p.slug}/index.html`)))errors.push(`missing project ${p.slug}`);
const fullHome=readFileSync(join(dist,base,'index.html'),'utf8');
const hero=projects.find(p=>p.slug===site.hero.projectSlug);
if(site.hero.projectSlug!=='symphony-park-residence'||!hero)errors.push('Symphony must remain the hero project');
if(hero&&!fullHome.includes(`href="${base}/projects/${hero.slug}/" aria-label="مشاهدهٔ پروژهٔ`))errors.push('hero does not link to its project');
for(const p of projects){
 if(!fullHome.includes(`data-project="${p.slug}"`))errors.push(`homepage omits ${p.slug}`);
 if(!p.media?.some(m=>m.src===p.cover))errors.push(`${p.slug}: missing declared cover`);
 const seen=new Set();
 for(const m of p.media??[]){
  if(seen.has(m.src))errors.push(`${p.slug}: duplicate image ${m.src}`);seen.add(m.src);
  if(!m.caption||!['photo','render','construction'].includes(m.type))errors.push(`${p.slug}: uncaptioned or unclassified image`);
  if(!existsSync(join(dist,m.src)))errors.push(`${p.slug}: missing media ${m.src}`);
 }
}
const home=readFileSync(join(dist,'index.html'),'utf8');
if(!site.sitePublic&&!home.includes(site.holding.text))errors.push('holding-page approval gate lost');
const sitemap=readFileSync(join(dist,'sitemap.xml'),'utf8');if(/\/site(?:[-/])/.test(sitemap))errors.push('preview leaked into sitemap');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('PASS: all built pages, local links/assets, project routes, preview SEO and holding-page gate.');
