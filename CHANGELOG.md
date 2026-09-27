# Changelog

## Unreleased — TASK-006 implementation (2026-09-27)

- Label an approved Affiliate destination explicitly beside its CTA and disclosure; incomplete or unapproved relationships continue to use the ordinary product URL. Commit `b28eac7` passed CI `36349574064` and Pages deployment/check `b42fe8b0`; preview and production current smoke passed 99 pages, robots, sitemap and real 404.
- Render the bound `verifiedAt` date as `Last verified` on approved pages and retain an explicit pending status on review drafts; generated artifact checks enforce both states. Commit `5057ab8` passed CI `36350165202` and Pages deployment/check `6e614c18`; preview and production current smoke passed 99 pages, robots, sitemap and real 404.
- Enforce unique page titles and descriptions across generated routes in the static artifact check. Commit `86b8e1a` passed CI `36351183143` and Pages deployment/check `558b1087`; preview and production current smoke passed, and an online audit confirmed uniqueness across all 99 pages.
- Preserve 50 historical snapshots; add Claude Code/Cline identities and 28 owner-review drafts with field sources and explicit gaps.
- Add version/digest approval and dependency checks, ordinary/commercial link separation and allowlisted client catalog data.
- Add comparison, alternatives, pricing and best detail templates; rewrite the decision guide, add an interaction-style guide and trust pages.
- Exclude pending content from sitemap, add per-page metadata/canonical and keep original URLs available.
- Add content, artifact, freshness and safe outbound-link checks; keep legacy smoke available for explicit recovery checks after the authorized cutover.
- Patch Next.js/eslint-config-next to 16.3.6, sharp to 0.35.4 and js-yaml to 4.3.2; locked audit now passes locally.
- Production deployment and online verification are authorized for each progress. After the CNAME cutover, commit `4fb09bca` deployed successfully; the immutable preview and `toolpilot.cc` passed current-profile smoke across 88 pages, robots, sitemap and a real 404, and manual production-monitor run `36299788937` passed. Editorial drafts remain noindex and unapproved.
- Add a marked comparison of the source research report against TASK/TODO, separating covered work, under-specified acceptance, explicit deferrals and unsupported business targets.
- Add TASK-006 planning by comparing the supplied rebuild plan with current routes, content counts, templates, SEO and release gates; no product code or public behavior changed.
- Start TASK-006 P0 implementation: generate a source-only inventory for 88 registered URLs while leaving live/index/backlink and historical coverage unknown; add visible breadcrumbs with matching BreadcrumbList JSON-LD, Twitter summary metadata and comparison rows from cited profile facts. Commit `800a817` and final mobile-wrap refinement `b7e9b0d` passed CI; latest Pages deployment `3c4b4d7a-4b7b-47e0-a384-8d06353218c0` passed preview and production current smoke. All 28 editorial records remain in-review.
- Add four official-source P1 profiles (Aider, Continue, n8n, Make), the five missing plan comparison drafts and a conditional open-source coding shortlist. Add exact revision/digest review handoff; preserve Continue's upstream-maintenance warning and unresolved Make paid-price selector. The content set now has 38 in-review records and the generated source URL inventory covers 96 routes; none of these drafts is approved for indexing.
- Tighten related-decision links by page type and shared evidence, cap each detail page at five contextual links, and show direct source links beside known comparison values. Node 22 build, 47 tests, audit, release check, GitHub CI run `36308661143`, Pages deployment `f552840a-c154-4086-9bb5-ec5c5061e2a1` and 96-page preview/production smoke pass on commit `98d0be0`.
- Add source-backed MCP facts for Cursor, Claude Code, GitHub Copilot, Cline and Continue; refresh all 18 dependent decision revisions/digests and exact review handoffs. Artifact checks verify profile and comparison citations render; all 38 records remain in-review and noindex. Commit `4363baa` passed release readiness and CI run `36310506062`, deployed as Pages deployment `bd8c8795-7ff5-4540-8c5a-559a693fb380`; its preview and `toolpilot.cc` each passed 96-page current smoke.
- Add validated source references for optional Pros, Cons and FAQ blocks; document official MCP strengths, constraints and FAQs on five tool profiles. Correct Cursor's MCP citation to `https://cursor.com/docs/mcp`, refresh five tool and 18 dependent decision revisions/digests, and keep all records in-review/noindex. Commit `eee8485` passed CI run `36313122069` and deployed as Pages deployment `3b3c9451-b893-428a-b618-e12e9c729228`; preview and `toolpilot.cc` each passed 96-page current smoke.
- Extend source-bound strengths, constraints and FAQs to all 12 tool profiles; add current official Make credit, n8n hosting, Replit checkpoint and Devin Desktop evidence. Add a workflow-automation selection guide and validated curated internal links; enforce at least three unique structured-content destinations per structured page. All 39 records remain in-review/noindex pending exact owner approval. Commit `4c4af35` passed CI run `36316430513` and deployed as Pages deployment `47c45f5c-3f47-4183-b85a-2267f16d148f`; preview and `toolpilot.cc` each passed 97-page current smoke.
- Add source-bound strengths, constraints and FAQs to the five TASK-006 comparisons, open-source coding shortlist and workflow-automation guide; refresh exact revisions and handoff digests while keeping all drafts noindex. Commit `1374c70` passed CI run `36317440965` and deployed as Pages deployment `0872ba3f-9f8b-4f2c-9fab-ac0c98d8e340`; preview and `toolpilot.cc` each passed 97-page current smoke.
- Add source-bound Pros/Cons/FAQs to the remaining 19 dependency-backed decision drafts, completing all 26 eligible decision pages; keep the dependency-free selection guide outside the product-evidence contract. Update the Windsurf record from the current Devin Desktop FAQ while preserving account-specific pricing/migration gaps. All drafts remain in-review/noindex. Commit `953f40f` passed CI run `36319265195` and deployed as Pages deployment `4853fdac-190c-4ba7-bc13-4809e6adf85d`; preview and `toolpilot.cc` each passed 97-page current smoke.
- Record official annual-billed pricing baselines for Make Core (USD 9/month at 10,000 credits) and Replit Core (USD 18/month equivalent), with monthly-payment, location-tax, account and total-cost gaps retained. Refresh nine dependent decision revisions/digests, both exact-version review manifests and the Replit evidence pack; all affected records remain in-review/noindex pending owner approval. Commit `a458f4c` passed release readiness and CI run `36327141595`; Pages deployment `ae4c6e18-7a74-4851-a34d-d58109e85807` passed preview and production current smoke for 97 pages.
- Extend the official price evidence to both payment cadences: Make Core at 10,000 credits is USD 12/month monthly or USD 9/month equivalent annually; Replit Core is USD 20/month monthly or USD 18/month equivalent annually. Refresh nine dependent decision records and exact-version review materials, add price-cadence regression coverage, and retain all records as in-review/noindex. Commit `8621ad2` passed clean-worktree release readiness, CI `36353385575`, and Pages deployment/check `a0f2e6fd-060d-4d10-9b57-5cc909d51cff`; preview and production current smoke passed for 99 pages, robots, sitemap and a real 404. Regional checkout, account and total-cost gaps remain open.
- Record Make's official Core plan limits from its pricing table: AWS (EU/North America) infrastructure locations, 30-day execution-log storage, and 5 GB data transfer per 10,000 monthly credits. Update dependent content and exact review digests, with explicit account-residency and broader-retention caveats; all drafts remain in-review/noindex. Commit `fb1ca93` passed CI `36354811527` and production current smoke (99 pages, robots, sitemap and 404); direct checks confirmed the facts/source/noindex on both affected pages.
- Record Replit's current official privacy and geography boundaries: selectable published-app regions for Core/Pro/Enterprise, Free's North America default, separate Pro-only workspace geography, permanent publishing selection, pre-existing-resource caveat and policy cross-border hosting statement. Refresh seven dependent records and exact review materials; all drafts remain in-review/noindex, with account/resource/legal/export questions open. Commit `b7beaf8` passed CI `36356095188` and Pages deployment/check `6bcfc2ba`; preview and production current smoke passed 99 pages, robots, sitemap and real 404, with direct source/noindex assertions.
- Upgrade GitHub Actions checkout/setup-node/upload-artifact to Node 24-capable releases and pin CI, content-maintenance and production-monitor runners to `ubuntu-24.04`; the site build continues to use Node 22. Commit `344bd9f` passed release readiness and CI run `36320003473`; manual content-maintenance run `36320017843` uploaded its report artifact, production-monitor run `36320017826` passed, and Pages deployment `9b49edf9-c90b-4ada-ac42-cc87a0855153` passed preview and production current smoke.
- Align heading typography with the repository frontend rules and add system-aware light/dark themes with a persistent header selector. Browser checks covered eight page types at 375/768/1440px under both themes. Commit `97d864c` passed CI run `36323122950`; Pages deployment `d4fc47b9-a0fc-424d-a80f-c2365f98cfe3` passed preview and production current smoke. This does not provide real-user Core Web Vitals data.
- Add an editable first-party SVG share card and checked-in 1200x630 PNG; apply it to every registered route's Open Graph and Twitter large-image metadata. Static artifact checks require the image format/dimensions, metadata alt text and both references on all route pages. Commit `4aea803` passed CI run `36324864383`, Cloudflare Pages deployment check and 97-page preview/production smoke. Vendor-specific artwork and real GSC/Core Web Vitals evidence remain gated.
- Set the homepage title and description to the exact rebuild-plan metadata. Add category shortcuts into the existing tool directory, named comparison research with review labels, pricing update dates and an eligibility-gated verified-tools section. No popularity claim or content approval is inferred; all drafts retain their existing noindex state. Commit `c6031b9` passed CI `36333519641`; Pages deployment `2084b5da-14dc-4863-9049-edaa4a46ec0a` and preview/production current smoke passed for 97 pages, robots, sitemap and 404.
- Present the existing editorial-policy and disclosure pages as Methodology and Affiliate Disclosure while preserving their canonical paths. Explain source-based price/feature checks, conditional selection, documented-test requirements, the 30/90-day review thresholds and the current absence of active commercial placements; update shared trust links and artifact assertions. No route, content approval or commercial status changes.
- Trust-page commit `d31a482` passed CI run `36335164250` and Cloudflare Pages deployment `da97617f-e4b4-4487-beb4-708cba57d3d1`; preview and production current smoke passed for all 97 pages, robots, sitemap and 404.


