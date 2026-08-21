# TODO.md

> 这里是工作队列，不是当前任务的实施说明。进入执行的事项必须移入 `TASK.md`。`TASK-004` 当前进行中；后续事项进入执行前先更新 `TASK.md`。

## Now - 已确认，等待进入执行

| ID | 事项 | 价值/原因 | 优先级 | Owner | 依赖 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| TODO-004 | 建立 CI、监控、告警和自动化回滚入口 | 仓库入口已实现；GitHub 外部配置、通知和真实回滚演练仍未完成 | P0 | 工程/运维 Owner | TASK-004 | In progress |

## Next - 近期候选

| ID | 事项 | 价值/原因 | 优先级 | Owner | 进入条件 |
| --- | --- | --- | --- | --- | --- |
| TODO-005 | 评审并批准 `PRD-001` 的首批分类、评价标准和内容审核流程 | TASK-003 已建立技术审核字段，但 50 条公开条目仍是 Draft；需要决定哪些可转为正式内容 | P1 | 产品 Owner | TASK-003 |
| TODO-006 | 选择工具内容源、版本模型和编辑/厂商审核流程 | TASK-003 已记录当前快照和链接状态，但来源版本、事实证据和正式更新时间策略仍未确认 | P1 | 产品/工程 Owner | PRD-001 批准 |
| TODO-007 | 完成 ADR：静态导出、内容存储和部署拓扑 | Cloudflare Pages 已用于当前发布，但静态内容长期维护和 CI 拓扑仍未正式记录 | P1 | 技术负责人 | TASK-002 |
| TODO-008 | 创建 ADR：独立评价与 Affiliate/Featured/Sponsor 隔离 | 固化用户信任和商业合规边界 | P1 | 产品/法务 Owner | 合作方条款和披露规则确认 |

## Later - 暂不承诺

- TODO-101：Newsletter Sponsor、ToolPilot Pro、Lead Gen、工具数据库 API — 重新评估条件：MVP 内容质量、合规披露、用户转化和运营能力已验证。
- TODO-102：用户账户、厂商后台、CMS、支付和高级个性化推荐 — 重新评估条件：PRD 明确角色、数据、权限、迁移和回滚边界。

## Blocked - 已阻塞

| ID | 事项 | 阻塞原因 | 等待对象 | 下一次检查 |
| --- | --- | --- | --- | --- |
| TODO-302 | 演练 Cloudflare Pages 回滚和域名恢复流程 | TASK-004 已提供 immutable reviewed commit SHA 回滚入口，但尚未在生产窗口执行实际恢复 | 运维/项目 Owner | 完成 GitHub 外部配置后 |
| TODO-303 | 建立可复现的生产 commit 基线 | 无凭据 GitHub SSH origin 已配置，`release:check` 已阻止 dirty/untracked 发布；当前部署元数据仍指向不含线上审核标记的 `f65b5a7`，需审核、提交、经授权推送并由完整 SHA 重建生产 | 工程/运维 Owner | 激活发布 workflow 和回滚演练前 |

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

## In progress in TASK-004

- CI、生产 smoke、定时监控和手动 immutable reviewed commit SHA 发布/回滚 workflow 已加入 `.github/workflows/`。
- `npm run release:check` 已加入并由 4 个测试覆盖；当前真实工作区按设计保持不可发布状态。
- `TODO-004`、`TODO-302` 和 `TODO-303` 只有在形成可复现生产 commit、GitHub Actions 首次成功运行、Secrets/通知配置完成并执行真实回滚演练后才能关闭。
