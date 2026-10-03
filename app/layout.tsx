import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AnalyticsRouteTracker } from "../components/analytics-route-tracker";
import "./globals.css";
import { getGoogleAnalyticsId, getSearchConsoleVerification } from "../lib/analytics-config.mjs";
import { getSiteUrl } from "../lib/site-config.mjs";

const googleAnalyticsId = getGoogleAnalyticsId();
const searchConsoleVerification = getSearchConsoleVerification();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "ToolPilot - AI Model Pricing & API Cost Calculator", template: "%s | ToolPilot" },
  description: "Compare AI model API pricing, calculate token costs, and find the right AI model for your application.",
  icons: { icon: "/favicon.svg" },
  ...(searchConsoleVerification ? { verification: { google: searchConsoleVerification } } : {}),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        {googleAnalyticsId && <>
          <AnalyticsRouteTracker />
          <Script id="google-analytics-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());var r;try{var u=new URL(document.referrer);r=u.origin+u.pathname}catch{}window.gtag('config','${googleAnalyticsId}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:window.location.origin+window.location.pathname,page_referrer:r});` }} />
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
        </>}
      </body>
    </html>
  );
}
