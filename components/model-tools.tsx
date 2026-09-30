"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";
import { estimateUsage } from "../lib/model-cost";
import { getActiveSchedule, getSchedule, models, providers } from "../lib/models";
import type { ModelRecord } from "../lib/model-types";

const modelRows = models as ModelRecord[];
const providerRows = providers as { id: string; name: string }[];
const popularIds = ["gpt-6-1-sol", "claude-sonnet-5-5", "gemini-3-8-flash", "deepseek-flash", "jev"];

function money(value: number) {
  const digits = Math.abs(value) < 0.01 ? 6 : Math.abs(value) < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: 6 }).format(value);
}

function rate(value: number | null | undefined) {
  return value == null ? "Not public" : money(value);
}

function context(value: number | null) {
  return value == null ? "Not public" : `${new Intl.NumberFormat("en-US").format(value)} tokens`;
}

function modelHref(model: ModelRecord) {
  return model.landingPath ?? `/calculator/?model=${encodeURIComponent(model.id)}`;
}

function priceSource(model: ModelRecord) {
  return model.sources.find((source) => source.label.toLowerCase().includes("pricing")) ?? model.sources[0];
}

function otherPricing(model: ModelRecord, schedule: ModelRecord["schedules"][number]) {
  const details = [
    ...(schedule.cacheWriteOptions ?? []).map((item) => `${item.label}: ${rate(item.rate)} / 1M tokens`),
    ...(schedule.additionalPrices ?? []).map((item) => `${item.label}: ${rate(item.rate)} ${item.unit}`),
  ];
  if (schedule.longContext) details.push(`Input > ${new Intl.NumberFormat("en-US").format(schedule.longContext.threshold)} tokens: ${rate(schedule.longContext.input)} input / ${rate(schedule.longContext.output)} output`);
  if (schedule.scheduleNote) details.push(schedule.scheduleNote);
  for (const future of model.schedules.filter((item) => item.effectiveFrom)) {
    details.push(`${future.effectiveFrom}: ${rate(future.input)} input / ${rate(future.output)} output`);
  }
  return details.length ? details.join("; ") : "See official pricing source";
}

export function ModelSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return modelRows.filter((model) => `${model.name} ${model.provider.name} ${model.apiModelId}`.toLowerCase().includes(normalized)).slice(0, 8);
  }, [query]);

  return (
    <div className="model-search">
      <label htmlFor="model-search">Search AI models</label>
      <input id="model-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search GPT, Claude, Gemini, DeepSeek, Jev..." autoComplete="off" />
      {query.trim() && <div className="search-results" role="region" aria-label="Model search results">
        {results.length ? results.map((model) => <article className="search-result" key={model.id}>
          <div><Link href={modelHref(model)} className="model-name" onClick={() => trackEvent("model_search", { model_id: model.id, provider_id: model.provider.id })}>{model.name}</Link><span>{model.provider.name} · {model.apiStatus}</span></div>
          <div className="search-actions">
            <Link href={`/calculator/?model=${encodeURIComponent(model.id)}`} onClick={() => trackEvent("model_search", { model_id: model.id, provider_id: model.provider.id })}>Calculator</Link>
            <Link href={`/compare/?models=${encodeURIComponent(model.id)}`} onClick={() => trackEvent("model_search", { model_id: model.id, provider_id: model.provider.id })}>Compare</Link>
            <Link href="/pricing/">Pricing</Link>
          </div>
        </article>) : <p className="empty-state">No model matches that search.</p>}
      </div>}
    </div>
  );
}

export function PopularModels() {
  return <div className="model-card-grid">
    {popularIds.map((id) => {
      const model = modelRows.find((item) => item.id === id)!;
      const price = getActiveSchedule(model);
      return <article className="model-card" key={model.id}>
        <div className="model-card-top"><span className={`provider-mark provider-${model.provider.id}`}>{model.provider.name}</span><span className="last-checked">Checked {model.lastVerifiedAt}</span></div>
        <h3><Link href={modelHref(model)}>{model.name}</Link></h3>
        <p className="api-id">{model.apiModelId}</p>
        <dl className="mini-specs">
          <div><dt>Input / 1M</dt><dd>{rate(price.input)}</dd></div>
          <div><dt>Output / 1M</dt><dd>{rate(price.output)}</dd></div>
          <div><dt>Context</dt><dd>{context(model.contextWindow)}</dd></div>
          <div><dt>API</dt><dd>{model.apiStatus}</dd></div>
        </dl>
        <div className="model-card-actions"><Link href={`/calculator/?model=${encodeURIComponent(model.id)}`}>Calculate</Link><Link href={`/compare/?models=${encodeURIComponent(model.id)}`}>Compare</Link></div>
      </article>;
    })}
  </div>;
}

