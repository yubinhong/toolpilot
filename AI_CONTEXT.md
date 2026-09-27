# AI_CONTEXT.md

## 当前快照 — 2026-09-27

- 独立执行任务：TASK-007 `IN_PROGRESS`，strict per-route CSP/hash 与共享头由 `f4c9798` 发布，静态 404 的 hash-based CSP meta follow-up 由 `057ee368` 发布；CI `36342275495`、Pages deployment/check `96ad8a25-c4fa-46ff-99d7-ad9829dceab2`、preview/production 97 页 smoke 均通过。Chromium 确认两端未知路径仍渲染 404、主题可切换且无页面脚本错误；Cloudflare Insights beacon 在 production 404 上由 CSP 拦截，记录 `script-src-elem` violation / `requestfailed: csp`。待 Owner 决定禁用 Pages Web Analytics 注入（推荐）或审批分析/隐私范围后按批准扩展策略；HSTS 暂缓到 Owner 确认域名范围和 `max-age` 后。

- ToolPilot：面向 Developer、Indie Hacker、AI Builder 的工具发现和决策站。
- 商业 CTA：`vendorLink()` 仅在内容精确审批、Affiliate 状态 active、HTTPS 目标、关系证据和披露齐全时切换到 Affiliate URL；渲染出明确 `Affiliate link` 标签、相邻披露和 `rel=sponsored`。其他情况继续使用普通产品官网链接。当前没有已激活关系。
- 当前任务：TASK-006 `IN_PROGRESS`，按用户提供的 `TOOLPILOT_REBUILD_PLAN.md` 关闭源码可验证的差异并准备 P1 审核批次。当前有 39 条结构化记录、99 条注册路由；所有内容均为 `in-review`、noindex，只有 4 个非内容 URL 在 sitemap。`/mcp/` 与 `/self-hosted/` 已按 §49 实现来源证据综述，深层目录/筛选仍是 P2，TODO-310 还需 Owner 确认页面价值及维护责任。12 个工具档案和全部 26 个声明了工具依赖的决策页有来源绑定的优势、限制和 FAQ；Make/Replit 价格基线及未知的月付、税费、完整成本见 TASK.md。无依赖的 `/guides/how-to-choose-a-developer-tool/` 按 ADR-0009 不附会产品引用。Alternatives/slug 映射、内容审批、历史 URL/GSC/外链证据、运营资料、通知配置、生产回滚演练以及 TASK-007 analytics/HSTS 决策仍未关闭。TASK-006 基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`；用户计划文件仍未跟踪且保持原样；详见 TASK.md、TODO.md 和 PLANS.md。
- 最新 P0.6 发布由 commit `1843969916c80e4239277f64556d297485abbb1b` 完成：GitHub CI `36348360212`、Cloudflare Pages check `5da54123-8908-4d47-80e9-5ccbd3e35824`、immutable preview 和 `toolpilot.cc` current smoke 均通过 99 页、robots、sitemap 和真实 404。正式 HTML 核验两 hub 的 noindex、档案事实和官方来源链接；发布不等于内容审批。
- Trust CTA follow-up: commit `b28eac7953b5c150bb9ddaf6a6f6400ed9e21730` adds an explicit Affiliate link label next to the approved CTA disclosure, behind the existing exact approval/evidence gates. CI `36349574064`, Pages deployment/check `b42fe8b0-b97f-4c1d-bf33-1244b2335cc0`, preview and production current smoke all passed (99 pages, robots, sitemap, 404); rendered HTML confirms no active commercial relationship was introduced.
- P0.4 已完成排版与主题审计：h1/h2 使用固定响应式断点字号，字距归零；浅/深主题默认跟随系统，页头可手动切换并保存在浏览器本地。8 类页面 x 3 个视口 x 2 种主题共 48 项检查无横向溢出或页面错误，刷新后偏好仍在；核心文本/控件最低对比度为浅色 4.93:1、深色 7.30:1。默认自有 OG 分享图已接入所有路由且构建产物检查通过，不使用第三方厂商标志。Commit `4aea803` 的 CI `36324864383`、Cloudflare Pages 检查、预览 `https://1a5cc8e2.toolpilot-git.pages.dev` 与 `toolpilot.cc` current smoke 全部通过 97 页；TODO-311 仍开放：真实 CWV/GSC 数据尚未取得。
- 技术：Next.js 16.3.6、React 19.2.8、TypeScript 5.9.3、Node 22、npm、静态导出，仍无 API/数据库/CMS/账户。
- 历史 50 条研究快照保留；当前目录有 54 个工具身份。首批 39 个结构化内容记录（12 tools / 11 compare / 6 alternatives / 4 pricing / 3 best / 3 guides）全部待用户审核，未冒充正式评价。
- 内容事实源：content/tools/、content/decisions/；历史快照：lib/catalog.mjs 的 researchTools。公开 DTO 不携带内部佣金和审核证据。
- P0.5 内容契约现支持带 `{toolSlug, sourceId}` 的 Pros、Cons、FAQ 引用；12 个工具档案和全部 26 个带声明工具依赖的决策页都已完成来源绑定证据块，并刷新依赖摘要。无依赖的通用选型指南不添加产品引用；用户批准前所有记录保持 `in-review` / noindex。
- 草稿保留 URL，noindex 且退出 sitemap；来源日期与审核/实测日期分开。逐版本审批见 ADR-0009。
- 首批范围：英文 AI Coding / AI App Builders；没有激活广告、分析或实际 Affiliate。
- 工作区含用户提供的未跟踪 `TOOLPILOT_REBUILD_PLAN.md`；不得清理或覆盖。TASK-006 变更前已检查工作区，基线为 `a419cab0891802f786c61dd4343fe5aeda75c6c7`。
- 本地安全修复与构建已验证；只有完整发布后的线上 smoke 才能证明生产更新。

