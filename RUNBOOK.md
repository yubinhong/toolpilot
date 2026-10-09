# RUNBOOK.md

## TASK-013 Opus 5.5 vs Astra article and comparison menu (2026-10-09)

The approved 13th route is `/compare/opus-5-5-vs-astra/`; `/compare/` now uses a native disclosure with four article links and a height-limited expanded list. The article has 835 English words, no Han characters, and 3.83% keyword density; its exported title and H1–H6 include the target phrase. Astra's shared record now includes the official long-context cache-write rate.

Node 22.23.2/npm 10.9.8 `npm run cloudflare:build` passed lint, typecheck, 38 tests, static export, and artifact checks. `npm audit --audit-level=high` found 0 vulnerabilities. Local Wrangler Pages smoke passed all 13 routes, exact sitemap, robots, and retired-route 404 checks. Chromium checks at 1440px, 390px, and 320px found no horizontal overflow on the article; its table scrolls on narrow screens. The `/compare/` disclosure opens with four links, with the model picker below it on desktop and mobile. This release changes no dependencies, Cloudflare settings, DNS, or custom-domain bindings. Production evidence is pending deployment.

## TASK-012 Fable 5.1 vs Opus 5.5 article (2026-10-09)

Commit `2a75f3a1901804d3c8b215844c2dee5c31cc6074` added `/compare/fable-5-1-vs-opus-5-5/`, refreshed the shared official Anthropic records, and added the third link in the dedicated `/compare/` article menu. The article has 857 English words, no Han characters, and 4.67% keyword density; its exported title and H1–H6 contain the target phrase.

On Node 22.23.2/npm 10.9.8, `npm run cloudflare:build` passed lint, typecheck, 37 tests, static export, and artifact checks. `npm audit --audit-level=high` found 0 vulnerabilities, and clean-worktree `npm run release:check` passed. GitHub CI run `37888802655` and Cloudflare Pages check/deployment `0514aa49-871e-4fd6-b099-0b476ae563c0` succeeded. Immutable preview `https://0514aa49.toolpilot-git.pages.dev` and production `https://toolpilot.cc` passed the full 12-route smoke, exact sitemap, robots, and retired-route 404 checks. Direct HTML checks on both domains confirmed the title, H1–H6 keyword coverage, and article menu. No dependency, Cloudflare, DNS, or custom-domain changes were needed.

## TASK-011 Haiku 5.5 vs Luna 6 article (2026-10-09)

Commit `e1c4b44c99c960139a443d7c7784b3c9184a1628` added `/compare/haiku-5-5-vs-luna-6/` and a dedicated comparison-article menu on `/compare/`. The article has 912 English words, no Han characters, and 3.29% keyword density. Its metadata title and all six heading levels contain the target phrase; the artifact contract checks its source URLs, pricing, limits, and word-count requirements.

On Node 22.23.2/npm 10.9.8, `npm run cloudflare:build`, `npm audit --audit-level=high` (0 vulnerabilities), and `npm run release:check` passed. GitHub CI run `37879419603` and Cloudflare Pages check/deployment `b30f5bbe-edda-4f84-a8a1-9978b2525ced` succeeded. The immutable preview `https://b30f5bbe.toolpilot-git.pages.dev` and `https://toolpilot.cc` passed all eleven routes, the exact sitemap, robots, and retired-route 404 smoke. Production HTML confirmed the article title/H1–H6 and both article-menu links. Wrangler deployment-list inspection was unavailable because `CLOUDFLARE_API_TOKEN` is not configured; no Cloudflare settings, DNS, or custom-domain bindings were changed.

## TASK-010 English article update (2026-10-09)

Commit `1c0d907534a4486465255a091091f7ad6140929d` replaces the Chinese article copy with an English-only comparison and enforces 600–1,000 English words, no Han characters, title/H1–H6 keyword coverage, and 3–5% density. The live article has 810 words and 3.70% density.

GitHub CI run `37875417147` and Cloudflare Pages deployment/check `14dc9cd0-4c04-40ae-bc74-b252d293a672` succeeded. Production smoke passed all ten routes, the exact ten-URL sitemap, robots, and retired-path 404s. A direct production HTML check confirmed the English-only content and keyword requirements. `npm run cloudflare:build` passed 34 tests and all artifact checks; `npm audit --audit-level=high` found 0 vulnerabilities.

