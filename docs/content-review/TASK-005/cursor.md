# Cursor evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 5. Digest: `1f318bcb4fc86a89b3ba74a20c54a869e71e1232ee053aff603b369f9a7a19be`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Cursor documentation](https://cursor.com/docs) — Cursor; accessed 2026-09-27

- [Plans and billing](https://cursor.com/pricing) — Cursor; accessed 2026-09-27

- [Security](https://cursor.com/security) — Cursor; last updated 2026-08-25; accessed 2026-09-28

- [Model Context Protocol (MCP)](https://cursor.com/docs/mcp) — Cursor; accessed 2026-09-27

- [Data Use & Privacy Overview](https://cursor.com/data-use) — Cursor; last updated 2026-09-03; accessed 2026-09-28

- [Privacy and Data Governance](https://prod.cursor.com/docs/enterprise/privacy-and-data-governance) — Cursor; accessed 2026-09-28

- [Privacy and data](https://prod.cursor.com/help/security-and-privacy/privacy) — Cursor; accessed 2026-09-28

- [Privacy Policy](https://cursor.com/privacy) — Cursor; last updated 2025-10-06; accessed 2026-09-28

- [Self-Hosted Machines](https://cursor.com/docs/cloud-agent/self-hosted) — Cursor; accessed 2026-09-28

- [Choose where Cloud Agents run](https://cursor.com/docs/cloud-agent/self-hosted/choose-runtime) — Cursor; accessed 2026-09-28

- [Team Pools](https://cursor.com/docs/cloud-agent/self-hosted/pool) — Cursor; accessed 2026-09-28

- [Self-Hosted Machines help](https://cursor.com/help/ai-features/self-hosted-machines) — Cursor; accessed 2026-09-28

## Field evidence

- **Workflow**: Editor and coding agent Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: With Privacy Mode enabled, Cursor says it will not train on Customer Data and that most provider requests use zero-data-retention agreements. Its docs describe safety/abuse review exceptions and models that require administrator approval before provider retention is enabled. BYOK requests still pass through Cursor's backend, and Cursor says its provider ZDR agreements do not apply to user API keys. Optional Cursor-managed Cloud Agents temporarily store encrypted repository copies while a run is active and delete them after completion. For Self-Hosted Machines, Privacy Mode applies and worker code sent for a run is not used for training by Cursor or model providers; the worker still sends required content to Cursor and run artifacts may be uploaded to Cursor-managed storage. Privacy Mode is available on Free and Pro, is enabled by default for Enterprise teams, and can be enforced by team administrators. Cursor's Privacy Policy excludes personal data it processes for commercial customers as processor; those agreements govern instead. Turning Privacy Mode off may allow Customer Data to be used or stored for improvement and training. No account setting, team policy, API key, model approval, Cloud Agent use or agreement was inspected. Sources: privacy-overview, privacy-governance, privacy-help, privacy-policy, security, self-hosted-machines; checked: 2026-09-28.

- **Product self-hosting**: Cursor's Self-Hosted Machines move Cloud Agent tool execution, including file edits and terminal commands, to customer-operated machines; the agent loop, inference and planning stay in Cursor's cloud. My Machines supports personal workflows, while Team Pools require Enterprise and administrator setup. No account or worker was configured. Sources: self-hosted-machines, self-hosted-runtime, self-hosted-pools; checked: 2026-09-28.

- **Local model inference**: For Cloud Agent Self-Hosted Machines, Cursor explicitly keeps the agent loop, inference and planning in its cloud, so relocating tool execution does not establish local inference. These sources do not establish local-model support or absence for Cursor's editor or other surfaces; no on-device route was confirmed. Sources: self-hosted-machines, self-hosted-runtime; checked: 2026-09-28.

- **Code / data portability**: For Self-Hosted Machines, the full checkout, build cache and machine-local credentials stay on the worker. The worker still sends Cursor run content such as file contents, terminal output, diffs, screenshots, local MCP results and routing metadata; artifacts may upload to Cursor-managed storage. Git access uses worker credentials or documented token routes. This describes session data flow, not export or session/settings migration; no worker, data path or restore was tested. Sources: self-hosted-machines, self-hosted-pools, self-hosted-help; checked: 2026-09-28.

- **MCP support**: Cursor documents local stdio plus local or remote SSE and Streamable HTTP MCP transports; its Agent can use configured and enabled MCP tools. Sources: mcp; checked: 2026-09-27.

- **Strength**: Self-Hosted Machines can keep repository checkout, build cache and machine-local credentials on customer-managed workers. This is a worker-placement option, not a fully local agent or inference route. Sources: self-hosted-machines, self-hosted-runtime.

- **Strength**: Privacy Mode is available on individual Free and Pro plans; teams can enable or enforce it for members. Sources: security, privacy-help.

- **Constraint**: Privacy Mode does not make Cursor offline: AI requests send prompts and code context to model providers, and optional Cloud Agents temporarily store encrypted repository copies while running. Sources: privacy-governance, privacy-help.

- **Constraint**: Self-Hosted Machines still send run content to Cursor for Cloud Agent operation, and artifacts may be stored in Cursor-managed storage; Team Pools require Enterprise and administrator setup. Sources: self-hosted-machines, self-hosted-pools.

- **FAQ**: Privacy Mode blocks training on Customer Data under Cursor's stated policy and most requests use provider ZDR, with safety/abuse and non-ZDR model exceptions. BYOK provider retention, account setting, organization policy and Cloud Agent use must be checked separately. Sources: privacy-overview, privacy-governance, privacy-help, privacy-policy.

- **FAQ**: Do Self-Hosted Machines make Cloud Agent inference local? No. Cursor says the agent loop, planning and inference stay in Cursor's cloud; the customer-managed worker executes tools and sends required run content back to Cursor. Privacy Mode applies, but it does not mean data stays local. Sources: self-hosted-machines, self-hosted-runtime, self-hosted-help.

## MCP evidence blocks

This draft now includes 3 source-backed documented strengths, 5 documented constraints and 6 FAQs, including MCP and Self-Hosted Machines evidence. These are vendor-documentation facts awaiting owner review, not hands-on results.

## Pricing basis

- Individual Pro: USD 20 / month; Displayed monthly price; confirm billing toggle at checkout. Allowance: unknown. Overage: On-demand usage is billed after included usage is consumed.. Taxes: Listed prices exclude applicable taxes.. Sources: pricing.

## Proposed judgment

Shortlist Cursor when reading and revising diffs alongside the code is your main loop. Self-Hosted Machines relocate Cloud Agent tool execution while inference and planning stay in Cursor's cloud; validate the worker data path, plan eligibility and usage allowance against your requirements.

Consider for: Developers iterating on an existing repository. Not for: Teams requiring a fully offline workflow without further verification.

Export your rules and record editor settings before trying another tool. Keep the repository and its tests as the portable source of truth.

## Gaps

- Verify the account's Privacy Mode and team setting, any personal API keys, approved models with provider retention, Cloud Agent use, selected worker/runtime and applicable individual/commercial agreement.
- No account settings, worker configuration, actual data path, artifact storage or restore/migration flow were inspected or tested.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
