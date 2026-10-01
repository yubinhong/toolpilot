import type { ModelRecord } from "./model-types.ts";

const TOKEN_UNIT = 1_000_000;

export function estimateRequestCost(
  model: ModelRecord,
  { inputTokens, outputTokens, cachedInputPercent = 0, scheduleId }: {
    inputTokens: number;
    outputTokens: number;
    cachedInputPercent?: number;
    scheduleId?: string;
  },
) {
  const schedule = model.schedules.find((item) => item.id === scheduleId) ?? model.schedules.find((item) => item.id === model.defaultSchedule) ?? model.schedules[0];
  if (!schedule) throw new Error(`Model ${model.id} has no pricing schedule`);
  const input = Math.max(0, Number(inputTokens) || 0);
  const output = Math.max(0, Number(outputTokens) || 0);
  const cachedPercent = Math.min(100, Math.max(0, Number(cachedInputPercent) || 0));
  const useLongContext = Boolean(schedule.longContext && input > schedule.longContext.threshold);
  const rates = schedule.longContext && input > schedule.longContext.threshold ? schedule.longContext : schedule;
  const cachedTokens = input * cachedPercent / 100;
  const uncachedTokens = input - cachedTokens;
  const unavailableReason = model.pricingStatus === "not_public"
    ? "Pricing not publicly available. Cost estimates will be available when the provider publishes token rates."
    : rates.input == null && uncachedTokens > 0
      ? "Input pricing is not publicly available for the selected schedule."
      : cachedPercent > 0 && cachedTokens > 0 && rates.cachedInput == null
        ? "Cached input pricing is not publicly available for the selected schedule."
        : rates.output == null && output > 0
          ? "Output pricing is not publicly available for the selected schedule."
          : null;
  if (unavailableReason) {
    return { schedule, available: false, unavailableReason, usedLongContextRate: Boolean(useLongContext), inputCost: null, outputCost: null, requestCost: null };
  }
  const inputCost = uncachedTokens / TOKEN_UNIT * (rates.input ?? 0) + cachedTokens / TOKEN_UNIT * (rates.cachedInput ?? rates.input ?? 0);
  const outputCost = typeof rates.output === "number" ? output / TOKEN_UNIT * rates.output : 0;

  return { schedule, available: true, unavailableReason: null, usedLongContextRate: Boolean(useLongContext), inputCost, outputCost, requestCost: inputCost + outputCost };
}

export function estimateUsage(
  model: ModelRecord,
  usage: { inputTokens: number; outputTokens: number; cachedInputPercent?: number; requestsPerDay: number; scheduleId?: string },
) {
  const perRequest = estimateRequestCost(model, usage);
  const requests = Math.max(0, Number(usage.requestsPerDay) || 0);
  const daily = perRequest.available ? perRequest.requestCost! * requests : null;
  return { ...perRequest, daily, monthly: daily == null ? null : daily * 30, annual: daily == null ? null : daily * 365 };
}
