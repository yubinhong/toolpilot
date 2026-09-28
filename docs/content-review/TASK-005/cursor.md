# Cursor evidence pack

Date: 2026-09-27. Research by Codex agent; final approver: site owner (pending).

Revision: 4. Digest: `e6e3b241f3ea0b12e5a4e8a80770c3769a53704f8bf221bdff2d1657e2e9013d`.

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

## Field evidence

- **Workflow**: Editor and coding agent Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: With Privacy Mode enabled, Cursor says it will not train on Customer Data and that most provider requests use zero-data-retention agreements. Its docs describe safety/abuse review exceptions and models that require administrator approval before provider retention is enabled. BYOK requests still pass through Cursor's backend, and Cursor says its provider ZDR agreements do not apply to user API keys. Optional Cloud Agents temporarily store encrypted repository copies while a run is active and delete them after completion. Privacy Mode is available on Free and Pro, is enabled by default for Enterprise teams, and can be enforced by team administrators. Cursor's Privacy Policy excludes personal data it processes for commercial customers as processor; those agreements govern instead. Turning Privacy Mode off may allow Customer Data to be used or stored for improvement and training. No account setting, team policy, API key, model approval, Cloud Agent use or agreement was inspected. Sources: privacy-overview, privacy-governance, privacy-help, privacy-policy, security; checked: 2026-09-28.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **MCP support**: Cursor documents local stdio plus local or remote SSE and Streamable HTTP MCP transports; its Agent can use configured and enabled MCP tools. Sources: mcp; checked: 2026-09-27.

- **Strength**: Privacy Mode is available on individual Free and Pro plans; teams can enable or enforce it for members. Sources: security, privacy-help.

- **Constraint**: Privacy Mode does not make Cursor offline: AI requests send prompts and code context to model providers, and optional Cloud Agents temporarily store encrypted repository copies while running. Sources: privacy-governance, privacy-help.

- **FAQ**: Privacy Mode blocks training on Customer Data under Cursor's stated policy and most requests use provider ZDR, with safety/abuse and non-ZDR model exceptions. BYOK provider retention, account setting, organization policy and Cloud Agent use must be checked separately. Sources: privacy-overview, privacy-governance, privacy-help, privacy-policy.

## MCP evidence blocks

This draft now includes 2 source-backed documented strengths, 2 documented constraints and 2 FAQs. These are vendor-documentation facts awaiting owner review, not hands-on results.

## Pricing basis

- Individual Pro: USD 20 / month; Displayed monthly price; confirm billing toggle at checkout. Allowance: unknown. Overage: On-demand usage is billed after included usage is consumed.. Taxes: Listed prices exclude applicable taxes.. Sources: pricing.

## Proposed judgment

Shortlist Cursor when reading and revising diffs alongside the code is your main loop. Validate the usage allowance against your own workload.

Consider for: Developers iterating on an existing repository. Not for: Teams requiring a fully offline workflow without further verification.

Export your rules and record editor settings before trying another tool. Keep the repository and its tests as the portable source of truth.

## Gaps

- Assess all unknown fields above against the proposed recommendation.
- Verify the account's Privacy Mode and team setting, any personal API keys, approved models with provider retention, Cloud Agent use and applicable individual/commercial agreement.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
