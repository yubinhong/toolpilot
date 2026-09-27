import type { ReactNode } from "react";

export function ContentSection({ children }: { children: ReactNode }) {
  return (
    <section className="content-section">
      <div className="shell">{children}</div>
    </section>
  );
}
