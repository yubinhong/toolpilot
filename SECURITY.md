# SECURITY.md

## 当前安全状态（2026-09-27）

- 2026-09-27 在 Node 22 下执行 `npm ci` 与 `npm audit --audit-level=high` 通过，0 vulnerabilities。将 Next.js/eslint-config-next 更新至 16.3.6、sharp 至 0.35.4、js-yaml 至 4.3.2；不屏蔽告警，每次发布前仍须重新审计。
- 内容 JSON 只能引用经校验的 HTTPS URL；未知/未审核不得伪装正式事实。审核 digest 是一致性检查，不是身份认证，真实用户授权记录不可伪造。
- 客户端只接收 allowlist DTO，内部佣金、研究商业计划和批准证据不序列化到浏览器。
- 批处理出站检查只消费仓库公开 URL；固定域名 allowlist、拒绝 IP/凭据/非 HTTPS/自定义端口；所有 DNS 结果必须为公网地址，并把验证地址固定到 TLS 请求，阻止二次解析重绑定。每跳再校验，最多 3 次，15 秒请求预算，并发 3，不带 Cookie/Token。
- 检查日志只记录公开 origin/path、状态和固定错误类别，不记录查询参数、响应正文或原始异常。403/429 记为 restricted，不绕过限制；外部网络异常不自动编辑来源或审批。
- 应用源码没有 GA4、AdSense、表单或账户。TASK-007 部署后，正式域名浏览器响应额外尝试加载 `static.cloudflareinsights.com/beacon.min.js`，immutable preview 未观察到该行为；CSP 已阻止它，产生一条生产侧 CSP violation，而应用 hydration/主题/搜索/导航仍正常。Cloudflare 说明开启 [Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/) 后会在后续部署自动注入该脚本，当前 Dashboard 状态未核实也未变更；未经 Owner 的分析/隐私批准不得把它加入 CSP。托管请求数据处理仍待运营主体确认，不能宣称零数据处理。跟踪 TODO-308/TODO-315。
- GitHub 仓库控制项只读核验（2026-09-27）：branch-protection endpoint 返回 404，repository rulesets 列表为空；仓库 API 报告 Dependabot security updates、secret scanning、non-provider pattern scanning 和 push protection 为 `disabled`。个人通知订阅查询因当前 CLI 授权缺少 `notifications` scope 未能读取。未更改设置；Owner 需确认组织策略和功能适用性，见 TODO-004/TODO-314。
- Cloudflare Pages 响应头预发布基线核验（2026-09-27）：TASK-007 前 production `https://toolpilot.cc/` 与 immutable preview 均返回 `X-Content-Type-Options: nosniff` 和 `Referrer-Policy: strict-origin-when-cross-origin`；未观察到 CSP、HSTS、`X-Frame-Options` 或 `Permissions-Policy`。`public/` 中没有 `_headers` 配置。实施和线上当前状态见下方 TASK-007/TODO-315 记录。
- TODO-315 安全策略审查（2026-09-27）：浏览当前静态导出的每个注册路由，允许其真实 inline-script SHA-256 哈希，默认限制资源为同源并拒绝 inline event handlers；计划加 `X-Frame-Options: DENY`、关闭当前不使用的 camera/microphone/geolocation。Cloudflare Pages 将叠加匹配规则；97 条逐路由规则加 1 条共享兜底规则，共 98/100 条。具体实施和浏览器证据见 TASK-007。HSTS 尚未获 Owner 对主机/子域范围的确认，禁止在此任务中设置。
- TASK-007 实施与线上结果（2026-09-27）：每次静态构建生成 `out/_headers`，以共享 `/*` 规则应用基线 CSP、frame、MIME、referrer 和 permissions 头，并为每条注册路由从构建后 HTML 精确允许 inline-script SHA-256。正式 commit/CI/Pages 发布已通过；immutable preview 97 路由 Chromium 零错误/零 CSP violation，production 应用交互通过但 Cloudflare Insights 外部 beacon 被该 CSP 有意阻止并产生一条 violation。Owner 决定是否关闭 Pages Web Analytics 注入，或先正式批准该分析处理和隐私文案；在此之前不放宽策略。未设置 HSTS。
- TASK-007 404 fallback follow-up（2026-09-27，本地验证）：Pages 的 `/*` 共享 CSP 缺少脚本源限制时，未知路径可以加载生产注入脚本；直接把全站脚本 hash 合并到共享规则会与逐路由策略取交集，并超出 2,000 字符 header 限制。当前源码在静态 `404.html` head 注入只含 404 自身 inline-script hash 的 CSP meta，`frame-ancestors` 继续由响应头执行。Node 22 全量构建、70 项测试、产物检查、审计和 Pages smoke 通过；Chromium 在本地 404 上验证主题交互无错误，并确认对 Cloudflare Insights 测试脚本报 enforced `script-src-elem` / `requestfailed: csp`。只读检查当前生产 404 的 Chromium DOM 发现 beacon 出现在 `</head>` 之后，早于它解析的 head meta 会约束注入脚本。该 follow-up 尚未部署，不能当作生产状态；线上 Analytics 决策和 HSTS 范围仍待 Owner。