## TASK-010 comparison page and dependency security release (2026-10-09)

Commit `7ddda64fe18b6aa97fe3b59d95c104a37977a9eb` fast-forwarded `main` and deployed the approved `/compare/gpt-6-1-sol-vs-astra/` page. It also updates Next.js to 16.3.8, `sharp` to 0.35.5, and `source-map-js` to 1.2.2, and replaces the vulnerable `eslint-config-next` dependency chain with ESLint flat configs for TypeScript, React, React Hooks, and JSX accessibility. No `braces` dependency path remains.

On Node 22.23.2/npm 10.9.8, clean `npm ci`, `npm run release:check`, `npm run cloudflare:build` (34 tests), and `npm audit --audit-level=high` (0 vulnerabilities) passed. GitHub CI run `37874166631` and Cloudflare Pages deployment/check `022f2028-b6e7-452b-957e-41c7ea24620c` succeeded. Local Wrangler and production smoke passed all ten routes, exact ten-URL sitemap, robots, and retired-path 404s. The article renders 866 Han characters and 4.85% keyword density. Wrangler deployment-list inspection was unavailable because no `CLOUDFLARE_API_TOKEN` is configured; the Pages GitHub check and public production smoke confirm deployment.

## TASK-009 Site icon release (2026-10-03)

Commit `d9f4cbfb699fb6f5f73da834d195b37123e4cc6d` added the branded SVG favicon and shared header mark. Clean-worktree release readiness, `npm ci`, `npm run cloudflare:build` (34 tests), `npm audit --audit-level=high` (0 vulnerabilities), and local Pages smoke passed. GitHub CI run `37084540049` and Cloudflare Pages deployment/check `c5563283-a051-4a4a-b1fe-1ce102bd1fca` succeeded; immutable preview: `https://c5563283.toolpilot-git.pages.dev`.

Production verification: `https://toolpilot.cc/favicon.svg` returns HTTP 200 with `image/svg+xml` and its body matches the committed `public/favicon.svg`. The production homepage references the icon. Full smoke passed on both `https://toolpilot.cc` and the immutable preview for all nine pages, exact sitemap, robots, and retired-path 404s. The stale `/tools/` response observed on 2026-10-01 is no longer present in the current production smoke.

## TASK-009 Argon SEO and data accuracy (initial release 2026-10-01; smoke follow-up passed 2026-10-03)

The approved route contract is exactly nine pages, including `/models/gemini-4-argon/`; Jev and Argon share one model landing template. Commit `d7d42e5f6403881ebb4b6fa59bfe54adc0b65bfa` was pushed to `main`; GitHub CI run `36806593251` and Cloudflare Pages check/deployment `ab9b53b2-0bda-49c6-9ba0-bd7e85a50a88` succeeded. Production Argon and all nine canonical routes return HTTP 200; the sitemap has exactly nine URLs and robots allows `/models/`. Local Node 22 checks passed 34 tests, model validation, lint, typecheck, static export/artifact validation, and Wrangler Pages smoke. The production smoke remains open: Node fetch receives stale legacy HTML at `/tools/` (HTTP 200, `Age: 175451`, `Cache-Control: public, s-maxage=604800`), while the Pages alias and curl return 404 and a unique-query Node request returns 404. No `CLOUDFLARE_API_TOKEN` is available to inspect or purge the response variation; repeat full production smoke after an authorized cache purge. Google officially announced Argon's `$2/$10` introductory input/output rates, 95% cached-input discount, and `$4/$20` post-intro rates; access remains limited and effective dates are unannounced. The 1M figure is a maximum output-token limit, while input context remains unknown.

## TASK-008 Initial V1 Release (2026-10-01)

TASK-008 replaced the old public product with the initial eight-page AI model pricing V1. Its latest catalog commit `3e42e7b7adce2c8bad70bfa0920006c5640ec647` passed GitHub CI run `36798620833` and Cloudflare Pages check/deployment `654afb6c-bc34-4981-a86f-e94d5af6ec78`. Preview `https://654afb6c.toolpilot-git.pages.dev` passed the exact eight-page, sitemap, robots, and retired-route 404 smoke. TASK-009 confirms the `/tools/` Node-fetch 200/curl 404 variation still persists after deployment; see the current release record above. No DNS or custom-domain binding was changed by either release.

## 1. 服务概览

