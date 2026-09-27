# TODO.md

> 这里是工作队列，不是当前任务的实施说明。当前 `TASK-006` 为 IN_PROGRESS；12 个工具档案和所有 26 个声明了工具依赖的决策页均有来源绑定的优势、限制和 FAQ 页面块。一个无工具依赖的通用选型指南按 ADR-0009 不伪造产品引用。内容审批、历史证据和 Owner 决策仍是独立事项。

## Now - 已确认，等待进入执行

| ID | 事项 | 价值/原因 | 优先级 | Owner | 依赖 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| TODO-004 | 完成 GitHub 通知配置核对并保留生产监控运维入口 | CI、current production smoke 和 Pages Git Integration 已实现。2026-09-27 只读核验：`main` 未启用 branch protection（GitHub API 404），Actions 已启用且默认 workflow 权限为 read，仓库 hooks 列表为空；个人通知订阅及 Cloudflare 侧部署通知仍不能由仓库检查证明。生产回滚演练另跟踪 TODO-302。 | P0 | 工程/运维 Owner | TASK-004 | Owner 配置/确认 branch protection 与通知路由 |

## Next - 近期候选

| ID | 事项 | 价值/原因 | 优先级 | Owner | 进入条件 |
| --- | --- | --- | --- | --- | --- |
| TODO-005 | 审核并批准首批内容的精确 revision/digest 与决策标准 | TASK-005 的 28 条记录仍是 `in-review`；批准必须核对依赖、官方来源、关键未知项和用户可见结论 | P1 | 产品/内容 Owner | 提供逐版本书面审核；不以部署替代内容批准 |
| TODO-006 | 确认新增内容所用的官方来源、事实核验频率和编辑审核责任 | 版本/digest、sources、freshness 和审批机制已在代码/ADR-0009 实现；尚需为后续内容选定来源和实际维护 Owner | P1 | 产品/内容 Owner | TODO-309 内容清单及来源可用 |
| TODO-008 | 完成商业关系与独立评价隔离的业务/法务决策 | 当前模型和 disclosure 分离 Affiliate/Featured/Sponsor，但合作条款、排序规则、归因、退款和披露文案未确认 | P1 | 产品/商业/法务 Owner | 正式条款与关系证据；当前不得激活商业链接 |
| TODO-309 | 审核并确定重建计划 P1 内容批次的正式页面集合 | 已按官方来源将结构化内容扩至 12/11/6/4/3/3（tools/compare/alternatives/pricing/best/guides，共 39 条，全部 in-review）；计划列出的 10 个比较主题均有草稿，另保留 1 个清单外比较。12 个工具档案和 26 个依赖型决策页现有来源绑定的优势、限制和 FAQ。Make Core 的 USD 9/月（10,000 credits，年付）和 Replit Core 的 USD 18/月（年付折算）已记录官方基线；月付金额、数量/地区结账税费和完整运行成本仍需核对。`/compare/windsurf-vs-cursor/` 与计划顺序相反；Alternatives 数量 6 但 `/alternatives/bolt-new/` vs `/alternatives/bolt/` 和 n8n 替代候选仍未核定。Continue 上游仓库只读/停止维护，Windsurf 账号级迁移/报价仍待核实。 | P1 | 产品/内容 Owner | 逐条审核 `docs/content-review/TASK-006/README.md` 与 TASK-005 清单的 revision/digest、目标搜索意图、依赖、来源、法律/维护风险和路由映射；明确责任人与通过标准。审批前不得索引或改商业状态 |
| TODO-310 | 决定 MCP 与 self-hosted 路由优先级和第一批页面边界 | 重建计划 §5/§49 列作 P0，§43/§44/§51 又列为未来/P2；代码目前没有这两个路由 | P1 | 产品 Owner | 在 PRD/TASK 中确认优先级、内容价值和维护 Owner；确认前不建空页、不进 sitemap |
| TODO-311 | 验证重建计划剩余 SEO/性能目标 | canonical、robots、sitemap、自有通用 OG 图/Twitter large-image、面包屑/JSON-LD、逐事实来源链接和三条站内结构化内容链接覆盖已由构建产物检查；P0.4 排版及浅/深主题已对 8 类页面、3 个视口、2 种主题完成 48 项浏览器检查，含系统偏好、键盘切换、持久化、对比度与溢出。真实 Core Web Vitals 和 GSC 表现仍未测量；2026-09-27 无密钥 PSI mobile 请求返回 429 `RESOURCE_EXHAUSTED`（每日查询配额），需 Owner 提供 PSI API key 或 CrUX/GSC 导出及指标窗口。 | P2 | 工程/SEO Owner | Owner 提供 GSC/CrUX 权限或导出并记录带日期的真实窗口与指标；仅在规划独立厂商/比较图时取得第三方素材许可 |
| TODO-312 | 评估目录多维过滤及参数 URL 索引策略 | 当前首页仅支持搜索和类别过滤，状态留在客户端；计划提出免费、自托管、MCP、API、平台等过滤项 | P2 | 产品/工程 Owner | 新过滤维度有已核验数据、用户需求和 noindex 测试设计 |

