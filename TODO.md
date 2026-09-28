# TODO.md

> 这里是工作队列，不是当前任务的实施说明。当前 `TASK-006` 为 IN_PROGRESS；12 个工具档案和所有 26 个声明了工具依赖的决策页均有来源绑定的优势、限制和 FAQ 页面块。一个无工具依赖的通用选型指南按 ADR-0009 不伪造产品引用。2026-09-28 Continue 官方 Terms 已确认付费模型使用可通过购买 credits 或订阅，并将适用价格指向账号或 Service Order；具体账号金额及模型提供商费用仍未知。内容审批、历史证据和 Owner 决策仍是独立事项。

## Now - 已确认，等待进入执行

| ID | 事项 | 价值/原因 | 优先级 | Owner | 依赖 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| TODO-004 | 完成 GitHub 通知配置核对并保留生产监控运维入口 | CI、current production smoke 和 Pages Git Integration 已实现。2026-09-27 只读核验：branch-protection endpoint 返回 404，仓库 rulesets 列表为空；Actions 已启用且默认 workflow 权限为 read，仓库 hooks 列表为空。个人订阅 endpoint 因当前 GitHub CLI 授权缺少 `notifications` scope 无法读取；Cloudflare 侧部署通知也未核验。未更改任何设置。生产回滚演练另跟踪 TODO-302。 | P0 | 工程/运维 Owner | TASK-004 | Owner 确认有效分支规则并核验 GitHub 与 Cloudflare 通知路由 |

## Next - 近期候选

