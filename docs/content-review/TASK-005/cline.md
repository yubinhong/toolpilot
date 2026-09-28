# Cline evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 6. Digest: `47367db58ec7f54c413736644fd7aa7c3f9ec7cc74c582c63f56fed771763797`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Cline official repository](https://github.com/cline/cline) — Cline; accessed 2026-09-27

- [Plans and billing](https://docs.cline.bot/getting-started/authorizing-with-cline) — Cline; accessed 2026-09-27

- [MCP overview](https://docs.cline.bot/mcp/mcp-overview) — Cline; accessed 2026-09-27

- [Cline Privacy Notice](https://cline.bot/privacy) — Cline; last updated 2025-09-24; accessed 2026-09-28

- [Cline Terms of Service](https://cline.bot/tos) — Cline; last modified 2025-09-25; accessed 2026-09-28

- [Introducing Anonymous Telemetry in Cline](https://cline.bot/blog/introducing-anonymous-telemetry-in-cline) — Cline; published 2025-02-26; accessed 2026-09-28

- [Tasks](https://docs.cline.bot/core-workflows/task-management) — Cline; accessed 2026-09-28

- [Local models](https://docs.cline.bot/running-models-locally/overview) — Cline; accessed 2026-09-28

## Field evidence

- **Workflow**: IDE extension, CLI and desktop coding agent Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: The later-dated Terms say extension telemetry consists of non-code metadata such as click events/generalized usage patterns, is on by default, and can be disabled in settings; Cline says disabling stops future transmission and retention by Cline. The Privacy Notice distinguishes user-owned API keys (Cline says it does not collect that content) from Cline-provided keys (Cline collects content to facilitate provider requests). An older telemetry blog says opt-in, conflicting with the Terms. Actual installed version/settings, payload, pre-disable retention and model-provider terms remain unverified. Sources: terms, privacy, telemetry-blog; checked: 2026-09-28.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Cline's current guide documents Ollama, LM Studio and Atomic Chat runtimes configured against local servers. Hardware and model suitability need workload-specific evaluation. This is a local-inference option, not a guarantee that every feature, extension, external tool or plugin remains offline; no installation, model or data flow was tested. Source: local-models; checked: 2026-09-28.

- **Code / data portability**: Cline's docs say tasks save their full conversation history to the local machine, can be resumed across editor sessions and use Git-based snapshots for file changes. This does not establish supported cross-device transfer, complete task-history export/import, full backup/restore or settings migration; none was tested. Source: task-history; checked: 2026-09-28.

- **Provider configuration**: Provider sign-in and bring-your-own-key configurations are documented. Sources: pricing; checked: 2026-09-27.

- **MCP support**: Cline documents MCP servers for connecting external tools and data, with local stdio and remote server configuration paths. Sources: mcp; checked: 2026-09-27.

## MCP evidence blocks

This draft now includes 2 source-backed documented strengths, 3 documented constraints and 4 FAQs. These are vendor-documentation facts awaiting owner review, not hands-on results.

## Privacy and telemetry evidence

The public sources conflict: the Terms last modified 2025-09-25 say extension telemetry is on by default, while the 2025-02-26 telemetry blog describes it as opt-in. The later-dated Terms are recorded as the current stated policy, but the installed client version, configuration and actual payload were not inspected. Cline's Privacy Notice separately distinguishes BYOK from Cline-provided API-key routing; neither source determines the selected model provider's retention, training or legal terms.

## Task history and portability

The task-management page says tasks are saved automatically to the local machine, include conversation history, can be resumed across editor sessions, and create Git-based checkpoints for file changes. It does not specify supported transfer of full histories, settings or provider configuration between devices. No export, transfer or restore was tested.

## Local inference

The current official guide lists Ollama, LM Studio and Atomic Chat, with instructions to run a local server, select the matching provider and model in Cline, and enable its compact-prompt option. Its example endpoints are `http://localhost:11434`, `http://localhost:1234` and `http://127.0.0.1:1337/v1`; it also gives broad RAM ranges for small, mid-size and larger models. These are documented setup options, not a model-quality result or proof that external tools, telemetry or every connected feature remain offline. No runtime, model, installation or network traffic was inspected.

## Pricing basis

- Provider usage: Unknown; Depends on provider and authentication route. Allowance: unknown. Overage: unknown. Taxes: unknown. Sources: pricing.

## Proposed judgment

Shortlist Cline when model/provider choice is a requirement and you can manage its cost and access controls. Local inference needs a separate capability trial.

Consider for: Developers evaluating provider choice or local models. Not for: Buyers equating a local client with no external data transfer.

Preserve repository instructions and rotate provider credentials where appropriate. Check each configured provider and tool independently when changing clients.

## Gaps

- Confirm which Cline account/API-key route is intended and verify the selected provider's terms.
- Reconcile the telemetry source conflict against the installed extension version, setting and payload.
- Confirm whether the required migration scope is limited to Git-tracked files or also includes task history and settings; no cross-device transfer or restore was tested.
- Assess remaining unknown fields above against the proposed recommendation.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
