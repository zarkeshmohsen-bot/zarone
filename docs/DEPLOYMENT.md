# Zarone deployment — 11 November 2026

## Observed status

The supplied nameservers are `cash.ns.cloudflare.com` and `val.ns.cloudflare.com`. Nameservers provide DNS; they are not an upload destination or hosting credentials.

Public queries through Cloudflare DNS and Google DNS both returned SERVFAIL for `zarone.ir` on 11 November 2026. Google's response identified the old delegation as `NS2000.MOCHAHOST.COM` and authorities `13.248.158.180` / `75.2.118.134`, refusing DNS queries. The new Cloudflare delegation cannot be assumed active. No DNS changes have been made by this work.

The existing `deploy/publish.sh` documents a hosting-account checkout at `~/zarone-src` and a document root at `~/zarone.ir`. It mentions InMotion and defaults its cache verification to `zarone.sazban.com`. This is repository evidence, not verified account access. The preview host returned a ModSecurity 406 response during the current read attempt. No account login or server upload has been completed.

## Connection required for release

1. In the Cloudflare account for the zone, confirm the exact assigned nameservers; at the registrar, compare the effective delegation with them. Check whether any old DNSSEC DS record conflicts with the active zone before changing DNSSEC.
2. Confirm which hosting account owns `zarone.ir`, its real server IPv4 address and the domain's document root. On that host, bind both `zarone.ir` and `www.zarone.ir` to this site's document root.
3. In Cloudflare, point the apex A record to that verified hosting address and `www` CNAME to `zarone.ir`. Preserve existing mail and verification records. Do not point an A record at either Cloudflare nameserver.
4. Install/verify the origin certificate for the actual domain, then use Cloudflare Full (strict) TLS. Never use Flexible TLS with the existing HTTPS redirect.
5. After the owner's screenshot approval, merge the design, set `sitePublic: true`, rebuild, and run the host publication script or upload `dist/` contents. Exclude local `qa.html` from any upload.
6. Add the actual configured domain to `ZARONE_HOSTS` only when the host serves it. Verify HTTPS, the correct Zarone title, project navigation, 404 status, robots and sitemap, and `/release.json`. The ten-minute cron requires host-side verification; it is not configured by GitHub itself.

## Local validation

- Build and generated-page integrity: `npm run build && npm run check`.
- Publish script syntax: `bash -n deploy/publish.sh`.
- Mobile 390 × 844 and desktop 1366 × 860 rendering checked using same-origin preview frames. Mobile menu, seven-project reset, two-project renovation filter, project navigation and gallery next/close checked interactively.
- No website JavaScript errors observed. The browser extension emitted unrelated metadata errors.

## Approval boundary

`CLAUDE.md` explicitly requires the owner's yes on a picture before new public copy/photos or moving the full site to `/`. The proposal stays on a review branch; production `main` and DNS remain unchanged until that decision and access are available.
