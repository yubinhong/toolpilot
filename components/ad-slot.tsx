import type { ReactNode } from "react";

type AdSlotProps = {
  placement: "homepage-content" | "pricing-table" | "model-overview" | "calculator-result";
  children?: ReactNode;
};

export function AdSlot({ placement, children }: AdSlotProps) {
  if (!children) return null;
  return <aside className="ad-slot" data-placement={placement} aria-label="Advertisement">{children}</aside>;
}
