# Countries fixes — before/after evidence

Before images are the three original user-provided screenshots. After images were captured in Chrome at the matching 1280 × 900 viewport, light theme, with an en-US browser locale on 2026-10-04.

| Issue | Before | After | Verified outcome |
| --- | --- | --- | --- |
| Population readability | [Before](before/1-countries-page.png) | [After](after/1-countries-page.png) | Grouping separators make large numbers readable; sorting still uses numeric values. |
| Region and search combined | [Before](before/2-europe-and-search-united.png) | [After](after/2-europe-and-search-united.png) | Europe + “united” returns only United Kingdom. |
| Converter after related-country navigation | [Before](before/3-india-after-clicking-it-from-japan.png) | [After](after/3-india-after-clicking-it-from-japan.png) | Opened Japan, clicked India under More from Asia; From becomes INR and the result recalculates. |

## Verification

- Population formatting and ascending numeric sorting passed.
- Region changes while searching, All Regions, case-insensitive capital search, surrounding whitespace, clearing search, and no matches passed.
- Japan → India via the related-country link, browser back/forward, and reloading India passed.
- At an emulated 393 × 852 mobile viewport, cards retained formatted populations, Europe + “united” returned one card, Japan → India updated the currency, and both pages had no horizontal document overflow.
- A separate controlled-response check delayed Japan's rate until after India's rate. The old result did not overwrite India's result. Amount and target-currency changes also recalculated correctly. This check used mocked exchange responses; the screenshot above uses the live service response (100 INR = 1.04 USD at capture time).
- `npm run build` and `git diff --check` passed.

Changes are limited to the country table's population display, combined search/region filtering, and reactive converter state with stale-response protection.
