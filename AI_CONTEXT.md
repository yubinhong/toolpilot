# AI_CONTEXT.md

> 面向 AI 的项目入口与当前快照。稳定详情放到对应主文档，本文件只保留摘要、事实状态和阅读路径。

## 1. 项目快照

- 项目：`ToolPilot`
- 一句话目标：面向 Developer、Indie Hacker 和 AI Builder，帮助用户发现、比较和选择开发者工具与技术栈。
- 当前阶段：`MVP PUBLISHED / CONTENT REVIEW`
- 主要用户：`Developer`、`Indie Hacker`、`AI Builder`；次要用户为工具厂商和 ToolPilot 运营者
- 生产状态：`DEPLOYED`（Cloudflare Pages 项目 `toolpilot`；`https://toolpilot.cc` 首页、目录、详情、robots、sitemap 已公网验证 200）
- 当前版本：`0.1.0`（package.json；未发布）
- 最近更新：`2026-08-21`

## 2. 当前工作状态

- 最近完成任务：`TASK-003` — 50 条目录内容审核与来源记录
- 任务状态：`IN_PROGRESS`
- 当前分支：`main`（`HEAD` 与 `origin/main` 同步于提交 `4776027`；该提交工作区干净且 `release:check` 已通过）
- 当前重点：TASK-004 已加入 CI、生产 smoke、定时监控、`release:check` 和不可变 reviewed commit SHA 发布/回滚 workflow；`4776027` 已推送并部署，生产 smoke 已通过，GitHub 外部运行证据仍待确认
- 阻塞项：本机没有 GitHub CLI，匿名 GitHub API 返回 404，无法验证 GitHub Actions 的运行记录；GitHub production environment、Cloudflare Secrets、通知渠道仍为 `TBD`，真实 Pages 回滚演练也未完成
- Cloudflare 快照：2026-08-21 Wrangler 认证、Pages 发布和部署历史读取已验证；`toolpilot` 当前 Production 部署 source 为 `4776027`，部署 ID 为 `be8ecb81-fcad-4058-8909-e80befb441ab`，预览地址为 `https://be8ecb81.toolpilot-2cy.pages.dev`；`https://toolpilot.cc` 公网 smoke 已通过。旧部署 `f65b5a7` 和无 source 的部署仍不作为已确认回滚目标
- 内容风险仍在：8 个官网和 6 个来源链接受 403/429 或其他访问限制；5 条记录缺少研究来源；产品/商业/法务 Owner 仍为 `TBD`

## 3. 主文档索引

| 主题 | 唯一事实来源 | 读取条件 |
| --- | --- | --- |
| 仓库级行为、授权与长期规则 | `AGENTS.md` | 所有任务 |
| 项目目标、范围、环境 | `PROJECT.md` | 所有任务 |
| 产品需求、用户验收 | `PRD.md` | 功能、体验、范围变更 |
| 当前执行任务 | `TASK.md` | 所有实现任务；当前为 `TASK-004` |
| 复杂执行计划 | `PLANS.md` | 跨模块或高风险任务 |
| 系统结构、数据流 | `ARCHITECTURE.md` | 架构、接口、数据变更 |
| 测试命令、质量门槛 | `TESTING.md` | 所有代码变更 |
| 安全与隐私 | `SECURITY.md` | 鉴权、数据、外部输入、依赖 |
| 部署与故障处理 | `RUNBOOK.md` | 发布、配置、运维 |
| 架构决策 | `DECISIONS.md`、`docs/adr/` | 不可逆或跨团队决策 |
| 待办队列 | `TODO.md` | 当前任务完成后的下一步 |
| 已发布变化 | `CHANGELOG.md` | 发布和兼容性判断 |

## 4. 技术摘要

- 前端：`Next.js 16.3.1 App Router`、React 19.2.8、TypeScript 5.9.3；源码在 `app/`、`components/`、`lib/`
- 后端：当前没有独立 API 或服务端逻辑；Next 配置为静态导出
- 数据：当前为 `lib/catalog.mjs` 中的 50 条受标记研究草稿；每条分离 `productUrl`、`sourceUrl`、链接检查、来源状态、编辑审核字段、`affiliateStatus`、`commission` 和 `verifiedAt`；没有 CMS、数据库、迁移或厂商提交
- 基础设施：`next build` 已生成 `out/` 静态站点并部署到 Cloudflare Pages 项目 `toolpilot`；生产域名为 `https://toolpilot.cc`
- 外部服务：Cloudflare Pages 已由 Wrangler 创建/部署；产品官网和研究来源作为外部链接依赖；没有分析、支付或运行时 API
- 认证授权：当前未实现账户、管理端或身份提供方
- 可观测性：仓库已有生产 smoke 和 GitHub Actions 定时监控配置；通知渠道、历史运行记录和 Cloudflare 内部指标仍为 `TBD`
- 运行时：`.nvmrc` 要求 Node `22`；Node 22.23.0/npm 10.9.8 下已安装依赖并通过工程检查；当前默认 shell 实际仍为 Node `v20.17.0`

## 5. 仓库地图