## Later - 暂不承诺

- TODO-101：Newsletter Sponsor、ToolPilot Pro、Lead Gen、工具数据库 API — 重新评估条件：MVP 内容质量、合规披露、用户转化和运营能力已验证。
- TODO-102：用户账户、厂商后台、CMS、支付和高级个性化推荐 — 重新评估条件：PRD 明确角色、数据、权限、迁移和回滚边界。

## Blocked - 已阻塞

| ID | 事项 | 阻塞原因 | 等待对象 | 下一次检查 |
| --- | --- | --- | --- | --- |
| TODO-302 | 演练 Cloudflare Pages 回滚和域名恢复流程 | Git Integration 与域名迁移已完成；尚未在生产窗口执行上一份 verified deployment 恢复，需 Owner 安排并授权操作窗口 | 运维/项目 Owner | Owner 确认生产演练窗口和操作人 |
| TODO-306 | 完成旧 URL 的索引、外链和迁移证据采集 | `docs/url-audit.csv` 已列出当前源码的 97 个注册路由，但不是历史 URL 清单。2026-09-27 公开档案核查不完整：Wayback CDX 临时离线；Common Crawl wildcard 查询被规范化为根路径，改用 domain 匹配后遇到 502/504，其他三个索引 503。这些失败不能证明旧 URL 不存在、未索引或无外链，也不能据此作批量 301/410。 | 项目/SEO Owner | 提供 Search Console 导出、旧 sitemap、可核验外链/日志和受影响域名清单 |
| TODO-307 | 补全公开运营主体、监控联系渠道和法律事实 | About/Contact/Privacy/Terms 页面结构存在；真实运营者、联系邮箱和最终法律文字尚未提供 | 项目 Owner/法务 | 提供准确资料并审核用户可见版本；不得编造地址或团队 |
| TODO-308 | 批准 GA4、AdSense、Affiliate 或其他追踪/商业上线 | 当前均未集成；计划提出收入优先级但没有隐私主体、CMP/同意要求、合作方条款、归因及退款规则 | 项目/隐私/法务/商业 Owner | 单独批准数据字段/保留期、适用同意机制、合作条款、披露与可见标识；之前不得加脚本或商业承诺 |

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
- CONTENT-005: user review of exact first-batch revisions; confirm Windsurf account-level transition/entitlement, Replit monthly-payment/account-specific checkout and all decision-critical unknowns or narrow the claims honestly. Public Replit Core annual-billed baseline is now recorded.
- TRUST-005: confirm public operator identity and monitored contact; complete privacy and terms review before commercial activation.
- OPS-005: repeat production checks from an unrestricted environment; obtain actual legacy URL/GSC evidence. No guessed Crypto redirects.
- Preserve TASK-004 migration/notification/rollback obligations in docs/tasks/TASK-004-before-remediation.md.
- GROWTH-005: begin real 90-day GSC review only after authorized release. MCP, Chinese, calculators, ads and analytics require a later scoped task.

## Closed in TASK-005 / TASK-006 planning

- `TODO-007`: static export, versioned JSON decision content and Pages topology are documented in ADR-0001, ADR-0008 and ADR-0009. Keep Next.js static export unless a new accepted ADR changes it; no Astro migration is planned by default.

## Completed in TASK-006

- `TODO-313`: added source-bound Pros/Cons/FAQs to all 26 decision records with declared tool dependencies, refreshed affected revisions and both review manifests, and added regression coverage. The general guide `/guides/how-to-choose-a-developer-tool/` has no tool dependency and intentionally receives no product-evidence block under ADR-0009. Exact owner review remains under TODO-005/TODO-309; records remain `in-review` and noindex.
- `TODO-305`: moved checkout/setup-node/upload-artifact to Node 24-capable action releases and pinned all GitHub workflows to `ubuntu-24.04`; CI run `36320003473`, maintenance artifact run `36320017843`, and current production-monitor run `36320017826` passed. The Cloudflare Pages deployment and preview/production smoke are recorded in `TASK.md`.
