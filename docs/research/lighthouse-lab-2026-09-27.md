# Mobile Lighthouse lab sample — 2026-09-27

## Scope

This is a one-run laboratory diagnostic for two production routes, not field Core Web Vitals or a site-wide guarantee. Lighthouse's simulated mobile profile used a 412x823 viewport, 4x CPU slowdown and simulated network throttling. Chrome reported by Lighthouse was HeadlessChrome 153.0.0.0. The no-key PageSpeed Insights query remains rate-limited; no CrUX or Search Console dataset was available.

## Results

| Route | Performance | FCP | LCP | CLS | TBT | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 0.98 | 1.6 s | 2.2 s | 0 | 63 ms | 2.0 s |
| `/compare/cursor-vs-claude-code/` | 0.99 | 1.6 s | 2.1 s | 0 | 60 ms | 1.6 s |

Both reports flagged about 27 KiB of estimated unused JavaScript in the shared `/_next/static/chunks/12_celfi3iros.js` bundle. This is a lab opportunity, not evidence of a user-visible regression. TBT is not INP; these runs do not verify real-user CWV.

## Reproduction

Run with an installed Chrome-compatible executable and Lighthouse 13.5.0:

```sh
CHROME_PATH=<chrome-executable> npx --yes lighthouse@13.5.0 https://toolpilot.cc/ --only-categories=performance --output=json --output-path=<report.json>
CHROME_PATH=<chrome-executable> npx --yes lighthouse@13.5.0 https://toolpilot.cc/compare/cursor-vs-claude-code/ --only-categories=performance --output=json --output-path=<report.json>
```

References: [Lighthouse CLI overview](https://developer.chrome.com/docs/lighthouse/overview) and [Lighthouse v13.5.0 release](https://github.com/GoogleChrome/lighthouse/releases/tag/v13.5.0).

## Remaining evidence

TODO-311 stays open for dated field CWV and GSC data, including the measurement window and URL coverage. Do not use these lab scores to claim field CWV compliance, search visibility or indexing.
