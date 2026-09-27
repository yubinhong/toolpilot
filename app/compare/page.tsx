import { ContentHub } from '../../components/content-hub';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/compare/');
export default function Page() { return <ContentHub kind="compare"/>; }
