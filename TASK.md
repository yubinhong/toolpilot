# TASK.md - TASK-002 首批 50 个产品链接与 Cloudflare 发布

> `TASK-002` 已完成。研究内容作为草稿输入，产品官网链接和研究来源分开保存；生产发布有真实构建、认证和公共域名验证。

## 任务元数据

- 状态：`DONE`
- 类型：`CONTENT + RELEASE`
- 优先级：`P0`
- Owner：技术负责人
- 创建/更新：`2026-08-20`
- 基线：`TASK-001` 完成后的本地工作区；Git 分支为 `master`，仓库尚无提交
- 关联 PRD/ADR：`PRD-001`、`ADR-0001`
- 研究来源：用户提供的“研究域名用途”对话，50 个产品表格快照为 `2026-08-20`

## 1. 目标

将研究对话中的 50 个开发者工具产品接入 ToolPilot，展示产品官网、研究来源、分类和 Affiliate/Referral/热门工具状态；完成 Node 22 下的质量验证，并将静态站点部署到 Cloudflare，目标生产域名为 `toolpilot.cc`。

## 2. 范围

### 包含

- 50 个产品条目、稳定 slug、产品官网链接、研究来源链接、分类、状态和推荐标签。
- Affiliate、Referral、Partner、Popular、Pending 状态的用户可见但非承诺性标记。
- 工具列表、工具详情、sitemap 和出站链接。
- Cloudflare Pages 静态部署；优先沿用仓库已有或 Cloudflare 账号可核实的项目配置。
- 公共首页、工具页、robots、sitemap 和至少一个产品链接的生产 smoke test。

### 不包含

- 自动申请 Affiliate、创建 Affiliate key、修改合作方账户或提交商业资料。
- 把研究中的佣金、Cookie、收入估算或评级直接写成已验证生产事实。
- 用户账户、CMS、数据库、厂商提交、分析、支付和 Featured/Sponsor 购买流程。
- 任何真实密钥写入源码、日志、文档或聊天。

## 3. 验收标准

- [x] 目录中恰好有 50 个稳定且去重的产品条目。
- [x] 每条有产品官网链接和研究来源/来源状态；研究链接不会伪装成产品官网；5 条研究表未提供来源的条目标为 TBD。
- [x] 每条 Affiliate/Referral 状态和佣金描述都标记为研究快照或待核验。
- [x] `npm ci`、`npm audit --audit-level=high`、`npm run typecheck`、`npm run lint`、`npm test`、`npm run build` 通过。
- [x] 50 个官网链接完成 GET 可达性检查：42 个返回 2xx/3xx，8 个返回可达但受站点防护/限流影响的 403/429，未把它们宣称为内容已核验。
- [x] Cloudflare Pages 项目 `toolpilot` 创建成功，`wrangler whoami` 已确认认证，部署 URL 为 `https://72de9c30.toolpilot-2cy.pages.dev`。
- [x] `toolpilot.cc` HTTPS 公共首页、工具目录、DigitalOcean 详情、robots、sitemap 返回 200；生产 sitemap 包含 50 个工具 URL。
- [x] 未执行 Git 提交、Affiliate 申请或密钥写入；当前工作区仍为未提交状态。

## 4. 验证计划

```bash
nvm use 22
npm ci
npm audit --audit-level=high
npm run typecheck
npm run lint
npm test
npm run build
npx wrangler whoami
npx --yes wrangler pages deploy out --project-name toolpilot --branch main
```

链接检查使用 `lib/catalog.mjs` 中的 `productUrl`，只记录状态码/失败原因，不记录 cookies、token 或敏感查询参数。

## 5. 风险与回滚

- 研究信息可能过期或混淆 Affiliate 与 Partner；页面使用 `Research snapshot`、`TBD` 和来源链接，生产商业承诺保持关闭。
- 8 个官网返回 403/429，可能是站点防护或限流；后续正式内容审核不能只依赖自动 HTTP 状态。
- Cloudflare Pages 项目和 `toolpilot.cc` 已核实并绑定；CI、监控和回滚演练仍未完成。
- 回滚：在 Cloudflare Pages 控制台恢复上一份已审查部署，或重新部署上一份 `out/`；本任务未删除资源，已按用户授权完成 Pages 项目和根域绑定。

## 6. 完成记录

完成记录（2026-08-20）：50 条产品草稿、50 个产品官网链接、Node 22 质量门槛、Cloudflare Pages `toolpilot` 和 `toolpilot.cc` 公网发布均完成；Pages 临时部署为 `https://72de9c30.toolpilot-2cy.pages.dev`。未完成项是 50 条内容的正式来源/更新时间/商业条款审核、CI、监控和回滚演练。建议第一个后续任务为 `TASK-003`：逐条审核 50 条目录并建立内容版本/来源清单。
