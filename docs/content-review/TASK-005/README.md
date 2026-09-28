# First-batch review handoff

28 source-based drafts; none owner-approved or indexable. Eight tool evidence packs are in this directory. Deployment does not constitute editorial approval. JSON source remains in content/; this document is an audit snapshot, not a second content source.

## Review sequence

1. Review eight product packs, including Devin Desktop's public plan prices and its Windsurf continuity statement; confirm any account-specific legacy pricing and entitlements.
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
| /tools/claude-code/ | 3 | in-review | MCP transports, deprecated SSE, project approval and workspace trust have sourced strengths/constraints/FAQs; review these alongside subscription amount and entitlement. |
| /tools/cline/ | 4 | in-review | Privacy Notice distinguishes BYOK from Cline-provided keys; Terms say telemetry is on by default while an older blog says opt-in. Verify the installed version/settings, provider terms and legal fit. |
| /tools/cursor/ | 3 | in-review | MCP capability, transports and default approval have cited strengths/constraints/FAQs; review against the current canonical documentation URL. |
| /tools/github-copilot/ | 4 | in-review | Official policy distinguishes individual-plan training use/opt-out from Business/Enterprise; verify account settings, model-specific retention and organizational controls. |
| /tools/lovable/ | 2 | in-review | Review sourced workspace, credit usage and deployment ownership; confirm current plan and ongoing runtime costs. |
| /tools/replit/ | 5 | in-review | Core/Pro/Enterprise can choose a published-app geography; Free defaults to North America. Pro-only workspace geography is separate; verify account settings, existing resources, connected services, checkout taxes, full app costs and independent export. |
| /tools/windsurf/ | 4 | in-review | Official FAQ says current plan/pricing carry over, including legacy Windsurf Enterprise; public Free/Pro/Max/Teams prices are recorded. Confirm the actual legacy account quote, usage, checkout taxes and migration experience. |
| /alternatives/bolt-new/ | 9 | in-review | Cited app-builder handoff and stack-scope evidence; refreshed Bolt and Replit dependencies; owner review pending. |
| /alternatives/claude-code/ | 6 | in-review | Cited client surfaces, provider options and Copilot policy conditions; owner review pending. |
| /alternatives/cursor/ | 8 | in-review | Cited multi-surface alternatives, Devin Desktop transition and current public plan prices; owner review pending. |
| /alternatives/lovable/ | 9 | in-review | Cited prototype workflows, credit usage and service-migration limits; refreshed Bolt and Replit dependencies; owner review pending. |
| /alternatives/replit/ | 9 | in-review | Cited Git handoff and in-platform checkpoint boundaries; refreshed Bolt and Replit dependencies; owner review pending. |
| /alternatives/windsurf/ | 8 | in-review | Cited Devin Desktop naming, plan/pricing continuity and current public plan prices; legacy account quote and usage remain open. |
| /best/ai-app-builders-for-prototypes/ | 7 | in-review | Cited app scope, repository handoff and recovery limits; refreshed Bolt and Replit dependencies; no production-readiness claim. |
| /best/ai-coding-tools-for-solo-founders/ | 6 | in-review | Cited editor/agent surfaces and account-dependent billing or policy details; owner review pending. |
| /compare/cline-vs-claude-code/ | 5 | in-review | Cited local-model options, MCP controls, billing and Cline's BYOK/provider-content boundary; no benchmark was run. |
| /compare/cursor-vs-claude-code/ | 4 | in-review | Cited product surfaces, MCP transports and approval controls; no benchmark was run. |
| /compare/cursor-vs-github-copilot/ | 4 | in-review | Cited setup differences and Copilot policy scope; no benchmark was run. |
| /compare/lovable-vs-bolt/ | 4 | in-review | Cited JavaScript/Expo scope, repository handoff and credit usage; refreshed Bolt privacy-policy dependency; owner review pending. |
| /compare/replit-vs-lovable/ | 5 | in-review | Cited checkpoint, Git sync and build/runtime credit boundaries; refreshed Replit dependency; no portability test was run. |
| /compare/windsurf-vs-cursor/ | 6 | in-review | Cited current Devin Desktop prices and the legacy account quote boundary; no benchmark or account migration test was run. |
| /guides/ai-editor-vs-terminal-agent/ | 5 | in-review | Cited overlapping product surfaces; no comparative speed or quality claim. |
| /guides/how-to-choose-a-developer-tool/ | 2 | in-review | General methodology page has no tool dependencies; source-bound product blocks remain intentionally absent under ADR-0009. |
| /pricing/claude-code/ | 4 | in-review | Cited subscription/API billing distinction and cost-estimate limits; owner review pending. |
| /pricing/cursor/ | 4 | in-review | Cited included model usage and on-demand billing in arrears; owner review pending. |
| /pricing/lovable/ | 3 | in-review | Cited Build/Run credit categories; exact usage remains workload-specific. |
| /pricing/replit/ | 5 | in-review | Core is publicly listed at USD 20/month monthly or USD 18/month equivalent billed annually; confirm eligibility and location-based checkout total. |

## Operational gates

GSC data is unavailable; some vendor hosts are restricted and some checks return transient network errors. Link reachability does not establish editorial approval. TASK-004 Pages migration and deployment are complete; GitHub notification routing and the production rollback exercise remain open under TODO-004/TODO-302. No commercial or tracking integration is activated. All 26 decision records with declared tool dependencies now carry cited Pros/Cons/FAQs; the one general guide without tool dependencies remains intentionally outside that contract.
