# Mobile Lighthouse lab sample — 2026-09-27

## Scope

This is a one-run laboratory diagnostic for two production routes, not field Core Web Vitals or a site-wide guarantee. Lighthouse's simulated mobile profile used a 412x823 viewport, 4x CPU slowdown and simulated network throttling. Chrome reported by Lighthouse was HeadlessChrome 153.0.0.0. The no-key PageSpeed Insights query remains rate-limited; no CrUX or Search Console dataset was available.

## Results

| Route | Performance | FCP | LCP | CLS | TBT | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.98 | 1.6 s | 2.2 s | 0 | 63 ms | 2.0 s |
| `/compare/cursor-vs-claude-code/` | 0.99 | 1.6 s | 2.1 s | 0 | 60 ms | 1.6 s |

Both reports flagged about 27 KiB of estimated unused JavaScript in the shared `/_next/static/chunks/12_celfi3iros.js` bundle. This is a lab opportunity, not evidence of a user-visible regression. TBT is not INP; these runs do not verify real-user CWV.

## Production recheck — 2026-09-29

One additional Lighthouse run was collected for each route after deployment, using the same Lighthouse 13.5.0 mobile simulation: 412x823 viewport, 4x CPU slowdown, simulated network throttling, and HeadlessChrome 153.0.0.0. These are independent one-run samples, not a repeatability study.

| Route | Performance | FCP | LCP | CLS | TBT | Speed Index | Estimated unused JS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.98 | 1.7 s | 1.7 s | 0 | 100 ms | 2.6 s | 27,554 B |
| `/compare/cursor-vs-claude-code/` | 0.97 | 1.8 s | 1.8 s | 0 | 80 ms | 3.9 s | 27,953 B |

Both reports attribute the unused-JavaScript estimate to the same 71,270-byte shared chunk. The estimate alone does not show that removing the bytes would improve FCP or LCP; Lighthouse reported 0 ms overall savings for this opportunity. Scores and TBT vary from the 2026-09-27 single runs, while LCP is lower in these samples. Treat the difference as run-to-run lab variation, not a field trend or regression. These samples still provide no INP, CrUX, Search Console or field CWV data and do not represent all 99 routes.

## Reproduction

Run with an installed Chrome-compatible executable and Lighthouse 13.5.0:

```sh
CHROME_PATH=<chrome-executable> npx --yes lighthouse@13.5.0 https://toolpilot.cc/ --only-categories=performance --chrome-flags='--headless=new --no-sandbox --disable-dev-shm-usage' --output=json --output-path=<report.json>
CHROME_PATH=<chrome-executable> npx --yes lighthouse@13.5.0 https://toolpilot.cc/compare/cursor-vs-claude-code/ --only-categories=performance --chrome-flags='--headless=new --no-sandbox --disable-dev-shm-usage' --output=json --output-path=<report.json>
```

The Chrome flags above were required by this sandboxed Linux environment; use a Chrome-compatible executable available to the local measurement environment.

References: [Lighthouse CLI overview](https://developer.chrome.com/docs/lighthouse/overview) and [Lighthouse v13.5.0 release](https://github.com/GoogleChrome/lighthouse/releases/tag/v13.5.0).

## Remaining evidence

TODO-311 stays open for dated field CWV and GSC data, including the measurement window and URL coverage. Do not use these lab scores to claim field CWV compliance, search visibility or indexing.
