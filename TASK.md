# TASK.md - TASK-004 CI、生产监控与受控回滚入口

> 当前唯一活动任务。TASK-003 已完成；本任务只建立可验证的 CI、生产 smoke、监控告警入口和不可变 reviewed commit SHA 发布/回滚流程，不自动修改未知的 GitHub 或 Cloudflare 外部设置。

## 任务元数据

- 状态：`IN_PROGRESS`
- 类型：`CI + OPERATIONS + RELEASE`
- 优先级：`P0`
- Owner：工程/运维 Owner `TBD`
- 创建/更新：`2026-08-21`
- 基线：TASK-003 完成后的工作区；reviewed commit `6908245` 已推送到 `origin/main` 且通过 `release:check`；当前新增 9 个仅文档状态更新尚未提交
- 关联 PRD/ADR：`PRD-001`、`ADR-005`、`ADR-007`
- 生产目标：`https://toolpilot.cc`；Cloudflare Pages 项目 `toolpilot`

## 1. 目标

把当前手工质量检查和生产发布收敛为可审计的仓库入口：PR/Push CI、静态产物 smoke、定时生产可用性检查、受保护的手动发布，以及从已审查 commit SHA 重建并发布的回滚入口。

## 2. 范围

### 包含

- `scripts/smoke.mjs`：检查关键页面 HTTP 200、审核状态标记、受限/缺失来源状态和 50 条 sitemap URL。
- `scripts/release-readiness.mjs`：发布前检查 Node 22、完整 HEAD SHA、无凭据 GitHub origin、干净工作区和已跟踪发布文件。
- `.github/workflows/ci.yml`：Node 22、`npm ci`、audit、lint、typecheck、test、build 和本地静态 smoke。
- `.github/workflows/production-monitor.yml`：每 15 分钟和手动触发的生产 smoke；失败由 GitHub Actions 提供第一层告警信号。
- `.github/workflows/pages-release.yml`：仅手动触发，校验不可变的完整 reviewed commit SHA，并使用生产环境保护和并发锁执行发布或受控回滚。
- 更新 `TESTING.md`、`RUNBOOK.md`、`SECURITY.md`、`AI_CONTEXT.md`、`TODO.md`、`CHANGELOG.md` 和 ADR-007。

### 不包含

- 不创建 GitHub 仓库、Secret、Environment approval、通知订阅或外部 PagerDuty/邮件渠道。
- 不执行生产回滚、不删除 Cloudflare 部署、不修改 DNS 或 Pages 项目配置；这些操作需要明确的生产操作窗口和 Owner 确认。
- 不把 GitHub Actions 配置文件当作已运行证据；当前没有 Secrets，且本机无法验证私有仓库运行记录，只能验证 YAML、脚本和本地行为。
- 不引入监控 SaaS、数据库、运行时 API 或新的业务依赖。

## 3. 验收标准

- [x] 仓库有可复用的 smoke 命令，并能对本地静态 `out/` 运行通过。
- [x] CI workflow 包含锁定安装、依赖审计、Lint、类型、测试、构建和本地 smoke。
- [x] 生产监控 workflow 有定时和手动入口，默认不读取密钥。
- [x] 发布/回滚 workflow 仅允许手动、校验完整 reviewed commit SHA、使用生产环境保护和并发锁；Cloudflare Secret 名称已明确。
- [x] 回滚策略明确为 immutable reviewed commit SHA 重建发布，Cloudflare Dashboard 作为紧急 fallback；没有伪造不存在的 Pages CLI rollback 命令。
- [x] YAML、Node 脚本、现有类型/Lint/测试/构建和 smoke 已完成本地验证。
- [x] `npm run release:check` 已接入手动发布 workflow；正向/反向单测通过，干净的 `6908245` checkout 实际检查通过；当前文档状态更新未提交，因此本地检查按设计拒绝。
- [ ] GitHub Actions 至少成功运行一次；本机没有 GitHub CLI，匿名 API 返回 404，无法验证私有仓库的外部运行记录。
- [ ] GitHub `production` environment、Cloudflare Secrets、通知收件人和分支保护由 Owner 配置并验证。
- [ ] 当前生产内容能由最新 reviewed commit `6908245` 重建并部署；Cloudflare 当前仍标记 source `f65b5a7`，不包含线上可见的审核状态标记。
- [ ] 在明确生产窗口内先发布 `6908245`，再完成上一份 reviewed artifact 的实际 Pages 回滚演练；本任务不擅自切换生产版本。
- [x] 不提交 Git、不推送、不输出或写入真实密钥。

