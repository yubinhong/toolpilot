# DECISIONS.md

> 这里只维护决策索引。完整决策使用 `docs/adr/NNNN-title.md`。MVP 已接受静态导出并采用 Cloudflare Pages 作为当前生产托管；商业和内容长期决策仍需评审。

## 决策原则

以下情况需要 ADR：

- 跨模块或跨团队的系统边界变化。
- 数据模型、公开 API、部署拓扑或安全模型变化。
- 引入核心依赖、外部服务或不可轻易撤销的技术选择。
- 接受重要风险、兼容性代价或长期技术债。
- 决定旧 Crypto/DeFi 生成内容与 ToolPilot 开发者工具定位的迁移、拆分或废弃方式。

小范围实现细节、易逆转的局部选择不需要 ADR，可记录在 `PLANS.md`。

## 已接受决策

| ADR | 标题 | 状态 | 日期 | Owner | 影响范围 |
| --- | --- | --- | --- | --- | --- |
| ADR-001 | 静态导出 MVP 与内容边界 | Accepted for MVP | 2026-08-20 | 技术负责人 | `app/`、`lib/catalog.mjs`、静态构建和发布边界 |
| ADR-005 | Cloudflare Pages 生产托管与 `toolpilot.cc` | Accepted for current MVP | 2026-08-20 | 技术负责人 | `out/`、Pages 项目 `toolpilot`、DNS、HTTPS 和回滚边界 |

## 建议创建的 ADR

| 建议编号 | 标题 | 状态 | 创建条件 | 影响范围 |
| --- | --- | --- | --- | --- |
| ADR-002 | 独立评价与 Affiliate/Featured/Sponsor 隔离 | Proposed | 产品 Owner、商业/法务 Owner 确认条款和披露 | 内容模型、排序、链接、分析和审核 |
| ADR-004 | 工具内容存储、版本和审核模型 | Proposed | PRD 批准并确认是否需要 CMS、后台或数据库 | 数据、权限、迁移和审计 |
| ADR-006 | 50 条研究快照的来源、更新时间和正式发布准入 | Proposed | 产品/内容 Owner 完成逐条核验 | `lib/catalog.mjs`、内容审核和公开事实 |

## 已废弃/被替代决策

| ADR | 被什么替代 | 原因 |
| --- | --- | --- |
| ADR-003 | 不迁移旧生成内容 | 项目 Owner 已确认旧 Crypto/DeFi 文件主动删除，当前 ToolPilot 重新建立开发者工具内容 |