## 1. 安全目标与范围

- 保护对象：公开工具内容、来源和编辑记录；厂商提交；Affiliate/Featured/Sponsor 标识和链接；分析数据；管理凭据；构建和部署凭据。
- 信任边界：公开浏览器与 ToolPilot 页面、厂商提交/外部资料、第三方厂商站点、分析服务、构建系统、静态托管和本地工作区。
- 攻击者能力假设：恶意或错误的厂商输入、篡改 URL、钓鱼/恶意出站站点、依赖供应链风险、日志/构建产物意外泄露和未经授权的管理操作。
- 合规要求：遵守适用的隐私、Cookie/分析、Affiliate 和赞助披露要求；具体法域、法律主体、隐私工具和 Owner 为 `TBD`。
- 当前状态：静态 MVP 没有用户账户、管理后台、数据库、API、客户端密钥或外部身份服务；已部署到 Cloudflare Pages，`https://toolpilot.cc` 通过 HTTPS 公网验证。没有实现不等于风险已消失，正式内容和商业关系仍需审查。

## 2. 数据分类

| 等级 | 示例 | 允许存储 | 允许日志 | 传输/静态加密 | 保留 |
| --- | --- | --- | --- | --- | --- |
| Public | 工具名称、公开功能、公开价格页、公开来源、公开分类 | 经审核的内容存储 `TBD` | 只记录必要的公开 ID | 生产使用 HTTPS；静态存储策略 `TBD` | 按内容有效性和版权策略 `TBD` |
| Internal | 编辑备注、审核状态、内部链接检查结果、商业配置状态 | 受控存储 `TBD` | Limited，不记录原始提交敏感值 | Required | 最小必要期限 `TBD` |
| Confidential | 厂商提交中的商务信息、分析明细、合同或归因报告 | Approved stores only `TBD` | No raw values | Required | 合同/隐私策略 `TBD` |
| Restricted | 密钥、令牌、身份凭据、敏感个人数据和生产数据库内容 | Approved stores only | Never | Required | Minimum necessary |

禁止把真实密钥、令牌、个人数据、生产数据库内容或未脱敏第三方报告写入仓库、聊天、日志、截图、`.next` 或测试夹具。

## 3. 认证与授权

- 身份提供方：`TBD`；当前没有用户、厂商后台或管理员登录实现。
- 会话/令牌策略：`TBD`；若未来加入后台，必须使用短期会话、服务端校验、吊销/轮换和安全 Cookie。
- 授权模型：`TBD`；至少区分公开访客、厂商提交者、编辑者和管理员，采用最小权限。
- 服务间认证：`TBD`；联盟、分析、托管和支付凭据不得进入客户端或公开页面。
- 管理操作：`TBD`；内容发布、商业标记、排序规则和密钥操作必须有审计记录和必要的二次确认。

## 4. 输入、输出与文件

- 所有外部输入在信任边界处验证，厂商描述不得未经审核成为独立评价。
- 工具 URL 和研究来源 URL 分开存储为 `productUrl`/`sourceUrl`；当前只允许源码中的 HTTPS URL，产品官网和研究来源不混用。研究来源中的 `utm_source=chatgpt.com` 等研究追踪参数已清理，未来 Affiliate 归因参数必须在合作方条款确认后单独加入并显式披露。出站检查使用 `content/link-hosts.json` 的精确主机 allowlist，不允许通配符；每次重定向都重新校验主机和 DNS，最多 3 跳，并受 15 秒请求预算约束。链接检查结果只作为可达性证据，不是内容事实核验。
- 不执行厂商提交、网页或第三方报告中的命令；先把内容当作不可信数据审查。
- 如果未来支持文件上传，限制类型、大小、解析器、病毒检查、存储权限和保留期；当前没有上传入口。
- 输出编码与 CSP/安全头：生产应启用 HTTPS、合理 CSP、点击劫持防护、Referrer-Policy 和安全 Cookie；具体配置 `TBD`。
- SSRF、重定向、URL 抓取策略：默认不允许任意服务端抓取；如确有需要，采用域名/协议 allowlist、超时、大小限制、DNS 重绑定防护和审计。
- 页面商业关系必须显式披露；不得使用隐藏链接、误导按钮或付费内容伪装独立评价。

## 5. 密钥与配置