- 服务：`ToolPilot` 静态 Web 站点（目标域名 `https://toolpilot.cc`）
- Owner/值班：`TBD`
- 用户影响：站点不可用、错误工具事实、失效厂商链接或未披露商业关系会直接损害用户决策和信任。
- 依赖：`package.json`/`package-lock.json`、Node 22、Next 静态构建、Cloudflare Pages 项目 `toolpilot-git` 与恢复项目 `toolpilot`、厂商站点和未来可选分析服务。
- Dashboard：Cloudflare Dashboard 的 Workers & Pages > `toolpilot-git` / `toolpilot`；当前未配置应用监控或告警。
- 日志：`TBD`；当前没有应用、部署或访问日志入口。
- 当前状态：Git-integrated 项目 `toolpilot-git` 已连接 `yubinhong/toolpilot` 的 `main`，构建命令 `npm run cloudflare:build`、输出 `out`、Node 22。用户报告已将 `toolpilot.cc` CNAME 切换至该项目。生产监控 current profile run `36320017826` 成功。旧 Direct Upload 项目 `toolpilot` 及部署 `be8ecb81-fcad-4058-8909-e80befb441ab` 保留为恢复目标；尚未执行生产回滚演练。此 Agent 未更改 DNS 或 Pages 自定义域绑定。
- Latest trust-page release: commit `d31a482927cf053f2d1c6bec1477d25ff819cdd0` passed GitHub CI run `36335164250` and deployed as Cloudflare Pages deployment `da97617f-e4b4-4487-beb4-708cba57d3d1`. Preview `https://da97617f.toolpilot-git.pages.dev` and `https://toolpilot.cc` passed current-profile smoke for 97 pages, robots, sitemap and a real 404. Both environments render Methodology at `/editorial-policy/` and Affiliate Disclosure at `/disclosure/`; direct HTML checks confirmed metadata, visible page copy, production canonical and the 4-URL sitemap. No route/indexability or content approval changed.
- Latest security-header release: commit `0283dc6e8ab910ebbf8ee40d10c7d696c908478a` passed clean `release:check`, GitHub CI `36410996436` and Pages deployment/check `818e99bb-55a8-4923-b84c-dc4175653fa0`. Preview `https://818e99bb.toolpilot-git.pages.dev` and `https://toolpilot.cc` passed 99-page current smoke. Every registered HTML document and the static 404 includes a per-document hash CSP meta; one shared Pages rule supplies response CSP `frame-ancestors` and common security headers. Exact online policy/hash checks passed on all routes. Chromium confirmed page rendering, theme/search/comparison interactions and 404 behavior in both environments; the production Insights beacon remains blocked (`script-src-elem`) and records an enforced violation. See TASK-007/TODO-308 before changing analytics or CSP policy. No HSTS, Dashboard or DNS setting was changed.
- Latest TASK-006 trust CTA release: commit `b28eac7953b5c150bb9ddaf6a6f6400ed9e21730` passed clean-worktree release readiness, CI run `36349574064` and Cloudflare Pages deployment/check `b42fe8b0-b97f-4c1d-bf33-1244b2335cc0`. The immutable preview and production each passed current smoke for 99 pages, robots, sitemap and a real 404. The Affiliate label renders only with exact content approval and complete active relationship evidence; current pages continue using ordinary vendor links. No content approval or commercial relationship was activated.
- Latest TASK-006 content-status release: commit `5057ab8d62a81137ce5078137af5850c01c01827` passed CI run `36350165202` and Cloudflare Pages deployment/check `6e614c18-2f53-4f3c-9365-7109fb331d66`. Preview and production passed 99-page current smoke; pending content renders `Not yet formally verified`. No approval or indexing state changed.
- Latest TASK-006 SEO artifact release: commit `86b8e1a59dfb63a6a6e35e3e100c1bd2f8204d88` passed release readiness, CI `36351183143` and Pages deployment/check `558b1087-b863-4c73-8b59-618376211274`. Preview and production passed 99-page current smoke; a direct online audit confirmed every registered title and description is unique. No route, sitemap or content review state changed.
- GitHub 控制项只读核验（2026-09-27）：branch-protection endpoint 返回 404，repository rulesets 列表为空；Actions 已启用，默认 workflow 权限为 `read`，仓库 webhook 列表为空。个人订阅查询因当前 CLI 授权缺少 `notifications` scope 未完成；Cloudflare-side deployment notifications 未核验。仓库 API 报告 Dependabot security updates、secret scanning、non-provider pattern scanning 与 push protection 为 `disabled`，另跟踪 TODO-314。Owner 必须确认并配置适用控制项，当前未更改外部设置。

