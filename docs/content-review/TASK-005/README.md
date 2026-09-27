# First-batch review handoff

28 source-based drafts; none owner-approved or deployed. Eight tool evidence packs are in this directory. JSON source remains in content/; this document is an audit snapshot, not a second content source.

## Review sequence

1. Resolve product identity/pricing gaps and review eight product packs.
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
| /tools/bolt-new/ | 1 | in-review | Owner review pending |
| /tools/claude-code/ | 1 | in-review | Confirm subscription amount and entitlement before presenting a fixed monthly total. |
| /tools/cline/ | 1 | in-review | Owner review pending |
| /tools/cursor/ | 1 | in-review | Owner review pending |
| /tools/github-copilot/ | 1 | in-review | Confirm account-specific privacy settings and feature availability before a team recommendation. |
| /tools/lovable/ | 1 | in-review | Owner review pending |
| /tools/replit/ | 1 | in-review | Public pricing extract did not expose reliable plan amounts; confirm the current plan and included allowance.; Confirm data residency and export requirements for the proposed deployment. |
| /tools/windsurf/ | 1 | in-review | Official Windsurf URLs redirect to Devin; verify product identity, existing entitlements and current pricing before publication. |
| /alternatives/bolt-new/ | 1 | in-review | Depends on reviewed product evidence |
| /alternatives/claude-code/ | 1 | in-review | Depends on reviewed product evidence |
| /alternatives/cursor/ | 1 | in-review | Depends on reviewed product evidence |
| /alternatives/lovable/ | 1 | in-review | Depends on reviewed product evidence |
| /alternatives/replit/ | 1 | in-review | Depends on reviewed product evidence |
| /alternatives/windsurf/ | 1 | in-review | Depends on reviewed product evidence |
| /best/ai-app-builders-for-prototypes/ | 1 | in-review | Depends on reviewed product evidence |
| /best/ai-coding-tools-for-solo-founders/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/cline-vs-claude-code/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/cursor-vs-claude-code/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/cursor-vs-github-copilot/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/lovable-vs-bolt/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/replit-vs-lovable/ | 1 | in-review | Depends on reviewed product evidence |
| /compare/windsurf-vs-cursor/ | 1 | in-review | Depends on reviewed product evidence |
| /guides/ai-editor-vs-terminal-agent/ | 1 | in-review | Depends on reviewed product evidence |
| /guides/how-to-choose-a-developer-tool/ | 1 | in-review | Owner review pending |
| /pricing/claude-code/ | 1 | in-review | Depends on reviewed product evidence |
| /pricing/cursor/ | 1 | in-review | Depends on reviewed product evidence |
| /pricing/lovable/ | 1 | in-review | Depends on reviewed product evidence |
| /pricing/replit/ | 1 | in-review | Depends on reviewed product evidence |

## Operational gates

GSC data unavailable. Public access restricted in this environment. Existing dependencies fail the high-severity audit. TASK-004 external migration, clean reviewed commit, deployment and real rollback remain unperformed. No commercial or tracking integration is activated.