type PricingTableProps = { limit?: number };

export function PricingTable({ limit }: PricingTableProps) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");
  const [sort, setSort] = useState("input");
  useEffect(() => {
    if (!query.trim()) return;
    const timeout = window.setTimeout(() => trackEvent("pricing_filter", { filter_type: "model_search" }), 600);
    return () => window.clearTimeout(timeout);
  }, [query]);
  const shown = useMemo(() => {
    const filtered = modelRows.filter((model) => {
      const matchesText = `${model.name} ${model.provider.name}`.toLowerCase().includes(query.trim().toLowerCase());
      return matchesText && (provider === "all" || model.provider.id === provider);
    });
    filtered.sort((a, b) => {
      if (sort === "context") return (b.contextWindow ?? -1) - (a.contextWindow ?? -1);
      const aRate = getActiveSchedule(a)[sort as "input" | "output"].valueOf();
      const bRate = getActiveSchedule(b)[sort as "input" | "output"].valueOf();
      return aRate - bRate;
    });
    return limit ? filtered.slice(0, limit) : filtered;
  }, [limit, provider, query, sort]);

  return <>
    {!limit && <div className="table-controls">
      <label className="field"><span>Search models</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Model or provider" /></label>
      <label className="field"><span>Provider</span><select value={provider} onChange={(event) => { setProvider(event.target.value); trackEvent("pricing_filter", { filter_type: "provider", provider_id: event.target.value }); }}><option value="all">All providers</option>{providerRows.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className="field"><span>Sort by</span><select value={sort} onChange={(event) => { setSort(event.target.value); trackEvent("pricing_filter", { filter_type: "sort", sort_by: event.target.value }); }}><option value="input">Lowest input price</option><option value="output">Lowest output price</option><option value="context">Largest context</option></select></label>
    </div>}
    <div className="table-scroll">
      <table className="pricing-table">
        <thead><tr><th>Model</th><th>Provider</th><th>Input / 1M</th><th>Cached input / 1M</th><th>Output / 1M</th><th>Other pricing</th><th>Context</th><th>API</th><th>Verified</th><th>Source</th></tr></thead>
        <tbody>{shown.map((model) => {
          const selected = getActiveSchedule(model);
          return <tr key={model.id}>
            <th scope="row"><Link href={modelHref(model)} className="model-name">{model.name}</Link><small>{model.apiModelId}</small></th>
            <td>{model.provider.name}</td><td>{rate(selected.input)}</td><td>{rate(selected.cachedInput)}</td><td>{rate(selected.output)}</td><td className="other-pricing">{otherPricing(model, selected)}</td><td>{context(model.contextWindow)}</td><td>{model.apiStatus}</td><td>{model.lastVerifiedAt}<small>{selected.label}</small></td><td><a href={priceSource(model).url} target="_blank" rel="noreferrer" onClick={() => trackEvent("external_official_link", { model_id: model.id, provider_id: model.provider.id, source_type: "pricing" })}>{priceSource(model).label}</a></td>
          </tr>;
        })}</tbody>
      </table>
      {!shown.length && <p className="empty-state">No models match those filters.</p>}
    </div>
      <p className="table-note">USD per 1 million tokens. Prices can vary by context tier, request priority, cache behavior, and date; estimates use the schedule shown for each model.</p>
  </>;
}

type CostCalculatorProps = { initialModelId?: string; compact?: boolean };

