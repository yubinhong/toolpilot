# TASK-006 P1 draft review handoff

Ten new structured content drafts were added from official product documentation, pricing pages or public source repositories. They are all revision 1, state `in-review`, not owner-approved, noindex and excluded from the sitemap. Exact digests and known review gaps are recorded in the sibling `TASK-006-review-manifest.json`.

## Inventory

| Path | Revision | Focus | Review blocker |
| --- | --- | --- | --- |
| `/tools/aider/` | 1 | Terminal/Git workflow, model providers and Apache-2.0 repository | Confirm provider billing/privacy and default dirty-commit/hook behavior. |
| `/tools/continue/` | 1 | IDE/CLI workflow and configurable models | Upstream repository says read-only/no longer maintained; verify current package, publisher, security response and pricing. |
| `/tools/n8n/` | 1 | Automation, Cloud/self-host options and execution billing | Confirm fair-code compatibility, regional checkout and self-host operational cost. |
| `/tools/make/` | 1 | Visual scenarios and credit billing | Confirm current paid price selector, cadence, regional terms and data handling. |
| `/compare/make-vs-n8n/` | 1 | Credits vs full workflow executions; hosting ownership | Confirm exact Make paid selection and n8n license fit. |
| `/compare/claude-code-vs-github-copilot/` | 1 | Same-task workflow and account-policy evaluation | Verify actual Copilot account entitlements/privacy; no benchmark was run. |
| `/compare/cline-vs-continue/` | 1 | Model configuration, permissions and maintenance lifecycle | Verify Continue distribution and supported package; no local-model trial was run. |
| `/compare/aider-vs-claude-code/` | 1 | Git effects, model/account route and review controls | Verify model/account terms; no benchmark was run. |
| `/compare/bolt-vs-replit/` | 1 | App fit, handoff and production ownership | Replit pricing/export/data residency remain unresolved; no deployment test was run. |
| `/best/open-source-ai-coding-tools/` | 1 | Repository license evidence and project lifecycle | Confirm exact package/model licenses and Continue's support lifecycle; no performance comparison was run. |

## Research boundaries

- Source access dates are 2026-09-27. Sources in the JSON records are primary vendor documentation, vendor pricing pages or official project repositories.
- Aider's official Git guide says it commits pre-existing dirty changes before editing and skips Git hooks by default unless configured otherwise. This risk is surfaced in its profile and must be reviewed before any recommendation.
- Continue's official repository says it is read-only and no longer actively maintained, despite current docs describing its IDE/CLI workflows. Treat package and security support as unresolved.
- n8n's Starter price is recorded as EUR 20/month billed annually and 2,500 workflow executions/month, as displayed on its official pricing page when checked. This is not a checkout quote.
- Make's Free allowance is recorded; the paid amount is null because the pricing UI exposes monthly/annual cadence and credit-quantity controls and the selected checkout basis was not established.
- HTTP reachability never changes editorial approval. Make's official site returned 403 in this link check; Continue's docs root had a transient network error while its task-specific docs pages returned 200. The corresponding source content was reviewed separately and remains owner-review material.
- No hands-on product testing, privacy/legal approval, commercial relationship or public content approval is claimed.

## Exact-version review

Run `npm run content:review` to inspect current digests. The Owner decision must name the exact path, revision and digest and resolve the listed gaps. The manifest is a review aid, not approval evidence. Do not set `review.state=published` or index any record until an authentic owner decision record is added using the ADR-0009 process.

For a material edit, increment the revision, reset the review fields, update the change entry, refresh dependent digests and regenerate this manifest before review.
