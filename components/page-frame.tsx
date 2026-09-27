import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Breadcrumbs } from "./breadcrumbs";

export function PageFrame({ children, breadcrumbPath }: { children: ReactNode; breadcrumbPath: string | null }) {
  return (
    <>
      <SiteHeader />
      <main>
        {breadcrumbPath && <Breadcrumbs path={breadcrumbPath} />}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
