# First-batch review handoff

28 source-based drafts; none owner-approved or indexable. Eight tool evidence packs are in this directory. Deployment does not constitute editorial approval. JSON source remains in content/; this document is an audit snapshot, not a second content source.

## Review sequence

1. Review eight product packs, including the official Windsurf-to-Devin Desktop naming and transition note; confirm account-specific pricing and entitlements.
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
| /tools/bolt-new/ | 2 | in-review | Review sourced JavaScript/Expo scope, Git handoff, hosting and current token allowance; owner review pending. |
| /tools/claude-code/ | 3 | in-review | MCP transports, deprecated SSE, project approval and workspace trust have sourced strengths/constraints/FAQs; review these alongside subscription amount and entitlement. |
| /tools/cline/ | 3 | in-review | MCP transport and approval guidance have sourced strengths/constraints/FAQs; owner review and account/provider checks remain. |
| /tools/cursor/ | 3 | in-review | MCP capability, transports and default approval have cited strengths/constraints/FAQs; review against the current canonical documentation URL. |
| /tools/github-copilot/ | 3 | in-review | MCP prerequisites, organization-policy scope and individual-plan distinction have cited strengths/constraints/FAQs; confirm privacy settings before a team recommendation. |
| /tools/lovable/ | 2 | in-review | Review sourced workspace, credit usage and deployment ownership; confirm current plan and ongoing runtime costs. |
| /tools/replit/ | 5 | in-review | Core/Pro/Enterprise can choose a published-app geography; Free defaults to North America. Pro-only workspace geography is separate; verify account settings, existing resources, connected services, checkout taxes, full app costs and independent export. |
| /tools/windsurf/ | 3 | in-review | Official FAQ says Devin Desktop is the new name for Windsurf and describes the standard account transition; exact account quote and an account-specific migration test remain open. |
| /alternatives/bolt-new/ | 7 | in-review | Cited app-builder handoff and stack-scope evidence; refreshed Replit dependency; owner review pending. |
| /alternatives/claude-code/ | 4 | in-review | Cited client surfaces, provider options and Copilot policy conditions; owner review pending. |
| /alternatives/cursor/ | 5 | in-review | Cited multi-surface alternatives and current Devin Desktop transition; owner review pending. |
| /alternatives/lovable/ | 7 | in-review | Cited prototype workflows, credit usage and service-migration limits; refreshed Replit dependency; owner review pending. |
| /alternatives/replit/ | 7 | in-review | Cited Git handoff and in-platform checkpoint boundaries; refreshed Replit dependency; owner review pending. |
| /alternatives/windsurf/ | 5 | in-review | Cited Devin Desktop naming, standard migration statement and unresolved account quote; owner review pending. |
| /best/ai-app-builders-for-prototypes/ | 5 | in-review | Cited app scope, repository handoff and recovery limits; refreshed Replit dependency; no production-readiness claim. |
| /best/ai-coding-tools-for-solo-founders/ | 4 | in-review | Cited editor/agent surfaces and account-dependent billing or policy details; owner review pending. |
| /compare/cline-vs-claude-code/ | 4 | in-review | Cited local-model options, MCP controls and separate billing routes; no benchmark was run. |
| /compare/cursor-vs-claude-code/ | 4 | in-review | Cited product surfaces, MCP transports and approval controls; no benchmark was run. |
| /compare/cursor-vs-github-copilot/ | 4 | in-review | Cited setup differences and Copilot policy scope; no benchmark was run. |
| /compare/lovable-vs-bolt/ | 3 | in-review | Cited JavaScript/Expo scope, repository handoff and credit usage; owner review pending. |
| /compare/replit-vs-lovable/ | 5 | in-review | Cited checkpoint, Git sync and build/runtime credit boundaries; refreshed Replit dependency; no portability test was run. |
| /compare/windsurf-vs-cursor/ | 5 | in-review | Cited current Windsurf-to-Devin Desktop naming and account quote boundary; no benchmark was run. |
| /guides/ai-editor-vs-terminal-agent/ | 4 | in-review | Cited overlapping product surfaces; no comparative speed or quality claim. |
| /guides/how-to-choose-a-developer-tool/ | 2 | in-review | General methodology page has no tool dependencies; source-bound product blocks remain intentionally absent under ADR-0009. |
| /pricing/claude-code/ | 4 | in-review | Cited subscription/API billing distinction and cost-estimate limits; owner review pending. |
| /pricing/cursor/ | 4 | in-review | Cited included model usage and on-demand billing in arrears; owner review pending. |
| /pricing/lovable/ | 3 | in-review | Cited Build/Run credit categories; exact usage remains workload-specific. |
| /pricing/replit/ | 5 | in-review | Core is publicly listed at USD 20/month monthly or USD 18/month equivalent billed annually; confirm eligibility and location-based checkout total. |

## Operational gates

GSC data is unavailable; some vendor hosts are restricted and some checks return transient network errors. Link reachability does not establish editorial approval. TASK-004 Pages migration and deployment are complete; GitHub notification routing and the production rollback exercise remain open under TODO-004/TODO-302. No commercial or tracking integration is activated. All 26 decision records with declared tool dependencies now carry cited Pros/Cons/FAQs; the one general guide without tool dependencies remains intentionally outside that contract.