本文件记录用户可感知、运维可感知或兼容性相关的已交付变化。当前版本为本地未发布的 `0.1.0`；用户提供的 `TOOLPILOT_REBUILD_PLAN.md` 保持未跟踪且未修改，Cloudflare Pages 发布证据按条目记录。

## [Unreleased]

### Added

- Add noindex `/mcp/` and `/self-hosted/` evidence overview routes to global navigation. Render source-bound draft facts, exact official source links and explicit review status; defer deep directories and filters to P2.

- 初始化 ToolPilot 项目上下文、产品草案、架构观察、安全边界、测试阻塞和运行手册。
- 增加源码恢复、Node 22、旧 Crypto/DeFi 内容迁移、CI/部署/监控等后续 TODO。
- 记录早期检查读到的生成物和配置样例在最终复核时消失；后续项目 Owner 确认这些文件是主动删除内容，本次重建不做恢复。
- 从空工作区重新建立 Next.js 16.3.1 静态导出 MVP：首页、工具目录/详情、Compare、Alternatives、Stacks、Guides、法律页面、robots 和 sitemap。
- 增加 Node 22/npm 锁定依赖、TypeScript、ESLint、Node test runner 和本地 HTTP smoke test 入口。
- 将 `README.md` 从通用工作流模板改为 ToolPilot 的运行、阅读顺序和产品边界入口。
- 接入研究对话中的 50 条开发者工具产品草稿，分离产品官网、研究来源、研究商业状态、佣金备注和待核验字段。
- 为工具目录和详情页增加官网出站链接、研究来源链接及 Affiliate/Partner/Referral/Popular/Pending 的非承诺性标记。
- 创建 Cloudflare Pages 项目 `toolpilot`，部署 `out/`，绑定生产域名 `https://toolpilot.cc`，并完成首页、目录、详情、robots 和 sitemap 公网 smoke。
- 为 50 条研究草稿增加研究快照日期、产品/来源链接检查、来源状态、编辑审核状态、审核 Owner 和正式核验日期字段；增加逐条内容审核清单和正式发布门槛。
- 发布 TASK-003 静态产物，部署预览为 `https://a888f675.toolpilot-2cy.pages.dev`；`toolpilot.cc` 生产关键路径返回 200，sitemap 含 50 条工具 URL。
- 增加 `npm run smoke`、GitHub Actions CI、每 15 分钟生产 smoke 监控和手动 immutable reviewed commit SHA 发布/回滚 workflow；外部 Secrets、通知和真实回滚演练仍待配置。
- 增加 `npm run release:check` 发布前门槛和 4 个测试，拒绝非 Node 22、短 SHA、非 GitHub/带凭据 remote、dirty worktree 或未跟踪发布文件。

