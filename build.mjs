// zarone.ir — static build, no dependencies. node build.mjs → dist/
//   /        holding page (live while the full site is reviewed)
//   /site/   the full site, noindex until site.json "sitePublic" is true; then it moves to / (set BASE below to "")
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "dist");
const site = JSON.parse(readFileSync(join(here, "content/site.json"), "utf8"));
const projects = JSON.parse(readFileSync(join(here, "content/projects.json"), "utf8"));
const origin = `https://${site.domain}`;
const BASE = site.sitePublic ? "" : "/site";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fa = (n) => String(n).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

function photosOf(slug) {
  const dir = join(here, "images/projects", slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort().map((f) => `/images/projects/${slug}/${f}`);
}

const wordmark = (cls = "") => `<span class="wm ${cls}"><span class="wm-fa">${esc(site.wordmark)}</span><span class="wm-en" dir="ltr">${esc(site.wordmarkLatin)}</span></span>`;

function head({ title, description, path, index }) {
  const url = `${origin}${path}`;
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${index ? "index,follow" : "noindex,nofollow"}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="fa_IR"><meta property="og:site_name" content="${esc(site.nameFa)}"><meta property="og:image" content="${origin}/images/holding.webp">
<meta name="theme-color" content="#0b1f3a">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/MarkaziText-Arabic-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: site.nameFa, alternateName: site.nameEn, url: origin, telephone: site.contact.phone, sameAs: [site.contact.instagram], address: { "@type": "PostalAddress", streetAddress: site.contact.address, addressLocality: site.city, addressCountry: "IR" } })}</script>
</head>`;
}

const contactLines = () => [
  `<a href="tel:${site.contact.phone}"><bdi dir="ltr">${esc(site.contact.phoneDisplay)}</bdi></a>`,
  `<span>${esc(site.contact.address)}</span>`,
  `<a href="${site.contact.instagram}" rel="me noopener" target="_blank">اینستاگرام <bdi dir="ltr">${esc(site.contact.instagramHandle)}</bdi></a>`,
];

function layout({ title, description, path, body, current }) {
  const nav = [[`${BASE}/projects/`, "پروژه‌ها"], [`${BASE}/#services`, "خدمات"], [`${BASE}/about/`, "دربارهٔ زروان"], [`${BASE}/contact/`, "تماس"]]
    .map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `${head({ title, description, path, index: site.sitePublic })}
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="${BASE}/" aria-label="${esc(site.nameFa)}">${wordmark()}</a>
  <nav aria-label="اصلی">${nav}</nav>
</div></header>
<main>
${body}
</main>
<footer><div class="wrap">
  <div class="foot-id">${wordmark("small")}<span>${esc(site.nameFa)} · ${esc(site.contact.address)}</span></div>
  <div class="links">${contactLines().filter((_, i) => i !== 1).join("")}<a href="${site.sazban.url}" rel="noopener">${esc(site.sazban.label)}</a></div>
</div></footer>
</body>
</html>`;
}

function card(p) {
  const cover = photosOf(p.slug)[0];
  return `<a class="card" href="${BASE}/projects/${p.slug}/">
  ${cover ? `<img src="${cover}" alt="${esc(p.name)}" loading="lazy">` : `<span class="card-typo">${esc(p.name)}</span>`}
  <span class="card-name">${esc(p.name)}</span>
  <span class="card-meta">${esc(p.use)} · ${esc(p.place)} · ${esc(p.status)}</span>
</a>`;
}

