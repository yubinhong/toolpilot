import { getGoogleAnalyticsId } from "./analytics-config.mjs";

export type ProductEvent = "page_view" | "model_search" | "calculator_use" | "model_compare" | "pricing_filter" | "model_page_view" | "external_official_link";
type EventParameters = Record<string, string | number | boolean>;
const allowedParameters: Record<ProductEvent, string[]> = {
  page_view: ["page_path", "page_title", "page_referrer"],
  model_search: ["model_id", "provider_id"],
  calculator_use: ["model_id"],
  model_compare: ["model_ids"],
  pricing_filter: ["filter_type", "provider_id", "sort_by"],
  model_page_view: ["model_id", "provider_id"],
  external_official_link: ["model_id", "provider_id", "source_type"],
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: ProductEvent, parameters: EventParameters) {
  if (!getGoogleAnalyticsId() || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  const safeParameters = {
    ...Object.fromEntries(Object.entries(parameters).filter(([key]) => allowedParameters[name].includes(key))),
    page_location: `${window.location.origin}${window.location.pathname}`,
  };
  window.gtag("event", name, safeParameters);
}
