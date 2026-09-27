import { ContentDetail } from "../../../components/content-detail";
import { content, findContent } from "../../../lib/content.mjs";
import { pageMetadata } from "../../../lib/metadata";
import { notFound } from "next/navigation";
import { CatalogNotice } from "../../../components/catalog-notice";
import { ContentSection } from "../../../components/content-section";
import { PageFrame } from "../../../components/page-frame";
import { PageIntro } from "../../../components/page-intro";
import { guides } from "../../../lib/catalog.mjs";

export function generateStaticParams() {
  return [...new Set([...guides.map(g => g.slug), ...content.filter(r => r.kind === "guides").map(r => r.slug)])].map(slug => ({ slug }));
}

export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return pageMetadata(`/guides/${slug}/`);
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = findContent("guides", slug);
  if (record) return <ContentDetail record={record}/>;
  const guide = guides.find((candidate) => candidate.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <PageFrame>
      <PageIntro
        eyebrow={`${guide.tag} / draft guide`}
        title={guide.title}
        summary={guide.summary}
      />
      <ContentSection>
        <CatalogNotice
          title="Editorial draft"
          message="This guide establishes the reading path. Sources, examples, and review date are still pending."
        />
        <div className="guide-body">
          <p className="eyebrow">The working outline</p>
          <h2>Define the decision before you evaluate the tool.</h2>
          <p>
            Start with the job to be done, the constraints that cannot move, and the evidence
            needed to trust a claim. Then compare only the candidates that can plausibly satisfy the
            brief.
          </p>
          <ol>
            <li>Name the job and the smallest acceptable outcome.</li>
            <li>Separate hard constraints from preferences and future options.</li>
            <li>Record source, date, uncertainty, and commercial relationship for each claim.</li>
            <li>Trial the smallest path and document what would make you switch.</li>
          </ol>
        </div>
      </ContentSection>
    </PageFrame>
  );
}
