# First-batch review handoff

28 source-based drafts; none owner-approved or indexable. Eight tool evidence packs are in this directory. Deployment does not constitute editorial approval. JSON source remains in content/; this document is an audit snapshot, not a second content source.

## Review sequence

1. Review eight product packs, including Cursor's Privacy Mode/provider-retention exceptions and Self-Hosted Machines worker/inference/data-flow boundary, Devin Desktop's public plan prices and Windsurf continuity statement, and Lovable's plan/data-scope-specific privacy evidence; confirm account-specific prices, privacy settings and entitlements.
2. Review comparison, alternative, pricing and best-page conclusions against the approved tools.
3. Review the two guides.
4. Supply operator identity, monitored contact channel and final privacy/terms information.
5. Approve exact revision/digest in an authentic written record. Deployment approval remains separate.

## Exact-version workflow

Run npm run content:review to regenerate the current digest list. An owner decision must identify the path, revision and digest. Only after that decision exists, set review.state=published, owner, reviewedAt, approvedRevision, approvedDigest, evidence and verifiedAt. Evidence must refer to the actual decision record, not this unchecked template. Never approve by changing a label alone.

For a material edit, increment revision, reset review fields and verifiedAt, update changes, then update affected dependency revision/digest and reset their approvals. The build rejects stale dependencies even if someone forgets to bump a version. UI-only edits do not alter the content digest.

## Inventory

