# AI_CONTEXT.md

## 当前快照 — 2026-09-27

- ToolPilot：面向 Developer、Indie Hacker、AI Builder 的工具发现和决策站。
- 当前任务：TASK-006 `IN_PROGRESS`，按用户提供的 `TOOLPILOT_REBUILD_PLAN.md` 关闭源码可验证的差异并准备 P1 审核批次。当前有 39 条结构化记录、97 条注册路由；所有内容均为 `in-review`、noindex，只有 4 个非内容 URL 在 sitemap。12 个工具档案和全部 26 个声明了工具依赖的决策页现有来源绑定的优势、限制和 FAQ；无依赖的 `/guides/how-to-choose-a-developer-tool/` 按 ADR-0009 不附会产品引用。该批次通过 57 项测试、Node 22 Cloudflare 构建（97 页/4 个可索引 URL）、依赖审计（0 漏洞）、链接检查和本地 current smoke。commit `953f40f` 通过 GitHub CI `36319265195` 和 Cloudflare Pages deployment `4853fdac-190c-4ba7-bc13-4809e6adf85d`；immutable preview 与 `toolpilot.cc` current smoke 均通过 97 页、robots、sitemap 和 404。TODO-313 的源码实现已完成；Alternatives/slug 映射、内容审批、历史 URL/GSC/外链证据、运营资料、告警通知和生产回滚演练仍是独立门槛。TASK-006 基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`；用户计划文件仍未跟踪且保持原样；详见 TASK.md、TODO.md 和 PLANS.md。
- 技术：Next.js 16.3.6、React 19.2.8、TypeScript 5.9.3、Node 22、npm、静态导出，仍无 API/数据库/CMS/账户。
- 历史 50 条研究快照保留；当前目录有 54 个工具身份。首批 39 个结构化内容记录（12 tools / 11 compare / 6 alternatives / 4 pricing / 3 best / 3 guides）全部待用户审核，未冒充正式评价。
- 内容事实源：content/tools/、content/decisions/；历史快照：lib/catalog.mjs 的 researchTools。公开 DTO 不携带内部佣金和审核证据。
- P0.5 内容契约现支持带 `{toolSlug, sourceId}` 的 Pros、Cons、FAQ 引用；本轮已为剩余可用工具档案补齐相同页面块，并刷新依赖摘要。决策页自己的证据块仍待 TODO-313；用户批准前所有记录保持 `in-review` / noindex。
- 草稿保留 URL，noindex 且退出 sitemap；来源日期与审核/实测日期分开。逐版本审批见 ADR-0009。
- 首批范围：英文 AI Coding / AI App Builders；没有激活广告、分析或实际 Affiliate。
- 工作区含用户提供的未跟踪 `TOOLPILOT_REBUILD_PLAN.md`；不得清理或覆盖。TASK-006 变更前已检查工作区，基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`。
- 本地安全修复与构建已验证；只有完整发布后的线上 smoke 才能证明生产更新。

## 当前阻塞

- 用户尚未批准具体内容修订；真实运营主体和公开联系渠道未提供。
- 早前对生产关键路径的抽样曾返回 403，见 docs/research/public-audit-2026-09-27.json；本轮 CNAME 切换后的正式域名 current smoke 已通过。任一环境的访问结果都不能单独推断全球可达性或 Googlebot 状态。
- Node 22 下 `npm ci` 和 `npm audit --audit-level=high` 当前通过，0 vulnerabilities；每次发布仍须重新审计。
- TASK-004 的 Git-integrated Pages 项目、CNAME 切换、正式域名 current smoke 和当前 production-monitor run 已完成；监控通知和生产回滚演练仍未完成。归档任务不是完成记录。
- 用户报告已将 `toolpilot.cc` CNAME 切换到 `toolpilot-git`；当前提交的正式域名与 immutable preview 均通过 96 页 current smoke。production-monitor run `36299788937` 曾成功；旧 Direct Upload 项目仍保留作恢复目标。
- 没有原始 GSC、PV、转化或收入数据。90 天运营不能从本地构建推断为完成。

## 阅读路径

1. AGENTS.md → 本文件 → PROJECT.md → TASK.md。
2. PRD.md、ARCHITECTURE.md、TESTING.md、SECURITY.md。
3. TASK-006 与 [TOOLPILOT_REBUILD_PLAN.md](TOOLPILOT_REBUILD_PLAN.md)：当前 P0 差异和用户重规划；PLANS.md TASK-006；docs/adr/0009-reviewed-decision-content.md。
4. docs/research/toolpilot-report-extract.md：报告抽取和采用/暂缓决策。
5. docs/research/toolpilot-task-gap-analysis-2026-09-27.md：原始报告与 TASK/TODO 的逐项差异标记。
6. docs/content-review/TASK-005/README.md：首批 28 页清单；docs/content-review/TASK-006/README.md：新增 11 页精确 revision/digest 审核入口。
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
