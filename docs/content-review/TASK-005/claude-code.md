# Claude Code evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 4. Digest: `7942a7b3ffb6b52fcd13c89dead08f29b8e0d062c7fd5ea646648e75ac7f99e9`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Claude Code overview](https://code.claude.com/docs/en/overview) — Claude Code; accessed 2026-09-27

- [Plans and billing](https://code.claude.com/docs/en/costs) — Claude Code; accessed 2026-09-27

- [Data usage](https://code.claude.com/docs/en/data-usage) — Anthropic; accessed 2026-09-27

- [Claude subscription pricing](https://claude.com/pricing) — Anthropic; accessed 2026-09-27

- [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp) — Claude Code; accessed 2026-09-27

- [Self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments) — Anthropic; accessed 2026-09-28

- [Enterprise deployment overview](https://code.claude.com/docs/en/third-party-integrations) — Anthropic; accessed 2026-09-28

- [Checkpointing](https://code.claude.com/docs/en/checkpointing) — Anthropic; accessed 2026-09-28

## Field evidence

- **Workflow**: Terminal, IDE, desktop and web coding agent Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: Consumer training settings and commercial terms differ; confirm the account type and opt-in settings. Sources: privacy; checked: 2026-09-27.

- **Product self-hosting**: Cloud sessions can run on organization-operated self-hosted environments with customer-managed runners; public beta for Team and Enterprise, off by default. Model inference still goes to `api.anthropic.com`. Sources: self-hosted; checked: 2026-09-28.

- **Local model inference**: The reviewed official docs do not describe an on-device local-model route. Self-hosted cloud sessions send inference to Anthropic and cannot use the listed third-party cloud-provider or LLM-gateway routes. Custom endpoint compatibility and other surfaces remain unverified. Sources: self-hosted, deployment; checked: 2026-09-28.

- **Code / data portability**: Project files and Git are the durable work boundary; checkpoints can restore edits from Claude's file-edit tools, but do not track Bash changes and may miss subagent or external/concurrent edits. Anthropic recommends Git for permanent history. Sources: product, checkpoints; checked: 2026-09-28.

- **MCP support**: Claude Code documents local stdio and remote HTTP, SSE and WebSocket MCP server connections; project-scoped servers require workspace trust and approval. Sources: mcp; checked: 2026-09-27.

## MCP evidence blocks

This draft now includes 1 source-backed documented strengths, 2 documented constraints and 2 FAQs. These are vendor-documentation facts awaiting owner review, not hands-on results.

## Pricing basis

- Pro: USD 20 / month; Monthly subscription; includes Claude Code. Allowance: Shared plan usage limits; not a fixed number of completed tasks. Overage: unknown. Taxes: Excludes applicable taxes. Sources: subscription.

- Pro — annual commitment: USD 200 / year; Annual amount paid up front, not a monthly invoice. Allowance: Shared plan usage limits. Overage: unknown. Taxes: Excludes applicable taxes. Sources: subscription.

- Subscription or API usage: Unknown; Account-dependent; subscription and API billing are separate. Allowance: unknown. Overage: API usage depends on token consumption; do not infer it from a subscription allowance.. Taxes: unknown. Sources: pricing.

## Proposed judgment

Shortlist Claude Code when an explicit repository task and command-based verification fit your workflow. Distinguish self-hosted session compute from model inference, then review command permissions and the account billing route.

Consider for: Developers comfortable inspecting changes and command results. Not for: Users expecting autonomous changes to be safe without review.

Keep build instructions and acceptance tests in the repository. Port tool-specific rules deliberately and review permissions again in the replacement.

## Gaps

- Verify Team/Enterprise plan eligibility and whether self-hosted cloud sessions are enabled; no account was inspected.
- Confirm the actual model provider and any custom endpoint configuration; official docs reviewed do not document an on-device model route.
- Test the intended Git/checkpoint recovery process; no session recovery or migration was exercised.
- Assess remaining account pricing, entitlements, privacy settings and provider terms.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
