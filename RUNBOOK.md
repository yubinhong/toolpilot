# RUNBOOK.md

## 1. 服务概览

- 服务：`ToolPilot` 静态 Web 站点（目标域名 `https://toolpilot.cc`）
- Owner/值班：`TBD`
- 用户影响：站点不可用、错误工具事实、失效厂商链接或未披露商业关系会直接损害用户决策和信任。
- 依赖：`package.json`/`package-lock.json`、Node 22、Next 静态构建、Cloudflare Pages 项目 `toolpilot`、厂商站点和未来可选分析服务。
- Dashboard：Cloudflare Dashboard 的 Workers & Pages > `toolpilot`；当前未配置应用监控或告警。
- 日志：`TBD`；当前没有应用、部署或访问日志入口。
- 当前状态：`out/` 已部署到 Cloudflare Pages，生产域名为 `https://toolpilot.cc`；最新 reviewed commit `6908245` 已推送且本地发布检查通过，但尚未部署。2026-08-21 只读查询确认项目保留两个 Production 部署；当前部署元数据显示 source `f65b5a7`，但该提交不含线上审核标记，较早部署则没有 source ref，因此两者都不是最新内容的可复现回滚基线。TASK-004 已加入仓库级 CI、生产 smoke 和受控发布/回滚入口，生产发布和真实回滚演练仍需授权。

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
- [x] 使用 Node 22；当前工程验证使用 Node 22.23.0。
- [x] `TESTING.md` 中的 Lint、类型、测试和构建命令已填入并通过。
- [x] 生成路由、站点地图、robots、法律页面和 50 条目录链接已审查；工具事实、来源和商业关系仍是 Draft，未完成正式内容审核。
- [x] TASK-003 的内容发布门槛已写入 `docs/adr/0006-content-review-gate.md`；链接可达只作为访问证据，不能替代事实核验。
- [x] TASK-004 的 CI、生产监控和 immutable reviewed commit SHA 发布/回滚入口已写入 `.github/workflows/` 和 `docs/adr/0007-ci-monitoring-release-gate.md`；外部运行记录仍待确认。
- [x] `npm run release:check` 已接入发布 workflow；GitHub origin 已配置，干净的 `6908245` checkout 实际检查已通过；当前仅文档状态更新未提交，不能跳过。
- [x] 旧 Crypto/DeFi 生成内容按用户确认不迁移，当前源码未生成相关页面。
- [x] Cloudflare Pages 保留两个 Production 部署；当前部署元数据指向 `f65b5a7` 但产物不能由该提交复现，较早部署没有 source ref；`6908245` 已推送但尚未发布，不能在未授权生产窗口时切换版本。
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
npx --yes wrangler@4.124.0 pages deploy out --project-name toolpilot --branch main
```

`release:check` 只有在 GitHub `origin` 已配置、HEAD 为完整 commit、工作区干净且发布文件都已被 Git 跟踪时才应通过。`6908245` 已通过该检查；当前 9 个文档状态更新需经授权提交后，本地检查才会再次通过。不要使用 `--no-verify` 或临时删除检查绕过。

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
- 应用回滚：优先通过 `.github/workflows/pages-release.yml` 输入上一份已审核的完整 40 位 commit SHA 重建并发布；可移动分支名和来源不明的部署都不能作为已审核回滚目标。紧急情况下在 Cloudflare Dashboard > Workers & Pages > `toolpilot` > Deployments 选择上一份已审查部署并执行 Rollback。需要保留当前部署 URL 和验证结果；也可重新运行 `npx --yes wrangler@4.124.0 pages deploy <reviewed-out> --project-name toolpilot --branch main`。
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
- 恢复演练：尚未完成；必须先把当前生产内容固定到一个已推送、已审核且能重建相同产物的完整 commit SHA，再确认上一份可回退 commit，通过受保护 workflow 做一次 Pages 回滚，并重新验证生产关键路径。
