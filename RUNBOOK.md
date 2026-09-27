# RUNBOOK.md

## 1. 服务概览

- 服务：`ToolPilot` 静态 Web 站点（目标域名 `https://toolpilot.cc`）
- Owner/值班：`TBD`
- 用户影响：站点不可用、错误工具事实、失效厂商链接或未披露商业关系会直接损害用户决策和信任。
- 依赖：`package.json`/`package-lock.json`、Node 22、Next 静态构建、Cloudflare Pages 项目 `toolpilot`、厂商站点和未来可选分析服务。
- Dashboard：Cloudflare Dashboard 的 Workers & Pages > `toolpilot`；当前未配置应用监控或告警。
- 日志：`TBD`；当前没有应用、部署或访问日志入口。
- 当前状态：`out/` 已部署到当前 Cloudflare Pages Direct Upload 项目 `toolpilot`，生产域名为 `https://toolpilot.cc`；当前 Production source 为 `4776027`，部署 ID 为 `be8ecb81-fcad-4058-8909-e80befb441ab`，生产 smoke 已通过。该项目的 Git Provider 为 `No`；目标是新建 Git-integrated Pages 项目，验证后迁移域名。旧项目和域名在迁移完成前不得删除或切换。

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
- [x] 当前 Direct Upload Pages Production source 为 `4776027`，预览地址为 `https://be8ecb81.toolpilot-2cy.pages.dev`，生产 smoke 已通过；新 Git-integrated 项目尚未建立。
- [ ] Cloudflare Pages Git Integration 已连接 `yubinhong/toolpilot`，生产分支为 `main`，构建命令为 `npm run cloudflare:build`，输出目录为 `out`。
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

Cloudflare Pages Git Integration 的 Dashboard 配置：

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

## 4. 回滚

- 触发条件：站点不可用、构建产物与源码不一致、工具事实错误、关键链接失效、商业标记缺失、安全门槛失败或旧 Crypto/DeFi 内容误发布。
- 应用回滚：Git Integration 启用后，优先在 Cloudflare Pages 新项目的 Deployments 中选择上一份已验证部署执行回滚，或从对应 reviewed commit 重新触发 Pages 构建。迁移期间保留旧 Direct Upload 项目作为恢复目标；不得删除旧项目或在未完成 smoke 时切换 `toolpilot.cc`。
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

The user has explicitly authorized production deployment with online verification for each deliverable progress. Keep the existing Direct Upload recovery target and all ADR-0008 migration steps. Current local `npm ci`, `npm audit --audit-level=high`, `cloudflare:build` and local current-profile smoke pass; this alone does not prove production deployment. The non-interactive Wrangler Pages check requires a Cloudflare API Token, which is not present in this environment. Confirm Git Integration through the actual deployment source, then run `SMOKE_PROFILE=current` against `https://toolpilot.cc`. Pending content remains noindex; this authorization is not editorial approval.

1. Resolve the security audit and review final operator/contact/privacy details.
2. Obtain owner decisions for exact content revisions/digests. Pending records remain noindex, including on a preview; do not switch all records to published.
3. Run Node 22 locked install, audit, cloudflare:build and local current smoke.
4. With separate commit/push authorization, review a clean full SHA and run release:check. Never weaken the dirty-worktree gate.
5. Follow TASK-004 to validate Git Integration preview before any authorized domain migration. Record deployment ID/source SHA.
6. After authorized new deployment, run SMOKE_PROFILE=current against the actual public origin and verify page directives, sitemap and real 404. Only then switch production-monitor.yml from legacy to current. Until cutover, legacy checks the old deployed contract explicitly.
7. Retain the old project. Rollback requires authorization, a known verified deployment/source and before/after smoke. No blanket URL redirects, WAF disabling or emergency token publication.

Maintenance reports run daily via content-maintenance.yml after deployment of the workflow; configuration alone is not execution evidence. Inspect restricted/broken links and freshness without treating link checks as factual approval. Artifact retention is 14 days. No external message or issue is sent automatically.
