# zarone.ir — rules for anyone changing this repo

Owner: Mohsen Zarkesh. Brand and copy rules come from the Sazban repo (`zarkeshmohsen-bot/sazban`): CLAUDE.md taste
rules, docs/VOICE.md, D-39 (brand direction A). For Zarone the register is luxury, not cost: taste, form, comfort,
views, permanence. No «!», no «اولین/بهترین», no invented numbers — a figure appears only when the owner gave it or a
public record shows it. Persian on screen; Latin in `<bdi dir="ltr">`. Phone first, 44 px targets.

Owner gates: public copy, photos, contact details and anything moving from `/site/` to `/` need his yes on a picture.
Build: `node build.mjs`; check pictures at 390×844 and 1366×860 with zero console errors before pushing to `main`
(a push alone does not prove publication).

## Navigation direction
Persian navigation starts at the right (RTL): the mobile menu trigger and any side drawer belong on the right.
Use document direction and logical CSS properties; do not double-reverse flex rows. Keep English navigation LTR.
Check 320px and 390px phones, tablet and desktop, including keyboard dismissal, visible focus and 44px touch targets.
Reference: https://www.w3.org/International/quicktips/#rtl

## Publication status observed 2026-11-11
The RTL menu fix is merged and browser-tested. The hosted preview at https://zarone.sazban.com/site/ still served
the older header after merge, including a fresh query-string request. https://zarone.ir/site/ was unreachable
from the review browser. The documented ten-minute host publisher has not been verified; do not claim a GitHub
push is live. Hosting access and domain/delegation verification are still needed. Preserve sitePublic=false.
