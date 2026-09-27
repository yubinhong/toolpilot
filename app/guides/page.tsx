import Link from 'next/link';
import { ContentHub } from '../../components/content-hub';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/guides/');
export default function Page() { return <><ContentHub kind="guides"/><aside className="shell historical-guides" aria-label="Earlier draft guides"><p>Earlier outlines: <Link href="/guides/build-a-small-ai-saas-stack/">Small AI SaaS stack</Link> · <Link href="/guides/affiliate-and-sponsored-tool-pages/">Commercial labeling</Link></p></aside></>; }
