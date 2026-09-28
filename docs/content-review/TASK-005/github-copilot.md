# GitHub Copilot evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 7. Digest: `fb8a71b65988e71d021f9df60a3c6da3f41b9e1c5b806c5644723a282493d59d`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Copilot plans](https://docs.github.com/en/copilot/get-started/plans) — GitHub Copilot; accessed 2026-09-27

- [Plans and billing](https://docs.github.com/en/copilot/get-started/plans) — GitHub Copilot; accessed 2026-09-27

- [Extend Copilot Chat with MCP servers](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp) — GitHub Copilot; accessed 2026-09-27

- [Hosting of models for GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) — GitHub Docs; accessed 2026-09-27

- [Managing GitHub Copilot policies as an individual subscriber](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies) — GitHub Docs; accessed 2026-09-27

- [Bring your own key for GitHub Copilot](https://docs.github.com/en/copilot/concepts/models/bring-your-own-key) — GitHub Docs; accessed 2026-09-28

- [Using your own LLM models in GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models) — GitHub Docs; accessed 2026-09-28

- [Configure the Copilot cloud agent development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) — GitHub Docs; accessed 2026-09-28

- [Configure runners for GitHub Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent) — GitHub Docs; accessed 2026-09-28

- [Using Copilot cloud agent on GitHub](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) — GitHub Docs; accessed 2026-09-28

- [About GitHub Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) — GitHub Docs; accessed 2026-09-28

## Field evidence

- **Workflow**: IDE assistance and GitHub features vary by plan Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: From April 24, 2026, GitHub may use Copilot Free/Pro/Pro+/Max interactions (including inputs, outputs, code snippets and context) to train and improve models; individuals can opt out. GitHub says Business and Enterprise customer data is not used for model training under its policy and Data Protection Agreement. This does not establish the enabled model's retention or an account's settings. Sources: model-hosting, individual-policies; checked: 2026-09-27.

- **Product self-hosting**: GitHub describes Copilot cloud agent as an ephemeral development environment powered by GitHub Actions. It defaults to GitHub-hosted `ubuntu-latest`, but repository setup and organization runner policy can route sessions to a labeled self-hosted Actions runner. Supported self-hosted architectures are Ubuntu x64 and Windows 64-bit; GitHub recommends ephemeral single-use runners and says its integrated firewall must be disabled because it is incompatible with this runner option. Runner placement does not establish local model inference or an offline Copilot service. No organization setting, firewall or session was inspected. Sources: cloud-agent-environment, cloud-agent-runners; checked: 2026-09-28.

- **Local model inference**: GitHub lists client-side Local BYOK in VS Code, JetBrains, Xcode, Copilot CLI, the Copilot app and Copilot SDK. This differs from Enterprise BYOK, which is configured server-side and still uses the Copilot API. Copilot CLI documents local Ollama, vLLM and Foundry Local-compatible endpoints; models need tool calling and streaming. Offline mode prevents GitHub contact, but a remote provider still receives prompts and code context. Business/Enterprise policy can disable Local BYOK in IDEs. No account, model or inference path was tested. Sources: byok, cli-byok; checked: 2026-09-28.

- **Code / data portability**: GitHub says Copilot cloud agent works only with GitHub-hosted repositories; its changes are pushed to a branch in the selected repository and can be reviewed as a diff, iterated, and optionally opened as a pull request. Each task is limited to one repository and one branch. This documents a Git-based path for agent-produced code changes, not a general export or migration path for prompts, chat history, session metadata or account settings; those data categories and this account's export controls were not verified. No repository or session migration was tested. Sources: cloud-agent-code-changes, cloud-agent-overview; checked: 2026-09-28.

- **MCP support**: Copilot Chat documents MCP servers for IDE use; GitHub lists VS Code 1.99+ as a prerequisite and requires organization policy enablement for Business or Enterprise members. Sources: mcp; checked: 2026-09-27.

## Source-bound evidence blocks

This draft now includes 2 source-backed documented strengths, 3 documented constraints and 5 FAQs. These are vendor-documentation facts awaiting owner review, not hands-on results.

## Pricing basis

- Pro: USD 10 / month; Monthly individual plan. Allowance: unknown. Overage: unknown. Taxes: unknown. Sources: pricing.

- Business: USD 19 / month; Per granted seat per month. Allowance: unknown. Overage: unknown. Taxes: unknown. Sources: pricing.

## Proposed judgment

Start here if changing the team workflow is a larger cost than changing the assistant. Check seat policies before buying individual subscriptions.

Consider for: Teams evaluating assistance within an established development workflow. Not for: Buyers assuming every feature is available on every plan.

Inventory organization policies and supported editor features before switching. Preserve repository instructions outside any one assistant.

## Gaps

- Verify the exact Copilot plan, personal training opt-out, and organization or enterprise policies for the account under review; no account settings were inspected.
- Review model-specific hosting and retention terms plus the applicable Data Protection Agreement for the enabled models and intended repositories; the public training-use policy is not a complete retention or legal assessment.
- Confirm the selected Copilot client, organization Local BYOK policy, model compatibility and provider route; no account, policy, model or inference path was tested.
- Confirm the organization's Copilot cloud-agent runner policy, repository override permission, firewall configuration and approved ephemeral runner; no organization setting or runner was inspected.
- Confirm the required export scope for prompts, chat history, session metadata and account settings; the reviewed docs only establish a Git-based path for cloud-agent code changes. No data or repository migration was tested.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
