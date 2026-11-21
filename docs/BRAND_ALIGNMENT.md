# Zarone / Sazban / KCZ alignment — 11 November 2026

## Current implementation

`content/brand.json` is the single source for Zarone's palette, locally hosted Vazirmatn face and original logo path. `build.mjs` emits `dist/brand.css`. All three retained palette variants use Vazirmatn for headings, body copy, numerals and the Latin wordmark; no other font face is loaded. Logos are confined to the header/footer and remain replaceable from that single path.

Zarone's palette is its own (LOOK2, owner 2026-11-20: «similar format and design and fonts but different coloring»). Sazban's navy, ivory and brass are not used. Light grounds are warm stone `#f3efe8` and travertine `#e7dfd2` with a card `#fbf9f5`; dark bands are espresso `#2c241f` and the header/footer espresso-deep `#1c1714`; bronze `#96703f` carries rules and icon rings, bronze-ink `#7a5634` accent text on light grounds, bronze-light `#cfab7c` accent text on dark. The logo is the owner's chosen ZA mark (ZARONE-LOGO-ZA, 2026-11-21): the designer's 2026-11-17 geometry, Z and block black `#000000` (white on dark grounds), the A-stroke gold `#d3a73e`; the gold appears only in that stroke. The earlier ZN/portal mark and orange `#ef4123` are retired. Format, Vazirmatn type scale, eyebrow-with-rule, section rhythm and the heritage band follow Sazban's site; colour, icons and arrangement are Zarone's. KCZ's public source uses Vazirmatn, image-led dark sections, restrained accents and clean information hierarchy; Zarone shares those conventions while preserving its architectural identity and project photography.

### Contrast (WCAG 2.1, checked 2026-11-20 from `content/brand.json`)

| Foreground | Background | Use | Ratio | Minimum |
|---|---|---|---|---|
| `ink` `#2a231e` | `stone` `#f3efe8` | body text | 13.50:1 | 4.5:1 |
| `ink` `#2a231e` | `travertine` `#e7dfd2` | body text | 11.70:1 | 4.5:1 |
| `ink` `#2a231e` | `card` `#fbf9f5` | body text | 14.71:1 | 4.5:1 |
| `muted` `#62574d` | `stone` `#f3efe8` | secondary text | 6.13:1 | 4.5:1 |
| `muted` `#62574d` | `travertine` `#e7dfd2` | secondary text | 5.31:1 | 4.5:1 |
| `muted` `#62574d` | `card` `#fbf9f5` | secondary text | 6.68:1 | 4.5:1 |
| `bronze-ink` `#7a5634` | `stone` `#f3efe8` | eyebrows, numbers, links | 5.71:1 | 4.5:1 |
| `bronze-ink` `#7a5634` | `travertine` `#e7dfd2` | eyebrows, numbers, icons | 4.95:1 | 4.5:1 |
| `bronze-ink` `#7a5634` | `card` `#fbf9f5` | eyebrows, numbers | 6.22:1 | 4.5:1 |
| `bronze` `#96703f` | `stone` `#f3efe8` | rules and icon rings (non-text) | 3.91:1 | 3:1 |
| `bronze` `#96703f` | `travertine` `#e7dfd2` | rules and icon rings (non-text) | 3.39:1 | 3:1 |
| `on-dark` `#f3ede4` | `espresso` `#2c241f` | text on dark bands | 13.08:1 | 4.5:1 |
| `on-dark` `#f3ede4` | `espresso-deep` `#1c1714` | text on header and footer | 15.27:1 | 4.5:1 |
| `on-dark-muted` `#c2b6a8` | `espresso` `#2c241f` | secondary text on dark | 7.65:1 | 4.5:1 |
| `on-dark-muted` `#c2b6a8` | `espresso-deep` `#1c1714` | secondary text on dark | 8.93:1 | 4.5:1 |
| `bronze-light` `#cfab7c` | `espresso` `#2c241f` | eyebrows and icons on dark | 7.08:1 | 4.5:1 |
| `bronze-light` `#cfab7c` | `espresso-deep` `#1c1714` | eyebrows and icons on dark | 8.26:1 | 4.5:1 |
| `ink` `#2a231e` | `on-dark` `#f3ede4` | button text (light button on dark) | 13.29:1 | 4.5:1 |
| `mark-gold` `#d3a73e` | `espresso-deep` `#1c1714` | the A-stroke of the ZA mark in header and footer (graphic) | 7.92:1 | 3:1 |
| `mark-gold` `#d3a73e` | white `#ffffff` | the A-stroke on the favicon tile and light-ground files | 2.24:1 | logo, exempt |
| `mark-gold` `#d3a73e` | `stone` `#f3efe8` | the A-stroke if the on-light mark sits on stone | 1.96:1 | logo, exempt |
| `mark-gold` `#d3a73e` | `travertine` `#e7dfd2` | the A-stroke if the on-light mark sits on travertine | 1.70:1 | logo, exempt |