// ── full site ──
const home = layout({
  title: `${site.nameFa} — ${site.hero.line}`,
  description: site.hero.text,
  path: `${BASE}/`,
  current: "",
  body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text">
    <p class="eyebrow">${esc(site.nameFa)} · ${esc(site.city)}</p>
    <h1>${esc(site.hero.line)}</h1>
    <div class="rule"></div>
    <p class="lead">${esc(site.hero.text)}</p>
    <div class="actions"><a class="btn" href="${BASE}/projects/">پروژه‌ها را ببینید</a><a class="btn ghost" href="${BASE}/contact/">گفت‌وگو دربارهٔ پروژهٔ شما</a></div>
  </div>
  <figure class="hero-photo"><img src="/images/${site.hero.image}" alt="${esc(site.hero.caption)}"><figcaption>${esc(site.hero.caption)}</figcaption></figure>
</div></section>
<section class="band" id="services"><div class="wrap services">
  ${site.services.map((s) => `<div><h2 class="svc">${esc(s.title)}</h2><p>${esc(s.text)}</p></div>`).join("")}
</div></section>
<section><div class="wrap">
  <p class="eyebrow">پروژه‌ها</p>
  <h2>ساختمان‌هایی که می‌سازیم</h2>
  <div class="cards">${projects.slice(0, 6).map(card).join("")}</div>
  ${projects.length > 6 ? `<p class="more"><a href="${BASE}/projects/">همهٔ ${fa(projects.length)} پروژه</a></p>` : ""}
</div></section>
<section class="principles"><div class="wrap">${site.principles.map((w) => `<span>${esc(w)}</span>`).join('<span class="dot" aria-hidden="true">◆</span>')}</div></section>
<section class="cta"><div class="wrap">
  <h2>${esc(site.cta.title)}</h2>
  <p>${esc(site.cta.text)}</p>
  <a class="btn light" href="${BASE}/contact/">${esc(site.cta.button)}</a>
</div></section>`,
});

const projectsIndex = layout({
  title: `پروژه‌ها — ${site.nameFa}`,
  description: `پروژه‌های ${site.nameFa}: مسکونی، اداری، ویلایی و بازسازی.`,
  path: `${BASE}/projects/`,
  current: `${BASE}/projects/`,
  body: `<section><div class="wrap">
  <p class="eyebrow">پروژه‌ها</p>
  <h1 class="page-title">${fa(projects.length)} پروژه</h1>
  <div class="cards">${projects.map(card).join("")}</div>
</div></section>`,
});

const projectPages = projects.map((p) => {
  const photos = photosOf(p.slug);
  const [first, ...rest] = photos;
  return [p.slug, layout({
    title: `${p.name} — ${p.use}، ${p.place} — ${site.nameFa}`,
    description: p.summary,
    path: `${BASE}/projects/${p.slug}/`,
    current: `${BASE}/projects/`,
    body: `<section class="project-head"><div class="wrap">
  <p class="eyebrow"><a href="${BASE}/projects/">پروژه‌ها</a> · ${esc(p.use)} · ${esc(p.place)}</p>
  <h1 class="page-title">${esc(p.name)}</h1>
  <p class="lead">${esc(p.summary)}</p>
</div></section>
${first ? `<div class="wrap"><img class="project-cover" src="${first}" alt="${esc(p.name)}"></div>` : ""}
<section><div class="wrap project-body">
  <dl class="facts">${p.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}<div><dt>وضعیت</dt><dd>${esc(p.status)}</dd></div></dl>
  ${rest.length ? `<div class="gallery">${rest.map((src) => `<img src="${src}" alt="${esc(p.name)}" loading="lazy">`).join("")}</div>` : ""}
</div></section>`,
  })];
});

const about = layout({
  title: `${site.about.title} — ${site.nameFa}`,
  description: site.about.paragraphs[0],
  path: `${BASE}/about/`,
  current: `${BASE}/about/`,
  body: `<section><div class="wrap narrow">
  <p class="eyebrow">${esc(site.nameFa)}</p>
  <h1 class="page-title">${esc(site.about.title)}</h1>
  <div class="rule"></div>
  ${site.about.paragraphs.map((t) => `<p class="lead">${esc(t)}</p>`).join("")}
</div></section>`,
});

const contact = layout({
  title: `تماس — ${site.nameFa}`,
  description: `دفتر ${site.nameFa}: ${site.contact.address}، تلفن ${site.contact.phoneDisplay}.`,
  path: `${BASE}/contact/`,
  current: `${BASE}/contact/`,
  body: `<section><div class="wrap narrow">
  <p class="eyebrow">تماس</p>
  <h1 class="page-title">با زروان گفت‌وگو کنید</h1>
  <div class="rule"></div>
  <p class="lead">${esc(site.cta.text)}</p>
  <div class="contact-list">${contactLines().join("")}</div>
</div></section>`,
});

// ── holding page at / ──
const holding = `${head({ title: `${site.nameFa} — ${site.holding.line}`, description: `${site.descriptor}. ${site.contact.address}.`, path: "/", index: true })}
<body class="holding">
<main class="hold">
  <div class="hold-text">
    ${wordmark("large")}
    <p class="hold-desc">${esc(site.nameFa)} · ${esc(site.descriptor)}</p>
    <div class="rule"></div>
    <h1>${esc(site.holding.line)}</h1>
    <p class="lead">${esc(site.holding.text)}</p>
    <div class="contact-list">${contactLines().join("")}</div>
  </div>
  <figure class="hold-photo"><img src="/images/holding.webp" alt="سمفونی پارک رزیدنس، الهیه"><figcaption>سمفونی پارک رزیدنس · الهیه · ۱۳۹۸</figcaption></figure>
</main>
</body>
</html>`;

// ── write ──
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(here, "fonts"), join(out, "fonts"), { recursive: true });
cpSync(join(here, "images"), join(out, "images"), { recursive: true });
cpSync(join(here, "src/styles.css"), join(out, "styles.css"));
writeFileSync(join(out, "icon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#0b1f3a"/><text x="64" y="88" text-anchor="middle" font-family="serif" font-weight="700" font-size="68" fill="#efe9df">ز</text><rect x="44" y="102" width="40" height="3" fill="#7a5f44"/></svg>`);
const pages = [
  ["index.html", holding],
  [`${BASE.slice(1)}/index.html`.replace(/^\//, ""), home],
  [`${BASE.slice(1)}/projects/index.html`.replace(/^\//, ""), projectsIndex],
  [`${BASE.slice(1)}/about/index.html`.replace(/^\//, ""), about],
  [`${BASE.slice(1)}/contact/index.html`.replace(/^\//, ""), contact],
  ...projectPages.map(([slug, html]) => [`${BASE.slice(1)}/projects/${slug}/index.html`.replace(/^\//, ""), html]),
];
if (site.sitePublic) pages.shift(); // the full home replaces the holding page
for (const [path, html] of pages) { mkdirSync(dirname(join(out, path)), { recursive: true }); writeFileSync(join(out, path), html); }
writeFileSync(join(out, "robots.txt"), site.sitePublic ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : `User-agent: *\nAllow: /$\nDisallow: /site/\n`);
writeFileSync(join(out, ".htaccess"), `Options -Indexes\nDirectoryIndex index.html\nAddDefaultCharset UTF-8\nAddType image/webp .webp\nAddType font/woff2 .woff2\n<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteCond %{HTTPS} off\n  RewriteCond %{REQUEST_URI} !^/\\.well-known/\n  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]\n  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]\n</IfModule>\n<IfModule mod_headers.c>\n  Header set X-Content-Type-Options "nosniff"\n  Header set Referrer-Policy "strict-origin-when-cross-origin"\n  <FilesMatch "\\.(html)$">\n    Header set Cache-Control "no-cache"\n  </FilesMatch>\n  <FilesMatch "\\.(woff2|svg|webp|css)$">\n    Header set Cache-Control "public, max-age=86400"\n  </FilesMatch>\n</IfModule>\nErrorDocument 404 /index.html\n`);
console.log(`zarone: ${pages.length} pages, ${projects.length} projects, full site at ${BASE || "/"} (public=${site.sitePublic}) → dist/`);
