# ZARONE-COPY1 — reading clarity, copy and presentation audit (owner, 2026-11-20)

Task-ID: ZARONE-COPY1 · Agent-Owner: Claude · Branch: `claude/ZARONE-LOOK2` (PR zarone#12, draft; builds on LOOK2)

## Owner's requests
1. Home page: the caption «برج مسکونی · شمال تهران · عکس هنگام ساخت» shows, the photo does not. Find the cause, fix it,
   show it at 390×844 and 1366×860. Only photos already in the repo; no photos of real people fetched; site photos never
   name a project or company.
2. The signature «از سازندگی تا زندگی» more prominent and bolder: heavier Vazirmatn, larger, well placed, restrained.
3. Every heading, paragraph, button and caption rewritten for clarity in the owner's Persian: concise, concrete, no
   hype, no «!», emoji, «اولین/بهترین», «هوش مصنوعی», no invented numbers; «ساخت‌وساز» over «ساختن»; no family names;
   heritage facts kept (four generations from «حجرهٔ تجاری در بازار تهران»), none added. Register: luxury.
4. Placement and presentation against standards: one h1, logical h2/h3, RTL order, 45–75 characters a line on
   desktop, WCAG AA contrast, 44 px targets, inputs ≥ 16 px, spacing rhythm, CTA placement, Latin in
   `<bdi dir="ltr">`, Jalali dates.

## Finding before any change: requests 1 and 2 are about sazban.com, not zarone
- The caption string is built by Sazban's `src/app/site/photos.ts` (`caption()`: «برج مسکونی · شمال تهران» plus
  «عکس هنگام ساخت» for `duringBuild`). The Sazban home hero uses `PHOTOS.towerSite` (`/landing/photos/tower-crane.webp`).
  Neither «شمال تهران» nor «از سازندگی تا زندگی» appears anywhere in this repo (content, build, any branch).
- The asset exists in Sazban (`public/landing/photos/tower-crane.webp`, `-600.webp`), the path is right and it is
  eager-loaded with a preload. The cause is the phone layout: the photo is an `absolute inset-0 -z-10` layer behind the
  whole text column, under `.site-hero-shade` = navy at 72 % → 80 % → 93 % → 100 %. At 390 px it is all but invisible
  while the caption sits on top (Sazban's own `docs/runs/SZ-CONTRACTOR-CARD1/hero-390.png` shows it). At 1366 px the
  photo shows on the left 48 %.
- The signature is Sazban's hero line `<p className="mt-6 font-display text-lg text-brass-light/90">{BRAND.tagline}</p>`.
- Decision: this branch is Zarone's; the Sazban checkout belongs to another window's branch. I do not change Sazban
  here. The diagnosis and the exact fix go to the integrator in the hand-off for a Sazban window. On Zarone I check
  that every photo loads (they do) and correct one mislabelled photo (below).

## Research (accessed 2026-11-20)
| Topic | Guidance | Source |
|---|---|---|
| Line length | Body text 50–75 characters a line; WCAG 1.4.8 (AAA) ≤ 80 | Baymard Institute, «Readability: the optimal line length» (baymard.com/blog/line-length-readability) |
| RTL markup | `dir="rtl"` on `<html>`; never set base direction in CSS; isolate embedded LTR runs with `bdi`/`dir="auto"`; logical CSS properties | W3C i18n, «Structural markup and right-to-left text in HTML» (w3.org/International/questions/qa-html-dir) and the quick tips cited in CLAUDE.md |
| Contrast | 4.5:1 for body text, 3:1 for large text (≥ 24 px, or ≥ 18.66 px bold) | W3C WAI, Understanding SC 1.4.3 (w3.org/WAI/WCAG22/Understanding/contrast-minimum) |
| Targets | 44 × 44 CSS px (SC 2.5.5, AAA); 24 px minimum at AA (2.5.8). CLAUDE.md binds 44 px | W3C WCAG 2.2; Smashing Magazine 2024-07 on conformant target sizes |
| Luxury copy | Replace stock praise («renowned», «top-of-the-line», «once-in-a-lifetime») with the specific feature and what it does; describe the place honestly with accurate measurements | Inman, «These 7 marketing terms are officially clichéd» (2022-10-24); Luxury Presence, «Real estate website copy» |

## Decisions (each with its reason)
| # | Decision | Why / source |
|---|---|---|
| D1 | No Sazban change from this window; diagnosis and patch go to the hand-off | Scope (branch is Zarone's); AGENT_COORDINATION: never push to another session's branch |
| D2 | Symphony `02-travertine.webp` is a completion-stage photo (scaffold, tarp, workers): reclassify `construction`, caption «نمای تراورتن، هنگام تکمیل ساختمان». The home «about» photo becomes the finished stone stair (`instagram-staircase-01.webp`, already in the repo) | Truthful captions (D-89 rule «عکس هنگام ساخت»); luxury register shows the finished material, no people |
| D3 | «ساخت‌وساز» replaces «ساختن» where it reads naturally; the hero line becomes «ساخت‌وساز، فراتر از معمول.» and is built from `content/site.json` instead of being hard-coded | Owner preference; one fact in one place |
| D4 | At most one «؛» per paragraph; repeated words removed; sentences shortened; no new facts or figures (counts only of items on the page) | Sazban VOICE (SZ-SITE-VOICE2 §2); owner's honesty rule |
| D5 | The owner's own saying «بهترین میراث، نام نیک است.» stays word for word | It is his quoted saying, not a superlative claim; the ban targets claims |
| D6 | Footer link to Sazban carries Sazban's current signature «از سازندگی تا زندگی» instead of the older line | One truth on every surface (Sazban signature since 2026-11-11) |
| D7 | Minimum visible text 12 px (chips, captions, footer), 13 px for captions under photos on desktop | Audit found 10–11 px captions; legibility on phones |
| D8 | Long-form paragraphs capped at about 34em so lines stay ≤ 75 characters at 1366 | Baymard / WCAG 1.4.8 |
| D9 | Section rhythm: 112 px desktop / 64 px phone for every full band (about page bands were 85–110 / 50–60) | Consistent spacing rhythm from LOOK2 |
| D10 | Header call to action names the action («گفت‌وگو دربارهٔ پروژه»), not a slogan | A button says what happens (CLAUDE.md taste 7) |
| D11 | `sitePublic` and `domain` (zaronegroup.com) untouched; `deploy/` untouched | Owner gates |

## Done
`node build.mjs`, `npm run check`, `scripts/navigation.mjs`; Playwright pictures of every page at 390×844 and 1366×860
with zero console errors in `docs/runs/ZARONE-COPY1/` (full page, plus the home first screen at each width);
before/after list in `docs/runs/ZARONE-COPY1/copy-changes.md`; PR body `## Handoff` updated. Owner's yes on the
pictures before merge; public copy is an owner gate.