The gold slash is weak in tone on light grounds (below 3:1); it reads by its size. The site shows the mark on light ground only on the holding page (not built while `sitePublic` is true) and in the favicon tile.

`bronze` is never used for text; text in bronze uses `bronze-ink` (light) or `bronze-light` (dark).

### Icons

Zarone's line icons are drawn for it in `build.mjs` (`ICON_PATHS`): 24 × 24, 1.5 px stroke, round caps and joins, `currentColor`, inline SVG, no library or external request — design and architecture, ground-up construction, مشارکت در ساخت, investment, renovation, phone, mobile, WhatsApp, Instagram, address, arrow and menu. Sheet: `docs/runs/ZARONE-LOOK2/icons.png`. The renovation icon is drawn but not yet on screen: `content/site.json` has no renovation service line, and adding one is new copy for the owner.

Only Zarone is changed by this PR; the Sazban application and the KCZ website are reference sources.

## Content provenance

- Sazban main checked 11 November 2026: tree `bb5b56e9c1035620f3c1f69580789acf2425a9c8`.
- Family history: `src/app/site/heritage.ts`, blob `918316669aff0582df17362ee9c4f5ff80e7578f`, and `src/app/site/about/page.tsx`. Preserve the exact owner-approved phrase «دفتر مرکزی همهٔ فعالیت‌های ماست».
- The 1340s five-storey office, the two adjacent eleven-storey buildings in the 1350s, the grandfather's ledger and hand-drawn sales charts are the family's history. They are not dates of incorporation for Zarone, Sazban or KCZ.
- «بهترین میراث، نام نیک است.» is the owner's approved saying in Sazban's source, not an advertising superlative. «حق با مشتری است.» comes from the grandfather's letterhead. They appear once in the full About Us history.
- The two heritage photographs are exact local copies of Sazban's `public/landing/photos/heritage-1350s-800.webp` and `heritage-today-480.webp`. The old buildings are photographed today; the caption says so. No archival ledger/chart image is invented.
- The family's expansion from the 1360s into construction/industrial chemistry and industrial equipment comes from Sazban's current About Us. The links to Sazban and Kimia Ceram Zarin identify their separate specialist work, without inventing a parent/subsidiary legal structure.
- KCZ reference: `zarkeshmohsen-bot/kimiaceram`, `client/src/index.css`, `client/src/pages/About.tsx`, `client/src/pages/Home.tsx`; public domain `https://kimiaceram.com`. No manufacturer certificates, corporate age, sales statistics or product promises are transplanted into Zarone.

## Projects and presentation

Keep the existing seven documented projects. Home, project archive and detail pages remain linked to those records. The added landscape feature uses the existing Ramsar/Arbekeleh project and explicitly labels its image as a design render. Interior photography is the completed Shemshak renovation; construction-stage photographs must not be represented as completed work.

Sazban intentionally uses generic building descriptions in its own marketing site. Zarone is the requested Instagram-aligned project portfolio and retains its supplied project names and locations.

## Release

The same draft PR holds the refined proposal and updated screenshots. The visual-approval boundary in `CLAUDE.md` and the previously documented hosting/DNS blocker remain in force. No changes to production `main`, hosting, domain delegation or TLS have been made.