## 当前阻塞

- 用户尚未批准具体内容修订；真实运营主体和公开联系渠道未提供。
- 早前对生产关键路径的抽样曾返回 403，见 docs/research/public-audit-2026-09-27.json；本轮 CNAME 切换后的正式域名 current smoke 已通过。任一环境的访问结果都不能单独推断全球可达性或 Googlebot 状态。
- Node 22 下 `npm ci` 和 `npm audit --audit-level=high` 当前通过，0 vulnerabilities；每次发布仍须重新审计。
- TASK-004 的 Git-integrated Pages 项目、CNAME 切换、正式域名 current smoke 和当前 production-monitor run 已完成；监控通知和生产回滚演练仍未完成。归档任务不是完成记录。
- 用户报告已将 `toolpilot.cc` CNAME 切换到 `toolpilot-git`；最新提交的正式域名与 immutable preview 均通过 97 页 current smoke。production-monitor run `36320017826` 成功；旧 Direct Upload 项目仍保留作恢复目标。
- 没有原始 GSC、PV、转化或收入数据。90 天运营不能从本地构建推断为完成。
- 2026-09-27 现网证据尝试：免密 PSI mobile 请求返回 429 `RESOURCE_EXHAUSTED`（每日查询配额）。历史 URL 复查见 `docs/research/archive-recheck-2026-09-27.json`：Wayback CDX 返回空数组，Common Crawl 2026-39/2026-08 报告无抓取，其他多数索引 503/504；Git 源码历史始于 ToolPilot，未提供 Crypto 路由。不能据此否定旧 URL、Google 索引或外链。GitHub branch-protection endpoint 返回 404、repository rulesets 列表为空；Actions 默认 workflow 权限为 read。通知订阅查询因 CLI 缺少 `notifications` scope 未完成；仓库 API 报告 Dependabot security updates、secret scanning、pattern scanning 与 push protection disabled，均待 Owner 审核，未更改设置。生产与预览响应头仅观察到 `nosniff`、`strict-origin-when-cross-origin`；未观察到 CSP、HSTS、X-Frame-Options、Permissions-Policy，转 TODO-315 做兼容性验证。
- Homepage metadata fix `62d0c76` aligns the root title and description with the supplied rebuild plan; Node 22 build passed with 58 tests, 97 pages and 4 indexable URLs. CI `36331166927`, Pages deployment `fa15fe18-e160-4ca0-ba67-5e5e2f9bfa97`, preview/production HTML assertions and 97-page smoke passed. No content approval or indexability state changed.
- Homepage IA release `c6031b9`: category shortcuts target stable `/tools/` anchors for AI Coding, AI App Builders and Automation; three plan-listed comparisons retain `in-review` labels; pricing records show `updatedAt`; recently verified tools render only for published records with `verifiedAt` (currently none). No "Popular" claim, new route, approval or indexability change was made. CI `36333519641` and Pages deployment/check `2084b5da-14dc-4863-9049-edaa4a46ec0a` passed; preview and production each passed 97-page current smoke and HTML/indexability assertions. Details are in TASK.md and RUNBOOK.md.
- Trust-page tranche `d31a482`: existing `/editorial-policy/` and `/disclosure/` canonicals display as Methodology and Affiliate Disclosure; copy states source-based price/feature checks, hands-on evidence requirements, conditional selection, 30/90-day review thresholds and the current absence of active commercial placements. Node 22 build passed 63 tests and 97-page artifact checks; audit found 0 vulnerabilities; CI `36335164250` and Pages deployment `da97617f-e4b4-4487-beb4-708cba57d3d1` succeeded. Preview and production passed current smoke (97 pages each), both rendered-page assertions passed, and sitemap remains at 4 URLs. See TASK.md/RUNBOOK.md.
- PROJECT.md and ARCHITECTURE.md current-state summaries were aligned with the same 39-record/97-route source snapshot; historical 38/96 and initial 66-page release evidence remains only in dated task records. Commit `66c8c1f` passed CI `36344292073`, Pages deployment/check `203d8e3e-bcb2-45a0-bd92-5edc9ba91647`, and preview/production current smoke (97 pages, robots, sitemap, 404). Follow-up `634e4de` corrected the PROJECT.md data-source tables and passed CI `36345542855`, Pages deployment/check `90c57d87-390e-4f99-8bb7-9f00c7f66eb5`, and preview/production current smoke. PRD.md now distinguishes the historical 50 Draft snapshots from 39 structured review records and reflects the current Pages rollback target; approval state is unchanged.
- PRD alignment commit `cf2bf2c` passed CI `36346260244` and Pages deployment/check `7975cc77-8804-4304-9afc-469a4a1800e7`; preview smoke passed, and production smoke passed on immediate retry after one transient fetch failure.
- 2026-09-27 current freshness/link recheck: 40 fields remain unverified (0 overdue); the 139-URL reachability report has 115 HTTP-ok, 16 restricted, 6 policy-blocked and 2 temporary-error results, with no 404/410. Full result: `docs/research/link-check-recheck-2026-09-27.json`; this does not constitute content approval. Commit `5992b1f` passed CI `36345134777`, Pages deployment/check `a77b02c0-1e22-4c04-a22c-c4c09b9bafff`, and preview/production current smoke (97 pages, robots, sitemap, 404).

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
