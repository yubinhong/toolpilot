# TESTING.md

## 1. 质量目标

- 核心用户路径：从开发任务进入决策页，读取工具事实、比较和商业标记，再安全访问厂商站点。
- 不可接受的失败：发布无来源或过期事实、隐藏 Affiliate/Sponsor 关系、错误的自然排序、将旧 Crypto/DeFi 页面当作当前 ToolPilot 内容、泄露密钥或个人数据。
- 目标覆盖范围：`TBD`；当前单测覆盖目录数据和发布门槛不变量，页面质量以类型、Lint、静态构建和本地 HTTP smoke 为主，GitHub CI 已有成功运行，生产 smoke 入口已加入但定时监控外部运行记录仍待确认。
- 当前验证状态：Node 22.23.0/npm 10.9.8 下目录审核字段、TASK-004 smoke 和 release readiness 变更已通过 `typecheck`、`lint`、7 个测试、生产构建和高危级别依赖审计；最新外部检查为 50 个产品官网中 42 个返回 2xx/3xx、8 个返回可达但受防护/限流影响的 403/429，45 个研究来源中 39 个返回 2xx/3xx、6 个 403；5 个条目没有研究来源 URL。2026-08-21 新 smoke 对 `toolpilot.cc` 的 7 个路径均返回 HTTP 200，sitemap 包含 50 个工具 URL。

## 2. 标准命令

### 当前可执行的上下文检查

| 目的 | 命令 | 何时运行 | 预计耗时 |
| --- | --- | --- | --- |
| 文件和入口盘点 | `find . -path './.next' -prune -o -path './.wrangler' -prune -o -type f -print \| sort` | 文档审计、上下文刷新 | 秒级 |
| 配置样例检查 | `sed -n '1,120p' .env.example .nvmrc .npmrc .gitignore` | 环境或安全变更 | 秒级 |
| 静态产物检查 | `find out -maxdepth 2 -type f -print | sort` | 构建后确认路由和元数据 | 秒级 |
| 运行时检查 | `nvm use 22 && node --version && npm --version` | 每次建立工程命令前 | 秒级 |
| 项目文档占位符检查 | `rg -n '\{\{[^}]+\}\}' --glob '*.md' -g '!README.md' -g '!docs/adr/0000-template.md' -g '!prompts/**'` | 文档初始化或收尾 | 秒级 |

### 工程命令

| 目的 | 命令 | 何时运行 | 预计耗时 |
| --- | --- | --- | --- |
| 格式化检查 | `TBD - no formatter configured` | 代码风格工具变更后 | `TBD` |
| Lint | `nvm use 22 && npm run lint` | 每次代码变更 | 秒级 |
| 类型检查 | `nvm use 22 && npm run typecheck` | 每次 TypeScript/路由变更 | 秒级 |
| 单元测试 | `nvm use 22 && npm test` | 目录数据或纯逻辑变更 | 秒级 |
| 集成测试 | `TBD - no external service or integration harness` | 引入服务端/内容服务后 | `TBD` |
| E2E | `TBD - no browser harness` | 用户流程变更后 | `TBD` |
| 构建 | `nvm use 22 && npm run build` | 合并前、发布前 | 秒级 |
| 安全检查 | `nvm use 22 && npm audit --audit-level=high` | 合并前、发布前 | 秒级 |
| 发布前仓库检查 | `nvm use 22 && npm run release:check` | 提交审核后、Pages 发布前 | 秒级 |
| 50 个官网链接 | `node --input-type=module -e "import {tools} from './lib/catalog.mjs'; /* 对 tools.productUrl 执行 GET */"` | 目录链接变更、发布前 | 数十秒 |
| Cloudflare 认证 | `npx --yes wrangler@4.124.0 whoami` | Pages 发布前 | 秒级 |
| Cloudflare 部署历史 | `npx --yes wrangler@4.124.0 pages deployment list --project-name toolpilot` | 发布/回滚前确认当前和候选部署 | 秒级 |
| Cloudflare Pages 发布 | `npx --yes wrangler@4.124.0 pages deploy out --project-name toolpilot --branch main` | 发布已审查的 `out/` | 分钟级 |
| 生产 smoke | `for path in / /tools/ /tools/digitalocean/ /robots.txt /sitemap.xml; do /usr/bin/curl -sS -L --max-time 20 -o /dev/null -w ... https://toolpilot.cc${path}; done` | 每次生产发布 | 分钟级 |
| 内容审核不变量 | `npm test` | `lib/catalog.mjs` 审核字段或来源变更 | 秒级 |
| 本地/生产 smoke | `npm run smoke` | 构建产物或生产发布后 | 秒级/分钟级 |

不要把 `npm run build`、`npm test`、`npm run lint` 等猜测命令写成通过；恢复 `package.json` 后先读取实际 scripts 和锁文件，再更新本表。

## 3. 最小相关验证规则

