# TASK.md - TASK-004 CI、生产监控与 Cloudflare Pages Git Integration

> 当前唯一活动任务。TASK-003 已完成；本任务建立可验证的 CI、生产 smoke、监控告警入口，并将生产发布目标切换为 Cloudflare Pages Git Integration。当前 Direct Upload 项目保留作为迁移期间的恢复目标。

## 任务元数据

- 状态：`IN_PROGRESS`
- 类型：`CI + OPERATIONS + RELEASE`
- 优先级：`P0`
- Owner：工程/运维 Owner `TBD`
- 创建/更新：`2026-08-21`
- 基线：TASK-003 完成后的工作区；reviewed commit `4776027` 已推送到 `origin/main`、通过 `release:check` 并部署到旧 Direct Upload 项目
- 关联 PRD/ADR：`PRD-001`、`ADR-005`、`ADR-007`、`ADR-008`
- 生产目标：`https://toolpilot.cc`；当前 Direct Upload 项目 `toolpilot`，目标为新建 Git-integrated Pages 项目

## 1. 目标

把当前质量检查和生产发布收敛为可审计的仓库入口：PR/Push CI、Cloudflare Pages 构建命令、静态产物 smoke、定时生产可用性检查，以及由 Cloudflare Pages Git Integration 根据 `main` 提交自动构建和发布。保留 reviewed commit 和 Pages 部署历史作为回滚依据。

## 2. 范围

### 包含

- `scripts/smoke.mjs`：检查关键页面 HTTP 200、审核状态标记、受限/缺失来源状态和 50 条 sitemap URL。
- `scripts/release-readiness.mjs`：发布前检查 Node 22、完整 HEAD SHA、无凭据 GitHub origin、干净工作区和已跟踪发布文件。
- `.github/workflows/ci.yml`：Node 22、`npm ci`、audit、lint、typecheck、test、build 和本地静态 smoke。
- `.github/workflows/production-monitor.yml`：每 15 分钟和手动触发的生产 smoke；失败由 GitHub Actions 提供第一层告警信号。
- `package.json`：提供 `cloudflare:build`，供 Cloudflare Pages Git Integration 执行 lint、typecheck、test 和静态构建。
- Cloudflare Pages Git Integration：连接 `yubinhong/toolpilot` 的 `main`，输出 `out/`；外部项目和 GitHub App 授权另行完成。
- 更新 `TESTING.md`、`RUNBOOK.md`、`SECURITY.md`、`AI_CONTEXT.md`、`TODO.md`、`CHANGELOG.md` 和 ADR-008。

### 不包含

- 不修改业务代码、升级依赖或把 Cloudflare API Token 写入仓库；GitHub App 授权、Cloudflare Pages 项目、构建设置和域名迁移属于外部配置。
- 不删除旧 Direct Upload 项目、不在新项目 smoke 通过前切换 `toolpilot.cc`，不执行生产回滚；这些操作需要生产窗口和 Owner 确认。
- 不把仓库配置当作 Cloudflare Git Integration 已激活的证据；必须以 Dashboard 项目状态、新部署和公网 smoke 验证。
- 不引入监控 SaaS、数据库、运行时 API 或新的业务依赖。

## 3. 验收标准

- [x] 仓库有可复用的 smoke 命令，并能对本地静态 `out/` 运行通过。
- [x] CI workflow 包含锁定安装、依赖审计、Lint、类型、测试、构建和本地 smoke。
- [x] 生产监控 workflow 有定时和手动入口，默认不读取密钥。
- [x] `npm run cloudflare:build` 可作为 Pages Git Integration 的构建命令，输出静态 `out/`。
- [x] 正常发布路径不再依赖 GitHub Actions Cloudflare API Token；回滚策略为 Pages 部署历史或 reviewed commit 重建。
- [x] YAML、Node 脚本、现有类型/Lint/测试/构建和 smoke 已完成本地验证。
- [x] `npm run release:check` 保留为本地/提交审核状态检查；正向/反向单测通过，干净的 `4776027` checkout 实际检查通过。
- [x] GitHub CI 至少成功运行一次：公开仓库 run `32442681654` 对提交 `7e0932d` 的结论为 `success`。
- [ ] Cloudflare Dashboard 已新建 Git-integrated Pages 项目并授权 `yubinhong/toolpilot`；构建设置和首个 preview 部署已验证。
- [ ] `toolpilot.cc` 已从旧 Direct Upload 项目迁移到新 Git-integrated 项目，并通过生产 smoke；旧项目仍保留为恢复目标。
- [ ] GitHub 分支保护、Actions 通知和 Cloudflare/GitHub 部署通知由 Owner 配置并验证。
- [x] 当前生产内容能由 reviewed commit `4776027` 重建并部署；Cloudflare Production source 已核对为 `4776027`，生产 smoke 通过。
- [ ] 在生产窗口内完成上一份 reviewed artifact 的实际 Pages 回滚演练；本任务不自动切换回滚版本。
- [x] 不输出或写入真实密钥；仓库不保存 Cloudflare API Token。

