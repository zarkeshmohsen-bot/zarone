# zarone.ir

Website of گروه ساختمانی زروان (ZarOne Development Group). Static, no dependencies: `node build.mjs` → `dist/`.

- `/` — holding page (live).
- `/site/` — the full site, `noindex` until the owner approves it. Set `"sitePublic": true` in `content/site.json` and
  the full site moves to `/` and the holding page goes away.
- Content: `content/site.json`, `content/projects.json`. Photos: `images/projects/<slug>/NN-name.webp`; the first file
  is the cover, the folder decides what exists.
- Brand: direction A (navy #0b1f3a, travertine #efe9df, bronze #7a5f44; Markazi Text + Vazirmatn + Cormorant
  Garamond), shared with Sazban — Sazban repo `docs/DECISIONS.md` D-39, canvas «Zarone & Sazban — brand directions».
  Fonts are OFL; licences in `fonts/`.

## Publishing
The hosting account pulls this public repo every 10 minutes (`deploy/publish.sh`, cron) and copies `dist/` to
`~/zarone.ir`. A push to `main` is live within 10 minutes. No keys are stored here or in GitHub.

## Rules
Same as Sazban's CLAUDE.md where they apply: Persian on screen, Latin in `<bdi>`, no claim without a source the owner
gave or a public record, nothing public (copy, photos, contacts) without the owner's yes on a picture. Photos and renders
are the owner's; renders by outside studios are credited when the owner names them.
