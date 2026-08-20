# Changelog

本文件记录用户可感知、运维可感知或兼容性相关的已交付变化。当前版本为本地未发布的 `0.1.0`；没有 Git 提交或生产发布记录。

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

### Changed

- 明确 ToolPilot 的目标定位为 Developer、Indie Hacker 和 AI Builder 的开发者工具发现与决策平台。
- 明确免费基础收录、Affiliate、Featured 和 Sponsor 的信任与披露边界；本次没有上线商业功能。
- 旧 Crypto/DeFi 生成内容按项目 Owner 确认不迁移；当前 50 条目录条目均标记为 Draft/Research snapshot，不能视为正式事实或佣金承诺。

### Fixed

- 修正文档模板中未区分“已验证事实”“目标设计”和“TBD”的问题。

### Security

- 记录外部输入、URL、密钥、分析数据、依赖审计和商业披露的安全边界；本次没有读取或修改真实密钥。

### Deprecated

- 没有已确认的运行时弃用项；静态托管、CI、分析和商业能力仍未上线。

### Removed

- 没有删除业务代码、依赖、数据或部署资源；本次只从当前空工作区创建新代码和配置。

版本：本地未发布的 `0.1.0`；生产发布链接：`https://toolpilot.cc`；无 Git 提交记录。
