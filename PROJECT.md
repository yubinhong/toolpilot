# PROJECT.md - ToolPilot

## 文档信息

- 状态：`MVP FOUNDATION`
- Owner：`TBD`
- 最后更新：`2026-08-20`
- 项目仓库：`TBD`
- 研究输入：用户提供的“研究域名用途”对话；已接入 50 条 `2026-08-20` 研究快照，商业模型仍需通过 PRD、数据和实际转化验证

## 1. 项目概述

### 一句话说明

ToolPilot 是面向 Developer、Indie Hacker 和 AI Builder 的开发者工具发现与决策平台，帮助用户按任务选择工具、比较替代方案并组合技术栈。

### 要解决的问题

开发者工具数量多、更新快，而且工具目录通常只提供名称和链接，不能回答“我现在要完成这件事应该选什么”。ToolPilot 要把工具分类、真实使用场景、对比、替代方案和技术栈建议组织成可执行的决策内容，减少选择成本。

### 为什么现在做

项目当前处于产品发现阶段，先聚焦开发者工具这一垂直领域，而不是做覆盖所有类别的通用导航站。开发者工具的高意图页面更适合形成稳定的搜索入口、厂商合作和可追踪的推荐行为；商业假设必须以实际点击、注册、成交和厂商反馈验证，不能把研究中的收入估算当作事实。

## 2. 用户与利益相关者

| 角色 | 目标 | 主要痛点 | 决策权 |
| --- | --- | --- | --- |
| Developer | 为当前开发任务选择可靠工具 | 工具太多，功能、价格和限制难以横向比较 | 决定是否点击、试用或采用工具 |
| Indie Hacker / AI Builder | 快速搭建产品并控制成本 | 需要成套的数据库、部署、认证、邮件、支付和自动化方案 | 决定技术栈和购买方案 |
| 工具厂商 | 获得高意图用户和可信曝光 | 普通广告难以解释适用场景，无法区分发现与转化 | 提交工具、申请核验、购买合规的曝光位 |
| ToolPilot 运营者 | 维护内容质量并实现可持续收入 | 需要同时维护数据、独立评价、联盟关系和商业履约 | 决定收录标准、编辑标准和商业规则 |

## 3. 目标与非目标

### 项目目标

- 建立以开发者和 AI 构建者为中心的工具分类、详情、指南和决策页。
- 优先覆盖 `AI Coding`、`AI App Builders`、`Databases`、`Deployment`、`Authentication`、`Email & Marketing`、`Automation`、`Monitoring & Analytics`、`SEO & Growth` 和 `Developer Infrastructure` 等开发工作流类别；`Payments` 保留为后续方向。
- 用 `/best`、`/compare`、`/alternatives` 和 `/stacks` 等高意图页面帮助用户做选择，而不是只堆积工具链接。
- 提供开放的免费基础收录；在不影响客观评价的前提下，逐步验证 Affiliate、Featured、Sponsor 和 Launch Package 等收入来源。
- 建立来源、更新时间、商业关系和评价依据可追溯的内容机制。

### 非目标

- 不做“什么工具都有”的无筛选通用目录，也不以工具数量作为主要价值指标。
- 不允许付费改变事实、比较结果、评价结论或自然排序；付费只可购买明确标注的曝光权益。
- 不把 Adsense 作为核心商业模型，不在没有流量和合规基础时堆叠广告位。
- 当前不开发工具本身、托管用户代码、通用 AI 助手或独立支付平台。
- 不把研究中的佣金比例、收入示例、流量数字或厂商名单当作已验证指标。

## 4. 成功指标

| 指标 | 基线 | 目标 | 时间窗口 | 数据来源 |
| --- | --- | --- | --- | --- |
| 可用的高意图决策页数量 | `TBD` | 先建立可审查的最小内容集 | MVP 前 | 内容清单/发布记录 |
| 决策页到厂商站点的有效点击率 | `TBD` | `TBD`，先完成 30 天基线 | 上线后每月 | 隐私合规的站内分析、出站事件 |
| Affiliate 点击到注册/成交 | `TBD` | `TBD`，按合作方报告确认 | 每个合作周期 | 联盟平台报告 |
| Featured/Sponsor 复购或续期 | `TBD` | `TBD` | 上线后每季度 | 合同/订单/履约记录 |
| 工具数据的新鲜度 | `TBD` | 关键价格、功能和链接有更新时间 | 每次内容发布 | 来源记录和人工审核 |
| 商业内容标注完整率 | `0`（尚未建立机制） | `100%` | 每次发布 | 页面审查清单 |

## 5. 范围

### 当前范围

- 建立开发者工具分类和统一工具条目模型。
- 维护工具详情、适用场景、价格与限制、替代方案、对比和技术栈内容。
- 优先产出 `Best`、`Compare`、`Alternatives`、`Stacks` 和实用指南页面。
- 支持厂商免费提交基础条目，并保留人工审核、核验和编辑修正流程。
- 为 Affiliate、Featured 和 Sponsor 设计清晰的标注、链接和审计边界。
- 提供基础的隐私、条款、免责声明和联系入口。