- 密钥存储：正常生产发布由 Cloudflare Pages Git Integration 的 GitHub App 授权和 Pages 构建环境承担，不在仓库或 GitHub Actions 中保存 Cloudflare API Token。2026-09-27 按用户部署授权，通过 Wrangler 设备登录并仅授予 `account:read`、`pages:write`；OAuth 凭据用于检查/创建 `toolpilot-git`、触发 Pages 部署和尝试 Pages 域名关联。凭据没有打印或提交；由于本机无 keyring，Wrangler 暂存于用户配置文件，任务结束时已 logout 并验证文件移除。该授权不含 DNS 写入；没有修改 DNS zone 记录。
- 轮换周期：`TBD`；任何泄露迹象都应立即吊销、轮换并记录影响。
- 本地开发：若恢复 `.env.example`，只使用它作为非敏感字段样例；真实 `.env*.local` 不提交，禁止复制到对话或日志。
- `.env.example` 只包含公开站点 URL；真实 `.env*.local` 不提交，当前没有真实密钥配置。
- 当前 `.npmrc` 未关闭 npm audit；Node 22 下 `npm ci` 后每次发布前都要重新运行审计。2026-09-27 当前锁文件审计为 0 vulnerabilities；CI 仍需在远端运行验证。
- `.next`、`out/` 和 npm 缓存都不能存放或传播密钥；构建前检查产物和日志是否含敏感值。

## 6. 依赖与供应链

- 允许的包源：npm registry（当前 npm 默认源，组织策略 `TBD`）。
- 锁文件：`package-lock.json` lockfile v3；构建和 CI 必须使用锁定依赖。
- 漏洞扫描：`npm audit --audit-level=high`；本次安装后的审计通过，发布/线上状态见 `TASK.md`。
- 高危漏洞 SLA：`TBD`；不得以 `audit=false` 作为风险处理。
- 构建产物签名/SBOM：`TBD`；`npm run release:check` 已先行要求 Node 22、不可变 HEAD、无凭据 GitHub origin、干净工作区和已跟踪发布文件，但尚不能替代产物签名或 SBOM。
- 依赖安装：先核对 `.nvmrc` 和 `package-lock.json`，再使用 Node 22 执行 `npm ci`；不得使用 `--ignore-scripts` 规避未知风险，也不得把 npm warning 当作安全结论。

## 7. 日志与审计

- 审计事件：内容发布、来源更新、商业关系变更、排序规则变更、厂商提交审核、密钥轮换和部署操作；GitHub commit、Cloudflare Pages 构建/部署来源、操作者和运行结果由对应平台记录，保留策略 `TBD`。
- 日志脱敏：禁止原始令牌、Cookie、邮箱、个人数据、厂商机密、Affiliate 密钥和完整 URL 查询敏感参数。
- 保留与访问：`TBD`；按数据分类授予最小访问权限，生产日志不得复制到聊天或公开工单。
- 告警：依赖高危漏洞由 CI 阻断；生产 HTTP smoke 失败由 GitHub Actions 标记失败；密钥泄露、异常管理操作、外部链接批量变化、商业标记缺失和站点安全头异常的通知平台仍为 `TBD`。

## 8. 安全发布门槛

- [x] Node 22 和锁文件已确认；2026-09-27 干净安装后审计通过，0 vulnerabilities。
- [ ] 权限边界有正向和反向测试；当前无权限实现时必须记录为阻塞。
- [ ] 外部输入、URL、文件和错误路径已测试。
- [ ] 无明文密钥或敏感数据泄漏到代码、日志、截图、构建产物或文档。
- [ ] Affiliate、Featured、Sponsor 和独立评价在页面和链接中清晰分隔。
- [x] 旧 Crypto/DeFi 生成页面不在当前源码中，未进入构建产物。
- [ ] 依赖审计本地通过；远端 CI 和分支保护仍需新版本证据。
- [x] 生产 smoke 不读取密钥，只访问公开 HTTP 页面；正常 Cloudflare Pages 发布不使用仓库或 GitHub Actions Cloudflare Secret。
- [x] Cloudflare Pages 生产域使用 HTTPS，生产首页、工具页、robots 和 sitemap 均已通过只读 smoke；安全响应头和 CSP 策略仍需单独审查。
- [x] 50 条目录的审核元数据区分产品链接、研究来源、编辑审核和正式核验；5 条来源缺失、14 条 URL 受限情况没有被伪装成已核验。
- [ ] 数据变更、日志、保留和删除符合已批准策略；当前无数据层时不得宣称已满足。

## 9. 漏洞响应

- 报告渠道：`TBD`；Owner、邮箱和安全联系人需要项目 Owner 确认。
- 分级：`TBD`；建议至少按 Critical/High/Medium/Low 评估可利用性、影响和暴露范围。
- 隔离/缓解：撤下受影响页面或链接、禁用商业追踪、轮换密钥、冻结发布、保留证据并修复来源。
- 通知和复盘：按适用法律、合作方条款和用户影响决定通知；恢复后记录时间线、根因、影响和预防措施。