| 路径 | 责任 | 主要入口 |
| --- | --- | --- |
| `AGENTS.md`、`PROJECT.md`、`AI_CONTEXT.md` | 项目规则、目标和上下文 | 本文件和根目录文档 |
| `PRD.md`、`ARCHITECTURE.md` | 产品需求与系统边界 | 文档入口；当前内容和商业流程仍为 DRAFT/TBD |
| `TESTING.md`、`SECURITY.md`、`RUNBOOK.md` | 验证、安全和运维规则 | 文档入口；本地命令和 Cloudflare Pages 发布命令已核实 |
| `app/` | Next App Router 页面、动态静态参数、robots/sitemap | 当前 Web 入口和路由实现 |
| `components/` | 共享壳层、目录卡片、首页搜索筛选 | UI 组件，不含外部服务 |
| `lib/catalog.mjs` | 首批分类、工具草稿、决策页和指南种子数据 | 当前唯一内容种子；全部需来源审核 |
| `scripts/smoke.mjs`、`scripts/release-readiness.mjs` | 公共 HTTP smoke 和发布仓库状态门槛 | TASK-004 运维入口；不读取 Secret |
| `out/` | `next build` 静态产物 | 生成物，不是内容事实来源 |
| `package.json`、`package-lock.json` | npm 脚本和锁定依赖 | 当前工程基线 |
| `.env.example`、`.nvmrc`、`.npmrc` | 站点 URL 样例、Node 要求、npm 配置 | 当前已恢复；不含真实密钥 |
| `docs/adr/0000-template.md`、`prompts/` | ADR 模板与工作流提示 | 不代表已采用的架构决策 |

## 6. 不可违反的约束

- 默认不提交 Git、不读取或输出真实密钥；`TASK-002` 已完成 Cloudflare Pages 部署和 `toolpilot.cc` DNS 绑定，TASK-003 只允许发布带有明确 Draft/待审核标记的内容。
- `.next`、缓存和历史研究示例不能替代源码、配置、依赖或生产证据；当前旧 Crypto/DeFi 内容按用户确认不迁移。
- 免费基础收录保持开放；Affiliate、Featured、Sponsor 只能购买明确标注的曝光，不能改变客观评价、比较结论或自然排序。
- 工具事实、价格、限制、链接和商业关系必须有来源、更新时间或明确的 `TBD`/待核实标记。
- 不读取、输出或提交真实密钥、令牌、个人数据、生产数据库和未脱敏第三方报告。

## 7. 关键术语

| 术语 | 项目内含义 | 不应混用 |
| --- | --- | --- |
| `ToolPilot` | 开发者工具发现、比较和技术栈决策平台 | 通用工具目录、工具本身 |
| `Developer Tool` | 面向开发、部署、数据、认证、通信、支付和自动化工作的工具 | 所有互联网产品 |
| `Decision Page` | `Best`、`Compare`、`Alternatives`、`Stacks` 或明确指南页面 | 只有名称和链接的目录页 |
| `Affiliate` | 用户经推荐链接转化后产生的合作方佣金关系 | Sponsor、Featured 付费曝光 |
| `Featured / Sponsor` | 厂商直接购买、且必须披露的曝光权益 | 客观排名或评价购买 |
| `Generated Artifact` | `.next` 等构建输出，可用于观察构建结果 | 源码、配置和生产部署证据 |

## 8. 最近确认的决策

- `2026-08-19`：`DOC-001` 文档审计完成，旧生成物和配置按用户确认是主动删除内容，不再作为迁移输入。
- `2026-08-20`：`TASK-001` 重建 Next.js 16.3.1 静态导出 MVP；Node 22 下 `typecheck`、`lint`、`test`、`build` 已通过，本地关键路径 HTTP smoke test 已通过。
- `2026-08-20`：当前 50 条目录数据全部显式标为 Draft/Research snapshot；正式内容仍必须完成来源、更新时间、商业关系和评价审核。
- `2026-08-20`：`TASK-002` 接入 50 条研究快照；Node 22 质量门槛通过；Cloudflare Pages 项目 `toolpilot` 部署 332 个静态文件并绑定 `toolpilot.cc`，生产关键路径返回 200。
- `2026-08-20`：`TASK-003` 记录 50 条产品链接检查、45 条来源状态、5 条来源缺失和编辑审核门槛；链接可达不等于产品事实已核验。
- `2026-08-21`：`TASK-004` 加入 `scripts/smoke.mjs`、`scripts/release-readiness.mjs`、CI、生产定时监控和手动不可变 commit SHA 发布/回滚 workflow；`4776027` 已推送并部署，release check、7 个测试、本地验证、生产 smoke、Cloudflare 认证和部署历史读取已通过，GitHub Actions 外部激活和真实回滚演练待确认。

## 9. 已知风险与技术债

- CI、生产监控和受控发布入口已写入仓库，`4776027` 已作为 source 部署并通过公网 smoke；仍没有可验证的 GitHub 运行记录、Secrets、通知和实际回滚演练 — 影响：自动发布/告警与恢复流程尚未完整验收 — 跟踪：`TODO-004`、`TODO-302`
- 50 条研究草稿尚未完成正式来源、更新时间和评价审核 — 影响：不能当作正式评价或佣金承诺 — 跟踪：`TODO-005`、`TODO-006`、`TODO-008`；逐条快照见 `docs/content-review/TASK-003-2026-08-20.md`
- 静态导出和内容存储尚未完成正式 ADR — 影响：后续引入 CMS/API 时可能出现边界漂移 — 跟踪：`ADR-001`、`TODO-007`
- 当前默认 shell 为 Node 20 而项目要求 Node 22 — 影响：直接运行 npm 命令可能复现不同结果 — 跟踪：`TODO-002`
- `README.md` 已改为 ToolPilot 项目入口；后续只需随运行命令和阅读路径变化同步。

## 10. 更新规则

- 任务切换、架构变化、环境变化或里程碑完成后更新本文件。
- 不复制 PRD、架构或测试全文，只保留摘要、证据状态和链接。
- 删除已失效状态；历史决策进入 ADR，已交付变化进入 `CHANGELOG.md`。
- 每次更新都区分“要求/假设”“仓库观察值”和“可运行命令验证值”。
