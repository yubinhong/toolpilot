"use client";

import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";

export function OfficialLink({ href, modelId, providerId, sourceType, children }: {
  href: string;
  modelId: string;
  providerId: string;
  sourceType: string;
  children: ReactNode;
}) {
  return <a href={href} target="_blank" rel="noreferrer" onClick={() => trackEvent("external_official_link", { model_id: modelId, provider_id: providerId, source_type: sourceType })}>{children}</a>;
}
