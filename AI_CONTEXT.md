# AI_CONTEXT.md

## 当前快照 — 2026-09-27

- ToolPilot：面向 Developer、Indie Hacker、AI Builder 的工具发现和决策站。
- 当前活动任务：TASK-005（用户批准的研究整改）；状态 IN_PROGRESS，R00–R08、本地工程验证和依赖修复已完成，R09 等待生产部署与线上验证，详见 TASK.md。
- 技术：Next.js 16.3.6、React 19.2.8、TypeScript 5.9.3、Node 22、npm、静态导出，仍无 API/数据库/CMS/账户。
- 历史 50 条研究快照保留；加入 Claude Code/Cline 后有 52 个工具身份。首批 28 个结构化内容记录全部待用户审核，未冒充正式评价。
- 内容事实源：content/tools/、content/decisions/；历史快照：lib/catalog.mjs 的 researchTools。公开 DTO 不携带内部佣金和审核证据。
- 草稿保留 URL，noindex 且退出 sitemap；来源日期与审核/实测日期分开。逐版本审批见 ADR-0009。
- 首批范围：英文 AI Coding / AI App Builders；没有激活广告、分析或实际 Affiliate。
- 工作区含原先未提交整理和本次改动；不得清理或覆盖。基线见 docs/tasks/remediation-baseline.md。
- 本地安全修复与构建已验证；只有完整发布后的线上 smoke 才能证明生产更新。

## 当前阻塞

- 用户尚未批准具体内容修订；真实运营主体和公开联系渠道未提供。
- 当前环境访问生产关键路径均为 403；不能据此认定全球不可达或 Googlebot 被拒。见 docs/research/public-audit-2026-09-27.json。
- Node 22 下 `npm ci` 和 `npm audit --audit-level=high` 当前通过，0 vulnerabilities；每次发布仍须重新审计。
- TASK-004 的 Cloudflare Git Integration 项目、授权、域名迁移、通知和实际回滚演练仍未完成。归档任务不是完成记录。
- 当前环境无 Cloudflare API Token；Wrangler Pages 部署列表检查要求非交互 API Token。Git Integration 是否已启用须以本次真实部署和线上 smoke 验证。
- 没有原始 GSC、PV、转化或收入数据。90 天运营不能从本地构建推断为完成。

## 阅读路径

1. AGENTS.md → 本文件 → PROJECT.md → TASK.md。
2. PRD.md、ARCHITECTURE.md、TESTING.md、SECURITY.md。
3. PLANS.md TASK-005、docs/adr/0009-reviewed-decision-content.md。
4. docs/research/toolpilot-report-extract.md：报告抽取和采用/暂缓决策。
5. docs/content-review/TASK-005/README.md：8 份证据包、28 页清单及逐版本审核流程。
6. docs/operations/90-day-review.md：真实数据运营模板。
7. RUNBOOK.md、docs/tasks/TASK-004-before-remediation.md、ADR-0008：生产授权和迁移。

## 仓库地图

- app/、components/：静态路由与共享 UI。
- content/：正式模型的待审核 JSON 与来源域名 allowlist。
- lib/content-types.ts、content-policy.mjs、content.mjs：类型、审核不变量、服务端读取与公开 DTO。
- lib/routes.mjs、metadata.ts、site-config.mjs：唯一页面清单、逐页元数据、公开站点 URL。
- scripts/：内容、静态产物、出站链接、新鲜度、smoke 和仓库发布门槛。
- .github/workflows/：质量检查、旧生产 smoke、新维护报告；仓库配置不代表外部运行已成功。
- out/、.next/：生成物，不是事实来源或生产证据。

## 历史部署证据边界

2026-08-21 的 Direct Upload 生产 source 为 4776027，GitHub CI 有历史成功记录；这不是 2026-09-27 的重新核验。旧 Cloudflare 项目 toolpilot 必须保留，直到另获授权完成新项目验证和迁移。
