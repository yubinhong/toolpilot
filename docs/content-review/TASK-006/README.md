# TASK-006 P1 draft review handoff

Ten new structured content drafts were added from official product documentation, pricing pages or public source repositories. They remain `in-review`, not owner-approved, noindex and excluded from the sitemap. Five TASK-006 records now have revision 3 after source-backed MCP strengths, constraints and FAQs were added to Continue and four dependent decisions were refreshed; the Cursor, Claude Code, GitHub Copilot and Cline profile handoffs were also refreshed in TASK-005. Exact current revisions, digests and review gaps are recorded in the sibling `TASK-006-review-manifest.json`.

## Inventory

| Path | Revision | Focus | Review blocker |
| --- | --- | --- | --- |
| `/tools/aider/` | 1 | Terminal/Git workflow, model providers and Apache-2.0 repository | Confirm provider billing/privacy and default dirty-commit/hook behavior. |
| `/tools/continue/` | 3 | IDE/CLI workflow, configurable models, MCP in Agent mode, sourced constraints and FAQs | Upstream repository says read-only/no longer maintained; verify current package, publisher, security response and pricing. |
| `/tools/n8n/` | 1 | Automation, Cloud/self-host options and execution billing | Confirm fair-code compatibility, regional checkout and self-host operational cost. |
| `/tools/make/` | 1 | Visual scenarios and credit billing | Confirm current paid price selector, cadence, regional terms and data handling. |
| `/compare/make-vs-n8n/` | 1 | Credits vs full workflow executions; hosting ownership | Confirm exact Make paid selection and n8n license fit. |
| `/compare/claude-code-vs-github-copilot/` | 3 | Same-task workflow, MCP access and account-policy evaluation | Verify actual Copilot account entitlements/privacy; no benchmark was run. |
| `/compare/cline-vs-continue/` | 3 | Model configuration, MCP setup, permissions and maintenance lifecycle | Verify Continue distribution and supported package; no local-model trial was run. |
| `/compare/aider-vs-claude-code/` | 3 | Git effects, MCP capability, model/account route and review controls | Verify model/account terms; no benchmark was run. |
| `/compare/bolt-vs-replit/` | 1 | App fit, handoff and production ownership | Replit pricing/export/data residency remain unresolved; no deployment test was run. |
| `/best/open-source-ai-coding-tools/` | 3 | Repository license evidence, MCP capability and project lifecycle | Confirm exact package/model licenses and Continue's support lifecycle; no performance comparison was run. |

## Research boundaries

- Source access dates are 2026-09-27. Sources in the JSON records are primary vendor documentation, vendor pricing pages or official project repositories.
- Aider's official Git guide says it commits pre-existing dirty changes before editing and skips Git hooks by default unless configured otherwise. This risk is surfaced in its profile and must be reviewed before any recommendation.
- Continue's official repository says it is read-only and no longer actively maintained, despite current docs describing its IDE/CLI workflows. Treat package and security support as unresolved.
- MCP is documented by Cursor, Claude Code, GitHub Copilot, Cline and Continue. The profile records cite each tool's official documentation; capability descriptions do not establish distribution support or remove Continue's maintenance caveat.
- The five MCP profiles now render sourced strengths, constraints and FAQs using official documentation links. Cursor's current canonical reference is `https://cursor.com/docs/mcp`; all added content remains an unapproved draft.
- n8n's Starter price is recorded as EUR 20/month billed annually and 2,500 workflow executions/month, as displayed on its official pricing page when checked. This is not a checkout quote.
- Make's Free allowance is recorded; the paid amount is null because the pricing UI exposes monthly/annual cadence and credit-quantity controls and the selected checkout basis was not established.
- HTTP reachability never changes editorial approval. In the current link scan, Cursor, Claude Code, GitHub Copilot and Cline MCP URLs returned 200; Continue's MCP endpoint had a transient network error, although its current official docs page was reviewed directly. Make's official site returned 403. These statuses do not establish product facts or approval.
- No hands-on product testing, privacy/legal approval, commercial relationship or public content approval is claimed.

## Exact-version review

Run `npm run content:review` to inspect current digests. The Owner decision must name the exact path, revision and digest and resolve the listed gaps. The manifest is a review aid, not approval evidence. Do not set `review.state=published` or index any record until an authentic owner decision record is added using the ADR-0009 process.

For a material edit, increment the revision, reset the review fields, update the change entry, refresh dependent digests and regenerate this manifest before review.
