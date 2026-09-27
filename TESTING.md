# TESTING.md

## 当前验证范围

Node 22（.nvmrc）、npm 锁文件恢复。核心不变量：历史快照保留、正式内容由用户批准具体版本、依赖变更使批准失效、草稿 noindex、来源不冒充实测、商业研究不进入公开关系、出站检查不访问私网。

旧任务的历史运行结果见 docs/tasks/TASK-004-before-remediation.md；不能复用成当前通过证据。当前验收结果在 TASK.md。

## 标准命令

| 命令 | 用途 |
| --- | --- |
| nvm use 22 && npm ci | 锁定安装，不升级依赖 |
| npm audit --audit-level=high | 发布安全门槛；Node 22 `npm ci` 后本次通过（0 vulnerabilities），每次发布必须重跑 |
| npm run lint | ESLint |
| npm run typecheck | TypeScript |
| npm test | Node 测试：历史目录、当前审核/索引/商业、网络边界、发布门槛 |
| npm run content:check | 所有 JSON 内容运行时校验 |
| npm run content:review | 输出精确版本/digest 和审核缺口；不批准或改写内容 |
| npm run content:freshness -- --as-of=YYYY-MM-DD | 价格 30 天、其他事实 90 天复核队列 |
| npm run urls:audit | 从当前路由注册表更新 `docs/url-audit.csv`；不替代 GSC、HTTP 或外链审计 |
| npm run links:check | 公开 HTTPS 来源可达报告；403/429 受限不等于事实核验 |
| npm run build | 内容校验 → Next 静态导出 → 产物元数据/链接/客户端边界检查 |
| npm run artifacts:check | 检查当前实际存在的 out/，不替代新构建 |
| npm run cloudflare:build | lint → typecheck → test → build；安全审计是独立必需门槛 |
| npm run smoke | 默认 current 契约；目标由 SMOKE_BASE_URL 指定 |
| SMOKE_PROFILE=legacy npm run smoke | 仅用于尚未整改部署的旧生产版本 |
| npm run release:check | 必须干净工作区、完整 SHA、无凭据 GitHub origin、发布文件已跟踪 |
| git diff --check | 差异空白检查，另需人工审查新文件 |

本地 HTTP：`python3 -m http.server 4173 --directory out`；另一个终端运行 `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke`。静态导出不使用 npm start。

没有配置格式化器，不引入全仓库格式化。浏览器工具可临时安装在仓库外做验证，不加入项目依赖或假称已有正式 E2E 框架。

## 必须覆盖的场景

- Draft、in-review 与 synthetic published 的正反测试；缺少 owner/date/revision/digest/evidence 时拒绝发布。
- 实质编辑不增加 revision 也使旧摘要失效；依赖被重审但摘要变化时，旧决策仍失效。
- 缺失来源、重复 slug、未知状态、非法 URL、错误计费口径；未知值不被转为否定。
- Pros/Cons/FAQ 陈述必须携带可解析来源；决策页不得引用不在其依赖列表中的工具来源；静态产物必须包含陈述与对应来源链接。
- 每个工具详情草稿均需有来源绑定的 Pros/Cons/FAQ；内容校验拒绝未知、自链或重复 `relatedLinks` 目标。
- 生成产物检查逐页抽取 `<main>` 内结构化内容路径，确保每个结构化内容页面至少链接到三个唯一内容目标；Breadcrumb 和 editorial/disclosure 等通用信任链接不计入。
- 普通链接与 synthetic Affiliate fixture：有效批准及披露缺一不可；Featured、Sponsor 单独判断。
- 原 50 条快照的历史断言继续存在；当前目录允许增量和审核，不再要求全站永久 Draft。
- HTML 中每页 title、description、self canonical、robots 与 registry 一致；sitemap 不包含草稿；未知 URL HTTP 404。
- 站内链接目标存在；客户端 JS 不携带内部研究/审核字段。
- 网络使用 mock 验证 HTTPS/域名、私网 DNS、DNS pin、未知重定向、3 次跳转限制、403/429/404/410/5xx/超时分类。
- 实际浏览器 375/768/1440px：首页、详情、对比、替代、价格、场景、指南、联系；键盘、搜索、空状态、aria-pressed、页面无横向溢出。

## CI 与生产过渡

CI 的 npm run build 自动运行内容/产物检查，HTTP smoke 和 production-monitor workflow 均使用 current。legacy profile 仅用于显式验证旧部署或回滚结果；不能根据响应自动选择更宽松的断言。

content-maintenance 每日或手动生成 freshness/link artifacts；网络异常是报告结果，不是代码 CI 的随机失败。报告保留 14 天，不写入源码、不自动批准、不创建工单或发送消息。

## 测试与证据边界

使用合成批准和公开域名做单测，不在真实内容中添加测试产品。用户信息、凭据和第三方机密不进入测试。依赖审计、生产可达性、最终内容审核和云配置验证分别记录，任何一项缺失都不能宣称全面上线完成。
