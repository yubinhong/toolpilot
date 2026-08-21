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

## TASK-004 - CI, Production Monitoring, and Controlled Rollback

### 计划元数据

- 计划 ID：`TASK-004`
- 状态：`IN_PROGRESS`
- 日期：`2026-08-21`
- 基线：TASK-003 完成后的静态站点；reviewed commit `4776027` 已推送到 `origin/main`，工作区干净并已部署

### 目标与范围

建立仓库级 CI、可复用生产 smoke、定时生产监控和 immutable reviewed commit SHA 发布/回滚入口。只修改仓库配置和文档，不自动创建 GitHub/Cloudflare 外部设置，不在未确认生产窗口时切换线上版本。

### 已完成

- [x] `scripts/smoke.mjs` 和 `npm run smoke`：检查 7 个关键路径、审核标记和 50 条 sitemap 工具 URL。
- [x] `.github/workflows/ci.yml`：Node 22、`npm ci`、audit、lint、typecheck、test、build、本地静态 smoke。
- [x] `.github/workflows/production-monitor.yml`：每 15 分钟和手动触发的生产 smoke。
- [x] `.github/workflows/pages-release.yml`：手动 immutable reviewed commit SHA 发布/回滚、生产 Environment、Cloudflare Secret 名称和并发锁。
- [x] `scripts/release-readiness.mjs` 和 `npm run release:check`：在发布前拒绝错误 Node、短 SHA、不安全/缺失 remote、dirty worktree 和未跟踪发布文件；4 个门槛测试通过。
- [x] `docs/adr/0007-ci-monitoring-release-gate.md` 记录 workflow 边界和 Pages 没有原生 CLI rollback 命令的事实。
- [x] 本地静态服务器 smoke 通过；三个 workflow YAML 通过 Ruby YAML 解析。
- [x] Node 22 下 `npm run lint`、`npm run typecheck`、`npm test`、`npm run build`、`npm audit --audit-level=high` 通过；2026-08-21 生产 smoke 7/7 路径通过。

### 未完成与阻塞

- reviewed commit `4776027` 已推送、通过干净 checkout 的 `release:check` 并部署；本机没有 GitHub CLI，匿名 API 返回 404，Actions 运行记录、`production` Environment、分支保护、Cloudflare Secrets 和失败通知尚未配置或验证。
- 当前生产部署元数据已显示 source `4776027`，并通过 `https://toolpilot.cc` 公网 smoke；旧部署仍未验收为可复现回滚目标。
- 尚未在明确生产操作窗口执行实际 Pages 回滚/域名恢复演练；跟踪 `TODO-302`。
- 任务保持 `IN_PROGRESS`，直到外部 Owner 完成激活并提供运行/回滚证据。
