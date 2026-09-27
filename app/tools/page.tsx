import { pageMetadata } from "../../lib/metadata";
import { publicTool } from "../../lib/content.mjs";
import { CatalogNotice } from "../../components/catalog-notice";
import { ContentSection } from "../../components/content-section";
import { PageFrame } from "../../components/page-frame";
import { PageIntro } from "../../components/page-intro";
import { ToolCard } from "../../components/tool-card";
import { categories, tools } from "../../lib/catalog.mjs";

export const metadata = pageMetadata("/tools/");

export default function ToolsPage() {
  return (
    <PageFrame breadcrumbPath="/tools/">
      <PageIntro
        eyebrow="Tool catalog"
        title="Start with a category, then ask what the tool changes."
        summary="The catalog is intentionally small while the content model and review process are being established."
      >
        <div className="page-intro-notice">
          <CatalogNotice />
        </div>
      </PageIntro>
      <ContentSection>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">First coverage</p>
            <h2>{categories.length} categories for common product decisions.</h2>
          </div>
          <p>
            {tools.length} product profiles, with individual review states. Only owner-approved content is treated as a published evaluation.
          </p>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category}>
              <strong>{category}</strong>
              <span>
                {tools.filter((tool) => tool.category === category).length} entries.
              </span>
            </li>
          ))}
        </ul>
      </ContentSection>
      <ContentSection>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Draft entries</p>
            <h2>Inspect the current working set.</h2>
          </div>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={publicTool(tool)} />
          ))}
        </div>
      </ContentSection>
    </PageFrame>
  );
}
