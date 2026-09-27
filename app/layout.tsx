import type { Metadata } from "next";
import type { ReactNode } from "react";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
