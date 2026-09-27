import { ContentHub } from '../../components/content-hub';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/pricing/');
export default function Page() { return <ContentHub kind="pricing"/>; }
