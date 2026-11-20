# ZARONE-LOOK2 — Zarone's own look on Sazban's format (owner, 2026-11-20)

Owner: «for zarone use the similar format and design and fonts but different coloring and some changes of icons and
layout». Read `CLAUDE.md`, `docs/BRAND_ALIGNMENT.md`, `content/brand.json`, `content/site.json`, `build.mjs` and
`src/styles.css` first. Reference for the format: the Sazban website (`zarkeshmohsen-bot/sazban`, `src/app/site/`:
`home.tsx`, `about/page.tsx`, `heritage.ts`, `frame.tsx`, `icons.tsx`) as merged on main today.

## Keep (same as Sazban)
- Format: photo hero with eyebrow, one H1 and one lead; sections that open with a short eyebrow and an H2; cards with a
  thin rule; the heritage band (saying, letterhead line, timeline); the closing band.
- Font: Vazirmatn only, the same weights and type scale. Persian on screen; Latin in `<bdi dir="ltr">`.
- Rules: CLAUDE.md of this repo (luxury register, no «!», no «اولین/بهترین», no invented numbers; phone first, 44 px
  targets; checks at 320, 390, 768, 1024, 1366).

## Change (Zarone's own, so the two sites are related but not twins)
1. **Colour.** Leave Sazban's navy, ivory and brass behind. Zarone's direction from the owner's earlier choices:
   warm stone and travertine for light grounds, a deep espresso/charcoal for dark bands instead of navy, bronze for
   rules and accents, and the Instagram logo's orange kept for the N mark only (the owner asked the N to match it).
   Define the palette once in `content/brand.json` (contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text; check each
   pair and record the ratios in `docs/BRAND_ALIGNMENT.md`). Rewrite the "matches Sazban's palette" paragraph there.
2. **Icons.** Replace the Sazban line icons on Zarone with a different set drawn for Zarone (inline SVG, 1.5 px stroke,
   rounded joins), shaped for its services: design and architecture, ground-up construction, مشارکت در ساخت, investment,
   renovation, contact (phone, WhatsApp, Instagram, address). No icon library or external request.
3. **Layout.** Same sections, different arrangement: alternate image and text sides; larger photographs (the luxury
   register — form, views, materials); a project grid that leads with one wide feature project; the heritage timeline
   laid out horizontally on desktop, vertical on phones; the services as a numbered list with icons rather than cards.
   Keep every existing project page, link and content record.

## Out of scope
No new copy beyond labels a layout needs; no new facts or numbers; no change to `sitePublic` (stays false); no DNS,
hosting or `/` changes. The heritage text merged in zarone#11 (four generations) stays word for word.

## Done
`node build.mjs`; pictures of home, about, a project page and contact at 390×844 and 1366×860 with zero console errors
in `docs/runs/ZARONE-LOOK2/`; a side-by-side picture of the Sazban and Zarone home tops at 1366. Push to branch
`claude/ZARONE-LOOK2`, open a PR with the pictures in its body, and stop. The owner's yes on the pictures merges it.