## 2. SLO 与关键指标

| 指标 | 目标 | 告警阈值 | Dashboard |
| --- | --- | --- | --- |
| 可用性 | `TBD` | `TBD` | `TBD` |
| 延迟 | `TBD` | `TBD` | `TBD` |
| 错误率 | `TBD` | `TBD` | `TBD` |
| 内容新鲜度 | 关键工具事实有来源和更新时间 | `TBD` | `TBD` |
| 商业标注完整率 | 100% | 低于 100% 停止发布并复核 | `TBD` |

## 3. 部署

### 前置检查

- [x] 源码、`package.json`、锁文件和构建配置已建立。
- [x] 使用 Node 22；当前工程验证使用 Node 22.23.2。
- [x] `TESTING.md` 中的 Lint、类型、测试和构建命令已填入并通过。
- [x] 生成路由、站点地图、robots、法律页面和 50 条目录链接已审查；工具事实、来源和商业关系仍是 Draft，未完成正式内容审核。
- [x] TASK-003 的内容发布门槛已写入 `docs/adr/0006-content-review-gate.md`；链接可达只作为访问证据，不能替代事实核验。
- [x] TASK-004 的 CI 和生产监控入口已写入 `.github/workflows/`；GitHub CI run `32442681654` 已成功。
- [x] `npm run release:check` 已接入本地/审核流程；GitHub origin 已配置，干净的 `4776027` checkout 实际检查已通过。
- [x] 旧 Crypto/DeFi 生成内容按用户确认不迁移，当前源码未生成相关页面。
- [x] Direct Upload 恢复项目 `toolpilot` 的部署 `be8ecb81-fcad-4058-8909-e80befb441ab`（`https://be8ecb81.toolpilot-2cy.pages.dev`）通过 legacy smoke。
- [x] Git-integrated 项目 `toolpilot-git` 已连接 `yubinhong/toolpilot`，生产分支为 `main`，构建命令为 `npm run cloudflare:build`，输出目录为 `out`；部署 `000a4a88` / source `fc139ca1` 的 88 路由 current smoke 通过。
- [x] 用户报告已将 `toolpilot.cc` CNAME 切换到 `toolpilot-git`；正式域名 `SMOKE_PROFILE=current npm run smoke` 检查 88 个页面、robots、sitemap 和真实 404 通过。
- [x] 部署 `.github/workflows/production-monitor.yml` 的 current profile 配置；workflow run `36299788937` 手动检查正式域名并通过。
- [ ] Affiliate/Featured/Sponsor 条款、归因、退款和披露文案已批准。
- [ ] 50 条目录已由产品/内容 Owner 完成事实、来源新鲜度和商业条款审核。

### 命令/流程

```bash
nvm use 22
npm run release:check
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npx --yes wrangler@4.124.0 whoami
npx --yes wrangler@4.124.0 pages deployment list --project-name toolpilot
```

Cloudflare Pages Git Integration 的项目配置：

| 项目 | 值 |
| --- | --- |
| GitHub repository | `yubinhong/toolpilot` |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npm run cloudflare:build` |
| Build output directory | `out` |
| `NODE_VERSION` | `22` |
| `NEXT_PUBLIC_SITE_URL` | `https://toolpilot.cc` |

`release:check` 是本地/提交审核状态检查，不是 Cloudflare Dashboard 构建命令。不要使用 `--no-verify` 或临时删除检查绕过。

### 部署后验证

```bash
# 本地检查：
npm run dev -- --hostname 127.0.0.1 --port 3001
# 发布后检查首页、/tools/、/tools/digitalocean/、/robots.txt、/sitemap.xml，以及法律页和商业披露。
for path in / /tools/ /tools/digitalocean/ /robots.txt /sitemap.xml; do
  /usr/bin/curl -sS -L --max-time 20 -o /dev/null -w "${path} %{http_code} %{url_effective}\n" "https://toolpilot.cc${path}"
done
```

