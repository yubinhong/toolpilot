import { notFound } from 'next/navigation';
import { ContentDetail } from '../../../components/content-detail';
import { content, findContent } from '../../../lib/content.mjs';
import { pageMetadata } from '../../../lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() { return content.filter(r => r.kind === 'alternatives').map(r => ({ slug: r.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; return pageMetadata(`/alternatives/${slug}/`);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const record = findContent('alternatives', slug);
  if (!record) notFound();
  return <ContentDetail record={record}/>;
}