### Changed

- 明确 ToolPilot 的目标定位为 Developer、Indie Hacker 和 AI Builder 的开发者工具发现与决策平台。
- 明确免费基础收录、Affiliate、Featured 和 Sponsor 的信任与披露边界；本次没有上线商业功能。
- 旧 Crypto/DeFi 生成内容按项目 Owner 确认不迁移；当前 50 条目录条目均标记为 Draft/Research snapshot，不能视为正式事实或佣金承诺。
- 明确产品/来源 URL 的 HTTP 可达证据不等于价格、功能、限制、更新时间或商业条款已核验；受限链接和缺少来源的条目继续保留 Draft/TBD。
- 整理静态页面的共享内容区段、目录审核提示和站点 URL 配置；分类筛选按钮补充可访问的选中状态，未改变目录事实或公开路由。

### Fixed

- 修正文档模板中未区分“已验证事实”“目标设计”和“TBD”的问题。

### Security

- 记录外部输入、URL、密钥、分析数据、依赖审计和商业披露的安全边界；本次没有读取或修改真实密钥。

### Deprecated

- 没有已确认的运行时弃用项；分析和商业能力仍未上线。

### Removed

- 没有删除业务代码、依赖、数据或部署资源；本次只从当前空工作区创建新代码和配置。

版本：本地未发布的 `0.1.0`；生产发布链接：`https://toolpilot.cc`；TASK-004 reviewed commit `4776027` 已推送并部署，Cloudflare source 与仓库提交一致，生产 smoke 已通过；GitHub CI run `32442681654` 成功。

2026-08-21：开始将 Cloudflare Pages 生产发布从 Direct Upload 迁移到 Git Integration；仓库新增 `npm run cloudflare:build`，正常发布不再依赖 GitHub Actions Cloudflare API Token，外部新 Pages 项目和域名迁移待完成。
