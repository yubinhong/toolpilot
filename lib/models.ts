import records from "../content/models.json" with { type: "json" };
import type { ModelRecord } from "./model-types.ts";

export const models = records satisfies ModelRecord[];
export const providers = [...new Map(models.map((model) => [model.provider.id, model.provider])).values()];

export function getModel(id: string): ModelRecord | null {
  return models.find((model) => model.id === id || model.apiModelId === id) ?? null;
}

export function getSchedule(model: ModelRecord, scheduleId = model.defaultSchedule) {
  return model.schedules.find((schedule) => schedule.id === scheduleId) ?? model.schedules[0];
}

export function getActiveSchedule(model: ModelRecord, asOf = new Date().toISOString().slice(0, 10)) {
  return model.schedules.find((schedule) =>
    (!schedule.effectiveFrom || schedule.effectiveFrom <= asOf) &&
    (!schedule.effectiveTo || schedule.effectiveTo >= asOf)
  ) ?? getSchedule(model);
}
