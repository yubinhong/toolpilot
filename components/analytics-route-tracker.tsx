"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const previousLocation = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!pathname) return;
    let referrer = previousLocation.current;
    if (!referrer && document.referrer) {
      try {
        const previous = new URL(document.referrer);
        referrer = `${previous.origin}${previous.pathname}`;
      } catch {
        referrer = undefined;
      }
    }
    const location = `${window.location.origin}${pathname}`;
    trackEvent("page_view", {
      page_path: pathname,
      page_title: document.title,
      ...(referrer ? { page_referrer: referrer } : {}),
    });
    previousLocation.current = location;
  }, [pathname]);

  return null;
}