| ID | 事项 | 价值/原因 | 优先级 | Owner | 进入条件 |
| --- | --- | --- | --- | --- | --- |
| TODO-005 | 审核并批准首批内容的精确 revision/digest 与决策标准 | TASK-005 的 28 条记录仍是 `in-review`；批准必须核对依赖、官方来源、关键未知项和用户可见结论 | P1 | 产品/内容 Owner | 提供逐版本书面审核；不以部署替代内容批准 |
| TODO-006 | 确认新增内容所用的官方来源、事实核验频率和编辑审核责任 | Methodology 已说明官方来源优先级与当前 30/90 天 review queue 阈值；这不是固定发布频率。版本/digest、sources、freshness 和审批机制已在代码/ADR-0009 实现。2026-09-28 02:44 UTC freshness 队列为 31 个未核实字段、0 个逾期字段；02:50 UTC 出站检查覆盖 161 个唯一目标：131 HTTP-ok、19 restricted、6 blocked、5 temporary-error，Continue 新增的 Privacy Notice、Models 与 offline setup 三条 URL 均 HTTP 200。该隐私声明日期为 2026-02-05，描述开源产品日志/分析类别及 opt-out，但不覆盖 Continue 作为处理者代表客户处理的内容，也不证明收购后适用性、客户端设置或模型提供商处理。Continue 官方 README 与 JetBrains 对 CLI 生命周期的说法仍冲突；精确包、支持、账单与实际设置待核实。可达性不等于事实核验。完整来源边界见 `docs/content-review/TASK-006/README.md`。2026-09-27 archive recheck 保留在 `docs/research/link-check-recheck-2026-09-27-p0.6.json`。核验频率、编辑责任人和正式内容审批仍需 Owner 确认 | P1 | 产品/内容 Owner | TODO-309 内容清单及来源可用 |
| TODO-008 | 完成商业关系与独立评价隔离的业务/法务决策 | 当前模型和 disclosure 分离 Affiliate/Featured/Sponsor，但合作条款、排序规则、归因、退款和披露文案未确认 | P1 | 产品/商业/法务 Owner | 正式条款与关系证据；当前不得激活商业链接 |
| TODO-309 | 审核并确定重建计划 P1 内容批次的正式页面集合 | 已按官方来源将结构化内容扩至 12/11/6/4/3/3（tools/compare/alternatives/pricing/best/guides，共 39 条，全部 in-review）；计划列出的 10 个比较主题均有草稿，另保留 1 个清单外比较。12 个工具档案和 26 个依赖型决策页现有来源绑定的优势、限制和 FAQ。Make Core 10,000 credits 档的 USD 12/月月付与 USD 9/月年付折算、Replit Core 的 USD 20/月月付与 USD 18/月年付折算已记录官方来源；Make 官方定价表另列 AWS（EU/North America）、Core 30 天执行日志和每 10,000 月度 credits 配套 5 GB 数据传输，但不证明客户可选区域或账户数据驻留。Make 2026-09-28 官方隐私/安全资料补充应用使用数据类别、个人数据按目的保留/请求删除的表述，以及一般日志默认 30 天、Enterprise 可延长；这与 Core 计划列出的执行日志不是同一证据口径，不证明特定 workspace 的数据类别、设置、删除时限或 DPA 适用性。Replit 官方 Geography 文档补充 Core/Pro/Enterprise 发布地区选择、Free 默认北美、独立且 Pro-only 的工作区地区设置，以及发布地区不可更改、预先创建资源可能异地等限制；隐私政策说明跨境托管但不代表账户级位置表或法律意见。GitHub Copilot 官方政策说明个人 Free/Pro/Pro+/Max 交互可能用于训练并可退出，Business/Enterprise 客户数据不用于训练；这不核验当前账户设置、组织策略或模型特定留存。Aider 官方 analytics/privacy 文档说明产品分析需 opt-in，列出匿名事件类别和退出开关；官方 Docker 文档补充容器化客户端与本地仓库挂载，这些不核验本地配置、隔离或模型提供商处理。n8n 官方资料新增 Sustainable Use License 边界及 n8n 对内部使用、代客户托管/嵌入的许可示例；这不是个别用例的法律结论，也未核实任何账户协议/功能权益。n8n 自托管 Usage Data/退出边界和部署方 TLS/静态加密责任已记录；实例设置、连接服务处理和部署安全未核验。Cline Privacy Notice 区分自带 API key（Cline 称内容直接发给模型提供商且 Cline 不收集）与 Cline 提供的 key（Cline 收集内容以代发模型请求）；Terms（2025-09-25）说扩展遥测默认开启，2025-02-26 官方博客却说 opt-in，公开来源互相矛盾。实际 Cline 版本、设置、遥测负载和提供商条款未核验。账号/工作区配置、连接服务范围、结账税费、账号资格和完整运行成本仍待核对。`/compare/windsurf-vs-cursor/` 与计划顺序相反。计划要求 Cursor、Claude Code、Lovable、Bolt、n8n 五条 alternatives；当前六条草稿是 Cursor、Claude Code、Lovable、Bolt.new、Replit、Windsurf，缺 `/alternatives/n8n/` 且多两条计划外页面。PLANS.md 明确要求 Owner 先批准 `/alternatives/bolt/` 与现存 `/alternatives/bolt-new/` 的映射，批准前不新增 alternatives 记录。Continue 上游仓库只读/停止维护，Windsurf 账号级迁移/报价仍待核实。 | P1 | 产品/内容 Owner | 逐条审核 `docs/content-review/TASK-006/README.md` 与 TASK-005 清单的 revision/digest、目标搜索意图、依赖、来源、法律/维护风险和路由映射；明确责任人与通过标准。审批前不得索引或改商业状态 |
| TODO-310 | 确认 MCP 与 self-hosted 入口页范围及维护责任 | 重建计划 §49 的 P0 顶层入口已按 noindex 证据综述实现；§43/§44/§51 的深层目录、厂商子路由和过滤继续留在 P2。MCP 页仅覆盖五个现有档案明确引用官方 MCP 文档的产品；self-hosted 页区分 n8n 应用自托管、Continue 自托管模型端点和 Aider/Continue 本地推理，均是待审来源事实，不表示支持清单完整。两路由不在 sitemap，底层 39 条内容全部 in-review。 | P1 | 产品 Owner | Owner 审核具体页面范围、用户价值和维护 Owner；此项不阻止保持 noindex 的工程入口 |
| TODO-311 | 验证重建计划剩余 SEO/性能目标 | canonical、robots、sitemap、自有通用 OG 图/Twitter large-image、面包屑/JSON-LD、唯一 title/description、逐事实来源链接和三条站内结构化内容链接覆盖已由构建产物检查；P0.4 排版及浅/深主题已对 8 类页面、3 个视口、2 种主题完成 48 项浏览器检查。2026-09-27 Lighthouse 13.5.0 simulated-mobile lab runs on `/` and `/compare/cursor-vs-claude-code/` scored 0.98/0.99 with LCP 2.2/2.1s, CLS 0 and TBT 63/60ms; both noted about 27 KiB estimated unused shared JS. Evidence and limits: `docs/research/lighthouse-lab-2026-09-27.md`. These are not field CWV or GSC data. No-key PSI calls on 2026-09-27 and 2026-09-28 returned HTTP 429 `RESOURCE_EXHAUSTED` (daily query quota); no field or new lab metrics were returned. Owner must provide PSI API key or dated CrUX/GSC export and measurement window. | P2 | 工程/SEO Owner | Owner 提供 GSC/CrUX 权限或导出并记录带日期的真实窗口与指标；仅在规划独立厂商/比较图时取得第三方素材许可 |
| TODO-312 | 评估目录多维过滤及参数 URL 索引策略 | 当前首页仅支持搜索和类别过滤，状态留在客户端；计划提出免费、自托管、MCP、API、平台等过滤项 | P2 | 产品/工程 Owner | 新过滤维度有已核验数据、用户需求和 noindex 测试设计 |
| TODO-314 | 审查 GitHub 仓库级依赖与凭据保护控制 | 2026-09-28 只读复查仍显示 Dependabot security updates、secret scanning、non-provider pattern scanning 和 push protection 为 `disabled`；Advanced Security API 字段为 `null`。`main` branch-protection endpoint 返回 404，repository rulesets 列表为空。未更改设置，也不据此断言存在泄漏；Owner 需确认组织策略、计划适用性与启用范围。 | P1 | Repository/Security Owner | 确认控制项范围；按明确授权配置并验证 | Owner 决定控制项与启用范围 |
| TODO-315 | 审核并补齐 Cloudflare Pages 安全响应头 | strict per-route CSP/hash 与共享保护头随 `f4c9798` 发布；静态 404 的自身 inline-script hash CSP meta 随 `057ee368` 发布。CI `36342275495`、Pages deployment/check `96ad8a25-c4fa-46ff-99d7-ad9829dceab2` 成功；preview 和 production 均通过 97 页 current smoke，404 Chromium 页面/主题交互正常且外部 Insights 脚本失败原因为 `csp`。生产自动注入 beacon 被阻止并产生 CSP violation，无页面脚本错误。 | P1 | Engineering/Security Owner | Owner 决定禁用 Pages Web Analytics 自动注入（推荐保留当前无分析集成边界），或正式批准隐私/分析范围后再允许外部脚本；HSTS scope 单独确认前不启用 | Analytics 决策和 0 生产 CSP violations 核验后关闭非 HSTS 部分；HSTS 留待 Owner |

