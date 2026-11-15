# Zarone / Sazban / KCZ alignment — 11 November 2026

## Current implementation

`content/brand.json` is the single source for Zarone's palette, locally hosted Vazirmatn face and original logo path. `build.mjs` emits `dist/brand.css`. All three retained palette variants use Vazirmatn for headings, body copy, numerals and the Latin wordmark; no other font face is loaded. Logos are confined to the header/footer and remain replaceable from that single path.

The main palette matches Sazban's public website: navy `#0b1f3a`, deep navy `#071428`, paper `#f7f5f0`, a muted brass rule `#b08d57` and darker accent ink. Do not copy the older orange app tokens in `brand/tokens.json` over the current public-site palette. KCZ's public source uses Vazirmatn, image-led dark sections, restrained accents and clean information hierarchy. Zarone shares those conventions while preserving its architectural identity and project photography.

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