- 修改纯函数：运行对应单元测试和类型检查；测试入口恢复前记录阻塞。
- 修改 API：运行契约测试、授权测试、相关集成测试；当前没有已确认 API。
- 修改数据模型：验证迁移、回滚/前滚、旧数据和并发路径；当前没有数据库或迁移文件。
- 修改 UI：验证目标设备、响应式、键盘、错误状态、外部链接和可访问性。
- 修复缺陷：先建立失败复现，再添加回归测试。
- 修改内容：核对来源、更新时间、事实字段、链接、链接检查结果、审核 Owner、商业标记和页面主题；HTTP 可达不能替代内容核验。
- 修改 Affiliate/Featured/Sponsor：检查用户可见披露、链接关系、分析属性和评价排序隔离。
- 修改 AI 提示或模型逻辑：当前没有 AI 运行时；若未来引入，运行固定评测集并比较质量、成本、延迟和安全指标。
- 修改发布 workflow 或 Git 边界：运行发布门槛单测，并直接运行 `npm run release:check`；缺 remote、dirty worktree 或未跟踪发布文件必须导致非零退出。

## 4. 测试矩阵

| 能力 | 单元 | 集成 | E2E | 安全 | 性能 | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| 文档和项目上下文 | 不适用 | 文件清单/占位符检查 | 不适用 | 敏感文件名检查 | 不适用 | `TBD` |
| 静态页面构建 | `TBD` | `TBD` | `TBD` | 依赖和密钥扫描 `TBD` | 页面预算 `TBD` | `TBD` |
| 发布仓库状态 | Node 版本、SHA、remote、dirty/tracked 不变量 | workflow YAML | 手动 dispatch `TBD` | 不打印 remote/Secret | 不适用 | 工程/运维 Owner `TBD` |
| 工具事实与来源 | 目录不变量 | 内容审查 | 页面/链接检查 | 外部输入校验 | 新鲜度检查 `TBD` | `TBD` |
| 商业披露与出站链接 | `TBD` | `TBD` | 点击和跳转检查 `TBD` | 关系与日志脱敏 `TBD` | `TBD` | `TBD` |

## 5. 测试数据

- 默认使用合成或脱敏数据。
- 禁止把生产凭据、真实联盟密钥、个人数据或厂商机密复制到测试夹具。
- 固定随机种子：`TBD`；当前没有随机测试。
- 时间/时区：使用 `Asia/Shanghai` 记录文档审计时间；应用时间策略 `TBD`。
- 外部服务：默认 mock 或 sandbox；当前没有已配置外部服务。
- URL 测试：使用合成或公开的测试 URL；禁止通过测试把敏感参数放进 URL、日志或截图。

## 6. CI 质量门槛

- `.github/workflows/ci.yml` 已建立仓库级 CI；公开仓库 `main` 与 `origin/main` 已同步，GitHub CI run `32442681654` 已成功。
- [x] Node 22 与 `.nvmrc` 一致（Node 22.23.0）。
- [x] Lint、类型检查通过；格式化工具仍未配置。
- [x] 最小相关测试通过（7 个 Node test，其中 4 个覆盖 release readiness）。
- [x] 无新增高危安全问题，授权网络下 `npm audit --audit-level=high` 返回 0 vulnerabilities。
- [x] 构建产物可生成，内容路由、robots 和站点地图可审查。
- [x] 本地 `out/` 静态服务器的 `npm run smoke` 通过 7 个路径和 50 条工具 sitemap URL。
- [x] 2026-08-21 `SMOKE_BASE_URL=https://toolpilot.cc npm run smoke` 通过 7 个生产路径和 50 条工具 sitemap URL。
- [x] 2026-08-21 Wrangler 认证、Pages 发布和部署历史读取通过；最新 Production source 为 `4776027`，部署 ID 为 `be8ecb81-fcad-4058-8909-e80befb441ab`，另一个较早部署没有 source ref，因此不作为已确认回滚目标。
- [x] 手动发布 workflow 的 commit gate 已直接执行：完整 40 位 SHA 通过，7 位短 SHA 被拒绝。
- [x] `npm run release:check` 正向/反向单测通过；`4776027` 上的实际 checkout 检查通过。
- [x] GitHub Actions `CI / quality` 成功运行（run `32442524361`）；[ ] 分支保护仍等待 GitHub Owner 配置。
- [ ] 定时生产 smoke 首次运行并配置失败通知；等待 GitHub Owner 配置。
- [x] 旧 Crypto/DeFi 页面不在当前源码中，按用户确认不迁移。
- [ ] Flaky test 不通过重跑掩盖；必须记录根因或隔离审批。

## 7. 无法运行测试时

必须在任务完成记录中写明：

- 未运行的命令：格式化、集成、E2E；仓库尚未配置对应工具或外部服务。
- 已完成验证：Node 22.23.0/npm 10.9.8、`npm run typecheck`、`npm run lint`、`npm test`、`npm run build`；本地 `127.0.0.1:3001` 的 `/`、`/tools/`、`/tools/cursor/`、`/compare/`、`/guides/`、`/robots.txt`、`/sitemap.xml` 均返回 200。
- 残余风险：没有 GitHub Actions 外部运行记录、浏览器 E2E、性能预算或正式来源审核；8 个官网可达但返回 403/429，不能据此完成页面内容核验。
- 已完成生产验证：Cloudflare Pages 部署 URL 为 `https://be8ecb81.toolpilot-2cy.pages.dev`，source 为 `4776027`；`https://toolpilot.cc` 的首页、目录、DigitalOcean/Cloudways/Docker 详情、robots、sitemap 均返回 200，生产 sitemap 包含 50 个工具 URL，页面显示审核状态标记。
- 下一位执行者：配置/验证 GitHub `production` Environment、Cloudflare Secrets、失败通知和分支保护，确认首次 `CI` 与生产监控运行；随后在生产窗口完成 `TODO-302` 回滚演练。