### 明确排除

- 未经审核的批量抓取、重复页面、门页或只为 SEO 生成的低价值内容。
- 隐藏 Affiliate 关系、未标注 Sponsor、购买自然排名或用付费内容伪装独立评价。
- 在没有明确方案、支付流程、履约记录和退款规则前上线收费提交或推广产品。
- 依赖生产密钥、真实个人信息或未授权的第三方数据作为开发测试输入。

### 后续候选

- Newsletter Sponsor、ToolPilot Pro、Lead Gen、工具数据库 API 和数据授权。
- 更细的工作流模板、用户收藏/比较和基于证据的个性化推荐。
- 厂商自助管理、审核状态查询和可审计的商业订单后台。

## 6. 技术基线

| 层 | 选型 | 版本 | 说明 |
| --- | --- | --- | --- |
| 客户端 | Next.js App Router / React | Next.js `16.3.1` / React `19.2.8` | `app/` 路由和 `components/` 共享 UI；当前是静态页面应用 |
| 服务端 | Next 静态导出 | `output: export` | `next.config.mjs` 已确认；当前没有独立 API、认证或数据库 |
| 语言 | TypeScript / TSX | TypeScript `5.9.3` | 共享目录数据暂存于 `lib/catalog.mjs`，正式内容模型尚未确定 |
| 数据 | 静态研究快照目录 | 50 条 Draft | `lib/catalog.mjs` 分离 `productUrl`、`sourceUrl`、链接检查、审核状态、`affiliateStatus`、`commission` 和 `verifiedAt`；研究信息不得直接作为已核验事实 |
| 基础设施 | Cloudflare Pages 静态站点 | 项目 `toolpilot` | `npm run build` 生成 `out/`，已部署到 Pages，并绑定 `https://toolpilot.cc`；CI、监控和回滚自动化仍为 `TBD` |
| 运行时 | Node.js / npm | Node `22` / npm lockfile v3 | `.nvmrc` 固定 Node 22；Node 22.23.0/npm 10.9.8 下已完成安装和验证 |

## 7. 环境

| 环境 | 用途 | 访问方式 | 数据级别 | 部署来源 |
| --- | --- | --- | --- | --- |
| local | 应用开发和静态构建 | `nvm use 22 && npm install && npm run dev` | synthetic | 当前工作区 |
| staging | 集成、内容和链接验证 | `TBD` | sanitized | `TBD` |
| production | ToolPilot 公共站点 | `https://toolpilot.cc`；Cloudflare Pages 项目 `toolpilot`，2026-08-20 公网 smoke 返回 200 | restricted | Cloudflare Pages 直接上传 `out/` |

`.env.example` 声明 `NEXT_PUBLIC_SITE_URL=https://toolpilot.cc`，供 sitemap/robots 使用；Cloudflare Pages 控制台和公网 smoke 另行确认了 DNS/生产部署。真实凭据、联盟密钥、支付密钥和厂商后台凭据不得写入仓库、聊天、日志或测试夹具。

## 8. 仓库与服务边界

| 模块/服务 | 路径/仓库 | 责任 | Owner | 依赖 |
| --- | --- | --- | --- | --- |
| 产品上下文 | `PROJECT.md`、`PRD.md`、`AI_CONTEXT.md` | 维护目标、边界和当前状态 | `TBD` | 需求与研究结论 |
| 工程规则 | `AGENTS.md`、`TESTING.md`、`SECURITY.md` | 约束变更、验证和安全行为 | `TBD` | 代码仓库和 CI |
| Web 应用 | `app/`、`components/` | 首页、工具目录/详情、指南、Compare、Alternatives、Stacks、法律页和 robots/sitemap | `TBD` | Next.js、静态研究快照数据、Cloudflare Pages |
| 内容与来源 | `lib/catalog.mjs`（当前内容源） | 管理 50 条分类、产品官网、研究来源、链接检查、研究商业状态和草稿审核字段；正式内容 Owner 和复核流程待确认 | `TBD` | 厂商资料、公开来源、人工审核 |
| 商业与分析 | 集成位置 `TBD` | 管理 Affiliate、商业曝光标注和转化统计 | `TBD` | 合作方报告、隐私合规分析 |

`.next/` 和 `out/` 都是构建产物，不是内容事实来源。用户已确认旧 Crypto/DeFi 生成内容是主动删除内容，本次不迁移；当前源码只生成开发者工具方向页面。Cloudflare Pages 项目和 `toolpilot.cc` 已完成部署及公网验证，但 50 条内容仍是研究草稿，不能当作正式评价或佣金承诺。

## 9. 约束与假设

### 硬约束

