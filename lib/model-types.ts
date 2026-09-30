export type PriceRates = {
  input: number;
  cachedInput?: number | null;
  cacheWrite?: number | null;
  output: number;
};

export type PriceSchedule = PriceRates & {
  id: string;
  label: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  scheduleNote?: string;
  cacheWriteOptions?: { label: string; rate: number }[];
  additionalPrices?: { label: string; unit: string; rate: number }[];
  longContext?: PriceRates & { threshold: number };
};

export type ModelRecord = {
  id: string;
  name: string;
  provider: { id: string; name: string };
  apiModelId: string;
  landingPath: string | null;
  apiStatus: string;
  pricing: { currency: string; unit: string };
  contextWindow: number | null;
  releaseDate: string | null;
  capabilities: string[];
  useCases: string[];
  officialUrl: string;
  defaultSchedule: string;
  schedules: PriceSchedule[];
  sources: { label: string; url: string }[];
  lastVerifiedAt: string;
};
