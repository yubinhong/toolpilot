import { PageFrame } from "../../../components/page-frame";
import { TrendModelLandingPage } from "../../../components/trend-model-landing-page";
import { pageMetadata } from "../../../lib/metadata";
import { getModel } from "../../../lib/models";

export const metadata = pageMetadata("/models/gemini-4-argon/");

export default function Gemini4ArgonPage() {
  const model = getModel("gemini-4-argon");
  if (!model) return null;
  return <PageFrame path="/models/gemini-4-argon/"><TrendModelLandingPage model={model} /></PageFrame>;
}
