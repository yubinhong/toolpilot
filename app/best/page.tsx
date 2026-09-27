import { ContentHub } from '../../components/content-hub';
import { pageMetadata } from '../../lib/metadata';
export const metadata = pageMetadata('/best/');
export default function Page() { return <ContentHub kind="best"/>; }
