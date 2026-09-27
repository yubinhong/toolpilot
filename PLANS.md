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
- `/stacks/` remains noindex scaffolding. The initial audit had no `/mcp/` or `/self-hosted/` routes; the current source adds both as noindex source-evidence overview hubs, while vendor subroutes and deep directories remain deferred. Current policy/disclosure paths are `/editorial-policy/` and `/disclosure/`; do not change these paths without a route mapping and reason.
- Source now derives comparison rows from the union of cited profile facts; values not present on a profile remain explicitly unknown. Registered non-home routes have visible breadcrumbs and matching route-only `BreadcrumbList` JSON-LD. Shared metadata now adds a first-party generic 1200x630 PNG to Open Graph and Twitter large-image cards; route-specific vendor artwork remains gated on permission.
- At the initial audit, `docs/url-audit.csv` covered 96 source-registered routes. It later covered 97 routes and now covers 99 after the MCP/self-hosted hubs; every version explicitly leaves actual HTTP, GSC indexing, backlinks and absent historical URL coverage unverified. The 2026-09-27 archive recheck (see `docs/research/archive-recheck-2026-09-27.json`) recovered no legacy URL: Wayback CDX returned an empty array, two Common Crawl indexes reported no captures, most older probes failed, and repository source history begins with the ToolPilot app. The exact legacy URL inventory remains blocked by TODO-306.
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
- Supplemental archive checks are tracked in `docs/research/archive-recheck-2026-09-27.json`: Wayback CDX returned HTTP 200 with an empty result, Common Crawl 2026-39 and 2026-08 reported no captures, and older indexes returned 503/504. The Git repository's first source commit contains only the ToolPilot app. Keep historical URLs, GSC indexing and backlinks unknown; this does not satisfy TODO-306.
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
