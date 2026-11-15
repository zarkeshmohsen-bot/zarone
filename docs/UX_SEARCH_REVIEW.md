# Search and navigation UX review — 2026-11-11

Scope: public header/search/navigation, plus existing Sazban app search. Bounded usability/accessibility changes, not certification of every page or a new business service. Our touch target is 44 px (stricter than WCAG 2.2 AA's 24 px minimum). Placement follows each language's reading direction and the site's primary task. Non-directional search/home/object icons are not mirrored like directional arrows.

Research checked 2026-11-11:
- https://www.nngroup.com/articles/magnifying-glass-icon/
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum
- https://www.w3.org/International/quicktips/#rtl
- https://m1.material.io/usability/bidirectionality.html

Built: catalogue-local project search by existing name/location/use/status. Harmless Persian/Arabic letter/digit forms match; count/no-results/clear are explicit. URL query survives reload and Back, without a search-history archive or external service. Progressive enhancement leaves all cards usable without JavaScript. Three design previews retain content and publication flags.

Verification gates: static build/check plus 320/390/768/1366 browser tests across A/B/C, filters/Back/clear/no-results and existing RTL regression; pictures before merge.

Publication limitation observed: https://zarone.ir/site/ returned an upstream connection failure in the review browser. https://zarone.sazban.com/site/projects/ was reachable but showed the older hosted header. Main is not proof of publication. Verify the actual host before calling it live; preserve sitePublic=false and the pending brand branch.

Next useful options: reuse verified project location/use/status for filters and project-specific contact links. No invented sale availability, customer counts, awards or locations.
