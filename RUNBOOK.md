# RUNBOOK.md

## 1. 服务概览

- 服务：`ToolPilot` 静态 Web 站点（目标域名 `https://toolpilot.cc`）
- Owner/值班：`TBD`
- 用户影响：站点不可用、错误工具事实、失效厂商链接或未披露商业关系会直接损害用户决策和信任。
- 依赖：`package.json`/`package-lock.json`、Node 22、Next 静态构建、Cloudflare Pages 项目 `toolpilot-git` 与恢复项目 `toolpilot`、厂商站点和未来可选分析服务。
- Dashboard：Cloudflare Dashboard 的 Workers & Pages > `toolpilot-git` / `toolpilot`；当前未配置应用监控或告警。
- 日志：`TBD`；当前没有应用、部署或访问日志入口。
- 当前状态：Git-integrated 项目 `toolpilot-git` 已连接 `yubinhong/toolpilot` 的 `main`，构建命令 `npm run cloudflare:build`、输出 `out`、Node 22。部署 `000a4a88-b061-4f48-afe7-d7bc3d78d202` 对应 source `fc139ca1b88b76bb8b65c95f4a3f15cbfac736c9`，其 `pages.dev` current smoke 通过。`toolpilot.cc` 仍由旧 Direct Upload 项目 `toolpilot` 提供，source `4776027f9fb45cbe8ea5e63e0061984a5b91b2c8`、部署 `be8ecb81-fcad-4058-8909-e80befb441ab`；旧部署及恢复后的正式域名 legacy smoke 通过。域名迁移尝试已回退；Cloudflare 当前报告旧项目域名 validation pending，但公网 legacy smoke 正常。DNS CNAME 写入和后续正式域名切换须经单独授权。两个项目都必须保留至正式域名 current smoke 和回滚演练完成。

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
- [ ] 在另获授权并具有 DNS 写权限后，将 `toolpilot.cc` CNAME 指向 `toolpilot-git.pages.dev`，确认 Pages 域名 active，并对正式域名运行 current smoke。
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

### `toolpilot.cc` 域名切换（须单独授权）

1. 确认 `toolpilot-git` 最新 `main` 部署成功，并在对应 `pages.dev` 地址通过 `SMOKE_PROFILE=current`。本次已验证 deployment `0d07e89d` / source `a626a162`。
2. 在 Cloudflare Dashboard > Workers & Pages > `toolpilot` > Custom domains 中解除 `toolpilot.cc`，再到 `toolpilot-git` > Custom domains > Set up a domain 添加 `toolpilot.cc`。旧项目不要删除。
3. 若 Cloudflare 提示 DNS 确认，确认 zone 中的 CNAME 目标为 `toolpilot-git.pages.dev`；当前旧目标为 `toolpilot-2cy.pages.dev`。不要在 Pages 项目关联前单独创建 CNAME，否则会返回 522。Cloudflare 管理的 zone 可在确认 Pages 域名后自动创建 CNAME，见[官方自定义域名文档](https://developers.cloudflare.com/pages/configuration/custom-domains/)。
4. 等待 Pages 域名状态为 `active`，再运行 `SMOKE_PROFILE=current npm run smoke` 检查 `https://toolpilot.cc` 的页面、noindex、robots、sitemap 和真实 404。
5. 只有正式域名 current smoke 通过后，才把 `.github/workflows/production-monitor.yml` 从 `legacy` 切到 `current`；该提交也须部署并再次线上验证。

## 4. 回滚

- 触发条件：站点不可用、构建产物与源码不一致、工具事实错误、关键链接失效、商业标记缺失、安全门槛失败或旧 Crypto/DeFi 内容误发布。
- 应用回滚：新 Git 项目已有成功部署 `000a4a88`；旧 Direct Upload 部署 `be8ecb81-fcad-4058-8909-e80befb441ab` 保留，legacy smoke 已通过。域名尚未切换。获授权切换后若 current smoke 失败，应从 `toolpilot-git` 解除域名，在旧项目重新绑定 `toolpilot.cc`，确认 CNAME 回到 `toolpilot-2cy.pages.dev`，再运行 legacy smoke。不得删除旧项目。
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
- 恢复演练：尚未完成；必须先完成新 Git-integrated 项目和域名迁移，再确认上一份可回退部署，通过 Cloudflare Pages 部署历史做一次回滚，并重新验证生产关键路径。


## TASK-005 release handoff (2026-09-27)

The user has authorized deployment and online verification for each deliverable progress. Git Integration is confirmed by deployment `000a4a88` from `fc139ca1b88b76bb8b65c95f4a3f15cbfac736c9`; its 88-route current-profile smoke passed on `pages.dev`. `toolpilot.cc` remains on the legacy Direct Upload project because DNS CNAME changes and a production-domain cutover still need separate owner authorization and DNS write access. The attempted transfer was rolled back, and legacy smoke passes on the public domain. Pending content remains noindex; deployment authorization is not editorial approval.

1. Resolve the security audit and review final operator/contact/privacy details.
2. Obtain owner decisions for exact content revisions/digests. Pending records remain noindex, including on a preview; do not switch all records to published.
3. Run Node 22 locked install, audit, cloudflare:build and local current smoke.
4. With separate commit/push authorization, review a clean full SHA and run release:check. Never weaken the dirty-worktree gate.
5. Record each Git Integration deployment ID/source SHA and verify the `pages.dev` current smoke; deployment `000a4a88` / source `fc139ca1` is verified.
6. After separately authorized DNS cutover and Pages domain validation, run `SMOKE_PROFILE=current` against `https://toolpilot.cc` and verify page directives, sitemap and real 404. Only then switch production-monitor.yml from legacy to current. Until cutover, legacy checks the old deployed contract explicitly.
7. Retain the old project. Rollback requires authorization, a known verified deployment/source and before/after smoke. No blanket URL redirects, WAF disabling or emergency token publication.

Maintenance reports run daily via content-maintenance.yml after deployment of the workflow; configuration alone is not execution evidence. Inspect restricted/broken links and freshness without treating link checks as factual approval. Artifact retention is 14 days. No external message or issue is sent automatically.
