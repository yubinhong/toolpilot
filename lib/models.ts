import records from "../content/models.json" with { type: "json" };
import type { ModelRecord } from "./model-types.ts";

// Model literals are runtime-validated by scripts/check-models.mjs before every build.
export const models = records as ModelRecord[];
export const providers = [...new Map(models.map((model) => [model.provider.id, model.provider])).values()];

export function getModel(id: string): ModelRecord | null {
  return models.find((model) => model.id === id || model.apiModelId === id) ?? null;
}

export function getSchedule(model: ModelRecord, scheduleId = model.defaultSchedule) {
  return model.schedules.find((schedule) => schedule.id === scheduleId) ?? model.schedules[0];
}

function scheduleBoundary(value: string | null | undefined, inclusiveEnd = false) {
  if (!value) return null;
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return Date.parse(dateOnly ? `${value}T${inclusiveEnd ? "23:59:59.999" : "00:00:00.000"}Z` : value);
}

function isScheduleActive(schedule: ModelRecord["schedules"][number], now: number) {
  const startsAt = scheduleBoundary(schedule.validFrom);
  const endsAt = scheduleBoundary(schedule.validUntil, true);
  return (startsAt == null || startsAt <= now) && (endsAt == null || endsAt >= now);
}

export function getActiveSchedule(model: ModelRecord, asOf = new Date().toISOString()) {
  const now = Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(asOf) ? `${asOf}T00:00:00.000Z` : asOf);
  return model.schedules.find((schedule) => isScheduleActive(schedule, now)) ?? getSchedule(model);
}
