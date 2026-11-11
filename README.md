# zarone.ir

Persian, RTL portfolio for گروه ساختمانی زروان (ZarOne Development Group). Node 20+; no packages, tracking services or third-party asset requests are needed at runtime.

```sh
npm run build
npm run check
```

Upload the **contents** of `dist/` to the domain's document root. The existing host script is `deploy/publish.sh`.

## Pages and content

- `/` retains the holding page until the owner's visual approval.
- `/site/` shows all seven documented projects beneath the Symphony hero, plus direct links to the two Lavasan Instagram highlights. Each project has captioned galleries and verified source/location links where available; see [Instagram audit](docs/INSTAGRAM_AUDIT.md).
- `/site-b/`, `/site-c/`, `/b/` and `/c/` remain available for the previous palette comparison links. Preview variants are not indexable.
- After visual approval, set `sitePublic` in `content/site.json` to `true`, rebuild and publish. The full site then occupies `/`; its production URLs enter the sitemap.
- Edit facts in `content/site.json` and `content/projects.json`; the latter declares covers, captions and photo/render/construction types. `content/instagram-highlights.json` holds the separate Lavasan archive links. Photography remains in `images/projects/`; the Instagram profile's original logo is stored locally at `images/zarone-original.jpg`.
- Typography is Vazirmatn throughout, served locally; OFL licences are in `fonts/`. Palette, typography and logo are centralized in `content/brand.json`.
- About Us follows Sazban’s current family heritage and connects the separate work of Zarone, Sazban and Kimia Ceram Zarin; see [brand/content provenance](docs/BRAND_ALIGNMENT.md).

## Release and hosting status

See [deployment notes](docs/DEPLOYMENT.md) and [visual review](docs/review/README.md). The repository previously documented a ten-minute host pull from `main`; that schedule and access have **not** been independently verified in this change. A GitHub push alone is not proof that `zarone.ir` is serving a release.

The release marker `dist/release.json` identifies the website build. The publish script validates output and records the last successfully published commit, so a failed build is retried rather than silently skipped.
