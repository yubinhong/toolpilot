import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl } from "../lib/site-config.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "ToolPilot - Choose developer tools with clearer trade-offs",
    template: "%s | ToolPilot",
  },
  description:
    "A decision workspace for developers, indie hackers, and AI builders choosing tools and stacks.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="toolpilot-theme-init" strategy="beforeInteractive">
          {`try {
  var theme = localStorage.getItem("toolpilot-theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch {}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