## 4. 验证计划

```bash
nvm use 22
npm ci
npm audit --audit-level=high
npm run lint
npm run typecheck
npm test
npm run build
npm run cloudflare:build
npm run release:check
python3 -m http.server 4173 --directory out
SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke
ruby -e 'require "yaml"; ARGV.each { |path| YAML.load_file(path); puts "#{path}: ok" }' .github/workflows/*.yml
```

生产检查由 `.github/workflows/production-monitor.yml` 使用 `SMOKE_BASE_URL=https://toolpilot.cc` 执行；不把当前会话中的 Cloudflare 登录状态写入 CI。

## 5. 风险与回滚

- CI workflow 只是仓库配置；已有成功运行记录，但 Cloudflare Git Integration 外部项目仍需 Dashboard 状态和部署证据确认。
- 生产 smoke 只能确认公开 HTTP 路径、审核标记和 sitemap 完整性，不能确认内容事实、DNS 变更或 Cloudflare 内部指标。
- Cloudflare Pages 构建或生产 smoke 失败时暂停后续发布；由 Owner 使用新项目的上一份 verified deployment、对应 reviewed commit 或迁移期间保留的旧项目恢复。
- `release:check` 已在 `4776027` 上通过并用于生产发布；后续发布仍必须使用完整 reviewed SHA，不得改用 dirty worktree 或可移动分支。
- 当前生产页面包含 `Editorial review`、受限链接和缺失来源标记，Cloudflare source 已核对为 `4776027`；这些公开标记不替代产品 Owner 对 50 条工具事实的正式审核。
- Cloudflare Git Integration 启用前后均不得把 Wrangler 本地上传当作正常发布路径；Wrangler 仅用于只读核验或明确授权的恢复操作。
- 任何实际生产回滚必须记录当前部署、目标部署、时间、操作者、原因和前后 smoke 结果。

## 6. 当前完成记录

### 已完成

- `scripts/smoke.mjs` 已加入 `package.json` 的 `npm run smoke`；检查 7 个路径和 sitemap 的 50 条工具 URL。
- CI 和生产定时监控 workflow 已加入 `.github/workflows/`；手动 Pages API-token 发布 workflow 已移除。
- `package.json` 已加入 `cloudflare:build`；ADR-008 已记录 Git Integration 的目标配置、迁移顺序和旧项目保留策略。
- 本地静态服务器 smoke：7/7 路径 HTTP 200，审核标记和 sitemap 数量检查通过。
- 现存 workflow YAML 通过 Ruby YAML 解析；`npm run lint`、`npm run typecheck`、`npm test`、`npm run build` 和 `npm audit --audit-level=high` 均通过。
- `release:check` 的 commit gate 已直接执行验证：完整 40 位 commit SHA 通过，7 位短 SHA 被拒绝。
- 新增 `npm run release:check` 和 4 个发布门槛测试；完整测试集为 7/7。`4776027` 上的实际发布检查已通过。
- 2026-08-21 生产 smoke：7/7 路径 HTTP 200，审核状态标记和 sitemap 50 条工具 URL 检查通过。
- 2026-08-21 Cloudflare 发布核验：Wrangler OAuth 登录和 Pages 写入权限有效；项目 `toolpilot` 的最新 Production 部署 ID 为 `be8ecb81-fcad-4058-8909-e80befb441ab`，source 为 `4776027`，生产 smoke 7/7 通过；较早部署没有 source ref，不作为已确认回滚基线。
- 2026-08-21 GitHub 外部核验：仓库公开可读；CI run `32442681654` 对 `7e0932d` 完成且成功。Cloudflare Git Integration 新项目尚无外部运行证据。

### 外部待办

- 在 Cloudflare Dashboard 创建 Git-integrated Pages 项目，授权 GitHub App 访问 `yubinhong/toolpilot`，配置 `main`、`npm run cloudflare:build`、`out`、Node 22 和 `NEXT_PUBLIC_SITE_URL`。
- 将分支保护要求绑定到 `CI / quality` job；确认默认分支和 workflow 运行记录。
- `4776027` 已推送、通过 `release:check` 并完成旧 Direct Upload 发布；下一步验证新 Pages Git Integration 的 preview，再迁移 `toolpilot.cc`，确认生产 smoke 和部署历史。
- 确认一个已推送、已审核的上一版本完整 commit SHA，在生产操作窗口执行一次真实回滚演练；完成前任务保持 `IN_PROGRESS`。
