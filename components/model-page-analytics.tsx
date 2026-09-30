"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export function ModelPageAnalytics({ modelId, providerId }: { modelId: string; providerId: string }) {
  useEffect(() => {
    trackEvent("model_page_view", { model_id: modelId, provider_id: providerId });
  }, [modelId, providerId]);

  return null;
}
