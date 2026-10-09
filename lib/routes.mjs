export const routes = [
  { path: '/', title: 'ToolPilot - AI Model Pricing & API Cost Calculator', description: 'Compare AI model API pricing, calculate token costs, and find the right AI model for your application.', index: true },
  { path: '/pricing/', title: 'AI API Pricing Comparison | ToolPilot', description: 'Compare official input, cached input, and output token rates for OpenAI, Anthropic, Google, DeepSeek, and Jev.', index: true },
  { path: '/calculator/', title: 'AI API Cost Calculator | ToolPilot', description: 'Estimate per-request, daily, monthly, and annual AI API costs from token usage and official model pricing.', index: true },
  { path: '/compare/', title: 'AI Model Comparison & Cost Estimator | ToolPilot', description: 'Compare up to three AI models by provider, API pricing, context, availability, and estimated workload cost.', index: true },
  { path: '/compare/gpt-6-1-sol-vs-astra/', title: 'GPT 6.1 Sol vs Astra: API Pricing and Use Cases | ToolPilot', description: 'Compare GPT 6.1 Sol vs Astra API prices, cached tokens, long-context rates, and practical use cases using official OpenAI sources.', index: true },
  { path: '/compare/haiku-5-5-vs-luna-6/', title: 'Haiku 5.5 vs Luna 6: API Pricing and Use Cases | ToolPilot', description: 'Compare Haiku 5.5 vs Luna 6 API pricing, prompt-length tiers, caching, context limits, and practical use cases using official sources.', index: true },
  { path: '/compare/fable-5-1-vs-opus-5-5/', title: 'Fable 5.1 vs Opus 5.5: API Pricing and Use Cases | ToolPilot', description: 'Compare Claude Fable 5.1 vs Opus 5.5 API rates, prompt caching, context limits, and provider-documented workloads.', index: true },
  { path: '/compare/opus-5-5-vs-astra/', title: 'Opus 5.5 vs Astra: API Pricing and Use Cases | ToolPilot', description: 'Compare Claude Opus 5.5 and GPT-6 Astra API prices, cache rates, long-context costs, and practical workloads using official provider sources.', index: true },
  { path: '/models/jev/', title: 'Jev AI Pricing, API & Cost Calculator | ToolPilot', description: 'Explore Jev AI pricing, API availability, verified capabilities, official sources, and estimated usage costs.', index: true },
  { path: '/models/gemini-4-argon/', title: 'Gemini 4 Argon: API Access, Pricing & Cost | ToolPilot', description: "Gemini 4 Argon API access, pricing status, token limits and capabilities. Track official Google availability and estimate costs from announced token rates.", index: true },
  { path: '/about/', title: 'About ToolPilot | AI Model Pricing', description: 'ToolPilot helps developers compare AI API prices and estimate model costs using dated official sources.', index: true },
  { path: '/privacy/', title: 'Privacy Policy | ToolPilot', description: 'How ToolPilot handles browser-based calculator inputs, hosting logs, and site data.', index: true },
  { path: '/terms/', title: 'Terms of Use | ToolPilot', description: 'Terms and limitations for ToolPilot model pricing data, cost estimates, and external provider links.', index: true },
];

export function getRoutes() {
  return routes;
}

export function getRoute(path) {
  return routes.find((route) => route.path === path) ?? null;
}