## 4. 验证计划

```bash
nvm use 22
npm ci
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
npm run release:check
python3 -m http.server 4173 --directory out
SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke
ruby -e 'require "yaml"; ARGV.each { |path| YAML.load_file(path); puts "#{path}: ok" }' .github/workflows/*.yml
```

生产检查由 `.github/workflows/production-monitor.yml` 使用 `SMOKE_BASE_URL=https://toolpilot.cc` 执行；不把当前会话中的 Cloudflare 登录状态写入 CI。

## 5. 风险与回滚

- CI workflow 只是仓库配置；当前没有可验证的 Actions 运行记录或 Secrets，不能宣称 CI 已上线。
- 生产 smoke 只能确认公开 HTTP 路径、审核标记和 sitemap 完整性，不能确认内容事实、DNS 变更或 Cloudflare 内部指标。
- 发布 workflow 在 commit SHA 校验、构建或本地 smoke 失败时不会部署；部署后生产 smoke 失败需要暂停后续发布，并由 Owner 用上一份 reviewed commit SHA 或 Cloudflare Dashboard 恢复。
- `release:check` 已在 `6908245` 上通过；后续发布仍必须使用该完整 SHA，不得改用 dirty worktree 或可移动分支。
- 当前生产页面包含 `Editorial review`、受限链接和缺失来源标记，但这些内容不在 Cloudflare source 元数据指向的 `f65b5a7` 中；在授权发布 `6908245` 前，不得把 `f65b5a7` 当作当前生产的可复现基线。
- `wrangler pages deployment --help` 当前没有 Pages 原生 rollback 子命令；因此回滚入口采用 immutable reviewed commit SHA 重建，避免写入未经验证的本地目录。
- 任何实际生产回滚必须记录当前部署、目标部署、时间、操作者、原因和前后 smoke 结果。

## 6. 当前完成记录

### 已完成

- `scripts/smoke.mjs` 已加入 `package.json` 的 `npm run smoke`；检查 7 个路径和 sitemap 的 50 条工具 URL。
- CI、生产定时监控和手动发布/回滚 workflow 已加入 `.github/workflows/`；发布输入已限制为完整 40 位 commit SHA，并校验 checkout 后的 `HEAD`。
- ADR-007 已记录 CI、告警信号、Cloudflare Secret、生产环境保护和 immutable reviewed commit 回滚决策。
- 本地静态服务器 smoke：7/7 路径 HTTP 200，审核标记和 sitemap 数量检查通过。
- 三个 workflow YAML 通过 Ruby YAML 解析；`npm run lint`、`npm run typecheck`、`npm test`、`npm run build` 和 `npm audit --audit-level=high` 均通过。
- 发布 workflow 的 commit gate 已直接执行验证：完整 40 位 commit SHA 通过，7 位短 SHA 被拒绝。
- 新增 `npm run release:check` 和 4 个发布门槛测试；完整测试集为 7/7。`6908245` 上的实际发布检查已通过。
- 2026-08-21 生产 smoke：7/7 路径 HTTP 200，审核状态标记和 sitemap 50 条工具 URL 检查通过。
- 2026-08-21 Cloudflare 只读核验：Wrangler OAuth 登录和 Pages 权限有效；项目 `toolpilot` 有两个 Production 部署。当前部署元数据显示 source `f65b5a7`，但 `git grep` 证实该提交不含生产 smoke 已验证的审核状态标记；较早部署没有 source ref。两者都尚未验收为可复现回滚基线。

### 外部待办

- 为 GitHub 配置 `production` Environment、`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`、审批规则和 Actions 失败通知。
- 将分支保护要求绑定到 `CI / quality` job；确认默认分支和 workflow 运行记录。
- `6908245` 已推送且 `release:check` 通过；下一步需要生产授权后通过受保护 workflow 发布该 SHA，再确认生产 smoke 和 Cloudflare source 一致。
- 确认一个已推送、已审核的上一版本完整 commit SHA，在生产操作窗口执行一次真实回滚演练；完成前任务保持 `IN_PROGRESS`。