export function CostCalculator({ initialModelId = "gpt-6-luna", compact = false }: CostCalculatorProps) {
  const [modelId, setModelId] = useState(initialModelId);
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [cachedInputPercent, setCachedInputPercent] = useState(0);
  const model = modelRows.find((item) => item.id === modelId) ?? modelRows[0];
  const [scheduleId, setScheduleId] = useState(getActiveSchedule(model).id);
  const lastTrackedModel = useRef<string | null>(null);
  const schedule = getSchedule(model, scheduleId);
  const estimate = estimateUsage(model, { inputTokens, outputTokens, requestsPerDay, cachedInputPercent, scheduleId });

  function trackCalculatorUse(modelId = model.id) {
    if (lastTrackedModel.current === modelId) return;
    lastTrackedModel.current = modelId;
    trackEvent("calculator_use", { model_id: modelId });
  }

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("model");
    if (requested && modelRows.some((item) => item.id === requested)) {
      const frame = window.requestAnimationFrame(() => {
        setModelId(requested);
        setScheduleId(getActiveSchedule(modelRows.find((item) => item.id === requested)!).id);
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function changeModel(id: string) {
    const next = modelRows.find((item) => item.id === id)!;
    setModelId(id);
    setScheduleId(getActiveSchedule(next).id);
    trackCalculatorUse(id);
  }

  return <div className={`calculator ${compact ? "calculator-compact" : ""}`}>
    <div className="calculator-inputs">
      <label className="field"><span>Model</span><select value={model.id} onChange={(event) => changeModel(event.target.value)}>{modelRows.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.provider.name}</option>)}</select></label>
      {model.schedules.length > 1 && <label className="field"><span>Pricing schedule</span><select value={scheduleId} onChange={(event) => { setScheduleId(event.target.value); trackCalculatorUse(); }}>{model.schedules.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>}
      <label className="field"><span>Input tokens per request</span><input type="number" min="0" step="100" value={inputTokens} onChange={(event) => { setInputTokens(Number(event.target.value)); trackCalculatorUse(); }} /></label>
      <label className="field"><span>Output tokens per request</span><input type="number" min="0" step="100" value={outputTokens} onChange={(event) => { setOutputTokens(Number(event.target.value)); trackCalculatorUse(); }} /></label>
      <label className="field"><span>Requests per day</span><input type="number" min="0" step="100" value={requestsPerDay} onChange={(event) => { setRequestsPerDay(Number(event.target.value)); trackCalculatorUse(); }} /></label>
      <label className="field"><span>Cached input share (%)</span><input type="number" min="0" max="100" step="5" value={cachedInputPercent} disabled={schedule.cachedInput == null} onChange={(event) => { setCachedInputPercent(Number(event.target.value)); trackCalculatorUse(); }} /></label>
    </div>
    <div className="estimate-panel" aria-live="polite">
      <div className="estimate-heading"><div><span className="eyebrow">Estimated usage</span><h3>{model.name}</h3></div><span className="estimate-date">Verified {model.lastVerifiedAt}</span></div>
      <dl className="estimate-grid">
        <div><dt>Cost / request</dt><dd>{money(estimate.requestCost)}</dd></div>
        <div><dt>Daily cost</dt><dd>{money(estimate.daily)}</dd></div>
        <div><dt>Monthly cost · 30 days</dt><dd>{money(estimate.monthly)}</dd></div>
        <div><dt>Annual cost · 365 days</dt><dd>{money(estimate.annual)}</dd></div>
      </dl>
      <p className="estimate-note">{estimate.usedLongContextRate && schedule.longContext ? `This request exceeds ${new Intl.NumberFormat("en-US").format(schedule.longContext.threshold)} input tokens, so the long-context rate is used. ` : ""}{schedule.scheduleNote ?? `Pricing schedule: ${schedule.label}.`} Cost excludes cache writes, storage, tools, taxes, and provider discounts.</p>
      <p className="estimate-source"><a href={priceSource(model).url} target="_blank" rel="noreferrer" onClick={() => trackEvent("external_official_link", { model_id: model.id, provider_id: model.provider.id, source_type: "pricing" })}>{priceSource(model).label}</a><span> · </span><Link href={model.landingPath ?? "/pricing/"} className="text-link">{model.landingPath ? "View Jev model details" : "View all model pricing"}</Link></p>
    </div>
  </div>;
}

type ModelComparisonProps = { initialIds?: string[] };

export function ModelComparison({ initialIds = ["gpt-6-luna", "claude-sonnet-5-5"] }: ModelComparisonProps) {
  const [selectedIds, setSelectedIds] = useState(initialIds.slice(0, 3));
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const lastTrackedModels = useRef("");

  function trackComparisonUse(ids = selectedIds) {
    if (ids.length < 2 || ids.join(",") === lastTrackedModels.current) return;
    lastTrackedModels.current = ids.join(",");
    trackEvent("model_compare", { model_ids: ids.join(",") });
  }

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("models")?.split(",").filter(Boolean) ?? [];
    const ids = requested.filter((id) => modelRows.some((model) => model.id === id)).slice(0, 3);
    if (ids.length) {
      const frame = window.requestAnimationFrame(() => setSelectedIds(ids));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const selected = selectedIds.map((id) => modelRows.find((model) => model.id === id)!).filter(Boolean);
  const totals = selected.map((model) => estimateUsage(model, { inputTokens, outputTokens, requestsPerDay }));
  const monthly = totals.map((estimate) => estimate.monthly);
  const spread = monthly.length ? Math.max(...monthly) - Math.min(...monthly) : 0;

  function toggle(id: string, checked: boolean) {
    const nextIds = checked && selectedIds.length < 3 ? [...selectedIds, id] : selectedIds.filter((item) => item !== id);
    setSelectedIds(nextIds);
    trackComparisonUse(nextIds);
  }

  return <div className="comparison-tool">
    <fieldset className="model-picker">
      <legend>Select up to three models <span>{selectedIds.length}/3 selected</span></legend>
      <div className="model-picker-list">{modelRows.map((model) => {
        const checked = selectedIds.includes(model.id);
        return <label key={model.id} className={checked ? "model-picker-option selected" : "model-picker-option"}>
          <input type="checkbox" checked={checked} disabled={!checked && selectedIds.length >= 3} onChange={(event) => toggle(model.id, event.target.checked)} />
          <span><strong>{model.name}</strong><small>{model.provider.name}</small></span>
        </label>;
      })}</div>
    </fieldset>
    <div className="workload-inputs">
      <label className="field"><span>Input tokens / request</span><input type="number" min="0" step="100" value={inputTokens} onChange={(event) => { setInputTokens(Number(event.target.value)); trackComparisonUse(); }} /></label>
      <label className="field"><span>Output tokens / request</span><input type="number" min="0" step="100" value={outputTokens} onChange={(event) => { setOutputTokens(Number(event.target.value)); trackComparisonUse(); }} /></label>
      <label className="field"><span>Requests / day</span><input type="number" min="0" step="100" value={requestsPerDay} onChange={(event) => { setRequestsPerDay(Number(event.target.value)); trackComparisonUse(); }} /></label>
    </div>
    <div className="comparison-summary"><span>Monthly estimate range for this workload</span><strong>{money(spread)}</strong><small>Difference between the highest and lowest selected estimate; this is a cost comparison only.</small></div>
    <div className="table-scroll">
      <table className="comparison-table">
        <thead><tr><th>Model</th>{selected.map((model) => <th key={model.id}><Link href={modelHref(model)}>{model.name}</Link><small>{model.provider.name}</small></th>)}</tr></thead>
        <tbody>
          <tr><th>Input / 1M</th>{selected.map((model) => <td key={model.id}>{rate(getActiveSchedule(model).input)}</td>)}</tr>
          <tr><th>Cached input / 1M</th>{selected.map((model) => <td key={model.id}>{rate(getActiveSchedule(model).cachedInput)}</td>)}</tr>
          <tr><th>Output / 1M</th>{selected.map((model) => <td key={model.id}>{rate(getActiveSchedule(model).output)}</td>)}</tr>
          <tr><th>Other listed price rates</th>{selected.map((model) => <td key={model.id} className="other-pricing">{otherPricing(model, getActiveSchedule(model))}</td>)}</tr>
          <tr><th>Context window</th>{selected.map((model) => <td key={model.id}>{context(model.contextWindow)}</td>)}</tr>
          <tr><th>API access</th>{selected.map((model) => <td key={model.id}>{model.apiStatus}</td>)}</tr>
          <tr><th>Capabilities</th>{selected.map((model) => <td key={model.id}>{model.capabilities.join(", ")}</td>)}</tr>
          <tr><th>Official price source</th>{selected.map((model) => <td key={model.id}><a href={priceSource(model).url} target="_blank" rel="noreferrer" onClick={() => trackEvent("external_official_link", { model_id: model.id, provider_id: model.provider.id, source_type: "pricing" })}>{priceSource(model).label}</a><small>Verified {model.lastVerifiedAt}</small></td>)}</tr>
          <tr><th>Estimated monthly cost</th>{selected.map((model, index) => <td key={model.id} className="cost-result">{money(totals[index]?.monthly ?? 0)}</td>)}</tr>
        </tbody>
      </table>
    </div>
    <p className="table-note">Calculations use each model&apos;s default current pricing schedule and a 30-day month. No quality ranking is implied.</p>
  </div>;
}
