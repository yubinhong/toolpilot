import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Breadcrumbs } from "./breadcrumbs";

export function PageFrame({ children, path }: { children: ReactNode; path: string }) {
  return (
    <>
      <SiteHeader />
      <main>
        {path !== "/" && <Breadcrumbs path={path} />}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
