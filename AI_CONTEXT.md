# AI_CONTEXT.md

> 面向 AI 的项目入口与当前快照。稳定详情放到对应主文档，本文件只保留摘要、事实状态和阅读路径。

## 1. 项目快照

- 项目：`ToolPilot`
- 一句话目标：面向 Developer、Indie Hacker 和 AI Builder，帮助用户发现、比较和选择开发者工具与技术栈。
- 当前阶段：`MVP PUBLISHED / CONTENT REVIEW`
- 主要用户：`Developer`、`Indie Hacker`、`AI Builder`；次要用户为工具厂商和 ToolPilot 运营者
- 生产状态：`DEPLOYED`（Cloudflare Pages 项目 `toolpilot`；`https://toolpilot.cc` 首页、目录、详情、robots、sitemap 已公网验证 200）
- 当前版本：`0.1.0`（package.json；未发布）
- 最近更新：`2026-08-20`

## 2. 当前工作状态

- 活动任务：`TASK-002` — 接入 50 条产品研究快照并发布到 Cloudflare Pages
- 任务状态：`DONE`
- 当前分支：`master`（仓库尚无提交；当前文件均为未提交工作区内容）
- 当前重点：50 条产品草稿已上线；下一步是逐条来源/更新时间/商业条款审核，以及 CI、监控和回滚演练
- 阻塞项：没有 CI、监控或自动化回滚；50 条内容仍是研究快照；8 个官网返回 403/429，不能仅凭 HTTP 状态完成内容核验；产品/商业/法务 Owner 仍为 `TBD`
- 下一检查点：创建 `TASK-003`，建立 50 条内容审核清单、版本记录和正式发布准入标准

## 3. 主文档索引

| 主题 | 唯一事实来源 | 读取条件 |
| --- | --- | --- |
| 仓库级行为、授权与长期规则 | `AGENTS.md` | 所有任务 |
| 项目目标、范围、环境 | `PROJECT.md` | 所有任务 |
| 产品需求、用户验收 | `PRD.md` | 功能、体验、范围变更 |
| 当前执行任务 | `TASK.md` | 所有实现任务；当前 `TASK-002` 已完成 |
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
- 数据：当前为 `lib/catalog.mjs` 中的 50 条受标记研究草稿；每条分离 `productUrl`、`sourceUrl`、`affiliateStatus`、`commission` 和 `verifiedAt`；没有 CMS、数据库、迁移或厂商提交
- 基础设施：`next build` 已生成 `out/` 静态站点并部署到 Cloudflare Pages 项目 `toolpilot`；生产域名为 `https://toolpilot.cc`
- 外部服务：Cloudflare Pages 已由 Wrangler 创建/部署；产品官网和研究来源作为外部链接依赖；没有分析、支付或运行时 API
- 认证授权：当前未实现账户、管理端或身份提供方
- 可观测性：`TBD`；没有 CI、日志、指标或告警配置证据
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
| `out/` | `next build` 静态产物 | 生成物，不是内容事实来源 |
| `package.json`、`package-lock.json` | npm 脚本和锁定依赖 | 当前工程基线 |
| `.env.example`、`.nvmrc`、`.npmrc` | 站点 URL 样例、Node 要求、npm 配置 | 当前已恢复；不含真实密钥 |
| `docs/adr/0000-template.md`、`prompts/` | ADR 模板与工作流提示 | 不代表已采用的架构决策 |

## 6. 不可违反的约束

- 默认不提交 Git、不读取或输出真实密钥；用户明确授权的 `TASK-002` 已完成 Cloudflare Pages 部署和 `toolpilot.cc` DNS 绑定。
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

## 9. 已知风险与技术债

- 没有 CI、监控和自动化回滚入口 — 影响：当前发布可手动验证但恢复依赖人工操作 — 跟踪：`TODO-004`、`TODO-302`
- 50 条研究草稿尚未完成正式来源、更新时间和评价审核 — 影响：不能当作正式评价或佣金承诺 — 跟踪：`TODO-005`、`TODO-006`、`TODO-008`
- 静态导出和内容存储尚未完成正式 ADR — 影响：后续引入 CMS/API 时可能出现边界漂移 — 跟踪：`ADR-001`、`TODO-007`
- 当前默认 shell 为 Node 20 而项目要求 Node 22 — 影响：直接运行 npm 命令可能复现不同结果 — 跟踪：`TODO-002`
- `README.md` 已改为 ToolPilot 项目入口；后续只需随运行命令和阅读路径变化同步。

## 10. 更新规则

- 任务切换、架构变化、环境变化或里程碑完成后更新本文件。
- 不复制 PRD、架构或测试全文，只保留摘要、证据状态和链接。
- 删除已失效状态；历史决策进入 ADR，已交付变化进入 `CHANGELOG.md`。
- 每次更新都区分“要求/假设”“仓库观察值”和“可运行命令验证值”。
