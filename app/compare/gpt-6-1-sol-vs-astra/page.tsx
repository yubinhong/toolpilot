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
          <h1>GPT 6.1 Sol vs Astra: API Pricing and Use Cases</h1>
          <p className="lede">Compare standard, cached-input, cache-write, and long-context rates, then choose a model by workload quality and total cost.</p>
          <p className="page-heading last-updated">Pricing checked: {sol.lastVerifiedAt}. Rates are in USD per million tokens.</p>
        </header>

        <section className="seo-section">
          <h2>{keyword}: Standard API Pricing</h2>
          <p>OpenAI lists standard rates per million tokens. GPT-6.1 Sol costs $2.00 for input, $0.10 for cached input, $2.50 for cache writes, and $10.00 for output. GPT-6 Astra costs $10.00, $1.00, $12.50, and $50.00 for the same categories. Uncached input, cache writes, and output are five times more expensive on Astra; cached input is ten times more expensive.</p>
          <div className="table-scroll">
            <table className="seo-price-table">
              <caption>OpenAI standard text-token prices, USD per million tokens</caption>
              <thead><tr><th scope="col">Model</th><th scope="col">Input</th><th scope="col">Cached input</th><th scope="col">Cache write</th><th scope="col">Output</th><th scope="col">Context window</th><th scope="col">Maximum output</th></tr></thead>
              <tbody>
                <tr><th scope="row">{sol.name}</th><td>{price(solPrice.input)}</td><td>{price(solPrice.cachedInput)}</td><td>{price(solPrice.cacheWrite)}</td><td>{price(solPrice.output)}</td><td>{sol.contextWindow?.toLocaleString("en-US")} tokens</td><td>{sol.outputTokenLimit?.toLocaleString("en-US")} tokens</td></tr>
                <tr><th scope="row">{astra.name}</th><td>{price(astraPrice.input)}</td><td>{price(astraPrice.cachedInput)}</td><td>{price(astraPrice.cacheWrite)}</td><td>{price(astraPrice.output)}</td><td>{astra.contextWindow?.toLocaleString("en-US")} tokens</td><td>{astra.outputTokenLimit?.toLocaleString("en-US")} tokens</td></tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Both models list a 1,050,000-token context window and a 128,000-token output limit. Requests with more than 272,000 input tokens use a separate long-context schedule for the request.</p>
        </section>

        <section className="seo-section">
          <h3>{keyword}: A Per-Request Cost Example</h3>
          <p>Consider a request with 100,000 uncached input tokens and 20,000 output tokens. Using the shared pricing data, the estimated token charge is {requestCost(sol)} on Sol and {requestCost(astra)} on Astra. The five-to-one difference follows directly from the standard input and output rates. Actual bills also depend on the input-to-output mix, cached tokens, cache writes, and any long-context tier.</p>
          <p>This estimate excludes tool charges, retries, and application overhead. An agent that calls a model repeatedly can spend more on failed attempts than on its successful response. Compare cost per accepted task, not only cost per request, and include the same validation and retry policy for both models.</p>
        </section>

        <section className="seo-section">
          <h4>{keyword}: Best-Fit Workloads</h4>
          <p>Start with GPT-6.1 Sol for high-volume coding, code review, computer-use workflows, document analysis, and routine professional tasks. Its lower input and output rates make it a practical baseline when prompts repeat, requests are frequent, or an automated check can catch mistakes. Sol also accepts text and image input and supports tool calling through the Responses API, according to its model documentation.</p>
          <p>Evaluate GPT-6 Astra for unusually difficult reasoning, complex software changes, long research tasks, or computer-use work where a stronger result could avoid expensive rework. Its rate is higher in every listed category, so the quality gain must matter to the application. OpenAI reports results near Astra on selected coding, computer-use, and professional-work evaluations for Sol, but those vendor benchmarks do not establish equal performance on every prompt.</p>
        </section>

        <section className="seo-section">
          <h5>{keyword}: A Practical Routing Rule</h5>
          <p>For a single-model deployment, benchmark both candidates on representative production tasks before choosing. Keep the system prompt, tools, token budget, and acceptance tests fixed. Record input and output tokens, cache use, latency, retries, human corrections, and whether each result passes the same quality gate. This reveals whether a nominally cheaper request actually finishes the work more economically.</p>
          <p>A two-model workflow can use Sol as the default and send only difficult or failed tasks to Astra. Make escalation observable: a test failure, incomplete structured output, or an explicit high-stakes task can trigger the second attempt. Set limits on retries and escalation so a fallback cannot multiply spend silently.</p>
          <p>The DeepSWE v1.1 software-engineering evaluation from OpenAI reports that Sol matched Astra at about one-fifth of the per-task cost in that benchmark. Treat this as a vendor-reported result for that setup, not a general guarantee. Reproduce the comparison with your own repository, tools, and pass criteria.</p>
        </section>

        <section className="seo-section">
          <h6>{keyword}: Context, Caching, and Limits</h6>
          <p>Above 272,000 input tokens, long-context input, cached-input, and output rates are {price(solPrice.longContext?.input)}, {price(solPrice.longContext?.cachedInput)}, and {price(solPrice.longContext?.output)} for Sol, compared with {price(astraPrice.longContext?.input)}, {price(astraPrice.longContext?.cachedInput)}, and {price(astraPrice.longContext?.output)} for Astra. This tier raises the cost of large prompts even though both models list the same context window. Check the applicable schedule before sending a request near that threshold.</p>
          <p>Prompt caching can reduce repeated-input charges when the provider recognizes a reusable prefix. Sol lists cached input at {price(solPrice.cachedInput)} per million tokens and Astra at {price(astraPrice.cachedInput)}. Do not apply those rates to every token by assumption: estimate using the cached-token share actually returned for your workload. Cache writes are billed separately at {price(solPrice.cacheWrite)} for Sol and {price(astraPrice.cacheWrite)} for Astra.</p>
          <p>Prices and published limits below were checked against OpenAI documentation on {sol.lastVerifiedAt}. This comparison organizes provider information; it is not an independent benchmark or a claim that one model wins every task. Recheck the official sources before budgeting or deployment.</p>
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
