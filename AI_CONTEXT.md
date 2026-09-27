# AI_CONTEXT.md

## 当前快照 — 2026-09-27

- ToolPilot：面向 Developer、Indie Hacker、AI Builder 的工具发现和决策站。
- 当前任务：TASK-006 `IN_PROGRESS`，按用户提供的 `TOOLPILOT_REBUILD_PLAN.md` 关闭源码可验证的 P0 差异并准备 P1 审核批次。38 条结构化记录、96 条当前源码路由清单和精确审核清单均已在源码中，全部内容仍为 `in-review`、noindex。MCP 证据批次为 Cursor、Claude Code、GitHub Copilot、Cline 和 Continue 加入官方来源事实，并刷新 18 条依赖决策；提交 `4363baa9821a547641d88a62c461ad2e1e746773` 通过 GitHub CI run `36310506062` 和 Cloudflare Pages 部署 `bd8c8795-7ff5-4540-8c5a-559a693fb380`。预览站 `https://bd8c8795.toolpilot-git.pages.dev` 与 `toolpilot.cc` current-profile smoke 均通过 96 页检查。比较表格逐项链接来源，相关决策链接按页面类型筛选并限为 5 条。TASK-006 实施基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`；计划文件仍为用户提供的未跟踪文件，必须保留。历史 URL/GSC/外链证据、内容批准、Alternatives/slug 映射、运营资料、告警通知和生产回滚演练仍是独立门槛；详见 TASK.md、TODO.md 和 PLANS.md。
- 技术：Next.js 16.3.6、React 19.2.8、TypeScript 5.9.3、Node 22、npm、静态导出，仍无 API/数据库/CMS/账户。
- 历史 50 条研究快照保留；当前目录有 54 个工具身份。首批 38 个结构化内容记录（12 tools / 11 compare / 6 alternatives / 4 pricing / 3 best / 2 guides）全部待用户审核，未冒充正式评价。
- 内容事实源：content/tools/、content/decisions/；历史快照：lib/catalog.mjs 的 researchTools。公开 DTO 不携带内部佣金和审核证据。
- 草稿保留 URL，noindex 且退出 sitemap；来源日期与审核/实测日期分开。逐版本审批见 ADR-0009。
- 首批范围：英文 AI Coding / AI App Builders；没有激活广告、分析或实际 Affiliate。
- 工作区含用户提供的未跟踪 `TOOLPILOT_REBUILD_PLAN.md`；不得清理或覆盖。TASK-006 变更前已检查工作区，基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`。
- 本地安全修复与构建已验证；只有完整发布后的线上 smoke 才能证明生产更新。

## 当前阻塞

- 用户尚未批准具体内容修订；真实运营主体和公开联系渠道未提供。
- 早前对生产关键路径的抽样曾返回 403，见 docs/research/public-audit-2026-09-27.json；本轮 CNAME 切换后的正式域名 current smoke 已通过。任一环境的访问结果都不能单独推断全球可达性或 Googlebot 状态。
- Node 22 下 `npm ci` 和 `npm audit --audit-level=high` 当前通过，0 vulnerabilities；每次发布仍须重新审计。
- TASK-004 的 Git-integrated Pages 项目、CNAME 切换、正式域名 current smoke 和当前 production-monitor run 已完成；监控通知和生产回滚演练仍未完成。归档任务不是完成记录。
- 用户报告已将 `toolpilot.cc` CNAME 切换到 `toolpilot-git`；正式域名与 immutable preview 均通过 88 页 current smoke，production-monitor run `36299788937` 成功。旧 Direct Upload 项目仍保留作恢复目标。
- 没有原始 GSC、PV、转化或收入数据。90 天运营不能从本地构建推断为完成。

## 阅读路径

1. AGENTS.md → 本文件 → PROJECT.md → TASK.md。
2. PRD.md、ARCHITECTURE.md、TESTING.md、SECURITY.md。
3. TASK-006 与 [TOOLPILOT_REBUILD_PLAN.md](TOOLPILOT_REBUILD_PLAN.md)：当前 P0 差异和用户重规划；PLANS.md TASK-006；docs/adr/0009-reviewed-decision-content.md。
4. docs/research/toolpilot-report-extract.md：报告抽取和采用/暂缓决策。
5. docs/research/toolpilot-task-gap-analysis-2026-09-27.md：原始报告与 TASK/TODO 的逐项差异标记。
6. docs/content-review/TASK-005/README.md：首批 28 页清单；docs/content-review/TASK-006/README.md：新增 10 页精确 revision/digest 审核入口。
7. docs/operations/90-day-review.md：真实数据运营模板。
8. RUNBOOK.md、docs/tasks/TASK-004-before-remediation.md、ADR-0008：生产授权和迁移。

## 仓库地图

- app/、components/：静态路由与共享 UI。
- content/：正式模型的待审核 JSON 与来源域名 allowlist。
- lib/content-types.ts、content-policy.mjs、content.mjs：类型、审核不变量、服务端读取与公开 DTO。
- lib/routes.mjs、metadata.ts、site-config.mjs：唯一页面清单、逐页元数据、公开站点 URL。
- scripts/：内容、静态产物、出站链接、新鲜度、smoke 和仓库发布门槛。
- .github/workflows/：质量检查、旧生产 smoke、新维护报告；仓库配置不代表外部运行已成功。
- out/、.next/：生成物，不是事实来源或生产证据。

## 历史部署证据边界

2026-09-27 的 Git-integrated Pages `main` 部署、CNAME 切换后的 `toolpilot.cc` current smoke 已核验；旧 Direct Upload 项目仍须保留，直至生产回滚演练完成。