TASK-007 当前线上模型已于 commit `0283dc6` 发布：preview 与 production 的 99 页 smoke、逐页 CSP meta 哈希/数量、共享响应头、真实 404 和 Chromium 交互均通过。每个注册页面和 `404.html` 在 charset 声明后立即包含按各自 inline-script hashes 生成的 CSP meta；Cloudflare Pages `/*` 响应规则只提供共享 CSP 的 `frame-ancestors`、`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin` 和 `Permissions-Policy: camera=(), microphone=(), geolocation=()`。Production Pages Web Analytics beacon 仍被 CSP 阻止并产生 enforced violation；Owner 隐私决策未完成，不要把该域名加入 CSP allowlist，也不要关闭 TODO-315。该发布不设置 HSTS；回滚时使用上一份验证过的 Pages 部署并确认新路由文档 CSP meta 不再输出。

### `toolpilot.cc` 域名切换（2026-09-27，已完成）

用户报告已完成 CNAME 切换。独立线上证据为 `SMOKE_PROFILE=current npm run smoke` 对 `https://toolpilot.cc` 检查 88 个页面、robots、sitemap 和真实 404 通过。DNS 变更由用户完成，本 Agent 未写入 DNS。生产监控工作流保持 `SMOKE_PROFILE: current`；配置由 commit `4fb09bca29619032588d152e7b971e69fab1f4ad` 部署，手动 workflow run `36299788937` 成功。

常规迁移步骤留档：先验证 `toolpilot-git` 最新 `main` 部署和 `pages.dev` smoke，再在 Cloudflare Pages 将自定义域绑定到 Git-integrated 项目，并确认正式域名 current smoke。Cloudflare 托管 DNS 时应按 Pages Dashboard 的验证流程确认域名关联，避免在 Pages 项目关联前独立创建不匹配记录。旧项目不得删除。

### TASK-006 P0.6 release handoff (2026-09-27)

Commit `1843969916c80e4239277f64556d297485abbb1b` added noindex MCP and self-hosted evidence overview routes. GitHub CI run `36348360212` and Cloudflare Pages deployment/check `5da54123-8908-4d47-80e9-5ccbd3e35824` succeeded. Immutable preview `https://5da54123.toolpilot-git.pages.dev` and `https://toolpilot.cc` both passed `SMOKE_PROFILE=current npm run smoke`: 99 routes, robots, four sitemap URLs and a real 404. Production HTML checks verified each hub's `noindex` meta, profile facts and official source links. The first request to the custom domain briefly returned 404 while deployment propagated; later both new routes returned 200 and the full production smoke passed. No Pages, DNS, CSP or indexing settings were changed. Underlying drafts remain `in-review`; this release is not content approval.

## 4. 回滚

- 触发条件：站点不可用、构建产物与源码不一致、工具事实错误、关键链接失效、商业标记缺失、安全门槛失败或旧 Crypto/DeFi 内容误发布。
- 应用回滚：旧 Direct Upload 部署 `be8ecb81-fcad-4058-8909-e80befb441ab` 保留为恢复目标。若 current smoke 失败，事故负责人应先记录当前部署、原因和时间，再通过 Cloudflare Pages Dashboard 将 `toolpilot.cc` 重新绑定至已验证的旧项目，并按 Cloudflare 的 Custom Domains/DNS 状态完成域名恢复；随后运行 `SMOKE_PROFILE=legacy npm run smoke` 验证恢复结果。此次生产回滚演练尚未执行，域名/Pages 变更须由获授权的事故负责人操作。不得删除旧项目。
- 数据回滚/前滚：当前没有已确认数据库或迁移；若未来引入数据层，必须使用向前迁移和已验证备份恢复，不直接回滚生产数据。
- 验证：重新检查公共首页、关键决策页、法律页、站点地图、robots、外部链接、商业披露和安全头。

## 5. 常见告警

### 构建或发布失败

- 含义：静态产物没有生成、产物不完整或托管未更新。
- 首先检查：Node 版本是否为 22、锁文件是否匹配、实际构建日志和 `out/` 产物版本。
- 查询/命令：使用 `TESTING.md` 的 `npm run build` 和 `find out`。
- 临时缓解：保持上一份已审查产物，暂停发布，不直接使用旧 `.next`。
- 升级条件：无法确定产物来源、涉及密钥/依赖风险或影响公共站点时升级给工程 Owner。

### 内容或商业标记异常