TODO-309 source update (2026-09-28): Devin's official current plan page lists Free USD 0/month, Pro USD 20/month, Max USD 200/month, and Teams USD 80/month plus USD 40/month per full developer seat. Its Desktop FAQ says existing Windsurf plan pricing carries over, including legacy Enterprise. This closes the public price/standard-transition research gap; an individual account quote, actual usage and account-specific update remain unresolved.

TODO-309 source update (2026-09-28): Continue's official site says it joined Cursor and that its open-source code remains available. The upstream README calls the repository read-only/no longer maintained and describes a final 2.0.0 release for VS Code, CLI and JetBrains; the JetBrains Marketplace calls the plugin community-maintained and says CLI development is active. The CLI statements conflict, so the selected package/version, update path, security response, billing and data terms remain unresolved. New official docs list local Ollama models and a VS Code offline setup that disables anonymous telemetry and configures a local model. Its Privacy Notice is dated 2026-02-05, describes open-source log/analytics categories and opt-out, and says it does not cover customer content processed on the customer's behalf. Post-acquisition applicability, client settings, model-provider handling and actual data flow remain unverified. Continue is revision 6; its `/compare/cline-vs-continue/` and `/best/open-source-ai-coding-tools/` dependents are revisions 8 and 10. All three remain in-review/noindex. Exact handoff is the TASK-006 manifest; TASK-005 does not contain these records. This evidence update does not resolve the owner-approved page set or formal review.

