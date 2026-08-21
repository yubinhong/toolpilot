# Changelog

本文件记录用户可感知、运维可感知或兼容性相关的已交付变化。当前版本为本地未发布的 `0.1.0`；已有初始提交，TASK-004 改动仍未提交，Cloudflare Pages 发布证据按条目记录。

## [Unreleased]

### Added

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

### Fixed

- 修正文档模板中未区分“已验证事实”“目标设计”和“TBD”的问题。

### Security

- 记录外部输入、URL、密钥、分析数据、依赖审计和商业披露的安全边界；本次没有读取或修改真实密钥。

### Deprecated

- 没有已确认的运行时弃用项；静态托管、CI、分析和商业能力仍未上线。

### Removed

- 没有删除业务代码、依赖、数据或部署资源；本次只从当前空工作区创建新代码和配置。

版本：本地未发布的 `0.1.0`；生产发布链接：`https://toolpilot.cc`；TASK-004 reviewed commit `4776027` 已推送并部署，Cloudflare source 与仓库提交一致，生产 smoke 已通过；GitHub CI run `32442681654` 成功。
