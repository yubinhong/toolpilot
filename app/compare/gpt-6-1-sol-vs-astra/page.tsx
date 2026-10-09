import { OfficialLink } from "../../../components/official-link";
import { PageFrame } from "../../../components/page-frame";
import { estimateRequestCost } from "../../../lib/model-cost";
import { getModel } from "../../../lib/models";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata("/compare/gpt-6-1-sol-vs-astra/");

const keyword = "gpt 6.1 sol vs astra";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 });

function price(value: number | null | undefined | "not_applicable") {
  if (value === "not_applicable") return "Not applicable";
  return value == null ? "Not publicly available" : currency.format(value);
}

function requestCost(model: NonNullable<ReturnType<typeof getModel>>) {
  const estimate = estimateRequestCost(model, { inputTokens: 100_000, outputTokens: 20_000 });
  return estimate.available ? currency.format(estimate.requestCost!) : "Not publicly available";
}

export default function Gpt61SolVsAstraPage() {
  const sol = getModel("gpt-6-1-sol");
  const astra = getModel("gpt-6-astra");
  if (!sol || !astra) return null;

  const solPrice = sol.schedules.find(({ id }) => id === sol.defaultSchedule)!;
  const astraPrice = astra.schedules.find(({ id }) => id === astra.defaultSchedule)!;
  const solPricingSource = sol.sources.find(({ label }) => /pricing/i.test(label))!;
  const astraPricingSource = astra.sources.find(({ label }) => /pricing/i.test(label))!;
  const solModelSource = sol.sources.find(({ label }) => /model/i.test(label))!;
  const astraModelSource = astra.sources.find(({ label }) => /model/i.test(label))!;

  return (
    <PageFrame path="/compare/gpt-6-1-sol-vs-astra/">
      <article className="seo-comparison shell">
        <header className="page-heading">
          <p className="eyebrow">OpenAI API price comparison</p>
          <h1>GPT 6.1 Sol vs Astra: Price and Use Cases</h1>
          <p className="lede">对比标准 token 价格、缓存输入、长上下文费率，以及何时值得评估更高价的模型。</p>
          <p className="page-heading last-updated">价格核验日期：{sol.lastVerifiedAt}；单位为每百万 token 的美元价格。</p>
        </header>

        <section className="seo-section">
          <h2>{keyword}：标准 API 价格</h2>
          <p>标准费率按每百万文本 token 计。Sol 的未缓存输入和输出单价均为 Astra 的五分之一，缓存输入约为十分之一。缓存和长上下文费率也会影响整次请求成本。</p>
          <div className="table-scroll">
            <table className="seo-price-table">
              <caption>OpenAI 标准文本 token 价格，美元/百万 token</caption>
              <thead><tr><th scope="col">模型</th><th scope="col">输入</th><th scope="col">缓存输入</th><th scope="col">缓存写入</th><th scope="col">输出</th><th scope="col">上下文窗口</th><th scope="col">最大输出</th></tr></thead>
              <tbody>
                <tr><th scope="row">{sol.name}</th><td>{price(solPrice.input)}</td><td>{price(solPrice.cachedInput)}</td><td>{price(solPrice.cacheWrite)}</td><td>{price(solPrice.output)}</td><td>{sol.contextWindow?.toLocaleString("en-US")} tokens</td><td>{sol.outputTokenLimit?.toLocaleString("en-US")} tokens</td></tr>
                <tr><th scope="row">{astra.name}</th><td>{price(astraPrice.input)}</td><td>{price(astraPrice.cachedInput)}</td><td>{price(astraPrice.cacheWrite)}</td><td>{price(astraPrice.output)}</td><td>{astra.contextWindow?.toLocaleString("en-US")} tokens</td><td>{astra.outputTokenLimit?.toLocaleString("en-US")} tokens</td></tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">两款模型的上下文窗口均为 1,050,000 token，最大输出均为 128,000 token。输入超过 272,000 token 时，整次请求适用单独的长上下文费率。</p>
        </section>

        <section className="seo-section">
          <h3>{keyword}：单次请求成本示例</h3>
          <p>以 100,000 个未缓存输入 token 和 20,000 个输出 token 为例，共享费率估算 Sol 为 {requestCost(sol)}、Astra 为 {requestCost(astra)}。计算按输入与输出分别计价，不含工具调用或重试成本；工作量比例变化也会改变账单。多步骤代理还应计入验证失败后的再次调用。</p>
          <p>符合缓存条件的输入费率分别为 Sol {price(solPrice.cachedInput)}、Astra {price(astraPrice.cachedInput)}。缓存命中取决于提示前缀匹配，不能假设每次请求都适用最低费率；应根据实际缓存 token 数估算成本。</p>
        </section>

        <section className="seo-section">
          <h4>{keyword}：适用场景</h4>
          <p>高频代码生成、代码审查、代理开发、文档理解和日常专业工作可先评估 GPT-6.1 Sol。它的输入、输出单价较低，适合请求量大或提示可复用的流程。OpenAI 的部分编码、电脑操作和专业工作评测显示 Sol 接近 Astra，但这不保证每类提示表现相同，应以自有任务验证。</p>
          <p>难度最高的推理、复杂代码、电脑操作、研究或文档创建，可评估 GPT-6 Astra，前提是质量提升足以抵消更高费用。常规任务交给 Sol，仅在验证失败或难度升高时升级，再比较完成质量、重试、延迟和成本。</p>
        </section>

        <section className="seo-section">
          <h5>{keyword}：开发者的选择规则</h5>
          <p>调用频繁、上下文可复用或有自动验收条件时，先测 Sol 更容易控制预算；只有在任务困难且质量优先时再测试 Astra。双模型工作流应设可观察的升级条件，例如测试或结构校验失败。</p>
          <p>做 gpt 6.1 sol vs astra 实测时，应固定提示、工具和验收标准，并记录 token、延迟、重试及人工修正。只比单价会漏掉失败后的重复成本。可将“每个通过验收的任务成本”和完成率作为主指标，再判断 Astra 的质量提升是否值得额外费用。</p>
          <p>OpenAI 的 DeepSWE v1.1 软件工程评测称，Sol 在该项测试中以约五分之一的每任务成本匹配 Astra。结论仅适用于该基准设置。用相同工具和成功标准重放自有任务，再比较每个成功结果的成本。</p>
        </section>

        <section className="seo-section">
          <h6>{keyword}：上下文、缓存和信息边界</h6>
          <p>输入超过 272,000 token 后，长上下文费率为 Sol {price(solPrice.longContext?.input)}/{price(solPrice.longContext?.cachedInput)}/{price(solPrice.longContext?.output)}，Astra {price(astraPrice.longContext?.input)}/{price(astraPrice.longContext?.cachedInput)}/{price(astraPrice.longContext?.output)}，依次代表输入、缓存输入和输出。此费率影响整次请求；服务档位、区域处理和工具费用也会改变总价。两款模型虽都列有 1,050,000 token 上下文，接近窗口上限的请求仍需按长上下文档位计价。</p>
          <p>价格和限制于 {sol.lastVerifiedAt} 按 OpenAI 官方价格页与模型文档核验。本文整理厂商公开信息，不代表独立实测，也不预设通用赢家；接入前应重新检查来源。</p>
          <ul className="seo-sources">
            <li><OfficialLink href={solPricingSource.url} modelId={sol.id} providerId={sol.provider.id} sourceType="pricing">OpenAI API pricing</OfficialLink></li>
            <li><OfficialLink href={solModelSource.url} modelId={sol.id} providerId={sol.provider.id} sourceType="model_documentation">GPT-6.1 Sol model documentation</OfficialLink></li>
            <li><OfficialLink href="https://openai.com/index/introducing-gpt-6-1-sol/" modelId={sol.id} providerId={sol.provider.id} sourceType="model_announcement">GPT-6.1 Sol announcement and evaluations</OfficialLink></li>
            <li><OfficialLink href="https://developers.openai.com/api/docs/guides/prompt-caching" modelId={sol.id} providerId={sol.provider.id} sourceType="model_documentation">OpenAI prompt caching guide</OfficialLink></li>
            <li><OfficialLink href={astraPricingSource.url} modelId={astra.id} providerId={astra.provider.id} sourceType="pricing">OpenAI API pricing</OfficialLink></li>
            <li><OfficialLink href={astraModelSource.url} modelId={astra.id} providerId={astra.provider.id} sourceType="model_documentation">GPT-6 Astra model documentation</OfficialLink></li>
          </ul>
        </section>
      </article>
    </PageFrame>
  );
}