TODO-309 source update (2026-09-28): a fresh official artifact check narrows, but does not resolve, the Continue CLI lifecycle question. The GitHub Releases page lists `v2.1.0-vscode` as a pre-release published 2026-06-19; the official npm registry reports `@continuedev/cli` latest `1.5.47`, published 2026-06-18. These are package/version records, not proof of current CLI maintenance, security response or a support commitment; JetBrains still says CLI development is active while the repository README describes the code as read-only/final. Continue is revision 7, `/compare/cline-vs-continue/` revision 9, and `/best/open-source-ai-coding-tools/` revision 11. Their exact manifest is refreshed; all remain in-review/noindex. Account/provider billing, selected package, support and privacy applicability remain open.

TODO-309 source update (2026-09-28): n8n revision 4 now records the current repository Sustainable Use License boundary and official examples: internal business/non-commercial use; Enterprise for managing client workflows and credentials in one's own instance; white-labeled Embed for exposing embedded workflows to customers; and no separate consultant commercial license for helping on a client's own internal instance. These are vendor examples, not a legal determination for a specific deployment. The Make comparison is revision 9 and workflow guide revision 8. Exact intended-use fit, agreement, feature entitlement, checkout, telemetry and connected-service terms remain open; all affected drafts remain in-review/noindex.

TODO-309 source update (2026-09-28): Bolt revision 3 now records StackBlitz's 2026-09-22 privacy policy update: eligible Bolt AI content may be used prospectively for model development and de-identified dataset licensing unless opted out. For non-Forge content this may begin no earlier than 2026-10-07 or a later account Terms date; consented Forge content created/generated from 2026-09-14 may be eligible earlier. Account exclusions, individual Terms, region, settings and eligibility were not checked. Six dependents were refreshed to current revisions 9/9/9/7/7/4; TASK-005/TASK-006 exact manifests and the Bolt evidence pack were updated. All drafts remain in-review/noindex; TODO-005/TODO-309 owner approval remains open.

TODO-006 check update (2026-09-28 03:21 UTC): freshness reports 31 unverified fields and 0 overdue. The full link scan checked 163 unique targets (128 HTTP-ok, 19 restricted, 7 blocked, 9 temporary errors). The n8n repository license returned HTTP 200; the support FAQ's scan result was `blocked` by the host policy, but direct HTTP/browser retrieval returned 200. Reachability is not fact verification or Owner approval.

TODO-006 check update (2026-09-28 03:58 UTC): after the Bolt privacy update, freshness reports 30 unverified fields and 0 overdue. `npm run links:check` completed for 164 unique targets; the new StackBlitz privacy policy was directly retrieved (HTTP 200) and the official policy page is readable. The link checker reports per-URL restricted, blocked and temporary-error outcomes; exit status does not turn reachability into fact verification or Owner approval.

TODO-006 check update (2026-09-28 04:35 UTC): after the Lovable privacy update, freshness reports 29 unverified fields and 0 overdue. The 168-target link scan classified 127 HTTP-ok, 19 restricted, 8 blocked and 14 temporary-error targets; the four new Lovable Privacy Policy, Terms, DPA and Security URLs returned HTTP 200. Reachability does not establish account applicability, fact approval or Owner review.

