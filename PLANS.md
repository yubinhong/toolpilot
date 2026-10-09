# Completed Plan: TASK-012 — Fable 5.1 vs Opus 5.5 Comparison Article

The product owner explicitly requested `/compare/fable-5-1-vs-opus-5-5/` on 2026-10-09 and asked to use the same English article and release process as TASK-011. This authorizes the 12th public route after current demand/SERP review and official-source validation.

## Goal and constraints

- Add the 12th explicit public route and keep the route registry, static export, metadata, and sitemap allowlists exact.
- Add an English-only 600–1,000-word price/use-case article for `fable 5.1 vs opus 5.5`; include the keyword in the HTML title and H1–H6 and enforce 3–5% density with the existing rendered-word contract.
- Use the shared Anthropic model records and official pricing/model pages. Recheck both records, update source URLs/date, and record the official output-token limits.
- Extend `/compare/`'s dedicated article menu to the three explicitly approved comparison pages. Do not create generated comparisons or new model-detail pages.
- Separate provider-documented workload guidance from independent benchmark claims; recommend workload-specific evaluation and do not infer search volume.
- Prior user authorization to push to `main` and deploy remains applicable to this requested change.

## Demand and source review

- Current comparison-intent SERPs include [Chudi.dev's Opus 5.5 vs Fable 5.1 price/benchmark comparison](https://chudi.dev/blog/claude-opus-5-5-vs-fable-5-1) and [Respan's Fable 5.1 vs Opus 5.5 guide](https://www.respan.ai/articles/claude-fable-vs-opus). A recent [Claude Code developer discussion](https://www.reddit.com/r/claude/comments/1wy2ojw/switched_claude_code_from_fable_51_to_opus_55/) compares switching, cost, and task fit. These are current intent and interest signals, not authoritative model facts; no search-volume figure is claimed.
- Anthropic's [Fable 5.1 overview](https://platform.claude.com/docs/en/models/fable-5-1/overview), [Opus 5.5 overview](https://platform.claude.com/docs/en/models/opus-5-5/overview), [API pricing](https://platform.claude.com/docs/en/about-claude/pricing), and [choosing a model guide](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) were checked on 2026-10-09.
- Official standard USD rates per million tokens: Fable 5.1 input/output `$10/$50`, cached input `$0.25`, five-minute cache write `$12.50`, one-hour cache write `$20`; Opus 5.5 input/output `$4/$20`, cached input `$0.20`, five-minute cache write `$5`, one-hour cache write `$8`. Both list 1,000,000 context and 128,000 max output. Anthropic positions Opus 5.5 as a starting point for most workloads and Fable 5.1 for demanding reasoning/long-horizon agentic work when Opus at higher effort still falls short.

## Phases

1. [x] Verify current comparison intent, current SERP, and official model, price, limits, and workload guidance.
2. [x] Refresh shared Fable/Opus records, add tested output limits, and update the 12-route/menu contracts.
3. [x] Add the authored article, route metadata, breadcrumb, and title/H1–H6, source, rate, word-count, and keyword-density artifact checks.
4. [x] Synchronize PRD, architecture, testing, security route facts, project/current context, task, changelog, TODO, and runbook/release records.
5. [x] Run Node 22 quality gates, audit, release readiness, local and production smoke; review the complete diff.
6. [x] Commit and push to `main`; verify CI, Cloudflare Pages deployment, and immutable-preview/production output.

## Release evidence

- Node 22.23.2/npm 10.9.8: `npm run cloudflare:build` passed lint, typecheck, 37/37 tests, static export, and artifact checks. The article contains 857 English words, no Han characters, and 4.67% keyword density. `npm audit --audit-level=high` found 0 vulnerabilities; `npm run release:check` passed on the clean feature commit.
- Commit `2a75f3a1901804d3c8b215844c2dee5c31cc6074` was pushed to `main`. GitHub CI run `37888802655` and Cloudflare Pages check/deployment `0514aa49-871e-4fd6-b099-0b476ae563c0` succeeded.
- Immutable preview `https://0514aa49.toolpilot-git.pages.dev` and production `https://toolpilot.cc` passed the full 12-route smoke, exact sitemap, robots, and retired-route 404 checks. Direct HTML checks on both domains confirmed title and H1–H6 keyword coverage and the dedicated article menu link.
- Rollback remains a revert of the feature commit; no user data, Cloudflare settings, DNS, or custom-domain bindings changed.

## Rollback

Revert the TASK-012 feature commit to remove the exact 12th route, third menu entry, article, and related contracts. Restore the previous Fable/Opus source metadata and route allowlist; no user data, domain configuration, or Cloudflare settings are changed.

---

# Completed Plan: TASK-011 — Haiku 5.5 vs Luna 6 Comparison Article

The product owner explicitly approved `/compare/haiku-5-5-vs-luna-6/` on 2026-10-09, including an English article and a dedicated comparison-article menu on `/compare/`.

## Goal and constraints

- Add the 11th explicit public route and keep the static route/sitemap allowlist exact.
- Add an English-only 600–1,000-word article for `haiku 5.5 vs luna 6`, with the phrase in the HTML title and H1–H6 and 3–5% density by the existing word-count contract.
- Compare standard and context-tier API prices and practical use cases using current official Anthropic and OpenAI sources; preserve rates and verification dates in the shared model records.
- Model Anthropic's >100,000 input-token rates alongside GPT-6 Luna's >272,000 input-token rates so all shared pricing surfaces describe the source schedules accurately.
- Replace the single inline comparison-guide link with an accessible, compact menu listing the two approved authored comparison pages.
- Keep only Jev and Gemini 4 Argon as independent model detail pages; do not add generated comparisons or infer search volume.
- The product owner previously authorized merge to `main`, push, and production deployment; use the existing Git-integrated Cloudflare Pages release path.

## Phases

1. [x] Confirm current comparison intent and official Anthropic/OpenAI model, pricing, limits, and use-case sources.
2. [x] Add the shared Haiku model record and context-tier pricing representation; update validators and focused cost tests.
3. [x] Add the comparison article, dedicated article menu, route metadata, breadcrumb, and exact 11-route sitemap/artifact/smoke contracts.
4. [x] Synchronize PRD, architecture, project, current-context, task, changelog, and release records; run Node 22 quality gates and review the diff.
5. [x] Commit `e1c4b44`, push to `main`, verify GitHub CI and Cloudflare Pages deployment, and run full immutable-preview/production smoke plus direct production article checks.

## Release evidence

- GitHub CI run `37879419603` passed; Cloudflare Pages check/deployment `b30f5bbe-edda-4f84-a8a1-9978b2525ced` reported success for commit `e1c4b44`.
- Immutable preview `https://b30f5bbe.toolpilot-git.pages.dev` and production `https://toolpilot.cc` passed the full 11-route smoke, exact sitemap, robots, and retired-route 404 checks. Direct production HTML confirmed the title and H1–H6 keyword coverage and both comparison-menu links.
- `npm run release:check` passed before the feature commit was pushed. Wrangler deployment-list inspection could not run because no `CLOUDFLARE_API_TOKEN` is configured; the Pages GitHub check and public HTTP smoke confirmed the successful deployment.

## Official source findings

- Anthropic's [Claude Haiku 5.5 model overview](https://platform.claude.com/docs/en/models/haiku-5-5/overview) and [API pricing](https://platform.claude.com/docs/en/about-claude/pricing) were checked on 2026-10-09. Haiku 5.5 lists a 1,000,000-token context window and 128,000 maximum output. Standard prices per million tokens are `$0.10` input, `$0.01` cache read, `$0.125` five-minute cache write, `$0.20` one-hour cache write, and `$0.50` output for prompts up to 100,000 tokens. Above that input threshold the corresponding rates are `$0.50`, `$0.05`, `$0.625`, `$1.00`, and `$2.50`.
- OpenAI's [GPT-6 Luna model page](https://developers.openai.com/api/docs/models/gpt-6-luna) and [API pricing](https://developers.openai.com/api/docs/pricing) were checked on 2026-10-09. Standard prices per million tokens are `$0.10` input, `$0.01` cached input, `$0.125` cache write, and `$0.50` output; above 272,000 input tokens they are `$0.20`, `$0.02`, `$0.25`, and `$0.75`. The documented context window is 1,050,000 tokens and maximum output is 128,000.
- Current exact/close-match results include [OpenRouter's model comparison](https://openrouter.ai/compare/anthropic/claude-haiku-5.5/openai/gpt-6-luna) and [ToolColumn's same-price/use-case guide](https://www.toolcolumn.com/learn/claude-haiku-5-5-vs-gpt-6-luna); [developer discussion](https://www.reddit.com/r/ClaudeAI/comments/1x0agoh/claude_haiku_55_cost_12x_more_than_gpt6_luna_for/) also compares the pair on cost. These are search-intent/interest signals only, not model facts. No reliable search-volume number was found or inferred.

---

# Completed Plan: TASK-010 — GPT 6.1 Sol vs Astra Comparison Page

The product owner explicitly approved the exact comparison route `/compare/gpt-6-1-sol-vs-astra/` on 2026-10-09. This is one researched exception to the existing nine-page set; it does not authorize generated or bulk model comparisons.

## Goal and constraints

- Maintain one English-only price and use-case article for the requested keyword, using the existing static App Router and exact sitemap contract.
- Keep prices in `content/models.json`; use official OpenAI API pricing and model documentation, and refresh the two records' `lastVerifiedAt` dates.
- Preserve only two independent model-detail routes. Do not create generic comparison generation or additional SEO pages.
- Record the release-week demand signal, exact SERP intent, independent discussion signal, official facts, and the absence of a verified search-volume figure.
- The article has 600–1,000 English words and no Han characters, includes the keyword in the metadata title and H1–H6, and targets 3–5% phrase density using the rendered English word count.
- The product owner authorized dependency remediation, merge, push, and production deployment on 2026-10-09. GitHub has no remote `master`; Cloudflare production is connected to `main`.
- Do not suppress or waive high-severity audit findings. Prefer published upstream fixes; remove the unpatched `braces` development dependency path rather than consuming an unmerged patch.

## Phases

1. [x] Verify current OpenAI prices/model capabilities, trend signal, search intent, SERP results, and explicit page approval.
2. [x] Add the page, contextual internal link, route metadata, and ten-page build/smoke contracts; refresh shared record verification dates.
3. [x] Update product policy, architecture/testing/task/changelog context, run available non-test quality checks, and review the final diff.
4. [x] Commit only this task's changes and push the feature branch (`bf775f4`, `ea2ba2e`).
5. [x] Update vulnerable build dependencies to verified patched versions and replace the Next ESLint config with an equivalent maintained flat-config toolchain that does not pull `braces`; keep meaningful TypeScript, React-hooks, and accessibility lint coverage.
6. [x] Verify the generated `sitemap.xml` contains exactly the ten approved routes; clean install, audit, lint, typecheck, tests, static build, and Wrangler smoke passed. Run clean-worktree release readiness after committing.
7. [x] Fast-forward merge to `main`, push, and record successful GitHub CI, Cloudflare Pages deployment, and production route/sitemap smoke evidence.
8. [x] Replace the article copy with English-only text, enforce the English word-count and density contract, push to `main`, and verify the updated production page.

## Source findings

- OpenAI's GPT-6.1 Sol announcement and API model page state standard input/cached-input/output prices of `$2.00/$0.10/$10.00` per million tokens; the API page also documents cache writes and the long-context threshold: `https://openai.com/index/introducing-gpt-6-1-sol/` and `https://developers.openai.com/api/docs/models/gpt-6.1-sol`.
- OpenAI's GPT-6 Astra API model page states standard input/cached-input/output prices of `$10.00/$1.00/$50.00` per million tokens, a 1,050,000-token context window, 128,000 maximum output, and the same long-context threshold: `https://developers.openai.com/api/docs/models/gpt-6-astra`.
- The exact and close comparison SERPs on 2026-10-09 return multiple recent price/benchmark/use-case comparison pages, including `https://www.nocode.mba/articles/gpt-6-1-sol-vs-gpt-6-astra` and `https://www.llmmetric.com/compare/gpt-6-1-sol-vs-gpt-6-astra`. A recent developer discussion comparing cost and task outcomes is at `https://www.reddit.com/r/OpenAI/comments/1wu4fxh/61_sol_so_far_pretty_impressed/`. These establish current comparison intent, not a search-volume estimate.
- OpenAI's release announcement describes GPT-6.1 Sol as near-Astra on selected coding, computer-use, and professional-work evaluations at lower cost. Those are vendor-reported results; the article will recommend workload-specific evaluation rather than promise universal parity.

---

# Completed Plan: TASK-009 — Argon Accuracy and Post-Launch SEO

This follow-up supersedes only the eight-route limit in TASK-008/ADR-0011. The owner explicitly approved `/models/gemini-4-argon/` as the second demand-driven landing page. No additional SEO route is authorized.

## Goal and constraints

- Replace the developer-tool product with AI model pricing, cost calculation, and model comparison.
- Keep exactly nine public page routes: `/`, `/pricing/`, `/calculator/`, `/compare/`, `/models/jev/`, `/models/gemini-4-argon/`, `/about/`, `/privacy/`, `/terms/`.
- Keep static export and Cloudflare Pages; store model facts in validated static JSON.
- Jev and Gemini 4 Argon are the only detail routes. Adding model data never generates a route.
- Remove old product routes/content and let unknown old URLs return 404; do not add catch-all redirects.
- Use official provider data with `source_url` and `lastVerifiedAt`; preserve price schedules and distinguish announced rates from currently available API access.
- Gemini 4 Argon official announcement publishes introductory and subsequent token rates; record them as announced pricing, label the limited rollout, and do not describe the API as generally available.
- Record Google's 1M output-token limit separately from an unknown context/input limit.
- Make `not_public` pricing unavailable in the shared cost engine and every calculator/comparison surface.
- Add shared Jev/Argon landing-page structure, accurate answer-first content, visible FAQs, official sources, and links to pricing/calculator/compare.
- Preserve a maximum of nine indexable pages and nine sitemap URLs; no model-database-driven pages.

## Phases

1. Extend shared pricing/model schema, cost-engine behavior, validation, and route/artifact contracts.
2. Build the reusable model landing template, Argon page, Jev FAQ, and accurate shared pricing/calculator/compare displays.
3. Refine homepage/pricing/calculator copy, metadata, sitemap, canonical and robots assertions, then run required tests/build/smoke and review deployment readiness.

## Current checklist

- [x] Reconfirm Google announcement facts: Sep 30, 2026 release; limited Fairwind rollout; published intro/standard rates; 1M output-token limit.
- [x] Extend schema and validator for explicit pricing status and output token limit.
- [x] Update shared cost engine and surfaces to refuse estimates for `not_public` pricing.
- [x] Add Argon as the second explicit landing page and reuse the Jev template.
- [x] Add model-specific metadata, official sources, FAQ, and cross-links.
- [x] Update route/sitemap/export/smoke contracts to exactly nine approved pages.
- [x] Add focused tests for announced/not-public/not-applicable prices and route artifacts.
- [x] Run `npm run cloudflare:build` and local smoke; all checks passed.
- [x] Review final diff, sync task/release docs, and deploy commit `d7d42e5`; clean release readiness, CI, Cloudflare Pages check, build, audit, and local/preview smoke passed.
- [ ] Purge or otherwise resolve the `/tools/` response variation at the production custom domain, then rerun `SMOKE_BASE_URL=https://toolpilot.cc npm run smoke`; current Node fetch still gets aged legacy HTML while curl and the Pages alias return 404.

## Source findings

- Google's official announcement states the Sep 30, 2026 announcement date, Fairwind limited rollout, intro pricing of `$2/M` input and `$10/M` output with cached input at 95% off, and `$4/M` input plus `$20/M` output after the introductory period: `https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/`.
- The same announcement says the 1M figure is an output-token limit. It does not establish the input/context window.
- Google's official model page documents long-horizon reasoning, software engineering, enterprise knowledge work, multimodal understanding, and cybersecurity defense: `https://deepmind.google/models/gemini/`.
- The Gemini API model catalog checked on 2026-10-01 does not list Argon; its current API identifier/access path therefore remains unpublished in that catalog.

---

## TASK-008 — Eight-Page AI Model Pricing V1 (historical)

The original implementation/release plan and verification evidence are retained in TASK.md. Its eight-route constraint is superseded by the owner-approved Argon follow-up above.

---

# PLANS.md - Historical plan archive

> 用于跨模块、长时间、高风险或需要阶段交付的任务。顶部为 `DOC-001` 历史计划，`TASK-001` 至 `TASK-004` 的计划与收尾记录在文末。

## 计划元数据

- 计划 ID：`DOC-001`
- 关联任务：`DOC-001`
- 状态：`COMPLETE`
- Owner：`TBD`
- 基线：`工作区当前文件；Git 元数据不可用`
- 创建/更新：`2026-08-19 23:10 Asia/Shanghai`

## 1. 目标结果

完成后，新 Codex 会话能够从 `AI_CONTEXT.md` 了解项目定位、当前仓库状态、唯一事实来源、验证阻塞和第一个可执行任务；其他主文档不再保留可避免的模板占位符。

## 2. 上下文与约束

- 当前行为：早期盘点读到企业级工作流模板、`.next`/Wrangler 生成物和少量配置样例，但最终检查时这些生成物和样例已消失；当前没有源码、依赖清单或 Git 元数据。
- 目标行为：把已验证事实写入对应主文档，把未知项保留为 `TBD` 并说明确认对象和重要性。
- 不变量：不修改业务代码、不升级依赖、不部署、不提交 Git、不读取或输出真实密钥。
- 禁止事项：不把 `.next` 生成物、研究示例或文件名当作源码和生产事实。
- 关键依赖：Node 版本、源码和 `package.json` 的恢复；产品定位与旧 Crypto/DeFi 生成内容的迁移决策。

## 3. 相关文件与入口

| 路径 | 作用 | 为什么相关 |
| --- | --- | --- |
| `AGENTS.md` | 仓库长期规则 | 规定读取顺序、授权、验证和文档同步 |
| `AI_CONTEXT.md` | 会话入口 | 汇总项目状态、阅读路径、阻塞和下一任务 |
| `PROJECT.md` | 产品事实 | 记录 ToolPilot 定位、范围、技术基线和风险 |
| `PRD.md` | 产品需求 | 记录尚未批准的 MVP 需求和验收边界 |
| `ARCHITECTURE.md` | 系统结构 | 区分已观察到的静态导出与尚未确认的源码结构 |
| `TESTING.md` | 命令和质量门槛 | 记录实际可执行的文档检查和工程验证阻塞 |
| `SECURITY.md` | 安全边界 | 记录公开内容、外部输入、密钥和分析数据规则 |
| `RUNBOOK.md` | 运行与发布 | 记录当前无部署入口的状态和恢复前禁止事项 |
| `TASK.md` / `TODO.md` | 执行入口 | 记录文档审计完成和源码恢复等后续工作 |
| `.next/required-server-files.json` | 构建证据 | 验证 Next 配置来源、静态导出、路由扩展和类型检查设置 |

## 4. 分阶段计划

### Milestone 1 - 阅读和仓库盘点

结果：完成根目录主文档、ADR 模板、配置样例、目录和生成物的只读检查。

- [x] 读取 `AGENTS.md`、`AI_CONTEXT.md`、`PROJECT.md`、`TASK.md`、相关主文档和 ADR。
- [x] 盘点依赖清单、入口、迁移、CI、测试和部署脚本是否存在。
- 验证：`find`、`rg --files`、`jq`、`node --version`、`npm --version`。
- 检查点：形成文档事实与代码事实的冲突清单。

### Milestone 2 - 主文档回填

结果：稳定事实进入唯一主文档，未知项带有确认对象、重要性和验证方式。

- [x] 更新 `AI_CONTEXT.md`、`PROJECT.md`、`PRD.md`、`ARCHITECTURE.md`、`TESTING.md`、`SECURITY.md` 和 `RUNBOOK.md`。
- [x] 更新 `TASK.md`、`TODO.md`、`DECISIONS.md` 和 `CHANGELOG.md` 的当前状态。
- 验证：占位符扫描、Markdown 结构检查、配置字段复核。
- 检查点：所有文档中的“已验证”“要求值”“未知项”可相互对照。

### Milestone 3 - 收尾和移交

结果：计划完成，最终汇报列出事实、冲突、风险、未知项和第一个 TASK 建议。

- [x] 复核差异、意外文件和敏感信息。
- [x] 记录未运行的工程验证及原因。
- 验证：文件清单、`rg` 占位符扫描、Git 元数据探测。
- 检查点：`PLANS.md` 标记为 `COMPLETE`。

## 5. Progress

- `2026-08-19 23:10 Asia/Shanghai` - `[done]` 已完成文档读取、目录盘点、早期构建元数据验证、主文档回填和风险移交；最终复核发现早期生成物和配置消失。

## 6. Surprises & Discoveries

- `2026-08-19` - 发现：早期 `.nvmrc` 要求 Node 22，但当前 shell 为 Node 20.17.0；证据：早期读取的 `.nvmrc`、`node --version`；影响：不能宣称 Node 22 下构建可复现，且该要求文件最终已不存在。
- `2026-08-19` - 发现：没有 `package.json`、锁文件、源码、CI、迁移、测试或部署脚本；证据：`find`、`rg --files`；影响：工程命令全部阻塞，需先恢复项目输入。
- `2026-08-19` - 发现：`.next` 显示 Next 静态导出，但生成页面是 Crypto/DeFi 工具；证据：`.next/required-server-files.json`、`.next/server/app/*.html`；影响：不能直接把生成物视为当前 ToolPilot 产品。
- `2026-08-19` - 发现：早期检查读到的 `.next`、`.wrangler`、`.env.example`、`.nvmrc`、`.npmrc` 和 `.assetsignore` 在最终只读检查时已不存在；证据：最终 `ls`、`find`、`jq` 和 `stat`；影响：早期构建/配置证据当前不可复核，需先确认工作区同步或清理原因。

## 7. Decision Log

- `2026-08-19` - 决定：未知技术细节保留 `TBD`，不根据生成物补写源码结构；原因：仓库缺少可运行源代码和依赖清单；替代方案：从构建缓存反推，拒绝；是否需要 ADR：源码恢复后评估。
- `2026-08-19` - 决定：将静态导出记录为“已观察的构建配置”，不记录为已批准架构；原因：当前仅有 `.next` 证据；替代方案：直接确认架构，拒绝；是否需要 ADR：需要，待源码恢复。

## 8. 验证与验收

```bash
find . -path './.next' -prune -o -path './.wrangler' -prune -o -type f -print | sort
jq '{configOrigin: .config.configOrigin, output: .config.output, trailingSlash: .config.trailingSlash, pageExtensions: .config.pageExtensions, typescriptIgnoreBuildErrors: .config.typescript.ignoreBuildErrors}' .next/required-server-files.json
node --version
npm --version
```

- [x] 每个主文档的事实都有文件或命令证据，未知项写明确认人和原因。
- [x] 旧生成物与新产品定位的冲突已进入风险和 TODO。
- [x] 文档与变更记录同步。

## 9. 回滚与恢复

- 可逆步骤：使用本次变更前的文档副本恢复被更新的 Markdown 文件。
- 不可逆步骤：无；本计划不涉及业务数据、依赖、部署或 Git 历史。
- 回滚命令/流程：未执行 Git 操作；恢复前先保留当前文档副本并人工审查差异。
- 数据恢复：不适用。

## 10. Closeout

- 实际结果：已完成主文档回填、仓库盘点、早期生成元数据验证和最终消失状态复核，以及风险/待办移交。
- 与原计划的差异：未创建正式 ADR，因为源码、Owner 和最终架构仍未确认；仅更新了决策索引。
- 未解决事项：源码、依赖、Node 22 执行环境、部署入口和产品内容迁移仍待确认。
- 经验：生成物可以证明部分构建配置，但不能替代源码、依赖和生产验证。

## TASK-001 - Restart Development

### 计划元数据

- 计划 ID：`TASK-001`
- 状态：`COMPLETE`
- 日期：`2026-08-20`
- 基线：用户确认后的空工作区；无 Git 元数据

### 目标与范围

从用户主动删除旧文件后的空工作区重新建立可运行的 ToolPilot 静态 MVP，不复用旧 Crypto/DeFi 生成物。范围包括 Next.js App Router 静态导出、首页、工具目录/详情、Compare、Alternatives、Stacks、Guides、法律页面、robots、sitemap、草稿目录、质量命令和文档同步；不包含 CMS、账户、分析、支付、CI、部署和生产验证。

### 完成项

- [x] Node 22.23.0/npm 10.9.8、`package.json`、`package-lock.json`、`.nvmrc` 和 Next/TypeScript/ESLint 配置。
- [x] Next 16.3.1、React 19.2.8、TypeScript 5.9.3、ESLint 9.39.5。
- [x] 首页任务导向浏览、七类工具草稿、工具详情、三类决策页、三篇指南草稿、法律页、robots 和 sitemap。
- [x] 所有目录条目标记为 `Draft` / `Source pending`；旧 Crypto/DeFi 内容不迁移。
- [x] `npm run typecheck`、`npm run lint`、`npm test`、`npm run build` 通过；关键本地路径 HTTP smoke test 返回 200。
- [x] 创建 `docs/adr/0001-static-export-mvp.md` 并同步主文档。

### 验证与未决事项

```text
Node v22.23.0 / npm 10.9.8
npm audit: 0 vulnerabilities
npm test: 3 passed
npm run build: pass, 26 static routes/metadata outputs
HTTP smoke: / /tools/ /tools/cursor/ /compare/ /guides/ /robots.txt /sitemap.xml -> 200
```

未运行格式化（未配置工具）、集成测试、浏览器 E2E、真实外部链接核验、CI、部署和生产 smoke。下一任务建议先处理 `TODO-005`、`TODO-006` 和 `TODO-007`。

## TASK-002 - 50 Products and Cloudflare Release

### 计划元数据

- 计划 ID：`TASK-002`
- 状态：`COMPLETE`
- 日期：`2026-08-20`
- 基线：`TASK-001` 完成后的 Next.js 静态导出 MVP

### 完成项

- [x] 将研究对话中的 50 条产品接入 `lib/catalog.mjs`，所有产品官网链接唯一；产品官网与研究来源字段分离。
- [x] 增加用户可见的 Draft、Affiliate/Partner/Referral/Popular/Pending 状态；佣金和合作信息明确为研究快照，未作为已验证商业事实。
- [x] `npm ci`、`npm audit --audit-level=high`、`npm run typecheck`、`npm run lint`、`npm test`、`npm run build` 通过；构建生成 66 个静态路由。
- [x] 50 个产品官网完成 GET 检查：42 个 2xx/3xx，8 个 403/429，均记录为可达但受防护/限流影响。
- [x] Cloudflare Pages 项目 `toolpilot` 创建并部署 332 个文件；`toolpilot.cc` 已绑定，生产关键路径返回 200，sitemap 包含 50 个工具 URL。
- [x] 未执行 Git 提交、Affiliate 申请或密钥写入。

### 未完成项与后续

- 50 条内容仍需产品/内容 Owner 逐条核验官网、价格、功能、更新时间、来源和商业条款。
- 8 个官网的自动检查被 403/429 防护或限流影响，不能替代人工/浏览器内容复核。
- CI、监控、告警、自动化回滚和回滚演练仍未建立，跟踪 `TODO-004`、`TODO-302`。
- 建议第一个后续任务：`TASK-003`，建立 50 条内容审核清单和版本化来源记录。

## TASK-003 - Content Review and Source Record

### 计划元数据

- 计划 ID：`TASK-003`
- 状态：`COMPLETE`
- 日期：`2026-08-20`
- 基线：`TASK-002` 已部署的 50 条研究快照目录

### 目标与范围

建立 50 条目录的可追溯审核记录，分离产品链接可达性、研究来源状态、编辑审核状态、正式事实核验和商业关系核验；继续把未核验内容显示为 Draft/TBD。范围不包含 Affiliate 申请、密钥、CMS、数据库或正式事实的自动批准。

### 完成项

- [x] `lib/catalog.mjs` 为 50 条记录增加研究快照日期、产品/来源链接检查、来源状态、编辑审核 Owner/日期和正式核验日期。
- [x] `docs/content-review/TASK-003-2026-08-20.md` 列出全部 50 条记录、当前访问统计、来源缺口、受限 URL 和正式发布清单。
- [x] `docs/adr/0006-content-review-gate.md` 固化“HTTP 可达不等于事实核验”的发布门槛。
- [x] 目录卡片和详情页显示链接检查、来源状态和编辑审核状态；所有条目仍为 Draft/Pending。
- [x] 通过 Node 22 的 typecheck、lint、3 项测试、build 和高危级别 npm audit。
- [x] 发布 Cloudflare Pages，生产域名 `toolpilot.cc` 关键路径返回 200，sitemap 包含 50 条工具 URL。

### 证据与未决事项

- 产品官网检查：42 个 2xx/3xx，8 个 403/429 受限；研究来源检查：39 个 2xx/3xx，6 个 403 受限，5 个缺失。
- 50 条内容的价格、功能、限制、来源新鲜度、编辑评价和商业条款仍需产品/内容/商业 Owner 人工确认；这些内容没有被本任务自动标记为已验证。
- CI、监控、告警和回滚演练仍跟踪 `TODO-004`、`TODO-302`；下一执行计划建议为 `TASK-004`。

## TASK-004 - CI, Production Monitoring, and Cloudflare Pages Git Integration

### 计划元数据

- 计划 ID：`TASK-004`
- 状态：`IN_PROGRESS`
- 日期：`2026-08-21`
- 基线：TASK-003 完成后的静态站点；reviewed commit `4776027` 已推送到 `origin/main`，工作区干净并已部署

### 目标与范围

建立仓库级 CI、可复用生产 smoke、定时生产监控，并将正常生产发布目标切换为 Cloudflare Pages Git Integration。旧 Direct Upload 项目在新项目和域名验证完成前保留为恢复目标；不在未确认生产窗口时切换线上版本。

### 已完成

- [x] `scripts/smoke.mjs` 和 `npm run smoke`：检查 7 个关键路径、审核标记和 50 条 sitemap 工具 URL。
- [x] `.github/workflows/ci.yml`：Node 22、`npm ci`、audit、lint、typecheck、test、build、本地静态 smoke。
- [x] `.github/workflows/production-monitor.yml`：每 15 分钟和手动触发的生产 smoke。
- [x] `package.json`：新增 `cloudflare:build`，执行 lint、typecheck、test 和静态构建，供 Pages Git Integration 使用。
- [x] `.github/workflows/pages-release.yml`：已移除旧的手动 Cloudflare API-token 发布路径。
- [x] `scripts/release-readiness.mjs` 和 `npm run release:check`：作为本地/提交审核门槛拒绝错误 Node、短 SHA、不安全/缺失 remote、dirty worktree 和未跟踪发布文件；4 个门槛测试通过。
- [x] `docs/adr/0007-ci-monitoring-release-gate.md` 保留 CI/监控决策并标记旧手动发布路径已被 ADR-0008 取代。
- [x] `docs/adr/0008-cloudflare-pages-git-integration.md`：记录 Direct Upload 到 Git Integration 的迁移目标和回滚边界。
- [x] 本地静态服务器 smoke 通过；现存 workflow YAML 通过 Python YAML 解析。
- [x] Node 22 下 `npm run lint`、`npm run typecheck`、`npm test`、`npm run build`、`npm audit --audit-level=high` 通过；2026-08-21 生产 smoke 7/7 路径通过。

### 未完成与阻塞

- reviewed commit `4776027` 已推送、通过干净 checkout 的 `release:check` 并部署到旧 Direct Upload 项目；GitHub CI run `32442681654` 成功，但新 Git-integrated Pages 项目、GitHub App 授权、构建和域名迁移尚未完成。
- 当前生产部署元数据已显示 source `4776027`，并通过 `https://toolpilot.cc` 公网 smoke；旧部署仍未验收为可复现回滚目标。
- 尚未在明确生产操作窗口执行实际 Pages 回滚/域名恢复演练；跟踪 `TODO-302`。
- 任务保持 `IN_PROGRESS`，直到外部 Owner 完成激活并提供运行/回滚证据。

## TASK-004 follow-up - Codebase Cleanup

### Plan metadata

- Status: `COMPLETE`
- Date: `2026-08-30`
- Baseline: `43b9ca7` with a clean worktree

### Scope and completion criteria

Keep the static MVP behavior and public routes unchanged while improving source readability, removing repeated presentation logic where it is genuinely shared, and tightening the small set of UI accessibility states that are currently implicit. Add focused regression coverage for any extracted catalog/page helpers, then run the repository's Node 22 quality commands when the required runtime is available.

### Steps

- [x] Inspect current source, tests, generated route expectations, and worktree state.
- [x] Apply narrowly scoped code cleanup without changing catalog facts, routes, or deployment behavior.
- [x] Add or update focused tests for changed pure logic and review the final diff.
- [x] Run lint, typecheck, tests, build, smoke, and release checks where the environment permits; record blockers explicitly.

### Rollback

Revert only the files changed by this follow-up after reviewing the diff; no data, deployment, dependency version, or Git history changes are required.

### Result

Completed on `2026-08-30`. The cleanup added shared `ContentSection` and configurable `CatalogNotice` components, centralized static route/site URL configuration, removed a duplicate CSS selector, and exposed category filter state through `aria-pressed`. Catalog facts, generated route count, and deployment settings are unchanged. Node 22.23.2 checks passed: 9 tests, lint, typecheck, build, `cloudflare:build`, dependency audit, local smoke, and workflow YAML parsing via Python. `release:check` was run against the intentionally dirty worktree and rejected it as expected; no commit or push was made.


## TASK-005 — Approved remediation execution (2026-09-27)

Status: COMPLETE (implementation and release handoff; owner gates remain open). Keep Next.js static export, English first, AI coding/app builders first. Owner alone approves formal content. Draft URLs remain accessible with noindex and outside sitemap. Preserve TASK-004 recovery, notification and rollback obligations.

| Step | Deliverable | Acceptance |
| --- | --- | --- |
| TP-R00 | Baseline, isolated report extraction, task archive | Existing changes preserved; estimates labeled |
| TP-R01 | Public HTTP and historical URL audit | Restricted access distinguished from outage; no guessed redirects |
| TP-R02 | JSON content, TS types, validation, public projections | Exact revision approval, field sources, separate commercial relations |
| TP-R03 | Shared route/index registry, metadata, migrated tests | Draft excluded; canonical self-references; current production smoke verified after owner-reported cutover |
| TP-R04 | Tools/Compare/Alternatives/Pricing/Best/Guides templates | Static export, accessible tables, unknown values explicit |
| TP-R05 | Cursor, Copilot, Windsurf, Lovable, Replit, Bolt.new, Claude Code, Cline evidence | Official sources/date and gaps; no fabricated tests |
| TP-R06 | 8 tools + 6 comparisons + 6 alternatives + 4 pricing + 2 best + 2 guides | Distinct decision intent; owner approval pending |
| TP-R07 | Task-oriented home, navigation, editorial/disclosure/contact/legal pages | No fake contact, approval or relationships |
| TP-R08 | Content/artifact/link/freshness checks | Mocked network tests; no external notifications or auto-edit |
| TP-R09 | Node 22 locked install, audit, full build, local smoke, diff review | Engineering/content/production statuses reported separately |

Dependencies: R00 → R02 → R03/R04 → R06/R07 → R08/R09; R01 and R05 can proceed independently without external mutation. Source failures block relevant claims only. Contact/legal facts block final trust approval only. Release requires explicit authorization and clean full SHA; release:check must continue rejecting dirty worktrees.

Delivery cadence update (2026-09-27): the user explicitly authorized production deployment and requires online verification for every deliverable progress. Each release must pass the current dependency audit, `release:check`, and a production `SMOKE_PROFILE=current` check against the deployed source. Do not infer deployment from a Git push or successful build. This authorization does not approve draft content, activate commercial relationships, authorize this agent to edit DNS/delete the recovery Pages project, or weaken release gates. The owner later reported completing the CNAME switch.

TP-R09 closeout (2026-09-27): commit `4fb09bca29619032588d152e7b971e69fab1f4ad` passed `release:check`, GitHub CI `36299689412`, Cloudflare Pages deployment `76a9ace8-375f-40fd-b31a-acdb22661512`, immutable-preview and production current smoke, and manual production-monitor run `36299788937`. Engineering handoff is complete. Owner content approval, operator/legal/contact facts, independent GSC and broad crawler-access checks, notification setup and the production rollback exercise remain separate gates.

90-day follow-up: weeks 1–2 foundation; 3–4 templates/evidence; 5–6 decisions; 7–8 guides/internal links; 9–10 GSC review; 11–13 evidence-driven expansion. No automatic MCP/Chinese/calculator/ads expansion. Weekly compare 28-day GSC windows; no available data means unknown.

## TASK-006 — ToolPilot Rebuild Plan Alignment and P0 Technical Foundation

### Plan metadata

- Plan ID: `TASK-006`
- Status: `IN_PROGRESS`
- Date: `2026-09-27`
- Input: user-provided `TOOLPILOT_REBUILD_PLAN.md`; preserve as supplied (currently untracked)
- Baseline: branch `main`, HEAD `a419cab0891802f786c61dd4343fe5aeda75c6c7`; the supplied plan was the only pre-existing untracked file
- Product/release boundary: this planning update is not editorial, commercial or route-migration approval. Any future release still follows repository gates and the user's applicable deployment/online-verification authorization.

### Goal

Compare the 90-day rebuild plan against current source and close the source-verifiable P0 technical gaps in small reviewable phases. Keep the accepted Next.js static-export and Cloudflare Pages architecture. Carry source-dependent content, old-URL decisions, operator/legal details, GSC measurements and monetization into separately gated work.

### Verified baseline and principal differences

- The project already has shared UI, route metadata, canonical generation, robots, indexability-driven sitemap, a tested 404, structured JSON content, review/digest/dependency gates, freshness and safe-link scripts, build/artifact checks and static Pages deployment.
- At the initial audit, the content model contained 12 tools, 11 comparisons, 6 alternatives, 4 pricing records, 3 Best pages and 2 guides (38 drafts). Those counts have since changed; see the latest TASK-006 progress below for current totals. All ten comparison topics named in the plan had a draft, plus one existing comparison outside its named set; Cursor vs Windsurf retained a reversed slug. The alternative target set and Bolt mapping remain unresolved.
- `/stacks/` remains noindex scaffolding. The initial audit had no `/mcp/` or `/self-hosted/` routes; the current source adds both as noindex source-evidence overview hubs, while vendor subroutes and deep directories remain deferred. The self-hosted hub now separates n8n application hosting, Continue's self-hosted model endpoint, Claude Code's self-hosted cloud-session runner, and Aider/Continue local inference. Current policy/disclosure paths are `/editorial-policy/` and `/disclosure/`; do not change these paths without a route mapping and reason.
- Source now derives comparison rows from the union of cited profile facts; values not present on a profile remain explicitly unknown. Registered non-home routes have visible breadcrumbs and matching route-only `BreadcrumbList` JSON-LD. Shared metadata now adds a first-party generic 1200x630 PNG to Open Graph and Twitter large-image cards; route-specific vendor artwork remains gated on permission.
- At the initial audit, `docs/url-audit.csv` covered 96 source-registered routes. It later covered 97 routes and now covers 99 after the MCP/self-hosted hubs; every version explicitly leaves actual HTTP, GSC indexing, backlinks and absent historical URL coverage unverified. The 2026-09-27 archive recheck (see `docs/research/archive-recheck-2026-09-27.json`) recovered no legacy URL: Wayback CDX returned an empty array, two Common Crawl indexes reported no captures, most older probes failed, and repository source history begins with the ToolPilot app. The 2026-09-28 supplemental archive/search check (see `docs/research/archive-search-2026-09-28.md`) and 2026-09-29 Arquivo.pt probes recovered no exact non-root URL. Arquivo.pt returned zero estimated `versionHistory` records for the apex/`www` hosts and four root URL variants, plus an empty apex-domain CDX result; a broad brand search was ambiguous and incomplete. Empty results and service failures do not establish absence. The exact legacy URL inventory remains blocked by TODO-306.
- No GA4, AdSense, active affiliate relationship, user accounts, database or CMS exists. This is an intentional gate until approved privacy, operator and commercial inputs exist.

### Progress recorded 2026-09-27

- [x] Phase 0 source audit and baseline capture at `a419cab0891802f786c61dd4343fe5aeda75c6c7`; user-supplied plan preserved untouched.
- [x] Phase 1 current-source URL inventory delivered with the requested columns and explicit unknowns; historical route collection and migration remain blocked.
- [x] Phase 3 first implementation slice: comparison fact union, visible breadcrumb/route JSON-LD, Twitter card metadata and generated-artifact checks.
- [x] Initial implementation commit `800a817` passed CI and deployed as `12e9bb9d-b905-47e1-9e98-716988f2bb2f`; preview and production current smoke passed. Comparison-template screenshots were inspected at 375x812 and 1440x1000.
- [x] Follow-up `b7e9b0d` final mobile breadcrumb wrapping refinement; fresh build, preview/production smoke and 375x812/1440x1000 screenshots passed.
- [x] Phase 4 source-backed P1 draft tranche: Aider, Continue, n8n and Make profiles; five missing plan comparisons; and `open-source-ai-coding-tools`. All remain `in-review`; Continue's read-only upstream status and dynamic/unknown billing fields are explicit review gaps.
- [x] Regenerated the route inventory to 96 source-registered URLs and added a regression check that the ten additions remain noindex with current dependency digests.
- [x] Phase 3 follow-up: source citations appear on known comparison values; contextual internal links are limited to directly related decisions, capped at five and covered by tests. Local build/smoke, release check, GitHub CI, Cloudflare deployment, preview smoke and production smoke all pass on commit `98d0be0`.
- [x] Close TODO-305: move GitHub Actions to Node 24-capable action releases and pin the workflows to `ubuntu-24.04`; retain Node 22 for the application. CI, maintenance artifact upload, production smoke, Pages deployment and preview/production current smoke all passed on `344bd9f`.
- [x] P0.4 typography audit: replace viewport-scaled h1/h2 sizes with fixed desktop/tablet/mobile breakpoints and set all nonzero letter spacing to zero. Playwright screenshots at 375x812, 768x1024 and 1440x1000 showed no heading or horizontal overflow.
- [x] P0.4 light/dark theme support: add system-preference defaults, an accessible user-controlled theme selector with local persistence, and semantic color tokens for all page surfaces. Keep static export, content/indexing behavior and route data unchanged. Chromium checked eight page types across 375/768/1440px and both themes (48 checks), with no route failures, browser errors or horizontal overflow. System preference, manual overrides, persistence after reload, keyboard operation and core text/control contrast (minimum 4.93:1 light, 7.30:1 dark) passed. Commit `97d864c` passed CI run `36323122950` and Pages deployment `d4fc47b9-a0fc-424d-a80f-c2365f98cfe3`; preview and production current smoke both passed.
- [x] Close the code-verifiable OG gap with a first-party 1200x630 share card: keep an editable SVG source, rasterize a checked-in PNG, apply it to route Open Graph and Twitter large-image metadata, and assert the static artifact exists and is referenced. The card uses generic ToolPilot copy and no vendor marks or unsupported product claims; unique comparison artwork still requires permission. Commit `4aea803` passed clean-worktree release readiness, CI run `36324864383`, the Cloudflare Pages check, and preview/production smoke (97 pages each).
- [x] Reduce TODO-309 pricing unknowns with a dated official-source tranche: record Make Core's displayed $9/month for 10,000 credits on annual billing and Replit Core's $18/month equivalent billed annually, preserve tax/selector and total-cost caveats, refresh all dependency-backed revisions/digests and both TASK-005/TASK-006 review manifests, and keep every record in-review/noindex. Content validation, both exact-version manifest tests, 57 tests, lint/typecheck, static export/artifact checks and 97-page local smoke passed; release evidence is recorded in TASK.md.
- [x] Update TODO-309 with both official pricing cadences for Make and Replit. Make Core at 10,000 credits is USD 12/month monthly or USD 9/month equivalent annually; Replit Core is USD 20/month monthly or USD 18/month equivalent annually. Refreshed nine dependent decision revisions/digests, both review manifests and the Replit pack; added a source/date/state regression test; kept all drafts noindex and in-review. Node 22 lint, typecheck, 75 tests, 39-record content validation, 99-page artifact checks, exact manifest review, zero-high dependency audit and local 99-page smoke passed. Release evidence and remaining limits are in TASK.md.
- [x] Reduce TODO-309's Make data-handling unknowns from the official pricing table: record AWS (EU/North America) infrastructure locations, 30-day Core execution-log storage and 5 GB transfer per 10,000 monthly credits, while stating that customer region selection, account-level data residency, broader retention/deletion and privacy remain unverified. Refresh Make-dependent decision revisions/digests and TASK-006 manifest; add source/date/state regression coverage; keep all records in-review/noindex. Release verification is recorded in TASK.md.
- [x] Reduce TODO-309's Replit geography/privacy unknowns from current official documentation: distinguish selectable published-app geography (Core/Pro/Enterprise, Free defaults to North America) from separate Pro-only workspace geography; record permanent publish-region choice, pre-existing-resource caveat and policy cross-border hosting statement without claiming account-level residency or legal compliance. Refresh seven dependent revisions/digests, both review manifests and the Replit evidence pack; add source URL/date/state regression coverage; keep every record in-review/noindex. Release verification is recorded in TASK.md.
- [x] Reduce TODO-309's Aider privacy unknown from official analytics and privacy documentation: record opt-in product analytics, event categories, random identifier, the documented excluded fields and session/permanent opt-out controls, while keeping provider data terms and local settings unresolved. Refresh two dependent revisions/digests and the exact TASK-006 manifest; add source/date/scope/state regression coverage; keep all records in-review/noindex. Release verification is recorded in TASK.md.
- [x] Reduce TODO-309's Aider deployment unknown from official Docker and model documentation: record its containerized client images and repository mount while distinguishing this from local inference or provider-independent handling. Refresh two dependent revisions/digests and the exact TASK-006 manifest; add source/date/scope/state regression coverage; keep all records in-review/noindex. Release verification is recorded in TASK.md.
- [x] Reduce TODO-309's n8n self-hosted privacy/security unknowns from current official sources: record Usage Data categories and future-effect opt-out from the Privacy Policy, plus operator-owned TLS and at-rest encryption from n8n Security. Refresh n8n-dependent decision revisions/digests and the exact TASK-006 manifest; add source/scope/pending-state regression coverage and expose security responsibilities on the noindex self-hosted hub. Keep account settings, connected-service data handling and deployment configuration open.
- [x] Reduce TODO-309's public n8n license ambiguity from the current repository license and official use-case guidance: record the Sustainable Use License boundary and the vendor's Enterprise/Embed examples for client workflow hosting and embedding, while preserving exact use-case, agreement and entitlement review as open. Update the n8n profile and its two dependent decision drafts, source/date/scope tests and TASK-006 manifest; keep all records in-review/noindex. Local Node 22 build passed lint, typecheck, 84 tests, 99-page artifact checks, 0-high audit and smoke; release evidence is recorded in TASK.md.
- [x] Reduce TODO-309's GitHub Copilot privacy-policy unknown from official current docs: record the training-use distinction between individual plans (with opt-out) and Business/Enterprise, without inferring account settings, model retention or legal suitability. Refresh six dependent revisions/digests, both exact review manifests and the evidence pack; add URL/date/scope/state regression coverage; keep all records in-review/noindex. Release verification is recorded in TASK.md.
- [x] Reduce TODO-309's Continue distribution/lifecycle ambiguity from current first-party sources: reconcile the acquisition announcement and code-availability statement with the upstream read-only/final-release notice and the JetBrains Marketplace's community-maintained/plugin and CLI guidance. Refresh the Continue profile and its two decision dependents plus their exact TASK-006 manifest (TASK-005 does not contain these records); add channel/source/state regression coverage; retain unknown account pricing, installed version, security response and support commitment; keep drafts in-review/noindex. Release verification is recorded in TASK.md.
- [x] Narrow the Continue lifecycle conflict with package-specific release evidence: the GitHub Releases page lists v2.1.0-vscode as a pre-release dated 2026-06-19, while the official npm registry lists @continuedev/cli 1.5.47 published 2026-06-18; JetBrains still describes CLI development as active and the README still says the repo is read-only/final. Refresh the Continue record, its two dependent records, exact review manifest, regression and rendered-artifact checks; keep current support, security response, package selection and owner review open. Local and release verification are recorded in TASK.md.
- [x] Narrow Continue's billing unknown from its official Terms: document credit purchases or subscriptions and account/Service Order pricing scope, while leaving the numeric account quote and separate model-provider charges unknown. Refresh the profile, two dependent decision drafts, their exact TASK-006 digests and manifest, evidence handoff, regression and rendered-artifact checks; keep all three in-review/noindex. Node 22 build passed lint, typecheck, 88 tests, 39-record content validation and 99-page artifact checks; audit found 0 vulnerabilities, exact review passed, freshness remains 28 unverified / 0 overdue, the link scan completed with the Terms URL HTTP 200, local smoke passed 99 pages, and `git diff --check` passed. Exact account/provider amount and Owner review remain open; evidence is in TASK.md.
- [x] Complete a current official-documentation review of the remaining Lovable, Make, Replit and Windsurf `localModels` fields. Record only bounded facts about what their first-party docs establish and explicitly retain unknown inference support where the docs do not answer it; refresh the 19 declared dependency edges across 14 unique decision records, exact TASK-005/TASK-006 manifests as applicable, evidence handoffs, regression/artifact checks, and freshness snapshot. Preserve `in-review`/noindex, do not infer product incapability from documentation gaps, and do not inspect accounts or test models. Continue's numeric account/model usage price remains an account/Service Order question.
- Acceptance — 2026-09-29: `npm run content:check`, `npm run content:review`, 102/102 tests, Node 22 lint/typecheck/Cloudflare build and artifact checks (99 pages / 4 indexable URLs), date-pinned freshness (1 unknown / 0 overdue), 225-target source scan and local current smoke passed. The exact manifests cover 39 records, and both evidence handoff inventories match their manifest revisions; all changed drafts remain in-review/noindex/outside the sitemap. The scan reports 191 HTTP-ok, 20 restricted, 11 blocked by policy and 3 temporary errors, no 404/410; new source URLs returned 200. No account, model, endpoint, Owner approval, release or deployment was inspected or claimed.
- [x] Reduce Continue's source-verifiable local/offline and privacy gaps: record local Ollama models and the documented offline VS Code setup, capture the dated Privacy Notice's log/analytics categories, opt-out wording and processor-role exclusion, and preserve post-acquisition applicability, actual client settings, provider terms and data flow as open gates. Refresh the profile, two dependencies, regression coverage and exact TASK-006 review manifest; all remain in-review/noindex. Validation and release evidence is recorded in TASK.md.
- [x] Reduce TODO-309's Bolt privacy unknown from the current StackBlitz policy: record prospective training and dataset-licensing scope, the no-earlier-than-2026-10-07/account-Terms timing, the 2026-09-14 Forge consent exception and account exclusions without asserting any account's present eligibility. Refresh all six dependency revisions/digests, TASK-005/TASK-006 manifests and the Bolt evidence pack; add regression coverage and preserve in-review/noindex. Node 22 quality checks, audit, 164-target link scan, local smoke, clean release check, CI, Pages deployment, preview/production smoke and residual account unknowns are recorded in TASK.md.
- [x] Reduce TODO-309's Lovable model-training ambiguity using the current Privacy Policy, Terms, Business/Enterprise DPA and Security page: preserve the policy effective dates, prospective opt-out, stated exclusions and different Customer Content/Customer Personal Data/Service Data scopes. Refresh seven decision dependencies and TASK-005 exact review handoff, add scope/state regression coverage, and leave account plan, agreement, setting, region and data mapping open; all drafts remain in-review/noindex. Validation and release evidence are recorded in TASK.md.
- [x] Clarify Lovable Cloud region claims against broader Personal Data processing: record the EU/US/Asia Pacific Lovable Cloud options and default no-cross-region statement separately from the Privacy Policy's multi-country processing claim. Add region FAQs to six relevant decision drafts, refresh all seven dependency digests and the TASK-005 exact handoff; keep account selection, subprocessors and connected/model-provider geography open and every draft in-review/noindex. Validation and release evidence are recorded in TASK.md.
- [ ] Reconcile the alternatives inventory before adding pages: the rebuild plan names Cursor, Claude Code, Lovable, Bolt and n8n; the six current drafts are Cursor, Claude Code, Lovable, Bolt.new, Replit and Windsurf. `/alternatives/n8n/` is missing and two routes are off-plan. The active tranche explicitly defers adding alternative records until the Owner resolves `/alternatives/bolt/` versus `/alternatives/bolt-new/`; keep all current drafts noindex and await the approved target list.
- [x] Implement the source-supported homepage IA: category shortcuts to stable `/tools/` anchors, three plan-listed comparisons labeled by their current review state, pricing links with content-update dates, and a recently-verified section that only includes published tool profiles with `verifiedAt` (currently an honest empty state). Regression and static-artifact checks enforce the links, dates and statuses; no route, sitemap, approval or popularity claim changed.
- [ ] Finish the remaining homepage requirements that depend on external evidence: a popularity signal needs an approved privacy/data basis and real usage evidence; verified profiles need exact Owner approval and verification dates. MCP/self-hosted modules remain under TODO-310.
- [ ] Remaining work: Phase 1 historical evidence, Phase 2 route-priority decision, P1 alternative/slug reconciliation and exact Owner review, plus external operating gates. Tool-profile evidence blocks, authored internal links and all 26 dependency-backed decision evidence contracts are complete.

#### Homepage information architecture tranche

- Add source-backed homepage entry points for AI Coding, AI App Builders and Automation & Agents, linked to stable anchors in the existing `/tools/` route.
- Show selected plan-listed comparisons as comparison research, not as "popular"; show pricing records with their content `updatedAt` and current review state; render recently verified profiles only when a tool record is published and has `verifiedAt`, otherwise use a truthful empty state.
- Keep MCP/self-hosted modules deferred under TODO-310 and keep all pending records noindex/out of the sitemap. Do not add analytics or infer popularity from research snapshots.
- Acceptance: focused tests cover category-anchor consistency, exact existing comparison records, pricing update dates and verification eligibility; Node 22 quality/build/artifact checks, dependency audit, local current smoke and authorized release checks pass. Record external preview/production smoke separately from local verification.
- Acceptance passed: 62 tests, Node 22 Cloudflare build (97 pages / 4 indexable URLs), 0 audit findings, 97-page local smoke, and 375/768/1440px Chromium checks including anchor activation. Commit `c6031b9e8f99a35bc1d8c48738b8671133d90c77` passed clean-worktree release readiness and CI `36333519641`; Pages deployment/check `2084b5da-14dc-4863-9049-edaa4a46ec0a`, preview and production smoke, and HTML/indexability assertions passed.

#### Trust-page route mapping tranche

- Preserve `/editorial-policy/` and `/disclosure/` as their canonical paths; align their visible names and metadata with the rebuild plan's Methodology and Affiliate Disclosure concepts instead of creating duplicate routes.
- Methodology copy must accurately cover source-based price/feature checks, documented hands-on testing only, conditional selection/ranking rules, and the absence of a fixed update cadence or active benchmarks.
- Affiliate Disclosure must state the current no-active-commercial-links state and clearly distinguish ordinary links, Affiliate, Featured and Sponsor relationships and their visible labels.
- Acceptance: source text, navigation/footer labels, route metadata, URL inventory and generated artifacts agree; route count and indexable sitemap membership do not increase. Run Node 22 checks, audit, smoke, release readiness, CI, Pages and preview/production smoke.
- Acceptance passed: both existing routes retain their canonical paths; shared trust links, metadata and generated URL audit use the plan labels. Artifact assertions cover review thresholds, methodology sections and the current inactive commercial state; route inventory remains 97 paths and the sitemap remains at 4 URLs. The Node 22 build passed 63 tests and artifact checks; dependency audit found 0 vulnerabilities; local, preview and production current smoke passed. Commit `d31a482927cf053f2d1c6bec1477d25ff819cdd0` passed release readiness and CI `36335164250`; Pages deployment `da97617f-e4b4-4487-beb4-708cba57d3d1` passed preview and production smoke plus HTML assertions. No testing performance, fixed update schedule, universal rank or live partnership is claimed.

### Execution phases

#### Phase 0 — Preserve the baseline and audit source

- Keep the supplied plan file untouched and untracked status visible in the task record.
- Record HEAD, branch, status, relevant recent commits, current source routes, content counts, tests, metadata/index rules and deployment configuration.
- Confirm that active product source/build routes contain no Crypto/DeFi content; retain historical research artifacts without treating them as public pages.
- Do not make a tag or release artifact overwrite user work. A reviewed immutable baseline can be selected before implementation.

#### Phase 1 — URL inventory and migration evidence

- Build the requested URL audit from current route definitions and every recoverable legacy URL source in the repository.
- Current-source portion is implemented by `npm run urls:audit`; the output is not a historical census.
- Supplemental archive checks are tracked in `docs/research/archive-recheck-2026-09-27.json` and `docs/research/archive-search-2026-09-28.md`: Wayback queries returned empty, timed out or returned a gateway error; Common Crawl's current catalog lists `CC-MAIN-2026-39`, whose apex-domain query returned `No Captures found`; the 2018–2025 annual sample mostly returned 503, with one timeout. URLScan returned one public scan of the root path dated 2026-07-10 with former CryptoClarity branding. Its screenshot reveals old tool/resource labels, but no `href` paths could be recovered; URLScan's official notice requires authentication for result and DOM APIs from 2026-05-04. A 2026-09-29 recheck returned the same one scan, screenshot 200 and result API 403. Four targeted former-brand/title searches returned no results. The Git repository's first source commit contains only the ToolPilot app. Keep historical non-root URLs, GSC indexing and backlinks unknown; this does not satisfy TODO-306.
- Use the plan's fields: `url`, `status`, `title`, `page_type`, `indexed`, `has_backlink`, `action`, `redirect_target`, `notes`.
- Represent unavailable external facts explicitly as `unknown`; do not convert absence of evidence into `false`.
- Do not ship bulk deletion, homepage redirects, 301s or 410s. Each action needs the exact old URL, evidence, semantically justified destination or 410 reason, and automated smoke coverage.
- Stop migration decisions that require Search Console, backlink tools, old sitemap or Cloudflare logs until TODO-306 input exists.

#### Phase 2 — Reconcile information architecture and route names

- Preserve all current routes by default and map proposed paths to existing ones: `/editorial-policy/` versus `/methodology/`, `/disclosure/` versus `/affiliate-disclosure/`, and current `/stacks/` status.
- Resolve the apparent priority conflict by treating `/mcp/` and `/self-hosted/` as the P0 overview routes named in §49, with the deeper directories and filters in §43/§44/§51 remaining P2. The overview routes now render a bounded set of cited draft facts and remain noindex; exact scope and maintenance ownership still await TODO-310.
- Never create an empty directory page solely to satisfy a route checklist. `/stacks/` remains noindex until it has approved independent decision content.
- Keep Next.js 16 static export, JSON content and Cloudflare Pages. No Astro, server, database or CMS migration absent a new accepted ADR.

#### Phase 3 — Complete supported templates and technical SEO

- Extend comparison dimensions only when source/tool data supports them; display unknown, unsupported and unverified states separately. Current implementation renders dimensions recorded in either cited tool profile and marks the missing side unknown.
- Comparison cells now link directly to the source for a known value; source-free values remain explicitly unknown.
- Add visible breadcrumbs plus valid `BreadcrumbList` data where hierarchy is real. Done for registered routes with source route labels only. Use `SoftwareApplication`/`Article` structured data only for matching, verified page content; omit unsupported claims and fake ratings.
- Evaluate explicit pros/cons, use cases, FAQs and related-decision sections as content contracts rather than adding generic filler.
- A generic first-party share card now backs route Open Graph and Twitter large-image metadata. Add vendor-specific comparison artwork only after permission is documented. Keep canonical, robots, sitemap, noindex, 404 and build artifact checks as hard regression gates.
- Contextual internal links now use page-type-specific dependency overlap and a five-link cap; combinations without a related decision receive no generated related section. Continue checking each page's authored links and avoid combinatorial comparisons or index parameter filters; any query-driven filter must have noindex tests.
- Preserve `/tools/`, decision-page and current legal/trust URLs. Any alias/redirect requires a compatibility review and exact mapping test.

#### Phase 4 — Prepare the P1 content batch

- At the start of this phase, the draft batch had 12 tools, 11 comparisons, 6 alternatives, 4 pricing and 3 Best pages, plus two guides. Current counts are recorded in the TASK-006 progress summary above. All drafts remain in review.
- The first draft tranche now adds Aider, Continue, n8n and Make profiles and the five missing plan comparisons: Make vs n8n, Claude Code vs GitHub Copilot, Cline vs Continue, Aider vs Claude Code and Bolt vs Replit. It also adds the plan-listed open-source coding Best page, with license scope and maintenance caveats. Exact owner review remains required.
- Reconcile `/alternatives/bolt-new/` versus `/alternatives/bolt/`; do not rename a URL until Phase 1 evidence and the owner-approved mapping are available. Existing extra alternatives may remain drafts; do not delete just to reach the plan count.
- Each new/changed record must include attributable factual sources and clear gaps. It stays `in-review`, noindex and outside the sitemap until owner approval of its exact revision/digest.
- Resolve dependency updates and review all downstream comparisons if a tool fact changes.

##### Active source-backed draft tranche — 2026-09-27

- Draft the four named tool profiles (Aider, Continue, n8n, Make), five missing plan comparisons (Make vs n8n, Claude Code vs GitHub Copilot, Cline vs Continue, Aider vs Claude Code, Bolt vs Replit), and one plan-listed Best page only where official evidence supports a substantive decision page.
- Use official product/docs/pricing/repository sources only for product facts. Record access dates. Keep uncertain price, license scope, availability and product support explicitly unknown; do not claim hands-on testing.
- Continue's upstream repository currently says it is read-only and no longer actively maintained. Capture this as a review gap and make any open-source shortlist conditional; verify package/distribution maintenance before publication.
- Preserve the existing `/alternatives/bolt-new/` route. This tranche adds no alternative record until an approved route map resolves `/alternatives/bolt/`.
- After content edits, regenerate dependency digests and the review handoff manifest, then verify all drafts remain noindex and absent from sitemap. The tranche manifest is recorded in `docs/content-review/TASK-006-review-manifest.json`; owner review of exact revision/digest remains required before any indexing.

##### Active MCP capability evidence tranche — 2026-09-27

- Add source-backed MCP facts only to the five profiles whose official docs explicitly describe the capability: Cursor, Claude Code, GitHub Copilot, Cline and Continue. Preserve Copilot's organization-policy/plan nuance and Continue's separate upstream-maintenance warning; leave other products unknown rather than inferring non-support.
- Increment each edited tool revision, update all 18 dependent decision records to the new tool digests/revisions, increment those decision revisions, and append a dated change entry. Keep every record in-review, noindex and outside the sitemap.
- Add `docs.cursor.com` to the exact outbound-host allowlist only after reviewing the source URL; existing official hosts remain exact entries.
- Refresh the TASK-006 review manifest and handoff instructions for changed P1 records; inspect whether TASK-005 review notes refer to any changed exact revisions.
- Acceptance: content validator and tests confirm source/date attribution, current dependency digests and pending review state; build/artifacts confirm 96 routes and unchanged indexable URL count; link checks may classify network restrictions without treating them as source failures. Run Node 22 quality, audit, local smoke, clean release check, CI, Pages deployment and preview/production smoke.
- Acceptance completed: five official source URLs are recorded and rendered, 18 dependent decision records validate against current digests, 48 tests pass, static artifacts contain 96 routes and 4 indexable URLs, audit reports zero vulnerabilities, and local current-profile smoke passes. Commit `4363baa9821a547641d88a62c461ad2e1e746773` passed release readiness and GitHub CI run `36310506062`; Pages deployment `bd8c8795-7ff5-4540-8c5a-559a693fb380` and preview/production current smoke passed for all 96 pages.
- Source URL maintenance: Cursor's old `docs.cursor.com/context/model-context-protocol` URL now redirects to a generic docs root. The profile and review pack use `https://cursor.com/docs/mcp`, verified as HTTP 200; the obsolete hostname is removed from the exact-host allowlist.

##### Active source-backed page-contract tranche — 2026-09-27

- Correct Cursor's MCP citation to the current canonical `https://cursor.com/docs/mcp`; remove the obsolete `docs.cursor.com` allowlist entry only after confirming no remaining source uses it.
- Add optional structured `pros`, `cons` and `faqs` evidence collections without invalidating existing records. Each claim must carry one or more `{ toolSlug, sourceId }` references resolvable to the record itself or one of its tool dependencies.
- Add source-derived MCP strengths, limitations and one or more decision-relevant FAQs to the five profiles with official MCP evidence. Label the output as documented information awaiting editorial review; do not infer quality, security or hands-on results.
- Render the evidence blocks and citations on the existing detail template. Add artifact checks that prove the claim and exact source URL reach generated HTML; add validator regression cases for missing/stale dependency and source references.
- Increment the five tool revisions and all dependent decision revisions, recompute content digests, refresh TASK-005/TASK-006 handoffs and manifest. Preserve `in-review`, noindex, and the 4-URL sitemap.
- Acceptance criteria: Node 22 Cloudflare build, generated artifact checks, external link check, dependency audit and local current smoke pass; all modified records have current digests and remain non-indexable. Commit, push, CI, Pages preview/production smoke follow the previously authorized per-deliverable release workflow.
- Acceptance completed: Node 22 build passed lint, typecheck, 52 tests, content validation and artifact checks (96 pages / 4 indexable URLs); dependency audit found 0 vulnerabilities; external link scan and local 96-page current smoke completed. Commit `eee8485fec0628a09d19aa7adc774c84a06a3183` passed clean-worktree `release:check` and GitHub CI run `36313122069`; Cloudflare deployment `3b3c9451-b893-428a-b618-e12e9c729228` passed preview and production current-profile smoke. All 38 records remain in-review/noindex.
- At the end of this historical tranche, only five tool profiles had evidence blocks. The subsequent source-contract tranche extended them to all 12; decision-page evidence remains tracked by TODO-313.

##### Source-contract and contextual-link completion tranche — 2026-09-27

- Audit every current structured draft against rebuild-plan §20/§46 internal-link rules using the actual generated HTML, counting unique local decision/tool targets and excluding breadcrumbs and trust-policy boilerplate.
- Add a small, validated authored-link contract for pages that lack three meaningful next-step destinations; targets must be existing local routes, and generated-artifact checks must enforce the minimum on all structured content pages.
- Add source-cited strengths, constraints and decision-relevant FAQs to the remaining first-batch tool profiles only where current official sources support the wording. Refresh every dependent revision/digest and exact review handoff; preserve `in-review`, noindex and sitemap state.
- The current Windsurf profile's official-documentation destination is a Devin Desktop page. Verify whether a current Windsurf-specific primary source exists; keep identity and availability unresolved if it does not, and do not turn an old redirect into product evaluation.
- Completed scope: all 12 tool profiles expose source-bound strengths, constraints and FAQs; manual links are validated and deduplicated; generated HTML enforces three unique content destinations for all structured pages; all 39 content records remain `in-review` and noindex. This does not close TODO-313: decision-page Pros/Cons/FAQ evidence is still an independent gap.
- Local acceptance: `npm run content:check`, 55 tests, `npm run cloudflare:build` (97 pages / 4 indexable URLs), `npm audit --audit-level=high` (0 vulnerabilities), freshness review and local current smoke passed. External link scan completed with restricted hosts and temporary network failures recorded as reachability limits.
- Release acceptance: commit `4c4af35d1750d166afe75aae838f1593cd7e810e` passed clean-worktree `npm run release:check`; GitHub CI run `36316430513` and the Cloudflare Pages check succeeded. Deployment `47c45f5c-3f47-4183-b85a-2267f16d148f`; preview `https://47c45f5c.toolpilot-git.pages.dev` and `https://toolpilot.cc` each passed current-profile smoke for 97 pages, robots, sitemap and a real 404.

##### Decision-page evidence coverage tranche — 2026-09-27

- Add source-bound Pros, Cons and decision-relevant FAQs to the seven TASK-006 decision pages: five planned comparisons, the open-source AI coding shortlist and workflow-automation guide.
- Use only source IDs from each page's declared tool dependencies or its own sources. Phrase supported product behavior as documented evidence; leave cost, quality, privacy and product-fit conclusions unresolved where current evidence is incomplete.
- Bump each edited record revision, preserve `in-review`/noindex, refresh the TASK-006 manifest and handoff table, and add regression coverage for evidence presence, reference validity and rendered source links.
- Completed scope: the five TASK-006 comparisons, open-source Best page and workflow-automation guide now expose source-bound strengths, constraints and FAQs; revisions and review manifest match; every record remains `in-review` and noindex.
- Local acceptance: 56 tests pass; `npm run content:check`, Node 22 Cloudflare build/artifact checks (97 pages / 4 indexable URLs), `npm audit --audit-level=high` (0 vulnerabilities), `git diff --check` and local current smoke pass.
- Release acceptance: commit `1374c707d87d0ab4281ec1b6fe92dcbc707fffde` passed clean-worktree `npm run release:check`; GitHub CI run `36317440965` and Cloudflare Pages check succeeded. Deployment `0872ba3f-9f8b-4f2c-9fab-ac0c98d8e340`; preview `https://0872ba3f.toolpilot-git.pages.dev` and `https://toolpilot.cc` each passed current-profile smoke for 97 pages, robots, sitemap and a real 404.
- Exact Owner approval remains open under TODO-005/TODO-309; no product claims were added to the dependency-free general guide.

##### Remaining dependency-backed decision evidence tranche — 2026-09-27

- Cover the 19 remaining decision records that declare tool dependencies: six alternatives, six comparisons, two Best pages, one tool-selection guide, and four pricing pages. Do not add product claims to `/guides/how-to-choose-a-developer-tool/` while it has no tool dependencies; preserve the ADR-0009 rule that decision evidence cites only declared dependencies.
- Derive each Pros/Cons/FAQ statement from existing official-source records on its declared tool dependencies. Keep vendor capability claims distinct from editorial questions/checklists; do not claim comparative performance, fixed cost, privacy, portability or product continuity where the sources do not establish it.
- Increment each edited decision revision, append its dated change entry, preserve `in-review`/noindex, refresh both TASK-005 and TASK-006 exact review manifests where applicable, and expand regression coverage to the newly covered records.
- Completed scope: all 19 remaining records with declared dependencies now have cited Pros/Cons/FAQs, bringing coverage to 26/26 dependency-backed decision pages. The general selection guide remains without product-evidence blocks because it has no tool dependencies; no product dependency was invented. The official Devin Desktop FAQ now identifies Devin Desktop as Windsurf's new name and describes a standard account transition; exact account pricing and migration were not independently tested.
- Local acceptance: 57 tests pass; `npm run content:check` and `npm run content:review` pass; Node 22 Cloudflare build passes lint, typecheck, tests, static export and artifact checks (97 pages / 4 indexable URLs); `npm audit --audit-level=high` finds 0 vulnerabilities; `npm run smoke` passes for 97 pages, robots, sitemap and a real 404. `npm run links:check` reports 91 HTTP-ok, 14 restricted, 6 policy-blocked and 4 temporary network errors; reachability is not fact verification. `git diff --check` passes.
- Release acceptance: commit `953f40f` passed clean-worktree `npm run release:check`; GitHub CI run `36319265195` and the Cloudflare Pages check succeeded. Deployment `4853fdac-190c-4ba7-bc13-4809e6adf85d`; preview `https://4853fdac.toolpilot-git.pages.dev` and `https://toolpilot.cc` each passed current-profile smoke for 97 pages, robots, sitemap and a real 404.

##### P0 MCP and self-hosted overview tranche — 2026-09-27

- Interpret rebuild-plan §49's `/mcp/` and `/self-hosted/` routes as P0 overview hubs; treat §43/§44 deep cluster pages and §51 directory/filter behavior as later P2 work. Preserve this distinction explicitly because the plan uses both priority levels.
- Build useful, source-backed overviews from current tool-profile evidence: the five profiles with an explicit MCP fact, and the distinct self-hosted application/model-endpoint/local-inference paths documented for n8n, Continue and Aider. Do not label unknown products as unsupported or call a model endpoint a self-hosted product.
- Keep both routes noindex and outside the sitemap while their derivative content consists of unapproved tool records. Show review status and direct links to the cited tool/source pages; make no popularity, privacy, performance or completeness claim.
- Add the hubs to the route registry, URL audit, navigation and generated-artifact assertions. Keep `/mcp/servers/`, `/mcp/tools/`, vendor MCP directories, faceted filters, and any separate self-hosted directory deferred.
- Acceptance: tests verify route registration/noindex, fact-to-source rendering, and sitemap exclusion; Node 22 lint, typecheck, tests, content checks, static export/artifact checks, local current-profile smoke, dependency audit, link scan where reachable, and `git diff --check` pass. No Owner approval is implied; retain TODO-005/TODO-309/TODO-310 publication review gates.
- Acceptance completed: Node 22 build passed 72 tests and artifact checks for 99 pages/4 indexable URLs; the fresh 139-URL scan reported 116 HTTP-ok, 16 restricted, 6 policy-blocked, 1 temporary error and no 404/410. `npm audit --audit-level=high` found 0 vulnerabilities. Commit `1843969916c80e4239277f64556d297485abbb1b` passed `release:check`, CI `36348360212`, Pages deployment/check `5da54123-8908-4d47-80e9-5ccbd3e35824`, and preview/production current smoke. Exact evidence is in TASK.md. Owner review and maintenance responsibility remain open.

##### Make privacy and retention evidence tranche — 2026-09-28

- Inspect Make's official Privacy Notice, Privacy & GDPR and Security pages. Separate individual-related application-usage telemetry, purpose-based personal-data deletion language, general log-data retention and the Core plan's execution-log allowance; do not infer workspace-level settings or purge timing.
- Bump Make and both dependent decisions, refresh their exact dependency digests and the TASK-006 manifest, and add regression coverage for source dates, claim boundaries, rendered citations and pending/noindex state.
- Local acceptance completed: `npm run cloudflare:build` passed lint, typecheck, 81 tests, content validation and artifact checks (99 pages / 4 indexable URLs); dependency audit found 0 vulnerabilities; freshness reports 34 unverified fields and 0 overdue. Link scan checked 152 URLs (123 HTTP-ok, 19 restricted, 6 blocked, 4 temporary errors); all six Make URLs were 403-restricted to automated requests, with official pages inspected separately. Local current smoke and direct three-route source/noindex/sitemap checks passed.
- Release acceptance completed: commit `2e0ad5e8e7cfdd4105776c23ea0fe06c0bced84f` passed clean detached `release:check`, CI `36361527104` and Pages deployment/check `635f6b39-5f0d-4a23-a149-6f9069d8a852`. Immutable preview and production each passed 99-page current smoke; direct HTML checks confirmed official sources, facts, noindex and sitemap exclusion. TASK.md records the documentation evidence sync, its release verification, and rollback procedure.
- Exact Owner review, workspace and connected-provider data scope, configured logs, deletion response/timing and applicable DPA/legal review remain open. Preserve all affected records as in-review/noindex.

##### Cline privacy and telemetry policy reconciliation — 2026-09-28

- Compare Cline's current Privacy Notice and Terms with the existing dated telemetry blog before changing any product claim. Record the explicit source dates and the public-source conflict; do not infer behavior from an uninspected extension build or account setting.
- Add the privacy/telemetry sources and scoped fact to the Cline profile, distinguishing BYOK routing from Cline-provided API-key routing and product telemetry from model-provider processing. Preserve the unresolved actual configuration, provider terms, retention/training and legal assessment.
- Update only Cline-dependent decision evidence that is made materially more useful by the source, and refresh the exact dependency revisions/digests for every declared dependent record. Refresh TASK-005 and TASK-006 manifests, Cline evidence pack and handoff text without recording Owner approval.
- Add regression coverage for the later-dated Terms default-on statement, the older blog's opt-in statement, the BYOK/provider boundary, official URLs/dates, dependency integrity, rendered citations and noindex/sitemap exclusion. Keep all affected records in-review and noindex.
- Acceptance: Node 22 `npm run cloudflare:build`, fresh dependency audit, content review/freshness and source-link scan, local current-profile smoke plus generated-HTML assertions, clean release check, CI, Pages preview and production current-profile smoke. Record that source policy does not prove the deployed client behavior or account configuration.
- Rollback: revert only the reviewed Cline content, dependent records, test, handoff and manifest changes, restore matching prior digests, let Pages rebuild through the existing authorized release workflow, then repeat content/artifact/current-profile smoke checks.
- Local acceptance completed: Cloudflare build passed 82 tests and artifact checks (99 pages / 4 indexable URLs); audit found 0 vulnerabilities; freshness reports 33 unverified/0 overdue; all three new Cline source URLs returned HTTP 200 within a 155-URL scan; local current smoke and rendered-source/noindex/sitemap assertions passed.
- Release acceptance completed: content commit `31192fc916d03d54af6f6e83ec02066e3b0685cd` passed clean detached `release:check`, CI `36364116609` and Cloudflare Pages check/deployment `7d9d83ea-cc61-40c1-b105-15660fcf61ff`. Immutable preview and production each passed 99-page current smoke; direct HTML checks confirmed sources, policy conflict, pending/noindex state and sitemap exclusion. Exact URLs and evidence are in TASK.md.

##### Windsurf public pricing and transition evidence — 2026-09-28

- Recheck Devin's current official desktop FAQ and plan page. Capture only the displayed public plan prices and the explicit statement that the standard update preserves existing plan/pricing, including legacy Windsurf Enterprise; do not infer a particular account's quote or test a migration.
- Update the Windsurf profile price rows and transition wording, then revise only its three declared decision dependents (`alternatives/cursor`, `alternatives/windsurf`, and `compare/windsurf-vs-cursor`). Keep model usage variability, region/tax, exact legacy entitlement and account-specific migration as open questions.
- Refresh the exact TASK-005 manifest and Windsurf evidence pack. Add source/date/amount/dependency/pending-review regression assertions; keep all affected records `in-review` and noindex.
- Acceptance: content validation/review, freshness and source link scan, focused content tests, Node 22 build/audit and local smoke, clean release check, CI, Pages preview and production current-profile smoke. Add direct HTML checks for cited plan values and noindex/sitemap boundaries.
- Rollback: revert only this dated content/dependency/manifest/test/evidence tranche and restore the matching prior revisions/digests; rebuild Pages and repeat content/artifact/current-profile smoke. Do not remove user review states or alter existing routes.
- Local acceptance completed: `npm run cloudflare:build` passed lint, typecheck, 83 tests, content validation and artifact checks (99 pages / 4 indexable URLs); `npm audit --audit-level=high` found 0 vulnerabilities; freshness reports 32 unverified and 0 overdue fields. `npm run content:review` matched the exact manifests. The 155-URL link scan found 125 HTTP-ok, 19 restricted, 6 blocked and 5 temporary errors; both Devin sources returned HTTP 200. Local current-profile smoke and direct price/source/noindex/sitemap checks passed.
- Release acceptance completed: content commit `f342d4dea0f43b9070b40088682541c40850abeb` passed clean detached `release:check`, CI `36366410490` and Pages deployment/check `3a77a0ed-68e7-4d16-99a1-96dd51cf0b4b`. Preview and production each passed 99-page current smoke; direct HTML checks confirmed plan prices, source links, noindex and sitemap exclusion. Exact URLs and evidence are in TASK.md.

##### Continue billing terms evidence — 2026-09-28

- Inspect Continue's current official Terms and CLI quickstart. Record only the documented payment routes (model-use credits or recurring subscription) and that the applicable pricing/payment terms are in the User Account or Service Order; do not infer a public numeric amount or provider fee.
- Add the Terms as a dated source and source-bound billing fact. Keep the price amount null and exact account/provider charges unresolved; do not mark the current price amount verified merely because the billing mechanism is documented.
- Refresh both declared Continue dependents (`compare/cline-vs-continue`, `best/open-source-ai-coding-tools`) with a scoped billing FAQ, current dependency revision/digest, review gaps and change history. Correct the TASK-006 README revision drift against the exact manifest.
- Add regression checks for the payment-route wording, source/date, unknown exact amount, exact dependent digests, rendered source links and pending/noindex state; refresh the TASK-006 review manifest and handoff.
- Acceptance: `npm run content:check`, exact `npm run content:review`, freshness, focused tests, Node 22 Cloudflare build/artifact checks, dependency audit, local current-profile smoke and `git diff --check` pass. All affected records remain in-review, noindex and outside the sitemap.
- Rollback: revert only this dated source/profile/dependent/test/handoff tranche and restore the matching prior revisions/digests; rebuild and repeat content, artifact and current-profile smoke checks. No route or indexability change is allowed.

##### Make scenario portability evidence tranche — 2026-09-28

- Review Make's official scenario-blueprint and AES documentation. Scope portability to one scenario's JSON blueprint: modules, settings and mapped values are included; the importing account must create its own connections; imports are limited to files under 2 MB. Record Make's warning that a simple-mode AES key is exposed when sharing a scenario or downloading its blueprint. Keep full-organization recovery, account resource coverage and actual migration unverified.
- Add the dated official sources and portability fact to the Make profile. Update the Make-vs-n8n comparison and workflow automation guide only where this evidence improves the migration decision; include source-backed recovery/security FAQs and refresh exact Make dependency digests.
- Increment all three revisions, reset no review fields beyond preserving `in-review`, regenerate the exact TASK-006 manifest and update its handoff. Add regression coverage for URLs/dates, fact boundaries, secret exposure warning, dependent citations/digests and noindex state.
- Acceptance: focused content tests; `content:check`, `content:review`, freshness, full source-link scan, Node 22 Cloudflare build/artifact checks, dependency audit, local current-profile smoke, and generated HTML assertions for source links/noindex/sitemap exclusion. Do not claim a blueprint import, cross-account migration, connection transfer or full-workspace restore was tested.
- Completed locally on 2026-09-28: Cloudflare build passed lint, typecheck, 94 tests, content validation and artifact checks (99 pages / 4 indexable URLs); exact `content:review`, dependency audit (0 vulnerabilities), date-pinned freshness (14 unknown / 0 overdue), 204-target link scan and current-profile smoke passed. All three Make sources returned HTTP 200. Generated HTML confirmed source links, noindex and sitemap exclusion on the profile and both dependents. Migration/import/account behavior remains untested.
- Release completed: commit `6a3009c812e7e24dc15a85eaa58a9ba04efa50f7` passed clean `release:check`, GitHub CI `36428147844`, Pages check/deployment `91932f6f-f3b6-43e4-a0d1-a6e6b4e350ff`, and preview/production current smoke plus rendered source/noindex/sitemap assertions. No import or migration was tested.
- Rollback: revert only the Make portability source/fact/dependent/test/handoff tranche and restore matching prior revisions/digests; rebuild and repeat content/artifact/current-profile checks. No route, owner approval or indexing state may change.

##### Replit code and recovery portability evidence tranche — 2026-09-28

- Review Replit's current official import, Git disaster-recovery, version-control and checkpoint documentation. Separate importing source/code from external recovery, distinguish Replit's internal Git/checkpoint backups from an independently exportable full app, and preserve documented setup gaps for secrets, provider data/services and production resources.
- Fill only the Replit profile's source-backed portability fact. Add direct migration/recovery guidance to the Replit alternative and the Bolt-vs-Replit comparison; refresh every declared Replit dependency, both TASK-005/TASK-006 manifests and the relevant review handoff.
- Add regression checks for source dates/URLs, fact boundary and unknown resource scope, dependent digests/revisions, review state, and generated source links/noindex/sitemap exclusion.
- Acceptance: exact `content:review`, content validation, focused tests, date-pinned freshness, full source-link scan, Node 22 Cloudflare build/artifact checks, dependency audit, local current-profile smoke and generated HTML checks pass. Local acceptance passed on 2026-09-28: 56 focused tests, 95 total build tests, 99-page export, 13 unverified / 0 overdue, 207-target scan with all four Replit documentation URLs HTTP 200, zero-high audit and 99-page smoke. Release commit `a2558df` passed clean `release:check`, CI `36432904920`, Pages check/deployment `5142c30e-8d86-476e-8e03-7c0a246b5143`, preview/production current smoke and rendered source/noindex/sitemap checks. Do not claim a project export/import, backup restore, production database restore or self-hosted deployment was tested.
- Rollback: revert only the Replit evidence/profile/dependent/handoff/test tranche and restore the matching old revisions/digests and both manifest states; rebuild and repeat content/review/artifact/current-profile checks. No route, approval or indexability state may change.

#### Phase 5 — External operating and commercial gates

- Obtain operator/contact/legal facts before final trust copy; do not invent a company, address, team or legal relationship.
- Obtain privacy/retention/consent decisions before adding GA4 or any tracking script.
- Obtain partner terms, attribution/commission, refunds, visible disclosure and ordering policy before activating Affiliate, sponsor or AdSense features. Separate affiliate conversions from paid placements.
- Use real GSC windows for weekly performance review. Treat plan impressions/clicks/indexation targets as directional targets, not guarantees; no data means unknown.
- Keep rollback exercise, GitHub notification configuration and production monitoring ownership tracked separately.

### Verification and completion gate

- Node 22: `npm run lint`, `npm run typecheck`, `npm test`, `npm run content:check`, `npm run content:freshness`, `npm run links:check`, `npm run build` (includes artifact checks), `npm run smoke`, and `npm audit --audit-level=high`; run `npm run release:check` at the release stage.
- Inspect `out/` from the same build for expected route HTML, canonical/index directives, robots, sitemap membership, internal links, missing routes and accidental legacy themes.
- Test any redirect/410 individually; test sitemap exclusion for drafts and query/filter variants; verify comparison unknowns and disclosure paths.
- Run preview and production `SMOKE_PROFILE=current` only after an authorized deployment; a successful local build or Git push is not deployment evidence.
- Record code/doc changes, routes added/retained/removed, redirects (if any), tests, owner inputs still needed, risks and rollback in TASK.md.

Initial P0 technical tranche verification (2026-09-27): `npm run cloudflare:build` passed with 42 tests and 88 generated pages; local current smoke passed for 88 pages/robots/sitemap/404; `npm audit --audit-level=high` reported 0 vulnerabilities. Follow-up CI run `36304533365` passed, Cloudflare deployment `3c4b4d7a-4b7b-47e0-a384-8d06353218c0` preview and production smoke passed, and final Playwright screenshots were inspected at 375x812 and 1440x1000. The later P1 tranche's current 44-test/96-page verification is recorded in TASK.md.

### Stop conditions and rollback

- Stop a route migration if exact old-URL evidence is missing or redirect semantics are unclear.
- Stop public content/indexing if facts, source provenance, dependencies or owner approval are incomplete.
- Stop analytics/monetization if privacy, operator, consent, partner, attribution or disclosure inputs are missing.
- Keep data and routes reversible: retain old source until the reviewed replacement and tested URL map are ready. Revert only this task's reviewed files; live recovery uses a verified Pages deployment/reviewed commit and current-profile smoke. No database migration is in scope.

### TODO-315 — Security response headers tranche

- Status: `IN_PROGRESS`, 2026-09-27. Registered-route implementation and a hash-based CSP meta for static `404.html` are deployed as `057ee368`; preview and production current smoke and 404 Chromium checks pass. The production-only Cloudflare Web Analytics beacon remains blocked by CSP and awaits Owner decision; HSTS scope is also pending. Preserve the supplied rebuild plan and static-export architecture. No Cloudflare Dashboard settings were changed.
- Pre-deployment baseline on 2026-09-27: production and current preview returned `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`; CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`, and `public/_headers` were absent.
- Fresh `out/` inspection found 100 HTML artifacts, up to four executable inline classic scripts per route, and 101 distinct executable script hashes across the site. A global hash allowlist is approximately 5.3 KB, above Cloudflare Pages' documented 2,000-character header-value limit. Strategy review selected per-route hashes for 97 registered routes plus one `/*` shared-protection rule (98/100 rules); route growth must fail the build before the Pages limit is crossed.
- Installed Next.js 16.3.6 exposes experimental SRI configuration. SRI on external chunks alone is not evidence that inline Next.js bootstrap/hydration scripts satisfy CSP; do not enable it as a shortcut.
- Milestones: (1) policy review complete using official Next.js/Cloudflare documentation and current static output; (2) TASK-007 implementation generates strict per-route SHA-256 CSP with build-enforced route, rule-count and line-length constraints; (3) local Chromium enforced CSP across all 97 routes with zero browser errors/policy violations, and theme keyboard/persistence, search/empty state, and comparison navigation passed; (4) Node 22 quality/content/build/artifact gates, high-severity audit and Wrangler Pages local smoke passed; (5) commit `f4c9798`, clean-worktree release check, CI `36339297794`, Pages deployment/check `f1c07c52-1928-41be-9d41-24e2bfc4b581`, preview and production response headers, and 97-page smoke passed; (6) commit `057ee368` adds a strict hash-based CSP meta only in `404.html`, passes CI `36342275495` and Pages deployment/check `96ad8a25-c4fa-46ff-99d7-ad9829dceab2`; preview and production 97-page smoke and 404 Chromium rendering/theme interaction pass, and the production auto-injected beacon is blocked; (7) production CSP violations remain on registered and 404 pages while the beacon is attempted, so TODO-308 Owner decision and HSTS scope still keep TASK-007 open.
- Validation: both security commits passed Node 22 quality, content/build/artifact checks, high-severity audit and current-profile smoke. The follow-up passed `npm run cloudflare:build` (70 tests, 97 pages / 4 indexable URLs), `npm audit --audit-level=high` (0 vulnerabilities), clean detached-worktree `npm run release:check`, GitHub CI, Pages deployment, preview/production 97-page smoke, response/body assertions and Chromium 404 CSP/hydration/theme checks. Production records the expected blocked-beacon CSP event; do not record zero-violation acceptance until the Owner analytics decision and a follow-up browser check.
- Rollback: revert the reviewed header policy/generator and redeploy the preceding verified Pages commit; rerun current smoke and confirm the changed header is absent. HSTS is excluded, so this tranche introduces no persistent browser HSTS state.
- Open Owner input: confirm the future HSTS `max-age` and `includeSubDomains` scope. Until that is recorded, TODO-315 stays partially open even if other response headers ship.

#### TODO-315 route-capacity follow-up — 2026-09-28

- Initial capacity evidence (2026-09-28 10:20 UTC): the source registry had 99 routes and deployed `out/_headers` had 100 blocks (99 route CSP rules plus the shared `/*` rule), exactly Cloudflare Pages' documented maximum. Production verified the then-current route CSP and shared security headers on all 99 pages; any additional route would exceed the old generator limit. The release recorded below supersedes that deployed state.
- [x] Preserve exact per-document script hashes by moving route CSP into an early CSP `<meta>` generated from each final static HTML document. Keep the shared `/*` response CSP for `object-src`, `base-uri` and `frame-ancestors`, plus shared clickjacking/MIME/referrer/permissions protections. Do not union hashes into the shared policy; CSP rules that match the same request are enforced together, and the meta policy cannot enforce `frame-ancestors`.
- [x] Update ADR-0010, the generator and artifact checks so each registered document and `404.html` has exactly one meta policy calculated from its own executable inline scripts, while `_headers` contains only the shared rule. Unit and artifact tests cover exact policy hashes, charset-safe placement, idempotent injection, fail-closed malformed HTML, no `unsafe-inline`, shared `frame-ancestors`, route coverage and 100-rule headroom.
- [x] Local validation on Node `v22.23.2`: `npm run cloudflare:build` passed lint, typecheck, 91 tests, content validation, static export and artifact checks (99 routes / 4 indexable URLs); `npm audit --audit-level=high` found 0 vulnerabilities; Wrangler Pages local smoke passed 99 routes, robots, sitemap and a real 404. Chromium visited all 99 registered pages with no page errors or unexpected CSP violations; theme persistence, search results/empty state, compare-to-detail navigation and a blocked external-script probe passed. Wrangler confirmed one parsed header rule, shared headers on registered and unknown paths, and 404 CSP/theme behavior.
- [x] Run clean release readiness, CI, Pages preview and production checks. Do not alter Dashboard analytics or HSTS state. Commit `0283dc6e8ab910ebbf8ee40d10c7d696c908478a` passed clean detached-worktree `release:check`, CI `36410996436` and Pages deployment/check `818e99bb-55a8-4923-b84c-dc4175653fa0`. Preview `https://818e99bb.toolpilot-git.pages.dev` and `https://toolpilot.cc` passed 99-page current smoke; all registered documents and 404 return their exact meta policy, and shared headers pass. Chromium interactions and 404 checks passed on both; production's auto-injected Insights beacon remains blocked with an enforced violation.
- Owner gates remain: decide whether to disable Pages Web Analytics injection or approve its privacy scope before any allowlist/zero-violation acceptance; separately confirm HSTS host/subdomain scope and `max-age`.
- Rollback: restore the preceding per-route-header generator and ADR, rebuild, and redeploy the last verified release; its current 99-route capacity remains the limit until this follow-up is reapplied.

### TODO-309 — n8n workflow portability evidence

- Goal: replace only n8n's unknown `portability` fact with the exact workflow export/import and backup boundary documented by n8n; do not equate a workflow export or CLI package with full-instance portability.
- Update the n8n profile to revision 5 with the current official workflow export/import and backup/restore sources. Preserve package Preview status, credential-name/ID and cURL-header sensitivity, omitted full-instance data and the no-migration-test boundary.
- Refresh both declared n8n dependents, `/compare/make-vs-n8n/` and `/guides/workflow-automation-selection/`, with source-bound portability FAQs, revision bumps and the current n8n digest; refresh the exact TASK-006 manifest and README handoff.
- Add tests for source URLs/dates, claim scope, remaining gaps, dependency digests and in-review/noindex state; assert the evidence and source URLs in generated HTML.
- [x] Local acceptance: content validation and exact review pass; date-pinned freshness decreases from 28 to 27 unknown fields without marking unrelated facts verified; the full links scan completes and both new source URLs independently return HTTP 200 (reachability only); Node 22 Cloudflare build/artifacts, dependency audit and local current-profile smoke pass; all three affected routes remain outside the sitemap.
- [x] Release acceptance: commit `71304bd7ca13ef9e955ac9c81faf2967e958b0e7` passed clean detached-worktree `release:check`, CI `36391050585`, and Cloudflare Pages check/deployment `2ed27436-523b-4662-8eaf-b7c78d043af5`; immutable preview and production smoke plus the three-route source/noindex/sitemap assertions passed. Wrangler listing remains unavailable without an API token; this did not prevent direct preview verification. See TASK.md.
- Rollback: restore n8n revision 4 and the prior revisions/digests for its Make comparison and workflow guide, restore the prior manifest/evidence README, remove the related test/artifact assertions and revert the accompanying task docs; rerun content validation, review, build and current smoke.

### TODO-309 — n8n local-model evidence

- Goal: replace only n8n's unknown `localModels` fact with its documented Ollama integration path and its deployment limits.
- Use n8n's official Ollama Chat Model, credentials and self-hosted AI Starter Kit docs. State that the credentials default to a local Ollama endpoint but can target remote authenticated endpoints; note container-network configuration and that the starter kit is for proof-of-concept/demo use, not production-hardened deployment.
- Refresh `/tools/n8n/`, its Pros/Cons/FAQ and sections, and both declared n8n dependents with source-bound local-model FAQs, revision bumps and the current n8n digest. Refresh the exact TASK-006 manifest and README handoff.
- Add tests for source URLs/dates, bounded claim, production/network caveats, dependency digests, remaining instance-specific gap and in-review/noindex state; assert the evidence and URLs in generated HTML.
- [x] Local acceptance: freshness decreases from 27 to 26 unknown fields with only n8n `localModels` changing; exact content review, full source URL reachability scan, Node 22 build/artifacts (88 tests, 99 pages / 4 indexable URLs), zero-high audit and local current smoke pass. All three records remain in-review/noindex and outside the sitemap. No real model, account, network or data-flow configuration was tested or inferred.
- [x] Release acceptance: commit `6fae0740b1f2f30d92a54bc6f33b19671a88d319` passed clean detached-worktree `release:check`, CI `36393302469`, and Pages check/deployment `baf84f26-5119-4dbf-89e9-fcd8d28d6345`; immutable preview and production smoke plus three-route source/noindex/sitemap assertions passed. Wrangler listing remains unavailable without an API token; direct preview verification succeeded. See TASK.md.
- Rollback: restore n8n revision 5 and the prior revisions/digests for its Make comparison and workflow guide; restore the prior manifest/evidence README and revert the paired test/artifact/task changes; rerun content validation/review, build and current-profile smoke.

### TODO-309 — GitHub Copilot local BYOK evidence

- [x] Replace GitHub Copilot's unknown `localModels` field with current, client-specific Local BYOK evidence from GitHub.
- [x] Distinguish client-side Local BYOK from Enterprise BYOK configured server-side. Record the supported-client list, Copilot CLI's local Ollama/vLLM/Foundry Local route, offline-mode/provider boundary, IDE organization-policy caveat, and model tool-calling/streaming requirements without generalizing to an account or every Copilot feature.
- [x] Refresh the profile and all six declared dependent drafts with source-bound FAQs, revision bumps, exact dependency digests, TASK-005/TASK-006 manifests, evidence handoffs, artifact checks and regression tests.
- [x] Local acceptance: freshness decreases from 26 to 25 unknown fields with only Copilot `localModels` changing; both review manifests match; 89 tests, Node 22 Cloudflare build/artifacts (99 pages / 4 indexable URLs), full source reachability scan, zero-high audit and local current-profile smoke pass. Affected drafts remain in-review/noindex and outside the sitemap. No account, organization policy, model or inference path was inspected.
- [x] Release acceptance: commit `15f5492a982af22f8537d63031169a9362ae9b78` passed clean detached-worktree `release:check`, CI `36397813336`, and Pages check/deployment `5c2f37dc-580a-4739-8d76-1a1e61620098`. Immutable preview `https://5c2f37dc.toolpilot-git.pages.dev` and production smoke passed for 99 pages; seven affected routes on both environments render both BYOK sources, remain noindex and stay outside the sitemap. See TASK.md.
- Rollback: restore Copilot revision 4 and the prior revisions/digests for all six dependents, exact review manifests/evidence pack and the paired tests/artifact/task documentation; rerun content validation/review, build and current-profile smoke.

### TODO-309 — GitHub Copilot cloud-agent runner placement — 2026-09-28

- Official GitHub documentation says Copilot cloud agent defaults to a GitHub-hosted Actions runner and can be configured to use an organization self-hosted Actions runner. Keep this separate from the already documented client-side Local BYOK/local-model routes: self-hosting the task runner does not establish local model inference, offline operation or customer-hosted Copilot service.
- Update only the GitHub Copilot `selfHosting` fact with runner type, configuration boundary and supported-runner caveat; preserve actual organization runner settings as unknown. Refresh its six declared dependency digests and only add a relevant runner-placement FAQ to the Claude Code/Copilot comparison. Keep all records in-review/noindex and outside the sitemap.
- Refresh exact TASK-005/TASK-006 review manifests and handoffs; add regression checks for official source IDs/URLs, default versus self-hosted runner scope, non-inference caveat, dependent digest consistency, rendered source links and pending review state.
- Acceptance: both new GitHub Docs URLs returned HTTP 200; all TASK-005/TASK-006 manifest entries match current records; Node 22 lint/typecheck/92 tests/build/artifact checks and audit pass; date-pinned freshness decreased from 19 to 18 unverified fields. Commit `0a82940af2109f06de8123ec82880a5d6f085329` passed clean `release:check` and CI `36414916639`; local, Pages project-domain and production current smoke passed 99 pages, robots, sitemap and 404. Direct online checks on both hosts confirmed source rendering, in-review/noindex state and sitemap exclusion. Cloudflare API credentials were unavailable for immutable deployment-list/preview-ID inspection; no Cloudflare settings changed.
- Owner/account boundary: do not query or change organization runner configuration. Public docs establish capability only; actual runner selection remains unverified. This tranche does not resolve page-set approval or TODO-310/314 Owner inputs.
- Rollback: restore Copilot revision 5, prior dependent revisions/digests, both manifests and evidence handoffs plus tests/artifact/task docs; rebuild, repeat exact content review and current-profile smoke. No route or sitemap change is allowed.

### TODO-309 — GitHub Copilot cloud-agent code portability — 2026-09-28

- GitHub's official cloud-agent docs establish a GitHub-hosted repository workflow: changes are pushed on a branch, can be reviewed as a diff and iterated, with optional pull-request creation. Each cloud-agent task is limited to one repository and one branch. This is evidence for code-change handoff through Git, not general export of prompts, chat history, session metadata or account settings.
- Update only the Copilot `portability` fact and a directly relevant FAQ on the Claude Code/Copilot comparison; preserve the other data-export categories as unknown. Refresh all six declared dependency digests and the exact TASK-005/TASK-006 handoffs. Keep all records in-review/noindex and outside the sitemap.
- Acceptance: focused tests distinguish Git handoff from data export and assert exact dependencies/noindex; rendered artifact checks verify source links on the profile/comparison. Node 22 build passed lint, typecheck, 93 tests, 39-record content validation and artifacts (99 pages / 4 indexable URLs); exact content review matched, audit found 0 vulnerabilities, freshness is 17 unverified / 0 overdue, both new GitHub Docs sources returned HTTP 200, full `links:check` completed, and local current-profile smoke passed 99 pages, robots, sitemap and a real 404. Content commit `0e8a81308d951530e50614404295aaa7c7b9ba8e` passed clean `release:check` and CI `36417401052`; Pages project hostname and production passed current smoke and direct source/Git-only FAQ/noindex/sitemap checks. Cloudflare immutable deployment ID was unavailable without an API token; no settings changed.
- Owner boundary: do not inspect or claim account-specific exports or perform repository migration. No data/session migration was tested; the content remains a source-backed draft, not an owner-approved portability conclusion.
- Rollback: restore Copilot revision 6, all six previous dependent revisions/digests, both exact manifests and review handoffs, paired tests/artifact/task docs; rebuild and repeat content review and current-profile smoke. No route, data or indexing migration is involved.

### TODO-309 — Cline local task history and portability boundary — 2026-09-28

- Goal: replace Cline's unknown `portability` field with the narrow workflow documented by Cline: tasks are stored locally, can be reopened/resumed across editor sessions, and file changes have Git-based checkpoints.
- Treat local task-history persistence and Git snapshots as separate scopes. The current task-management page does not establish supported cross-device transfer, complete history export/import, full backup/restore, account or provider-setting migration, or restore behavior. Do not infer those capabilities from local storage or Git.
- Update the Cline profile and only its eight declared decision dependents; add one directly relevant task-history migration FAQ to `/compare/cline-vs-continue/`. Refresh exact TASK-005/TASK-006 manifest entries and review handoffs. Keep all records in-review/noindex and outside the sitemap.
- [x] Add regression coverage for the official source URL/date, local history and resume wording, the open cross-device boundary, the affected dependency digests, rendered source/FAQ, and pending/noindex state.
- Local acceptance: Node `v22.23.2` / npm `10.9.8` content check and exact review passed; `npm run cloudflare:build` passed lint, typecheck, 94 tests, 39-record validation and artifacts (99 pages / 4 indexable URLs); audit found 0 vulnerabilities; freshness is 16 unverified / 0 overdue; the full link scan completed and the new official docs page returned HTTP 200. Local current-profile smoke passed 99 pages, robots, sitemap and a real 404.
- [x] Release acceptance: commit `bc2f53d2814c5db8769cbafd095f381bd1237ac7` passed clean detached-worktree `npm run release:check` and CI `36420171549`. Both `https://toolpilot-git.pages.dev` and `https://toolpilot.cc` passed current-profile smoke; direct assertions verified the tool and comparison FAQs and official source render, both routes remain `noindex, follow`, and both are excluded from the sitemap. Wrangler could not read the immutable Cloudflare deployment ID because no API token is available; see TASK.md.
- Owner boundary: no client/account settings, local task directory or migration was inspected or moved. The source-backed draft does not approve history-export completeness or a migration result.
- Rollback: restore Cline revision 4, all eight prior dependent revisions/digests, exact manifests and handoffs, paired regression/artifact assertions and task records; rebuild and repeat content review and current-profile smoke. No route, data or indexing migration is involved.

### TODO-309 — Continue CLI session and configuration portability — 2026-09-28

- Goal: replace Continue's unknown portability fact with the exact official CLI/session and configuration workflow while keeping cross-device migration limits visible.
- Evidence scope: the TUI docs say `cn --resume` or `/resume` restores full history from a previous session; CLI configuration docs allow an explicit YAML file path; Continue recommends version-controlling `config.yaml` and keeping secrets outside committed config. These pages do not specify session export/import or full IDE/CLI state transfer.
- Update only the Continue profile and its two declared decision dependents (`compare/cline-vs-continue`, `best/open-source-ai-coding-tools`); add source-bound FAQs, refresh the exact TASK-006 manifest/evidence handoff, and add regression/rendered-artifact checks. Keep all three records in-review/noindex and out of the sitemap.
- Preserve the separate lifecycle/support, post-acquisition privacy, actual account/provider terms, and local model testing gaps. Do not claim package maintenance, session storage location, or that a config file contains account state.
- [x] Local acceptance: Node `v22.23.2` / npm `10.9.8` content validation, exact review, and 55 content-focused tests passed; `npm run cloudflare:build` passed lint, typecheck, 94 tests, 39-record validation, static export and artifacts (99 pages / 4 indexable URLs). `npm audit --audit-level=high` found 0 vulnerabilities; freshness is 15 unverified / 0 overdue. The 201-URL scan reported 160 HTTP-ok, 20 restricted, 11 policy-blocked and 10 temporary errors; all three newly cited Continue docs returned HTTP 200. Local current-profile smoke passed 99 pages, robots, sitemap and a real 404; generated HTML assertions verified all three pages' FAQ/source links, noindex and sitemap exclusion. `git diff --check` passed.
- [x] Release acceptance: content commit `012a19007addecd5ac15d157d4eaf907fe78c9ef` passed clean detached-worktree `npm run release:check` in `/tmp/toolpilot-release-continue-portability-012a190` and GitHub CI `36423752817`. Both `https://toolpilot-git.pages.dev` and `https://toolpilot.cc` passed current-profile smoke (99 pages, robots, sitemap and real 404); direct assertions confirmed all three FAQs and official sources render, each route remains `noindex, follow`, and all three routes stay out of the sitemap. Wrangler could not read the immutable Cloudflare deployment ID because this environment has no API token; see TASK.md.
- Owner boundary: no account, session, credential, model, local configuration or migration will be inspected or moved; no approval or indexability change.
- Rollback: restore Continue revision 8, both prior dependent revisions/digests and TASK-006 handoff, plus paired tests/artifact/task docs; rebuild and repeat content review and smoke. No route or migration change is involved.

### TODO-309 — Claude Code self-hosted execution evidence

- Goal: close Claude Code's source-verifiable `selfHosting`, `localModels` and `portability` gaps without treating customer-run session compute as model hosting or claiming custom endpoint support.
- Record Anthropic's Team/Enterprise public-beta self-hosted cloud-session runner and its off-by-default status. State that model inference still reaches `api.anthropic.com`, preserve the reviewed-doc scope for local models, and use official overview/checkpoint docs for Git and session-recovery limits.
- Refresh Claude Code and all 10 declared dependents to exact revisions/digests; add source-backed FAQs to the relevant model-route comparisons; add Claude Code to the source-evidence self-hosted overview; refresh both manifests and the TASK-005/TASK-006 handoffs.
- Add regression coverage for source URLs/dates, scope caveats, dependency digests, rendered sources, hub membership and in-review/noindex status. Preserve all route and sitemap membership.
- [x] Source-backed profile, four comparative FAQs, self-hosted hub entry and exact manifests/handoffs updated; content validation and review commands pass; freshness now reports 22 unverified fields and 0 overdue.
- [x] Node 22 Cloudflare build passed lint, typecheck, 90 tests, 39-record content validation and artifacts (99 pages / 4 indexable URLs); dependency audit found 0 vulnerabilities; local current-profile smoke passed 99 pages, robots, sitemap and a real 404; generated HTML assertions passed for all 11 affected routes (source evidence, noindex and sitemap exclusion). The 189-URL source scan returned 156 HTTP-ok, 20 restricted, 11 policy-blocked and 2 temporary errors; all five newly recorded Claude Code sources returned HTTP 200. Reachability alone does not verify claims.
- [x] Release and online verification: commit `53a7f1f7ffc8b737db2cbbce2edac7c39e3e1765` passed clean detached-worktree `release:check`, CI `36402468817`, Pages deployment/check `43848177-3e89-4e46-abe1-35aea5ccd0c9`, preview and production current smoke, and direct source/noindex/sitemap assertions for all 11 affected routes. No account, local model, runner or recovery flow was tested; see TASK.md.
- Rollback: restore Claude Code revision 3, all 10 prior dependent revisions/digests, prior manifests/evidence handoff and prior hub/test/task docs; rebuild and repeat current-profile smoke. No route or data migration is involved.

### TODO-309 — Cursor Self-Hosted Machines evidence

- Goal: resolve Cursor's source-verifiable self-hosting, local-inference and worker data-flow facts without treating a customer-managed worker as a fully local agent.
- Use Cursor's official Self-Hosted Machines, runtime selection, Team Pools and help docs. Distinguish customer-managed tool execution from Cursor-cloud agent loop, planning and inference; separate personal My Machines from Enterprise Team Pools and administrator setup.
- Record that checkout, build cache and machine-local credentials stay on the worker while required run content is sent to Cursor and artifacts may use Cursor-managed storage. Privacy Mode's training statement does not mean data stays local. Keep account configuration, actual worker path, artifact behavior and restoration untested.
- Refresh Cursor and all 11 declared decision dependents, add targeted source-backed FAQs, update the self-hosted hub, both manifests, TASK-005 evidence handoff, tests and generated-HTML assertions. Keep all affected drafts noindex and outside the sitemap.
- [x] Local acceptance: `npm run content:check` and exact `npm run content:review` pass; date-pinned freshness is 19 unverified / 0 overdue; Node 22 Cloudflare build passes lint, typecheck, 91 tests and 99-page artifact checks; audit finds 0 vulnerabilities; local 99-page smoke and direct cited-source/pending/noindex/sitemap assertions pass for the profile plus 11 dependents and the hub. The 193-target scan reports 160 HTTP-ok, 20 restricted, 11 blocked by policy and 2 temporary errors; all four new Cursor sources return HTTP 200.
- [x] Release acceptance: content commit `41ae99f4a28764d58aa59ebe87dfc7f8f07edc03` passed clean detached-worktree `release:check`, CI `36407283280` and Pages deployment/check `4e144e8e-923e-4d9c-95ab-c8091dd26909`. Preview `https://4e144e8e.toolpilot-git.pages.dev` and production `https://toolpilot.cc` passed current smoke (99 pages, robots, sitemap and real 404); direct source/pending/noindex/sitemap assertions passed for the profile, 11 dependents and self-hosted hub. No account, worker or data-flow setup was tested.
- Rollback: restore Cursor revision 4, all 11 previous dependent revisions/digests, prior manifests/evidence pack, hub and regression/task documentation; rebuild and repeat current-profile smoke. No route or data migration is involved.

### TODO-309 — Windsurf / Devin Desktop Enterprise self-hosting scope — 2026-09-28

- Goal: record only the public-source boundary for Windsurf's unresolved `selfHosting` field after the documented Devin Desktop transition. Do not generalize a legacy Codeium updater listing to every Devin Desktop plan or infer deployment topology.
- Use the current Codeium Enterprise Updater listing on the Windsurf Marketplace, which says it is for self-hosted enterprise customers only. Treat this as evidence that a self-hosted Enterprise customer path exists for the listed Codeium product; state that the public listing does not explain the deployment architecture, service/data placement, whether current Devin Desktop customers retain this path, or new-customer eligibility. The older Windsurf plugin setup page redirects and is not evidence for this tranche.
- Update the Windsurf profile to revision 6 with one official Marketplace source, a narrowly qualified `selfHosting` fact and FAQ; keep `localModels` and `portability` unknown. Refresh all three declared dependents (`/alternatives/cursor/`, `/alternatives/windsurf/`, `/compare/windsurf-vs-cursor/`) to exact revisions/digests and add a directly relevant comparison FAQ where appropriate.
- Refresh the applicable TASK-005 exact review-manifest rows and the TASK-005 Windsurf evidence pack; TASK-006's 11-row manifest does not include these Windsurf/alternatives records and remains unchanged. Add regression coverage for source/date, product identity boundary, unresolved deployment and Devin Desktop applicability, dependent digests, in-review/noindex state, and self-hosted hub membership. Assert the fact/source renders in the profile and affected dependent HTML. Preserve all routes and sitemap membership.
- [x] Local acceptance: `npm run content:check`, exact TASK-005 manifest/dependency tests, and date-pinned freshness pass; the unknown count moved from 13 to 12 only because Windsurf `selfHosting` now has a dated source. The 208-target scan classified 163 HTTP-ok, 20 restricted, 12 blocked and 13 temporary errors; the new Marketplace URL is `blocked-host`, so the scan does not establish its reachability. Node 22 Cloudflare build passed lint, typecheck, 96 tests and 99-page artifact checks (4 indexable URLs); audit found 0 vulnerabilities. Local current-profile smoke passed 99 pages, robots, sitemap and a real 404; direct HTML assertions passed for the profile, three dependents and hub source/claim/noindex/sitemap state.
- [x] Release acceptance: content commit `9f494de1fb0ffbbc82307efb0700297dc64f04cb` passed clean detached-worktree `npm run release:check`, CI `36438854100`, and Pages deployment/check `c62d55e3-7eac-48eb-8f77-d896de9b5dda`. Immutable preview `https://c62d55e3.toolpilot-git.pages.dev` and production `https://toolpilot.cc` passed current smoke (99 pages, robots, sitemap and real 404); direct source/claim/noindex/sitemap checks passed for the profile, three dependents and self-hosted hub. Record results in TASK.md, TODO.md and AI_CONTEXT.md; no owner approval, route, indexing or Cloudflare setting changed.
- Rollback: restore Windsurf revision 5 and its prior revisions/digests across the three dependents, both prior manifests and evidence handoff, paired tests/artifact assertions and task records; rebuild and repeat current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Cline current local-inference documentation — 2026-09-28

- Goal: strengthen Cline's existing positive `localModels` claim with current, dedicated official provider documentation; do not infer product self-hosting or universal offline/data-flow behavior.
- Use Cline's official local-model overview. Record the documented Ollama, LM Studio and Atomic Chat runtimes, local-server setup and endpoint examples, plus the hardware/model suitability caveat. No installation, model or network path is tested.
- Add the official source to the Cline profile, refresh its `localModels` fact and relevant source-backed FAQ blocks in declared decision dependents. Refresh every dependent's exact Cline digest, both review manifests where applicable, the TASK-005 Cline evidence pack and generated-artifact checks. Preserve `selfHosting` as unknown and all records as in-review/noindex/outside sitemap.
- [x] Local acceptance: content validation and exact TASK-005/TASK-006 manifest tests match; regression tests enforce source identity, bounded local-inference claim and no inference about product self-hosting/offline privacy. Freshness remains 12 unverified / 0 overdue. Node 22 Cloudflare build passed lint, typecheck, 97 tests and 99-page artifacts; audit found 0 vulnerabilities; the full link scan completed and the new Cline URL returned 200; local 99-page current smoke and nine-route source/FAQ/noindex/sitemap assertions passed.
- [x] Release acceptance: commit `cb23ac023c90e76516f072e8a390c458f036c0b3` passed clean-worktree release check, GitHub CI `36444234496` and Pages deployment/check `c3e60416-fd47-4c65-95f2-9e4538e90e5f`. Immutable preview and production current smoke plus direct source/endpoint/FAQ/noindex/sitemap assertions pass for all nine affected routes. Deployment does not constitute Owner approval or a model test.
- Rollback: restore Cline revision 5, prior dependent revisions/digests, prior exact manifests/evidence pack, paired tests/artifact assertions and task documentation; rebuild and repeat current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Make on-prem agent versus product hosting boundary — 2026-09-28

- Goal: replace Make's unknown `selfHosting` field with the narrow Enterprise on-prem-agent capability documented by Make, while making clear that a customer-installed connector is not evidence that the Make product or scenario runtime can be self-hosted.
- Source: review Make's official On-premise agent guide. It limits the feature to Enterprise, says the agent runs on a customer device for local-network API/database access, currently supports only the HTTP Agent app, is created/managed in Make's Organization dashboard, and requires an Internet connection. Do not claim payload isolation, offline operation, local scenario execution or a complete customer-hosted deployment.
- Update Make profile revision 8 and its two declared TASK-006 dependents (`/compare/make-vs-n8n/` and `/guides/workflow-automation-selection/`) with exact source-bound wording and targeted FAQs. Refresh the TASK-006 manifest and README handoff; add regression and rendered-artifact assertions for source, Enterprise/HTTP-only scope, the connector-versus-product boundary, dependent digests and in-review/noindex state. Keep `localModels` unknown and do not inspect/configure a Make account or install an agent.
- [x] Local acceptance: the official source returned HTTP 200; content validation, exact TASK-006 manifest tests and date-pinned freshness pass (11 unknown / 0 overdue); Node 22 Cloudflare build passed lint, typecheck, 97 tests and 99-page artifact checks; audit found 0 vulnerabilities; local current smoke and four-route source/FAQ/noindex/sitemap assertions pass. This resolves only the dated connector capability, not full product hosting.
- [x] Release acceptance: commit `c3fbefc58595dc08cb4c33e84b8dc12acf8c158f` passed clean detached-worktree `release:check`, CI `36449205704` and Pages deployment/check `109019787463` (`39cb0f65-5976-4235-ab1f-b4fe9f209262`). Preview `https://39cb0f65.toolpilot-git.pages.dev` and production passed current smoke (99 pages, robots, sitemap and real 404); direct assertions on both hosts confirmed the official source, boundary FAQ, noindex and sitemap exclusion across the profile, two dependents and self-hosted hub.
- Owner boundary: all three records remain in-review, unapproved, noindex and outside the sitemap. No account, agent, network, data path or scenario execution is inspected or tested.
- Rollback: restore Make revision 7, the two prior decision revisions/digests, the prior TASK-006 manifest/handoff and paired regression/artifact/task notes; rebuild and repeat content review and current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Make AI Agent providers versus local inference — 2026-09-28

- Goal: clarify what Make's public AI Agent and On-prem agent documentation establishes about local model inference without treating provider examples as an exhaustive list or converting an evidence gap into a product-absence claim.
- Sources: use Make's current `Create your first AI agent` guide for its documented Free-plan and paid-plan provider examples, plus the On-prem agent guide for the separate HTTP Agent local-network connector. Do not infer that HTTP Agent is an AI inference provider or that the named provider examples are exhaustive.
- Update Make revision 9 with the official AI Agent source and a boundary FAQ; refresh the two declared TASK-006 dependents to revisions 14/13, the exact manifest/README handoff, regression tests and generated-artifact assertions. Preserve `localModels` as null/unknown and keep the 11-field freshness count unchanged. No account, provider, endpoint or model is tested.
- Local acceptance (passed): both sources directly reviewed and HTTP 200; exact content/manifests pass; Node 22 lint/typecheck/97 tests/build, audit and local current smoke pass; the three affected routes render sources/FAQ and stay in-review/noindex/outside sitemap; freshness remains 11 unknown / 0 overdue.
- [x] Release acceptance: commit `d2f3ada31c215d874520c93e19bc66a436dbba48` passed clean detached-worktree `release:check`, GitHub CI `36452450811`, and Pages deployment/check `109030898028` (`599c9a03-9920-4f30-a457-2cc9640fe338`). Preview `https://599c9a03.toolpilot-git.pages.dev` and production passed current smoke for 99 pages, robots, sitemap and a real 404; direct assertions confirmed FAQ/source rendering and noindex/sitemap exclusion on all three affected routes. This does not approve content or imply an account/model test.
- Owner boundary: do not claim Make lacks local-model support. The current reviewed pages do not establish that Make AI Agent can use a local model or that its HTTP Agent supplies inference.
- Rollback: restore Make revision 8, the prior comparison/guide revisions and digests, prior TASK-006 manifest/README, and paired tests/artifact/task notes; rebuild and repeat content review and current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Replit Agent model selector versus app AI integrations — 2026-09-28

- Goal: separate Replit Agent's own model-selection documentation from AI provider integrations that Agent configures for applications being built; retain local inference as unknown unless Replit explicitly documents a local model/runtime path.
- Sources: review Replit's current official [Model selector](https://docs.replit.com/features/agent/model-selector) and [Replit AI Integrations](https://docs.replit.com/features/integrations/replit-ai-integrations) pages. Record only the documented model-selection, managed-credential/BYOK, and application API billing boundaries. Do not infer that provider examples are exhaustive or that the lack of an Ollama/local endpoint in these pages proves product absence.
- Update Replit profile revision 7 with both source records and one source-bound boundary FAQ; retain `localModels` and `selfHosting` as null/unknown, add the exact follow-up gap, and keep review state unchanged. Refresh all seven dependent decision records to revisions 15/15/14/11/9/10/8 with their current Replit dependency digests. Add contextual source-backed FAQs to those records, including application-level model billing on the Replit pricing page.
- Refresh TASK-005 and TASK-006 exact manifests, both owner handoffs and the Replit evidence pack; add regression assertions for source identity, app-versus-Agent inference scope, unknown field state, all dependent digests, and rendered source/FAQ/noindex/sitemap state.
- Acceptance: both primary sources reviewed and HTTP 200; content check/review and exact manifest tests pass; Node 22 Cloudflare build, high-severity audit, freshness, local current smoke and all eight affected-route assertions pass. All records remain in-review/noindex/outside sitemap; no account, model or endpoint is tested and the unknown-field count does not decrease.
- Release: commit `7bf6c1b04d3733adcb1ac8f4cc6c1f9983178946` passed clean detached-worktree `release:check`, CI `36456162861` and Pages check/deployment `167bef9b-1fab-49f6-ba2e-935952121a60`; preview and production passed 99-page current smoke and eight-route FAQ/source/noindex/sitemap assertions.
- Owner boundary: this evidence tranche does not approve the P1 page set, change rankings or indexability, or establish Replit local-model absence or full self-hosting. Owner review and account-specific settings remain open.
- Rollback: restore Replit profile revision 6 and all seven prior dependent revisions/digests from the parent commit, then restore the prior TASK-005/TASK-006 manifests, README/evidence pack, tests and artifact assertions; rebuild and rerun current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Replit Enterprise dedicated project versus self-hosting — 2026-09-28

- Goal: record Replit's current Enterprise deployment option without treating a dedicated GCP project or single-tenant service as customer-operated self-hosting.
- Evidence: the official [Replit Enterprise page](https://replit.com/enterprise) lists a dedicated GCP project and single-tenant option under Sales-Assisted Enterprise, with custom pricing and an annual commitment. It does not identify project ownership, operator control, or the deployed component boundary.
- Scope: update the Replit profile's `selfHosting` evidence and one FAQ, refresh all seven declared decision dependents with a relevant source-backed FAQ and exact dependency digest, update both review manifests and the Replit evidence handoff, and add fact/dependency/rendered-output regression coverage. Keep customer-operated self-hosting unestablished, `localModels` unknown, and all records in-review/noindex.
- [x] Local acceptance — 2026-09-28, Node `v22.23.2` / npm `10.9.8`: Replit Enterprise returned HTTP 200; `npm run content:check`, `npm run content:review`, all 100 tests, lint, typecheck, Cloudflare static build and artifact checks passed (99 pages / 4 indexable URLs); high-severity audit found 0 vulnerabilities; freshness is 6 unverified / 0 overdue; full source-link scan completed; local current-profile smoke and direct source/FAQ/noindex/sitemap assertions passed for all eight affected routes. No account, agreement, deployment or Owner review is claimed.
- [x] Release acceptance — 2026-09-28: commit `bef03baa4e1d63f6040b075eb90b5b02ecdb6abf` passed clean-worktree `npm run release:check` and GitHub CI `36492310505`. Immutable preview `https://cb392687.toolpilot-git.pages.dev` and production `https://toolpilot.cc` both passed current smoke; direct checks passed on all eight routes for HTTP 200, Enterprise source/FAQ, canonical URL, `noindex, follow` and sitemap exclusion. The Cloudflare GitHub check remained `Building` during this verification, although both public hosts served the new content; Wrangler deployment listing could not run because this environment has no `CLOUDFLARE_API_TOKEN`. No account, agreement, deployment configuration or Owner review is claimed.
- Rollback: restore Replit revision 7, all seven prior dependent revisions/digests, prior TASK-005/TASK-006 manifests and Replit handoff, and paired tests/artifact/task notes; rebuild and repeat content review/current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Cline Enterprise deployment evidence — 2026-09-28

- Goal: resolve Cline's `selfHosting` unknown with its current official Enterprise deployment statements while distinguishing a vendor-described deployment option from a verified customer installation, local inference or fully offline operation.
- Evidence scope: Cline's current Enterprise page advertises VPC, on-premises and air-gapped deployment and distinguishes customer-environment requests to chosen providers from Cline-managed inference. Its Enterprise docs describe customer-environment processing and BYO inference. The July 2025 funding announcement said self-hosted options were coming soon; treat that as dated historical language and let the current product documentation define the present claim, without inferring account availability or deployment topology.
- Update the Cline profile with dated official Enterprise sources and a source-bound `selfHosting` fact. Keep specific Enterprise entitlement, architecture, account terms, provider route and actual deployment unverified; preserve the separate local-model and telemetry/privacy boundaries.
- Audit all eight declared Cline dependents. Refresh each exact dependency revision/digest; add Cline Enterprise deployment context only where it materially answers an existing comparison question. Update the source-evidence self-hosted hub membership and its regression expectation without changing route or sitemap state.
- Refresh TASK-005/TASK-006 manifests, review handoffs and Cline evidence pack. Add regression checks for source identities, exact digests, bounded deployment language, hub membership and in-review/noindex/sitemap state; verify the generated pages render the source links.
- Local acceptance (passed 2026-09-28): official source pages directly reviewed and all three new URLs returned HTTP 200; `content:check`, exact `content:review`, freshness (10 unverified / 0 overdue), 60 focused content tests, Node 22 Cloudflare build (99 tests; 99 pages / 4 indexable URLs), high-severity audit (0 vulnerabilities), local current smoke and generated assertions for all nine affected routes pass. All drafts remain in-review/noindex/outside the sitemap. No account, network, model or deployment is tested; no Owner approval is implied.
- Release acceptance (passed): commit `7bd9158c7a5e21294ba5dbc05c44321e517e6018` passed clean detached-worktree `release:check`, GitHub CI `36468840359`, and Pages deployment/check `77022c8a-736b-4e2d-a5ae-a0ab24214a3c`. Preview `https://77022c8a.toolpilot-git.pages.dev` and production passed 99-page current smoke; direct checks confirmed all nine affected routes and `/self-hosted/` remain noindex/outside sitemap and render the Cline Enterprise source/FAQ evidence.
- Owner boundary: keep product availability, customer-specific architecture, exact contract/eligibility and actual data flows open for Owner/vendor confirmation. Do not turn marketing examples or mock dashboard data into product metrics.
- Rollback: restore Cline profile revision 6, all eight prior dependent revisions/digests, both prior manifests and handoffs, prior evidence pack, tests and hub expectation; rebuild and repeat content review and current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Lovable platform self-hosting boundary — 2026-09-28

- Goal: resolve Lovable's product `selfHosting` field using its current official ownership/hosting guide, while separating self-hosting an application built with Lovable from self-hosting the Lovable editor/AI-agent platform.
- Evidence scope: the official guide says built applications can move to managed or customer-operated infrastructure, but the Lovable platform itself (editor and AI agent) is a managed service and cannot be self-hosted or deployed inside a customer VPC. The source does not establish a local-model inference route; keep `localModels` unknown.
- Update Lovable profile revision 5 and its seven declared TASK-005 dependents; add a bounded platform-versus-generated-app FAQ where it helps the decision, refresh each exact dependency digest, the TASK-005 review manifest/handoff and evidence pack. TASK-006 has no records in this dependency set and remains unchanged. Add regression coverage for the source/date, exact self-hosting scope, remaining local-model unknown, current digests and generated source/FAQ/noindex/sitemap behavior.
- Preserve all `in-review` states, noindex directives, route/sitemap membership, Owner gates and the supplied rebuild plan. Do not test or infer account, customer VPC, app deployment, model endpoint or migration behavior.
- Acceptance: passed on 2026-09-28. Directly reviewed the primary source and verified its URL; `npm run content:check`, exact `npm run content:review`, date-pinned freshness, Node 22 Cloudflare build, high-severity audit, local current-profile smoke and affected-route HTML assertions all passed. Freshness is 9 unverified / 0 overdue. The 216-target link scan returned 178 HTTP-ok, 20 restricted, 12 blocked by host policy and 6 temporary errors; the new official source returned HTTP 200. Reachability is not editorial approval.
- Release acceptance: commit `830f9891a4f8a72502e2b902edb82f5063498d1b` passed clean release readiness, GitHub CI `36474317219` and Cloudflare Pages deployment/check `7b724661-1374-4bdb-ab74-8c5e719a0509`. Preview and production both passed current smoke plus source/FAQ/noindex/sitemap assertions on all eight routes. Exact release record and rollback are in TASK.md.
- Rollback: restore Lovable revision 4 and each of its seven previous decision revisions/digests, then restore the prior TASK-005/TASK-006 manifests and handoffs, evidence pack, tests and task records; rebuild and rerun content review/current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Bolt BYOK, Forge and current plan boundaries — 2026-09-28

- Goal: refresh Bolt's product-level deployment, model and plan evidence from current official documentation without conflating enterprise BYOK hosting, Forge model usage, local inference, app execution and account-specific availability.
- Sources: Bolt Security & Trust advertises BYOK deployment to customer AWS/Azure; Bolt's official Forge guide documents the waitlisted USD 9/month Lite plan, its Forge-only agent scope and separate data-use consent; the agent guide distinguishes Standard/Max from Forge; Bolt's Forge article says Forge runs on Bolt-reserved hardware while projects run in browser WebContainers.
- Update the Bolt profile revision and its six declared decision dependents. Add a source-bound self-hosting fact, bounded Forge/Lite pricing and data details, and FAQs that distinguish hosted open-model inference from local-model capability. Keep local inference unknown where the complete agent/account route is not documented.
- Add Bolt's enterprise deployment fact to the existing noindex self-hosted evidence hub as a separate platform-hosting category; preserve its explicit non-exhaustive scope. Refresh TASK-005/TASK-006 manifests, review handoffs and the Bolt evidence pack. Add regression checks for the official source/date, hosting claim limits, Forge inference/data distinction, Lite waitlist/limits, exact dependency digests, hub source render and in-review/noindex/sitemap state.
- [x] Local acceptance — 2026-09-28: four current official pages directly reviewed and link-scanned; content validation, both exact review manifests, 99 regression tests, lint, typecheck, static build and artifact checks pass (99 pages / 4 indexable URLs); `npm audit --audit-level=high` found 0 vulnerabilities. Date-pinned freshness is 8 unknown / 0 overdue. Local current-profile smoke passed; generated HTML confirms all seven changed content routes and `/self-hosted/` remain noindex/outside the sitemap and include the Bolt source evidence. No Enterprise tenant, model endpoint or account was tested; no content approval or indexing change was made.
- [x] Release acceptance — commit `b498228a07685456856027c6c7c913754d9c4c2f` passed clean detached-worktree `npm run release:check`, GitHub CI `36480079639`, and Cloudflare Pages check/deployment `d30e65b8-5e5f-41e6-94b3-4511b3751dc0`. Preview and production passed current smoke and direct 8-route source/noindex/sitemap checks. Wrangler's deployment-list command could not run without `CLOUDFLARE_API_TOKEN`; the Pages check and public host responses are the deployment evidence. This does not grant Owner approval. Rollback restores the prior Bolt revision, six dependent revisions/digests, both review manifests/handoffs, evidence pack, hub list, tests and task notes; no route, schema or data migration is involved.

### TODO-309 — Devin Local execution, model inference and workflow migration — 2026-09-28

- Goal: use current official Devin documentation to distinguish local agent execution from model inference and make the Cascade-to-Devin Local workflow migration caveat reviewable without assuming an account's behavior.
- Sources: Devin's [Devin Local Agent](https://docs.devin.ai/desktop/devin-local) page says the agent harness runs on the user's machine and documents Cascade Memories/Workflows as unsupported with a migration path into Skills. The [Cascade overview](https://docs.devin.ai/desktop/cascade/cascade) documents model selection but not local inference location.
- Update Windsurf revision 7 and its three dependent decisions to add source-bound FAQs, preserve `localModels` as null/unknown, add migration/inference gaps, and keep all records in-review/noindex. Refresh TASK-005 exact manifest/handoff, evidence pack, regression tests and generated-artifact assertions.
- [x] Local acceptance — 2026-09-28: content validation/review, 100 tests, lint, typecheck, Cloudflare static build and artifacts (99 pages / 4 indexable URLs), high-severity audit (0 vulnerabilities), freshness (8 unknown / 0 overdue), full source-link scan, and current local smoke passed. All four changed routes remain noindex and outside the sitemap; no account/model/migration test or Owner approval is claimed.
- [x] Release acceptance — commit `51e0c84` passed clean detached-worktree `npm run release:check`, GitHub CI `36483163254`, Cloudflare Pages check/deployment `fef3fb74-254d-441d-8d58-dd2091026ad1`, and preview/production current smoke. Both public hosts returned 200 for all four changed routes and rendered the Devin Local source and FAQs; all four remained `noindex, follow` and outside the sitemap. Wrangler's deployment-list lookup was unavailable without `CLOUDFLARE_API_TOKEN`; successful Pages check and public responses are the deployment evidence. No Owner approval or account/model/migration test is claimed.
- Owner boundary: the local agent harness does not prove local model inference or its provider/data route. The migration wizard has not been run; exact page-set and formal editorial approval remain open under TODO-005/TODO-309.
- Rollback: restore Windsurf revision 6 and dependent revisions 19/18/10, prior TASK-005 manifest/handoff and evidence pack, paired tests/artifact/task notes; rebuild and repeat content review/current-profile smoke. No route, schema or data migration is involved.

### TODO-312 — Directory query URL indexability smoke coverage — 2026-09-28

- Goal: protect the current `/tools/` static route from accidental indexing of query variants while filter dimensions and demand remain unapproved.
- Scope: add a current-profile smoke request with multiple candidate query parameters and assert HTTP 200, `noindex, follow`, and a canonical URL without query parameters. Do not implement filter behavior or expose unreviewed facts through `publicTool`.
- [x] Local acceptance — 2026-09-28: Node 22 Cloudflare build passed lint, typecheck, 100 tests and artifact checks (99 pages / 4 indexable URLs); high-severity audit found 0 vulnerabilities; local current smoke, `node --check scripts/smoke.mjs` and `git diff --check` passed. The query URL assertions require HTTP 200, `noindex, follow` and canonical `/tools/`.
- [x] Release acceptance — commit `32815d6` passed clean detached-worktree `npm run release:check`, CI `36485953592`, Pages check/deployment `0cf501cf-781b-4de7-a1d5-8b795bf4e69d`, preview/production current smoke, and both-host assertions for query HTTP 200, `noindex, follow`, parameter-free canonical and sitemap exclusion. No filter behavior or route change was introduced.
- Rollback: revert the smoke assertion and its matching task/testing notes. No page data, route, schema, indexability or sitemap behavior changes.

### TODO-309 — Devin Local documented portability boundary — 2026-09-28

- Goal: replace only Windsurf/Devin Desktop's null portability fact with the vendor-documented Cascade Memories/Workflows migration path, while keeping other session, account and data migration unknowns explicit.
- Evidence: Devin's official [Devin Local Agent](https://docs.devin.ai/desktop/devin-local) docs say the Cascade Migration Wizard brings Workflows and Memories into Devin Local as Skills; those features are not supported natively by Devin Local. No account or migration was inspected.
- Scope: update the Windsurf tool profile, its three declared decision dependents, exact TASK-005 manifest and evidence handoff, content regression tests and generated-output assertions. Keep `localModels` unknown, every affected record `in-review`/noindex, and sitemap membership unchanged.
- [x] Local acceptance — 2026-09-28: content validation/review and exact manifest tests passed; date-pinned freshness dropped by only this one fact (8 to 7 unverified, 0 overdue); Node 22 Cloudflare build passed lint, typecheck, 100 tests and artifact checks (99 pages / 4 indexable URLs); high-severity audit found 0 vulnerabilities; full source-link check, local current smoke and four-route rendered source/fact/noindex/canonical/sitemap checks passed. No migration, account, model or content approval is claimed.
- [x] Release acceptance — commit `cc357d0` passed clean detached-worktree `release:check`, CI `36488989752`, Pages check/deployment `846e4f37-1d7c-4d5d-b2ca-198c79a11457`, preview/production current smoke, and both-host assertions for all four affected routes (HTTP 200, production parameter-free canonical, source/FAQ rendering, noindex and sitemap exclusion).
- Rollback: restore the parent revisions/digests for the profile and three decisions, prior exact manifest/evidence handoff and regression assertions, then rebuild and repeat current-profile smoke. No route, schema or data migration is involved.

### TODO-309 — Replit Intelligent Model Routing evidence update — 2026-09-28

- Goal: incorporate the current official routing/pricing-boundary announcement in the Replit tool profile and all seven declared dependent drafts, without inferring local inference or account-specific usage costs.
- Source: Replit's [Intelligent Model Routing announcement](https://replit.com/blog/intelligent-model-routing), published 2026-08-26 and updated 2026-08-27. It describes task-level routing, Free Mode, notices on escalation to higher-powered modes that may incur costs, Core/Pro manual choice and Enterprise approved-model sets. It does not describe model execution location or a local endpoint.
- Scope: Replit profile and seven exact dependent revisions; TASK-005/TASK-006 manifests and review handoffs; source-bound FAQ tests and generated-HTML checks; task, TODO and context records. Keep all records in-review/noindex, preserve `localModels` as unknown and do not claim hands-on testing or account pricing.
- Acceptance: content validation/review, all tests, Cloudflare build/artifact checks, audit, freshness and source-link validation; local smoke and affected-route HTML/source/noindex/sitemap checks; release readiness, CI and current preview/production smoke with public content assertions.
- [x] Local acceptance — 2026-09-28: content validation/review, 100 tests, lint, typecheck, Cloudflare build/artifacts (99 pages / 4 indexable URLs), high-severity audit (0 vulnerabilities), freshness (6 unknown / 0 overdue), full source-link scan, local current smoke and eight-route source/FAQ/noindex/sitemap assertions passed.
- [x] Release acceptance — commit `d156d1a` passed clean-worktree `release:check`, GitHub CI `36496404681`, Pages deployment/check `b88496d0-4ff4-4b53-93a9-11e16e99cf4b`, preview and production 99-page smoke, and eight-route source/FAQ/canonical/noindex/sitemap assertions on each host.
- Rollback: restore Replit revision 8 and its seven prior dependent revisions/digests from the parent commit, the previous manifests/evidence handoff, tests/artifact assertions and task notes; rebuild and repeat review/smoke checks. No route, schema or data migration is involved.
