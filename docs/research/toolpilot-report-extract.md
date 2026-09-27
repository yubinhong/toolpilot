# ToolPilot 研究结论抽取与采用记录

日期：2026-09-27。输入：用户附件 `1-deep-research-report.md`，标题《三个域名的 AdSense 商业化与重新定位研究》。本文件只抽取 ToolPilot，不把报告内其他站点的产品建议纳入实施。

## 证据等级

- 报告转述：原文称 ToolPilot 在其 GSC 导出期为 0 点击、0 展示；本会话未获得原始导出，不能独立复核。
- 研究判断：ToolPilot 应优先投入，定位为 AI & Developer Tool Decision Engine。
- 待验证假设：搜索量、CPC、竞争度、收入和 RPM 模型。附件内部引用标记无法还原为可独立核对的原始来源；正式产品事实重新查官方来源。
- 整改前基线：50 条历史研究快照，Compare/Alternatives 缺少决策正文，草稿曾进入 sitemap，商业研究标签有误解风险。基线见 ../tasks/remediation-baseline.md。
- 当前状态（2026-09-27）：28 条首批正文保持 `in-review`/noindex 并退出 sitemap；用户报告 CNAME 已切至 Git-integrated Pages，正式域名和 immutable preview 的 current smoke 均通过 88 页、robots、sitemap 和真实 404。更早五路径 403 记录见 public-audit-2026-09-27.json，只描述当时测试环境，不能推断全球可达性或 Googlebot 状态。

## 采用的结论

| 报告章节 | ToolPilot 结论 | 执行决定 |
| --- | --- | --- |
| 执行摘要 / 域名对比 | 保留 toolpilot.cc，重点投入 | 域名品牌不变；英文、开发者工具范围不变 |
| 推荐定位与产品设计 | 工具选择而非简介集合 | 决策先说明适用、不适用、成本和迁移 |
| 启动关键词 | X vs Y、X alternatives、X pricing 优先 | 8 产品、6 比较、6 替代、4 价格、2 场景、2 指南 |
| 比较模板 | 同口径价格、隐私、自托管、否决条件、迁移、日期 | 共用事实数据；缺失明确标记；无实测不造 tested 日期 |
| 数据与可信度 | 来源、更新时间、第一方整理 | 字段来源、精确版本审核和依赖摘要 |
| 商业模式 | Affiliate > Sponsor/Lead Gen > AdSense > 未来付费 | 仅采用披露和隔离规则；无商业激活 |
| SEO / 内容风险 | 不批量抓取改写 500 个工具 | 不扩充薄页；原 URL 保留、草稿 noindex |
| 增长实验 | 优先结论、标题和内链 | 先完成内容，再使用真实 GSC；低流量不宣称统计显著 |

首批查询方向：cursor vs claude code、windsurf vs cursor、lovable vs bolt、replit vs lovable、cursor/claude code/lovable/bolt.new alternatives、cursor/claude code/lovable/replit pricing。报告搜索量与 CPC 不作为已验证值。

## 不直接照搬

- Astro 重建：保留已运行的 Next.js 静态架构。
- Crypto 残留：源码无相应页面，且原文没给出可复核具体路径。收集真实 URL 后再判断；无对应内容用真实 404，不向不相关首页 301。
- MCP、自托管目录、计算器、中文、更新目录：本轮仅有事实维度和页内更新记录，其余暂缓。
- 每周机械扩页、立即 A/B、立即广告申请：改成基于内容审核、实际数据和商业条件的门槛。
- Cookie 横幅：未接追踪不随意加入“Accept”弹窗；未来广告和同意方案单独确认。

## 原报告经营数字（不是验收承诺）

90 天：40–60 正式页面、≥35 有效索引页、月展示 20k–80k、月自然点击 500–2,000、CTR 2.5–6%、月 PV 2k–8k、≥10 非品牌 Top 10 查询。

六个月：100–200 个高质量 URL，月自然点击 10k–50k，3–5 个能产生实际 Affiliate 转化的类别。RPM $2/$6/$10 是内部情景假设。广告主 CPC 不等于出版商每次点击收益。

本轮先交付 28 页待审核内容，不能通过页数、审核或代码推导流量和收入。90 天实际运营见 ../operations/90-day-review.md。

## 本次研究纠偏

Windsurf 官网价格及 Cascade 文档在 2026-09-27 的读取中分别跳转到 https://devin.ai/pricing 和 https://docs.devin.ai/desktop/cascade/cascade。保留旧 slug，并阻止未经确认的旧价格、账号迁移或产品身份结论。Replit 价格页面提取没有可靠方案金额，保留未知。Claude Code 后续从官方订阅页补充 Pro 月付与年付基价，仍不推算具体任务总费用。