TODO-309 source update (2026-09-28): Lovable revision 3 now records its Privacy Policy effective 2026-09-15: Customer Content and Usage Data may be used for model training with a free prospective opt-out on any plan; Business/Enterprise content and Usage Data, account/billing details and app end-user data are excluded. The Aug 2026 Terms grant broad training rights subject to opt-out and defer personal-data conflicts to the Privacy Policy; the Nov 2025 Business/Enterprise DPA separately bars training Customer Personal Data but permits Service Data training and says customers cannot opt out of Service Data processing while customers. The sources use different definitions and dates. Seven dependents now cite the privacy evidence at revisions 10/10/10/8/5/7/4; exact account plan, organization agreement, training setting, category mapping and region remain unverified. All eight records remain in-review/noindex; the exact TASK-005 manifest and evidence pack are updated. This does not resolve TODO-005/TODO-309 Owner approval.

TODO-309 source update (2026-09-28): Lovable revision 4 separates its Security page's EU/US/Asia Pacific Lovable Cloud regions and default no-cross-region statement from the Privacy Policy's statement that Lovable and service providers process Personal Data in multiple countries, including the US. Six region FAQs were added to the most relevant alternatives, Best and comparison drafts; all seven dependents refreshed to revisions 11/11/11/9/6/8/5. Actual workspace region, subprocessors, integrations and model-provider geography remain unchecked; eight records remain in-review/noindex with the exact TASK-005 manifest updated.

TODO-309 source update (2026-09-28): Windsurf revision 5 records Cognition's 2026 Privacy Policy and Platform Terms, its July 2026 DPA, and the separate Windsurf MSA labeled for Exafunction Services only. The documents describe different training, processing and retention scopes; Cognition Terms permit paid-tier opt-out, while the Exafunction MSA describes no training for its scoped services. Three dependency pages were refreshed to revisions 9/9/7 and TASK-005's four exact revision/digest entries and evidence pack were updated. The account's governing agreement, Service Tier, assignment notice, Order Form/DPA, opt-out setting and persistent features remain unchecked; all four drafts stay in-review/noindex. This does not resolve TODO-005/TODO-309 Owner approval.

TODO-309 source update (2026-09-28): Cursor revision 4 records its Privacy Mode training commitment, most-provider ZDR scope and safety/abuse and non-ZDR model exceptions; it also distinguishes BYOK provider handling, temporary Cloud Agent repository storage, and commercial-customer processing from individual Privacy Policy scope. Eleven dependent decision pages were refreshed with a privacy FAQ, account-setting gap and exact source digests; all affected drafts remain in-review/noindex. Actual Privacy Mode/team settings, model approvals, personal API-key use, Cloud Agent use and customer agreement remain unchecked; no account-specific privacy conclusion or Owner approval is claimed.

TODO-006 check update (2026-09-28 05:22 UTC): freshness reports 28 unverified fields and 0 overdue. The 172-target outbound scan classified 133 HTTP-ok, 19 restricted, 11 blocked by host policy and 9 temporary errors. Windsurf's Exafunction-only MSA returned HTTP 200; the three Cognition legal URLs were blocked by the configured host policy and were directly inspected from official pages, so the automated scan does not establish their reachability. All four affected content records remain in-review/noindex; reachability and source review do not constitute Owner approval.

TODO-006 check update (2026-09-28 05:41 UTC): freshness reports 28 unverified fields and 0 overdue. The 176-target outbound scan classified 134 HTTP-ok, 19 restricted, 11 host-policy-blocked and 12 temporary errors. Cursor's five cited privacy/security URLs returned HTTP 200. The scan establishes reachability only, not account applicability, claim approval or Owner review.

TODO-006 check update (2026-09-28 06:08 UTC): the date-pinned freshness run still reports 28 unverified fields and 0 overdue. The outbound scan completed for the updated source set; `www.npmjs.com/package/@continuedev/cli` returned HTTP 403 and was classified as restricted. The npm registry metadata API returned the package's current dist-tag/version and publication date; the GitHub Releases page was directly reviewed. Reachability and registry metadata do not prove current support or approve content.

TODO-311/TODO-312 verification update (2026-09-28 06:24 UTC): `npm run content:freshness -- --as-of=2026-09-28` still reports 28 unverified fields and 0 overdue. The 28 consist of 9 `selfHosting`, 9 `localModels`, and 9 `portability` facts across tool profiles, plus Continue's model/account-usage price. These are unknowns, not negative claims or stale/overdue facts. The 27 facets needed to evaluate proposed directory filters remain unverified; TODO-312 still needs verified facet values, evidence of user demand and a noindex/parameter-URL test design before implementation.

