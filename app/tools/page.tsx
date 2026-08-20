import { CatalogNotice } from "../../components/catalog-notice";
import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";
import { ToolCard } from "../../components/tool-card";
import { categories, tools } from "../../lib/catalog.mjs";

export default function ToolsPage() {
  return (
    <PageFrame>
      <PageIntro
        eyebrow="Tool catalog"
        title="Start with a category, then ask what the tool changes."
        summary="The catalog is intentionally small while the content model and review process are being established."
      >
        <div className="page-intro-notice">
          <CatalogNotice />
        </div>
      </PageIntro>
      <section className="content-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">First coverage</p>
              <h2>{categories.length} categories for common product decisions.</h2>
            </div>
            <p>{tools.length} product links are live as draft seeds. Source review is a prerequisite for publishing tool facts.</p>
          </div>
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category}>
                <strong>{category}</strong>
                <span>{tools.filter((tool) => tool.category === category).length} draft entries in the first set.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="content-section">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Draft entries</p>
              <h2>Inspect the current working set.</h2>
            </div>
          </div>
          <div className="tool-grid">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
