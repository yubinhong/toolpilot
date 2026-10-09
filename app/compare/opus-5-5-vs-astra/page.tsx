import { OfficialLink } from "../../../components/official-link";
import { PageFrame } from "../../../components/page-frame";
import { estimateRequestCost } from "../../../lib/model-cost";
import { getModel } from "../../../lib/models";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata("/compare/opus-5-5-vs-astra/");

const keyword = "Opus 5.5 vs Astra";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 });

function price(value: number | null | undefined | "not_applicable") {
  if (value === "not_applicable") return "Not applicable";
  return value == null ? "Not publicly available" : currency.format(value);
}

function requestCost(model: NonNullable<ReturnType<typeof getModel>>, inputTokens: number, outputTokens: number) {
  const estimate = estimateRequestCost(model, { inputTokens, outputTokens });
  return estimate.available ? currency.format(estimate.requestCost!) : "Not publicly available";
}

export default function Opus55VsAstraPage() {
  const opus = getModel("claude-opus-5-5");
  const astra = getModel("gpt-6-astra");
  if (!opus || !astra) return null;

  const opusRates = opus.schedules.find(({ id }) => id === opus.defaultSchedule)!;
  const astraRates = astra.schedules.find(({ id }) => id === astra.defaultSchedule)!;
  const astraLongRates = astraRates.longContext!;
  const opusPricing = opus.sources.find(({ label }) => /pricing/i.test(label))!;
  const opusModel = opus.sources.find(({ label }) => /model/i.test(label))!;
  const astraPricing = astra.sources.find(({ label }) => /pricing/i.test(label))!;
  const astraModel = astra.sources.find(({ label }) => /model/i.test(label))!;

  return (
    <PageFrame path="/compare/opus-5-5-vs-astra/">
      <article className="seo-comparison shell">
        <header className="page-heading">
          <p className="eyebrow">Anthropic and OpenAI API pricing</p>
          <h1>Opus 5.5 vs Astra: API Pricing and Workload Fit</h1>
          <p className="lede">Opus 5.5 vs Astra comes down to more than a token price: prompt length, cache behavior, tool costs, and the quality your application needs can all change the bill.</p>
          <p className="page-heading last-updated">Pricing checked: {opus.lastVerifiedAt} (Anthropic) and {astra.lastVerifiedAt} (OpenAI). Rates are USD per million tokens.</p>
        </header>

        <section className="seo-section">
          <h2>{keyword}: Standard API Prices</h2>
          <p>At the providers&apos; standard direct API rates, Claude Opus 5.5 costs $4 per million input tokens and $20 per million output tokens. GPT-6 Astra costs $10 and $50. For an identical uncached input and output token count below Astra&apos;s long-context threshold, Astra&apos;s listed token charge is 2.5 times Opus&apos;s. That is a rate comparison, not a claim that either model completes the same task with the same number of tokens.</p>
          <div className="table-scroll">
            <table className="seo-price-table">
              <caption>Standard text-token prices in USD per million tokens</caption>
              <thead><tr><th scope="col">Model</th><th scope="col">Input</th><th scope="col">Cached input</th><th scope="col">Cache write</th><th scope="col">Output</th><th scope="col">Context / max output</th></tr></thead>
              <tbody>
                <tr>
                  <th scope="row">{opus.name}</th>
                  <td>{price(opusRates.input)}</td>
                  <td>{price(opusRates.cachedInput)}</td>
                  <td>5-minute {price(opusRates.cacheWriteOptions?.[0]?.rate)}; 1-hour {price(opusRates.cacheWriteOptions?.[1]?.rate)}</td>
                  <td>{price(opusRates.output)}</td>
                  <td>{opus.contextWindow?.toLocaleString("en-US")} / {opus.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
                <tr>
                  <th scope="row">{astra.name}</th>
                  <td>{price(astraRates.input)}</td>
                  <td>{price(astraRates.cachedInput)}</td>
                  <td>{price(astraRates.cacheWrite)}</td>
                  <td>{price(astraRates.output)}</td>
                  <td>{astra.contextWindow?.toLocaleString("en-US")} / {astra.outputTokenLimit?.toLocaleString("en-US")} tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Opus lists a 1,000,000-token context window and Astra lists 1,050,000; both list a 128,000-token maximum output. Context size alone says nothing about answer quality on a long document.</p>
        </section>

        <section className="seo-section">
          <h3>{keyword}: Long-Context Costs</h3>
          <p>Astra changes pricing when a prompt exceeds {astraLongRates.threshold.toLocaleString("en-US")} input tokens. OpenAI applies the higher rates to the full request: {price(astraLongRates.input)} input, {price(astraLongRates.cachedInput)} cached input, {price(astraLongRates.cacheWrite)} cache write, and {price(astraLongRates.output)} output per million tokens. Anthropic lists Opus&apos;s standard rates across its full one-million-token context window, with no separate long-context tier.</p>
          <p>For 100,000 uncached input tokens and 20,000 output tokens, the shared cost calculator estimates {requestCost(opus, 100_000, 20_000)} on Opus and {requestCost(astra, 100_000, 20_000)} on Astra. Increase the prompt to 300,000 input tokens and the response to 40,000 output tokens: the estimates become {requestCost(opus, 300_000, 40_000)} and {requestCost(astra, 300_000, 40_000)}. Astra&apos;s second example uses its higher rates for every token in that request, not only the tokens above the threshold.</p>
          <p>These examples exclude cache hits and writes, tools, retries, taxes, regional processing, and discounted service tiers. They describe equal token volumes, which may differ from the cost of getting an acceptable result from each model.</p>
        </section>

        <section className="seo-section">
          <h4>{keyword}: Best-Fit Workloads</h4>
          <p>Anthropic describes Opus 5.5 as a model for long-running agentic coding and knowledge work. Its lower listed rates make it a sensible first candidate for implementation agents, repository analysis, and repeated research turns when it meets the project&apos;s acceptance checks. Its adaptive thinking is always on, with medium as the documented default effort.</p>
          <p>OpenAI describes Astra as its model for demanding reasoning, coding, computer use, research, and document creation. Its Responses API tool support may matter when a workflow depends on OpenAI&apos;s web search, file search, code interpreter, or computer-use tools. Those are integration considerations, not evidence that Astra wins every task in those categories. Tool-specific fees can also add to the token bill.</p>
          <p>Run a small evaluation set drawn from your own work: one difficult coding change, one long document, and one tool-driven task may expose different strengths. Hold the prompt, review criteria, and retry policy steady. Compare correctness and human rework alongside latency and the total tokens consumed before choosing a default route.</p>
        </section>

        <section className="seo-section">
          <h5>{keyword}: Caching and Budgeting</h5>
          <p>Opus cache reads cost {price(opusRates.cachedInput)} per million tokens. Its cache writes cost {price(opusRates.cacheWriteOptions?.[0]?.rate)} for five minutes or {price(opusRates.cacheWriteOptions?.[1]?.rate)} for one hour. Astra&apos;s standard cache read costs {price(astraRates.cachedInput)} and its cache write costs {price(astraRates.cacheWrite)}; above the long-context threshold those rates rise to {price(astraLongRates.cachedInput)} and {price(astraLongRates.cacheWrite)}. A cache-heavy estimate therefore needs both hit volume and write frequency.</p>
          <p>Provider tokenizers can count the same text differently. Start with the published per-token prices, then collect actual usage and tool charges from each API. A cheaper token rate is most useful when it also lowers the cost of an accepted task.</p>
        </section>

        <section className="seo-section">
          <h6>{keyword}: Common Questions</h6>
          <dl className="seo-faq">
            <dt>Is Opus always cheaper for the same task?</dt>
            <dd>It is cheaper for the same uncached token volumes at these standard rates. Real tasks can use different numbers of tokens, tools, or retries, so measure the completed workflow.</dd>
            <dt>Does Astra charge only the input above 272,000 tokens at the higher rate?</dt>
            <dd>No. OpenAI applies its long-context input, cache, and output rates to the full request once the input threshold is crossed.</dd>
            <dt>Which model should handle coding agents?</dt>
            <dd>Start with representative coding tasks and the tools your agent actually uses. Opus has the lower listed rates; Astra may fit workflows built around its supported tools or particular reasoning requirements. Keep the model that passes your checks at the lower total cost.</dd>
          </dl>
          <p>Opus 5.5 vs Astra is best decided with measured task outcomes and the right pricing tier. Use Opus as a cost baseline, test Astra where it may improve completion or tool fit, and recheck both providers&apos; rate pages before setting a production budget.</p>
          <ul className="seo-sources">
            <li><OfficialLink href={opusPricing.url} modelId={opus.id} providerId={opus.provider.id} sourceType="pricing">Anthropic API pricing</OfficialLink></li>
            <li><OfficialLink href={opusModel.url} modelId={opus.id} providerId={opus.provider.id} sourceType="model_documentation">Claude Opus 5.5 model overview</OfficialLink></li>
            <li><OfficialLink href={astraPricing.url} modelId={astra.id} providerId={astra.provider.id} sourceType="pricing">OpenAI API pricing</OfficialLink></li>
            <li><OfficialLink href={astraModel.url} modelId={astra.id} providerId={astra.provider.id} sourceType="model_documentation">GPT-6 Astra model page</OfficialLink></li>
          </ul>
        </section>
      </article>
    </PageFrame>
  );
}