TODO-309 source update (2026-09-28): n8n revision 5 records official workflow JSON export/import, the n8n CLI package migration path (still Preview), and CLI backup omissions for users/roles, execution history/logs, variables and instance settings. It also surfaces credential-name/ID and cURL auth-header exposure in workflow JSON, and the `.n8n` folder/database/external-storage/custom-node requirements for full recovery. `/compare/make-vs-n8n/` revision 10 and `/guides/workflow-automation-selection/` revision 9 now cite the same evidence; all three exact digests and review handoff are refreshed. Commit `71304bd` passed clean `release:check`, CI `36391050585` and Pages deployment/check `2ed27436-523b-4662-8eaf-b7c78d043af5`; preview and production smoke plus source/noindex/sitemap checks passed. No cross-instance migration or restore was tested; all records remain in-review/noindex and TODO-309 remains open for Owner review.

TODO-309 source update (2026-09-28): n8n revision 6 records official Ollama Chat Model/credentials and the self-hosted AI Starter Kit path. Credentials default to a local Ollama endpoint but can target remote authenticated instances; container networking may need configuration, and the starter kit is documented for proof-of-concept/demo use with production hardening required. Its Make comparison and workflow-selection guide are revisions 11/10 with exact digests and refreshed review handoff. The three new official URLs returned 200; this is reachability only. Commit `6fae074` passed clean `release:check`, CI `36393302469` and Pages deployment/check `baf84f26-5119-4dbf-89e9-fcd8d28d6345`; preview and production smoke plus source/noindex/sitemap checks passed. No model, instance, network or workflow data path was tested; all remain in-review/noindex.

TODO-311/TODO-312 verification update (2026-09-28 07:09 UTC): date-pinned freshness now reports 27 unverified fields and 0 overdue after n8n's workflow-portability fact was source-verified. The remaining unknowns are 9 `selfHosting`, 9 `localModels`, 8 `portability` fields and Continue's model/account-usage price; they are not negative or overdue findings. The 26 remaining product facets for proposed directory filters are still unverified, and TODO-312 still requires demand evidence and a noindex/parameter-URL test design.

TODO-311/TODO-312 verification update (2026-09-28 07:39 UTC): date-pinned freshness reports 26 unverified fields and 0 overdue after n8n's `localModels` fact was source-verified. Remaining unknowns are 9 `selfHosting`, 8 `localModels`, 8 `portability` fields and Continue's model/account-usage price. The 26 remaining product facets for proposed directory filters are still unverified; TODO-312 still needs demand evidence and a noindex/parameter-URL test design.

TODO-315 read-only production update (2026-09-28 06:25 UTC): `SMOKE_BASE_URL=https://toolpilot.cc npm run smoke` passed for 99 pages, robots, sitemap and a real 404. `HEAD /` returned HTTP 200 with both CSP policies, `X-Frame-Options: DENY`, `Permissions-Policy`, `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`; no HSTS header was observed. This confirms deployed headers only; Cloudflare Web Analytics dashboard state remains unchecked, the previously observed browser beacon/CSP violation remains an Owner decision, and HSTS scope is still open.

## Later - 暂不承诺

- TODO-101：Newsletter Sponsor、ToolPilot Pro、Lead Gen、工具数据库 API — 重新评估条件：MVP 内容质量、合规披露、用户转化和运营能力已验证。
- TODO-102：用户账户、厂商后台、CMS、支付和高级个性化推荐 — 重新评估条件：PRD 明确角色、数据、权限、迁移和回滚边界。

## Blocked - 已阻塞

