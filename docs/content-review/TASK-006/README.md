# TASK-006 P1 draft review handoff

Eleven TASK-006 structured content records now form the owner review batch, including a source-based workflow-automation guide. The tool-level profiles have cited strengths, constraints and FAQs; affected dependencies were refreshed. Every record remains `in-review`, not owner-approved, noindex and excluded from the sitemap. Exact current revisions, digests and review gaps are recorded in the sibling `TASK-006-review-manifest.json`.

## Inventory

| Path | Revision | Focus | Review blocker |
| --- | --- | --- | --- |
| `/tools/aider/` | 2 | Terminal/Git workflow, model providers and cited Git/model tradeoffs | Confirm provider billing/privacy and default dirty-commit/hook behavior. |
| `/tools/continue/` | 4 | IDE/CLI workflow, configurable models, MCP in Agent mode, sourced constraints and FAQs | Upstream repository says read-only/no longer maintained; verify current package, publisher, security response and pricing. |
| `/tools/n8n/` | 2 | Automation, Cloud/self-host options, license and execution billing | Confirm fair-code compatibility, regional checkout and self-host operational cost. |
| `/tools/make/` | 2 | Visual scenarios, fixed/dynamic credit behavior and usage questions | Confirm current paid price selector, cadence, regional terms and data handling. |
| `/compare/make-vs-n8n/` | 2 | Credits vs workflow executions; hosting ownership | Confirm exact Make paid selection and n8n license fit. |
| `/compare/claude-code-vs-github-copilot/` | 3 | Same-task workflow, MCP access and account-policy evaluation | Verify actual Copilot account entitlements/privacy; no benchmark was run. |
| `/compare/cline-vs-continue/` | 4 | Model configuration, MCP setup, permissions and maintenance lifecycle | Verify Continue distribution and supported package; no local-model trial was run. |
| `/compare/aider-vs-claude-code/` | 4 | Git effects, MCP capability, model/account route and review controls | Verify model/account terms; no benchmark was run. |
| `/compare/bolt-vs-replit/` | 2 | App fit, handoff and production ownership | Replit pricing/export/data residency remain unresolved; no deployment test was run. |
| `/best/open-source-ai-coding-tools/` | 4 | Repository license evidence, MCP capability and project lifecycle | Confirm exact package/model licenses and Continue's support lifecycle; no performance comparison was run. |
| `/guides/workflow-automation-selection/` | 1 | Measure triggers, actions, retries, billing units, hosting and recovery | Confirm regional price, privacy/retention and a representative workflow; no product trial was run. |

## Research boundaries

- Source access dates are 2026-09-27. Sources in the JSON records are primary vendor documentation, vendor pricing pages or official project repositories.
- Aider's official Git guide says it commits pre-existing dirty changes before editing and skips Git hooks by default unless configured otherwise. This risk is surfaced in its profile and must be reviewed before any recommendation.
- Continue's official repository says it is read-only and no longer actively maintained, despite current docs describing its IDE/CLI workflows. Treat package and security support as unresolved.
- MCP is documented by Cursor, Claude Code, GitHub Copilot, Cline and Continue. The profile records cite each tool's official documentation; capability descriptions do not establish distribution support or remove Continue's maintenance caveat.
- The five MCP profiles now render sourced strengths, constraints and FAQs using official documentation links. Cursor's current canonical reference is `https://cursor.com/docs/mcp`; all added content remains an unapproved draft.
- All 12 tool profiles now have source-cited strengths, constraints and FAQs. The first seven non-MCP profiles cite Aider's Git/model documentation, Bolt's introduction/Git docs, Lovable's workspace/usage docs, Replit Agent/checkpoint docs, Make's credit rules, n8n's hosting/license guidance, and the current Devin Desktop destination reached from the Windsurf editor URL.
- The new workflow-automation guide distinguishes measured workload from vendor billing units and treats self-hosting as an operating choice, not a claim of lower cost. It is an editorial draft, not hands-on evaluation.
- n8n's Starter price is recorded as EUR 20/month billed annually and 2,500 workflow executions/month, as displayed on its official pricing page when checked. This is not a checkout quote.
- Make's Free allowance is recorded; the paid amount is null because the pricing UI exposes monthly/annual cadence and credit-quantity controls and the selected checkout basis was not established.
- HTTP reachability never changes editorial approval. In the current link scan, Cursor, Claude Code, GitHub Copilot and Cline MCP URLs returned 200; Continue's MCP endpoint had a transient network error, although its current official docs page was reviewed directly. Make's official site returned 403. These statuses do not establish product facts or approval.
- No hands-on product testing, privacy/legal approval, commercial relationship or public content approval is claimed.

## Exact-version review

Run `npm run content:review` to inspect current digests. The Owner decision must name the exact path, revision and digest and resolve the listed gaps. The manifest is a review aid, not approval evidence. Do not set `review.state=published` or index any record until an authentic owner decision record is added using the ADR-0009 process.

For a material edit, increment the revision, reset the review fields, update the change entry, refresh dependent digests and regenerate this manifest before review.
