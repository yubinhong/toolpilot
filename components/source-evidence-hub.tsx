import Link from 'next/link';
import { getEvidenceHubGroups } from '../lib/evidence-hubs.mjs';
import { HUBS } from '../lib/routes.mjs';
import { CatalogNotice } from './catalog-notice';
import { ContentSection } from './content-section';
import { PageFrame } from './page-frame';
import { PageIntro } from './page-intro';

type HubKind = 'mcp' | 'self-hosted';

export function SourceEvidenceHub({ kind }: { kind: HubKind }) {
  const groups = getEvidenceHubGroups(kind);
  const hub = HUBS[kind];

  return (
    <PageFrame breadcrumbPath={`/${kind}/`}>
      <PageIntro eyebrow="Research coverage" title={hub.title} summary={hub.summary}>
        <div className="page-intro-notice">
          <CatalogNotice message="These entries are source-backed drafts awaiting owner review. They are not approved evaluations or a complete support list." />
        </div>
      </PageIntro>
      <ContentSection>
        {groups.map(group => (
          <section className="evidence-hub-group" key={group.title} aria-labelledby={`evidence-group-${kind}-${group.title.replaceAll(' ', '-').toLowerCase()}`}>
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">Evidence map</p>
                <h2 id={`evidence-group-${kind}-${group.title.replaceAll(' ', '-').toLowerCase()}`}>{group.title}</h2>
              </div>
              <p>{group.summary}</p>
            </div>
            <ul className="guide-list evidence-hub-list">
              {group.entries.map(({ tool, fact, sources }) => (
                <li key={`${tool.slug}-${fact.key}`}>
                  <p className="card-kicker">{tool.category} · In review</p>
                  <h3><Link href={`/tools/${tool.slug}/`}>{tool.title}</Link></h3>
                  <p className="evidence-hub-fact"><strong>{fact.label}:</strong> {fact.value}</p>
                  <p className="evidence-hub-sources">
                    <strong>Official sources</strong>
                    {sources.map(source => (
                      <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </ContentSection>
    </PageFrame>
  );
}