| ID | 事项 | 阻塞原因 | 等待对象 | 下一次检查 |
| --- | --- | --- | --- | --- |
| TODO-302 | 演练 Cloudflare Pages 回滚和域名恢复流程 | Git Integration 与域名迁移已完成；尚未在生产窗口执行上一份 verified deployment 恢复，需 Owner 安排并授权操作窗口 | 运维/项目 Owner | Owner 确认生产演练窗口和操作人 |
| TODO-306 | 完成旧 URL 的索引、外链和迁移证据采集 | `docs/url-audit.csv` 仍只是当前 99 个源码路由。2026-09-27 复核见 `docs/research/archive-recheck-2026-09-27.json`：Wayback CDX 成功但返回空数组；Common Crawl 2026-39/2026-08 对域名无抓取，其余多数索引 503/504；Git 源码历史始于 ToolPilot。没有由此推断旧 URL、未索引或无外链，也未作 301/410。 | 项目/SEO Owner | 提供 Search Console 导出、旧 sitemap、可核验外链/日志和受影响域名清单 |
| TODO-307 | 补全公开运营主体、监控联系渠道和法律事实 | About/Contact/Privacy/Terms 页面结构存在；真实运营者、联系邮箱和最终法律文字尚未提供 | 项目 Owner/法务 | 提供准确资料并审核用户可见版本；不得编造地址或团队 |
| TODO-308 | 批准 GA4、AdSense、Affiliate 或其他追踪/商业上线 | 源码未集成 GA4/AdSense/Affiliate；TASK-007 生产浏览器却观察到 Cloudflare Insights beacon 被 CSP 阻止，提示 Pages Web Analytics 可能已在 Dashboard 启用。Cloudflare 官方说明该设置可自动注入 beacon（[Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/)）；当前 Dashboard 未读取或更改，不能将其视为已批准。首页比较研究没有真实使用量依据，因此不宣称“Popular”。 | P1 | 项目/隐私/法务/商业 Owner | Owner 核实/决定 Pages Web Analytics；批准前保持 CSP 阻止外部 beacon。若批准需记录采集范围、保留/同意/隐私文案，并单独批准 CSP 允许的脚本与 beacon 端点 |

## 发现问题记录规则

- 当前任务范围外的问题只记录：症状、影响、证据、建议优先级。
- 不在 TODO 中写完整实现计划；进入执行时创建/替换 `TASK.md`。
- 已完成项从 TODO 删除，并在 `CHANGELOG.md` 或 Issue 系统保留历史。

## Completed in TASK-001

- `TODO-001`：从空工作区重新建立 `app/`、`components/`、`lib/`、`package.json`、锁文件和 Next 配置；旧生成物不作为恢复输入。
- `TODO-002`：恢复 `.nvmrc` Node 22，并在 Node 22.23.0/npm 10.9.8 下完成安装和验证。
- `TODO-003`：按项目 Owner 确认，旧 Crypto/DeFi 生成内容不迁移到 ToolPilot。
- `TODO-009`：将 `README.md` 改为 ToolPilot 项目入口和本地运行说明。

## Completed in TASK-002

- `TODO-004` 的静态托管、生产域名和公共 smoke 子项：创建 Cloudflare Pages `toolpilot`，绑定 `toolpilot.cc`，验证 5 条生产关键路径 200；CI、监控和回滚演练仍保留在 TODO-004/TODO-302。
- 50 条研究快照目录：产品官网、研究来源和商业状态已接入；5 条研究来源链接明确保留为 TBD。

## Completed in TASK-003

- 50 条记录已增加研究快照日期、产品/来源链接检查、来源状态、编辑审核状态、审核 Owner、审核日期和正式核验日期。
- 逐条清单和当前访问证据见 `docs/content-review/TASK-003-2026-08-20.md`；完成正式内容发布前仍需产品/内容 Owner 逐条核验事实、来源新鲜度和商业条款。
- 页面已部署并复核 `Draft`、`Pending` 和受限链接提示；正式审核状态没有被自动 HTTP 检查替代。

## Implemented in TASK-004 (historical record; remaining gates stay above)

