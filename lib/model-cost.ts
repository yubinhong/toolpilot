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
  const cachedTokens = rates.cachedInput == null ? 0 : input * cachedPercent / 100;
  const uncachedTokens = input - cachedTokens;
  const inputCost = uncachedTokens / TOKEN_UNIT * rates.input + cachedTokens / TOKEN_UNIT * (rates.cachedInput ?? rates.input);
  const outputCost = output / TOKEN_UNIT * rates.output;

  return { schedule, usedLongContextRate: Boolean(useLongContext), inputCost, outputCost, requestCost: inputCost + outputCost };
}

export function estimateUsage(
  model: ModelRecord,
  usage: { inputTokens: number; outputTokens: number; cachedInputPercent?: number; requestsPerDay: number; scheduleId?: string },
) {
  const perRequest = estimateRequestCost(model, usage);
  const requests = Math.max(0, Number(usage.requestsPerDay) || 0);
  const daily = perRequest.requestCost * requests;
  return { ...perRequest, daily, monthly: daily * 30, annual: daily * 365 };
}
