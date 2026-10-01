export type PriceRate = number | "not_applicable";

export type PriceRates = {
  input: number;
  cachedInput?: number | null;
  cacheWrite?: number | null;
  output: PriceRate;
};

export type PricingScheduleRule =
  | { type: "standard" | "effective_date" }
  | { type: "time_of_day"; timezone: string; period: "peak" | "off_peak"; window: string };

export type PriceSchedule = PriceRates & {
  id: string;
  label: string;
  priceType?: "standard" | "introductory" | "time_based";
  validFrom?: string | null;
  validUntil?: string | null;
  nextPricing?: { scheduleId: string; validFrom: string | null } | null;
  pricingSchedule?: PricingScheduleRule;
  pricingNotes?: string[];
  cacheWriteOptions?: { label: string; rate: number }[];
  additionalPrices?: { label: string; unit: string; rate: number }[];
  longContext?: PriceRates & { threshold: number };
};

export type ModelRecord = {
  id: string;
  name: string;
  provider: { id: string; name: string };
  apiModelId: string | null;
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