- 含义：页面缺少来源、更新时间、Affiliate/Sponsor 标记或包含不符合定位的旧内容。
- 首先检查：页面内容版本、`docs/content-review/TASK-003-2026-08-20.md`、来源记录、商业关系、路由主题和出站 URL。
- 查询/命令：`npm test`、内容审查清单和 `/usr/bin/curl -sS -L --max-time 20 -o /dev/null -w '%{http_code} %{url_effective}\\n' <url>`；HTTP 可达不等于事实已验证。
- 临时缓解：下线或隐藏受影响页面，保留事实证据，暂停相关商业曝光。
- 升级条件：涉及大量页面、已产生错误商业归因或用户投诉时升级给产品/商业 Owner。

### 站点或外部链接不可用

- 含义：公共页面、厂商链接、Affiliate 跳转或第三方服务异常。
- 首先检查：公共首页、目标路径、DNS/托管状态、链接状态和是否为单一厂商故障。
- 查询/命令：`/usr/bin/curl -sS -L --max-time 20 -o /dev/null -w '%{http_code} %{url_effective}\n' https://toolpilot.cc/`；Cloudflare Dashboard 检查 Pages 部署、Custom domains 和 DNS 状态。
- 临时缓解：移除失效链接或恢复上一版本，不把点击失败记为转化。
- 升级条件：全站不可用、DNS/证书问题或疑似安全事件时升级。

## 6. 事故响应

1. 确认影响页面、用户、时间线和严重级别。
2. 优先止损，暂停发布或商业曝光，不在事故中进行无关重构。
3. 保留日志、指标、构建版本、内容来源、变更和操作证据；不得复制密钥和个人数据。
4. 每 `TBD` 更新状态给 Owner 和受影响协作者。
5. 恢复后验证用户路径、商业披露、内容来源和回滚结果，并创建复盘。

## 7. 灾难恢复

- RPO：`TBD`；需要确定内容源、静态产物和订单/分析数据的备份策略。
- RTO：`TBD`；需要确认静态托管、DNS 和上一版本产物的恢复时间。
- 备份位置：`TBD`；不得把备份放在公开仓库或聊天中。
- 恢复演练：尚未完成；Git-integrated Pages 当前承载正式域名。须由 Owner 安排窗口，确认上一份可回退部署，通过 Cloudflare Pages 部署历史或旧 Direct Upload 恢复目标执行演练，并重新验证生产关键路径；演练后将域名绑定恢复到 Git-integrated 项目。


## TASK-005 release handoff (2026-09-27)

The user has authorized deployment and online verification for each deliverable progress. The owner reports that `toolpilot.cc` CNAME now points to Git-integrated Pages project `toolpilot-git`; preview and production current-profile smoke passed for all 88 pages, robots, sitemap and a real 404. Commit `4fb09bca29619032588d152e7b971e69fab1f4ad` deployed successfully, and manual production-monitor run `36299788937` passed. The old Direct Upload project and deployment remain the recovery target. Pending content remains noindex; deployment authorization is not editorial approval.

1. Release `4fb09bca29619032588d152e7b971e69fab1f4ad` passed Node 22 `npm audit --audit-level=high` with 0 vulnerabilities and `npm run release:check` on a clean full SHA.
2. GitHub CI run `36299689412` passed; Cloudflare deployed source `4fb09bc` as deployment `76a9ace8-375f-40fd-b31a-acdb22661512`.
3. Immutable-preview and formal-domain current smoke each passed for 88 pages, robots, sitemap and a real 404. Production-monitor run `36299788937` passed with `SMOKE_PROFILE=current` against `https://toolpilot.cc`.
4. The owner reports completing the DNS CNAME switch; this agent made no DNS changes. Keep current as the scheduled production profile and use legacy only for an explicit recovery check.
5. Owner content approval, final operator/contact/privacy/legal facts, independent GSC and broad crawler-access review, GitHub notification setup and the production rollback exercise remain open. Pending records stay noindex until exact revisions are approved.
6. Retain the old project. Rollback requires an authorized operator, a known verified deployment/source and before/after smoke. No blanket URL redirects, WAF disabling or emergency token publication.

Maintenance reports run daily via content-maintenance.yml after deployment of the workflow; configuration alone is not execution evidence. Inspect restricted/broken links and freshness without treating link checks as factual approval. Artifact retention is 14 days. No external message or issue is sent automatically.
