import Link from 'next/link';
import { breadcrumbList, getBreadcrumbItems, serializeJsonLd } from '../lib/breadcrumbs.mjs';
import { getSiteUrl } from '../lib/site-config.mjs';

export function Breadcrumbs({ path }: { path: string }) {
  const items = getBreadcrumbItems(path);
  if (items.length === 0) return null;

  const structuredData = breadcrumbList(items, getSiteUrl());
  return <>
    <nav className="breadcrumb-nav shell" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => <li key={item.href}>
          {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
          {index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
        </li>)}
      </ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
  </>;
}