- CI、current 生产 smoke、定时监控入口已加入 `.github/workflows/`；Cloudflare Pages Git Integration 已建立独立项目并完成生产域名切换；手动 Pages 发布 workflow 已移除。
- `npm run release:check` 已加入并由 4 个测试覆盖；`4776027` 上的真实工作区检查已通过。
- Direct Upload 部署 `be8ecb81` 保留作恢复目标；CNAME 切换后的 `toolpilot.cc` current smoke 通过。`TODO-004` 和 `TODO-302` 仍等待通知和真实生产回滚演练。

## Completed in TASK-004

- `TODO-303`：`4776027` 已推送、通过 `release:check`，并以 Cloudflare Production source 部署；部署 ID 为 `be8ecb81-fcad-4058-8909-e80befb441ab`，生产 smoke 已通过。

- `TODO-304`：Cloudflare Pages Git Integration 项目 `toolpilot-git` 已接入 `main` 并承载 `toolpilot.cc`；新域名路由通过 88 页面 current smoke，旧 Direct Upload 项目保留作恢复目标。


## TASK-005 follow-up gates (2026-09-27)

- [x] SECURITY-005: update Next.js/eslint-config-next to 16.3.6, sharp to 0.35.4 and js-yaml to 4.3.2; Node 22 locked install and `npm audit --audit-level=high` pass with 0 vulnerabilities. Next.js advisories fixed include GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4 and GHSA-vcvr-r3jv-pc5j; sharp/js-yaml advisories: GHSA-rgj7-g3m4-5g8c and GHSA-2883-xcg3-v3hh.
- CONTENT-005: user review of exact first-batch revisions; confirm Windsurf account-level transition/entitlement, Replit account eligibility and checkout taxes, and all decision-critical unknowns or narrow claims honestly. Public Replit monthly and annual-billed Core prices are now recorded.
- TRUST-005: confirm public operator identity and monitored contact; complete privacy and terms review before commercial activation.
- OPS-005: repeat production checks from an unrestricted environment; obtain actual legacy URL/GSC evidence. No guessed Crypto redirects.
- Preserve TASK-004 migration/notification/rollback obligations in docs/tasks/TASK-004-before-remediation.md.
- GROWTH-005: begin real 90-day GSC review only after authorized release. MCP, Chinese, calculators, ads and analytics require a later scoped task.

## Closed in TASK-005 / TASK-006 planning

- `TODO-007`: static export, versioned JSON decision content and Pages topology are documented in ADR-0001, ADR-0008 and ADR-0009. Keep Next.js static export unless a new accepted ADR changes it; no Astro migration is planned by default.

## Completed in TASK-006

- `TODO-313`: added source-bound Pros/Cons/FAQs to all 26 decision records with declared tool dependencies, refreshed affected revisions and both review manifests, and added regression coverage. The general guide `/guides/how-to-choose-a-developer-tool/` has no tool dependency and intentionally receives no product-evidence block under ADR-0009. Exact owner review remains under TODO-005/TODO-309; records remain `in-review` and noindex.
- `TODO-309` Copilot evidence tranche: GitHub's Local BYOK docs now distinguish supported client-side keys from Enterprise BYOK's server-side Copilot API route and bound Copilot CLI's offline/local-provider behavior. Revision 5 and six dependent drafts are in the exact TASK-005/TASK-006 manifests; 89 tests, content/build/artifact checks, zero-high audit and local smoke passed. The full 186-target source-link scan completed (147 HTTP-ok, 20 restricted, 11 host-policy blocked, 8 temporary errors); both new sources returned 200. Commit `15f5492` passed clean `release:check`, CI `36397813336`, Pages deployment/check `5c2f37dc-580a-4739-8d76-1a1e61620098` and preview/production smoke with source/noindex/sitemap assertions. All records remain in-review/noindex; page-set approval and exact content review remain open.
- `TODO-305`: moved checkout/setup-node/upload-artifact to Node 24-capable action releases and pinned all GitHub workflows to `ubuntu-24.04`; CI run `36320003473`, maintenance artifact run `36320017843`, and current production-monitor run `36320017826` passed. The Cloudflare Pages deployment and preview/production smoke are recorded in `TASK.md`.
