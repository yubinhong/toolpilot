# PLANS.md - Execution Plan

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
- Status: `READY`
- Date: `2026-09-27`
- Input: user-provided `TOOLPILOT_REBUILD_PLAN.md`; preserve as supplied (currently untracked)
- Baseline: HEAD `27ea628`; inspect the entire worktree before making source changes
- Product/release boundary: this planning update is not editorial, commercial or route-migration approval. Any future release still follows repository gates and the user's applicable deployment/online-verification authorization.

### Goal

Compare the 90-day rebuild plan against current source and close the source-verifiable P0 technical gaps in small reviewable phases. Keep the accepted Next.js static-export and Cloudflare Pages architecture. Carry source-dependent content, old-URL decisions, operator/legal details, GSC measurements and monetization into separately gated work.

### Verified baseline and principal differences

- The project already has shared UI, route metadata, canonical generation, robots, indexability-driven sitemap, a tested 404, structured JSON content, review/digest/dependency gates, freshness and safe-link scripts, build/artifact checks and static Pages deployment.
- The current content model contains 8 tools, 6 comparisons, 6 alternatives, 4 pricing records, 2 Best pages and 2 guides. All 28 records are `in-review`; they are not owner-approved or indexable. Five of the ten comparison slugs named in the plan exist, plus one current comparison outside its named set. The alternative count exceeds five but its target slug set differs.
- `/stacks/` exists as noindex scaffolding. `/mcp/` and `/self-hosted/` are absent. Current policy/disclosure paths are `/editorial-policy/` and `/disclosure/`; do not change these paths without a route mapping and reason.
- Source has no visible breadcrumb/JSON-LD implementation or OG image/Twitter metadata. Comparison dimensions are narrower than the proposed matrix; current unknown values must remain explicit.
- The exact legacy URL, GSC indexing and backlink inventory is unavailable in the checkout. `/docs/url-audit.csv` is not present. Source route inventory can be completed while external indexing/backlink fields remain `unknown`.
- No GA4, AdSense, active affiliate relationship, user accounts, database or CMS exists. This is an intentional gate until approved privacy, operator and commercial inputs exist.

### Execution phases

#### Phase 0 — Preserve the baseline and audit source

- Keep the supplied plan file untouched and untracked status visible in the task record.
- Record HEAD, branch, status, relevant recent commits, current source routes, content counts, tests, metadata/index rules and deployment configuration.
- Confirm that active product source/build routes contain no Crypto/DeFi content; retain historical research artifacts without treating them as public pages.
- Do not make a tag or release artifact overwrite user work. A reviewed immutable baseline can be selected before implementation.

#### Phase 1 — URL inventory and migration evidence

- Build the requested URL audit from current route definitions and every recoverable legacy URL source in the repository.
- Use the plan's fields: `url`, `status`, `title`, `page_type`, `indexed`, `has_backlink`, `action`, `redirect_target`, `notes`.
- Represent unavailable external facts explicitly as `unknown`; do not convert absence of evidence into `false`.
- Do not ship bulk deletion, homepage redirects, 301s or 410s. Each action needs the exact old URL, evidence, semantically justified destination or 410 reason, and automated smoke coverage.
- Stop migration decisions that require Search Console, backlink tools, old sitemap or Cloudflare logs until TODO-306 input exists.

#### Phase 2 — Reconcile information architecture and route names

- Preserve all current routes by default and map proposed paths to existing ones: `/editorial-policy/` versus `/methodology/`, `/disclosure/` versus `/affiliate-disclosure/`, and current `/stacks/` status.
- Record that the rebuild plan calls MCP/self-hosted P0 in §5/§49 but future/P2 in §43/§44/§51. Keep both clusters deferred/noindex until TODO-310 resolves priority and meaningful source-backed content exists.
- Never create an empty directory page solely to satisfy a route checklist. `/stacks/` remains noindex until it has approved independent decision content.
- Keep Next.js 16 static export, JSON content and Cloudflare Pages. No Astro, server, database or CMS migration absent a new accepted ADR.

#### Phase 3 — Complete supported templates and technical SEO

- Extend comparison dimensions only when source/tool data supports them; display unknown, unsupported and unverified states separately.
- Add visible breadcrumbs plus valid `BreadcrumbList` data where hierarchy is real. Use `SoftwareApplication`/`Article` structured data only for matching, verified page content; omit unsupported claims and fake ratings.
- Evaluate explicit pros/cons, use cases, FAQs and related-decision sections as content contracts rather than adding generic filler.
- Add unique share metadata/OG assets only where artwork and brand permissions are available. Keep canonical, robots, sitemap, noindex, 404 and build artifact checks as hard regression gates.
- Enforce contextual internal links among genuinely related, eligible decisions. Do not create combinatorial comparisons or index parameter filters; any query-driven filter must have noindex tests.
- Preserve `/tools/`, decision-page and current legal/trust URLs. Any alias/redirect requires a compatibility review and exact mapping test.

#### Phase 4 — Prepare the P1 content batch

- Target from the supplied plan: 12 tools, 10 comparisons, 5 alternatives, 4 pricing and 3–5 Best pages. Current counts are 8/6/6/4/2; two guides already exist.
- The list in the plan adds Aider, Continue, n8n and Make profiles and comparison candidates including Make vs n8n, Claude Code vs GitHub Copilot, Cline vs Continue, Aider vs Claude Code and Bolt vs Replit. Validate search intent and official sources before creating any record.
- Reconcile `/alternatives/bolt-new/` versus `/alternatives/bolt/`; do not rename a URL until Phase 1 evidence and the owner-approved mapping are available. Existing extra alternatives may remain drafts; do not delete just to reach the plan count.
- Each new/changed record must include attributable factual sources and clear gaps. It stays `in-review`, noindex and outside the sitemap until owner approval of its exact revision/digest.
- Resolve dependency updates and review all downstream comparisons if a tool fact changes.

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

### Stop conditions and rollback

- Stop a route migration if exact old-URL evidence is missing or redirect semantics are unclear.
- Stop public content/indexing if facts, source provenance, dependencies or owner approval are incomplete.
- Stop analytics/monetization if privacy, operator, consent, partner, attribution or disclosure inputs are missing.
- Keep data and routes reversible: retain old source until the reviewed replacement and tested URL map are ready. Revert only this task's reviewed files; live recovery uses a verified Pages deployment/reviewed commit and current-profile smoke. No database migration is in scope.