| URL | Revision | State | Blockers |
| --- | --- | --- | --- |
| /tools/bolt-new/ | 3 | in-review | Review sourced JavaScript/Expo scope, Git handoff, hosting and current token allowance. The current privacy policy describes prospective model-development and dataset-licensing uses from no earlier than 2026-10-07; account Terms date, settings, region and Forge consent remain unchecked. |
| /tools/claude-code/ | 4 | in-review | MCP controls plus current self-hosted cloud-session, model-inference and Git/checkpoint boundaries have source-backed FAQs; verify Team/Enterprise eligibility, enablement, account route and remaining subscription terms. |
| /tools/cline/ | 4 | in-review | Privacy Notice distinguishes BYOK from Cline-provided keys; Terms say telemetry is on by default while an older blog says opt-in. Verify the installed version/settings, provider terms and legal fit. |
| /tools/cursor/ | 5 | in-review | Privacy Mode scope separates training/ZDR from abuse-review and non-ZDR exceptions, BYOK and Cloud Agent storage. Self-Hosted Machines move tool execution to customer workers while inference/planning and required run content remain in Cursor's cloud; verify account settings, worker route, data flow, artifacts and plan eligibility. |
| /tools/github-copilot/ | 6 | in-review | Official training policy, Local BYOK/client boundaries and cloud-agent runner placement are documented. Self-hosted runners require a separate organization setup; confirm actual runner policy, firewall and account/model settings. |
| /tools/lovable/ | 4 | in-review | Review the 2026-09-15 Privacy Policy against August 2026 Terms and the November 2025 Business/Enterprise DPA; confirm plan, workspace agreement, training setting, Cloud region/provider scope and runtime costs. |
| /tools/replit/ | 5 | in-review | Core/Pro/Enterprise can choose a published-app geography; Free defaults to North America. Pro-only workspace geography is separate; verify account settings, existing resources, connected services, checkout taxes, full app costs and independent export. |
| /tools/windsurf/ | 5 | in-review | Cognition's Privacy Policy/Platform Terms, its DPA and Windsurf's Exafunction-specific MSA have different data/training scopes. Verify the controlling agreement, account tier, order form/DPA, opt-out and persistent features; confirm the actual legacy quote, usage, taxes and migration. |
| /alternatives/bolt-new/ | 13 | in-review | Cited app-builder handoff, stack scope and current Cursor privacy/provider-retention plus Self-Hosted Machines data-flow boundaries; owner review pending. |
| /alternatives/claude-code/ | 11 | in-review | Cited client surfaces, provider options, Copilot policy and Local BYOK boundaries, plus Cursor privacy and worker/inference boundaries; owner review pending. |
| /alternatives/cursor/ | 14 | in-review | Cited Devin Desktop transition/prices, Copilot Local BYOK boundaries, and Cursor's worker placement, cloud inference, data forwarding and account-setting limits; owner review pending. |
| /alternatives/lovable/ | 13 | in-review | Cited prototype workflow and current Cursor training, BYOK, provider-retention, Cloud Agent and self-hosted-worker boundaries; owner review pending. |
| /alternatives/replit/ | 12 | in-review | Cited Git handoff, in-platform checkpoint boundaries, and Lovable training-policy/Cloud-region scope; refreshed Bolt, Lovable, Replit and Claude Code dependencies; owner review pending. |
| /alternatives/windsurf/ | 13 | in-review | Cited Devin Desktop naming, plan/pricing continuity, Copilot Local BYOK boundaries, Cursor's self-hosted worker/cloud inference split and both vendors' training-policy scopes; account settings and agreements remain open. |
| /best/ai-app-builders-for-prototypes/ | 9 | in-review | Cited app scope, repository handoff, recovery limits and Lovable training-policy/Cloud-region scope; refreshed Bolt, Lovable and Replit dependencies; no production-readiness claim. |
| /best/ai-coding-tools-for-solo-founders/ | 11 | in-review | Cited editor/agent surfaces, Copilot Local BYOK boundaries and Cursor's Privacy Mode, BYOK, retention exceptions, customer-run worker and cloud inference boundary; owner review pending. |
| /compare/cline-vs-claude-code/ | 6 | in-review | Cited Cline local models against Claude Code self-hosted session compute and external inference, plus MCP controls and billing; no model benchmark was run. |
| /compare/cursor-vs-claude-code/ | 7 | in-review | Cited product surfaces, MCP transports, approval controls, Cursor privacy exceptions and both products' distinct self-hosted compute/inference boundaries; no benchmark was run. |
| /compare/cursor-vs-github-copilot/ | 9 | in-review | Cited setup, Copilot policy and Local BYOK scopes plus Cursor's BYOK/provider-retention and Self-Hosted Machines boundaries; no benchmark was run. |
| /compare/lovable-vs-bolt/ | 6 | in-review | Cited JavaScript/Expo scope, repository handoff, credit usage and Lovable training-policy/Cloud-region scope; refreshed Bolt and Lovable dependencies; owner review pending. |
| /compare/replit-vs-lovable/ | 8 | in-review | Cited checkpoint, Git sync, build/runtime credit and Lovable training-policy/Cloud-region boundaries; refreshed Replit and Lovable dependencies; no portability test was run. |
| /compare/windsurf-vs-cursor/ | 9 | in-review | Cited current Devin Desktop prices, distinct Cognition/Exafunction/Cursor data scopes and Cursor's worker/inference split; account applicability remains open and no benchmark was run. |
| /guides/ai-editor-vs-terminal-agent/ | 8 | in-review | Cited overlapping surfaces plus Cursor's mode-dependent training, BYOK, Cloud Agent and customer-run worker boundaries; no speed or quality benchmark. |
| /guides/how-to-choose-a-developer-tool/ | 2 | in-review | General methodology page has no tool dependencies; source-bound product blocks remain intentionally absent under ADR-0009. |
| /pricing/claude-code/ | 5 | in-review | Cited subscription/API billing distinction and cost-estimate limits; owner review pending. |
| /pricing/cursor/ | 6 | in-review | Cited included usage and on-demand billing plus Privacy Mode, BYOK, model-retention, Cloud Agent and self-hosted-worker scope; account review pending. |
| /pricing/lovable/ | 5 | in-review | Cited Build/Run credit categories and the separate, prospective model-training opt-out; exact usage and workspace terms remain to be checked. |
| /pricing/replit/ | 5 | in-review | Core is publicly listed at USD 20/month monthly or USD 18/month equivalent billed annually; confirm eligibility and location-based checkout total. |

## Operational gates

GSC data is unavailable; some vendor hosts are restricted and some checks return transient network errors. Link reachability does not establish editorial approval. TASK-004 Pages migration and deployment are complete; GitHub notification routing and the production rollback exercise remain open under TODO-004/TODO-302. No commercial or tracking integration is activated. All 26 decision records with declared tool dependencies now carry cited Pros/Cons/FAQs; the one general guide without tool dependencies remains intentionally outside that contract.