- 信任：免费收录保持开放，付费只能影响明确标注的曝光，不能改变客观评价和比较结论。
- 内容：价格、功能、集成、限制和联盟关系必须有来源或明确标记为待核实，并记录更新时间。
- 合规：Affiliate、Featured、Sponsor 和厂商赞助必须在用户可见位置披露；法律页面和数据处理边界先于商业上线。
- 安全：密钥只通过环境或受控密钥存储注入；不得提交、打印或复制真实凭据和个人数据。
- 成本：优先静态、可缓存和按需生成的方案；未验证需求前不引入高成本基础设施。
- 兼容性：保持标准 URL、可抓取页面、移动端可用性和清晰的回滚路径。
- 证据：不能把研究假设、示例数字或构建缓存当作生产、流量、收入或转化证据。

### 已接受假设

- `CONFIRMED`：`toolpilot.cc` 是项目目标域名；证据：Cloudflare Pages 自定义域绑定和 2026-08-20 生产首页、目录、详情、robots、sitemap smoke。
- `CONFIRMED`：静态导出是当前 MVP Web 架构；证据：`next.config.mjs`、`npm run build` 和 `out/` 路由产物；Cloudflare Pages 项目 `toolpilot` 和生产域名 `toolpilot.cc` 已通过部署输出及公网 smoke 验证。
- `ASSUMPTION`：开发者工具是首个垂直领域，而非未来所有工具类别的总入口；验证方式：PRD 评审和首批内容表现。
- `ASSUMPTION`：Affiliate 和付费曝光可以并行，但必须分开披露、核算和审查；验证方式：合作方条款、商业页面和分析事件评审。

## 10. 里程碑

| 里程碑 | 结果 | 负责人 | 目标日期 | 状态 |
| --- | --- | --- | --- | --- |
| 产品定位确认 | 形成开发者工具垂直领域的 PRD 和评价原则 | `TBD` | `TBD` | `DRAFT` |
| 内容模型与首批分类 | 可维护工具条目、来源和更新时间 | `TBD` | `TBD` | `PLANNED` |
| 决策页 MVP | 发布首页、分类、工具详情、指南、对比、替代方案和技术栈页面 | `TBD` | `TBD` | `PLANNED` |
| 工程骨架 MVP | Node 22、Next 静态导出、目录数据、测试和本地 smoke test | 技术负责人 | `2026-08-20` | `DONE` |
| 首批 50 条目录与生产发布 | 研究快照接入、产品/来源链接分离、Cloudflare Pages 和 `toolpilot.cc` 公网验证 | 技术负责人 | `2026-08-20` | `DONE` |
| 50 条目录内容审核记录 | 逐条产品/来源链接检查、来源缺口、编辑审核字段和正式发布门槛；正式事实仍为 TBD | 技术负责人 | `2026-08-20` | `DONE` |
| CI、生产监控与受控回滚入口 | 仓库级质量门槛、生产 smoke、定时检查、release readiness gate 和 immutable reviewed commit SHA 发布/回滚 workflow；外部激活仍为 TBD | 技术负责人 | `2026-08-21` | `IN_PROGRESS` |
| 商业准备 | 完成 Affiliate 披露、免费收录和付费曝光规则 | `TBD` | `TBD` | `PLANNED` |
| 数据验证 | 建立出站点击、联盟转化和商业履约的合规分析 | `TBD` | `TBD` | `PLANNED` |

## 11. 项目级风险

| 风险 | 可能性 | 影响 | 缓解措施 | Owner |
| --- | --- | --- | --- | --- |
| 变成低差异的通用目录 | H | H | 只围绕开发任务和决策场景组织内容，优先比较、替代方案和技术栈页面 | `TBD` |
| 付费曝光损害用户信任 | M | H | 免费收录、独立评价、强制商业标注和评价/商业流程隔离 | `TBD` |
| 工具价格和功能快速过期 | H | M | 记录来源和更新时间，设置复核周期和失效链接检查 | `TBD` |
| Affiliate 条款、归因或佣金不稳定 | M | M | 采用合作方可核验报告，不把示例佣金写成保证收入，保留非联盟链接 | `TBD` |
| GitHub 外部 CI、通知和实际回滚演练尚未激活 | H | H | 仓库已有 CI、生产 smoke 和 immutable reviewed commit SHA 发布/回滚入口；等待 remote、Secrets、通知和生产窗口确认 | `TBD` |
| 最新 reviewed commit `6908245` 尚未部署到生产 | H | H | `npm run release:check` 已通过；获得生产授权后用完整 commit SHA 发布，核对 Cloudflare source 和生产 smoke | 工程/运维 Owner `TBD` |
| 50 条研究快照尚未完成正式内容审核 | H | H | 逐条核验官网、价格、功能、来源、更新时间和商业关系；链接检查记录不等于正式评价 | `TBD` |
| `.nvmrc` 要求 Node 22 但默认 shell 是 Node 20.17.0 | M | M | 开发命令前执行 `nvm use 22`，CI 固定 Node 22 | `TBD` |

## 12. 相关文档

- 产品需求：`PRD.md`
- 当前任务：`TASK.md`
- 当前快照：`AI_CONTEXT.md`
- 架构：`ARCHITECTURE.md`
- 安全：`SECURITY.md`
- 测试：`TESTING.md`
- 部署与回滚：`RUNBOOK.md`
- 决策：`DECISIONS.md`
