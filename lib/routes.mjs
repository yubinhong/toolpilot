export const routes = [
  { path: '/', title: 'ToolPilot - AI Model Pricing & API Cost Calculator', description: 'Compare AI model API pricing, calculate token costs, and find the right AI model for your application.', index: true },
  { path: '/pricing/', title: 'AI API Pricing Comparison | ToolPilot', description: 'Compare official input, cached input, and output token rates for OpenAI, Anthropic, Google, DeepSeek, and Jev.', index: true },
  { path: '/calculator/', title: 'AI API Cost Calculator | ToolPilot', description: 'Estimate per-request, daily, monthly, and annual AI API costs from token usage and official model pricing.', index: true },
  { path: '/compare/', title: 'AI Model Comparison & Cost Estimator | ToolPilot', description: 'Compare up to three AI models by provider, API pricing, context, availability, and estimated workload cost.', index: true },
  { path: '/models/jev/', title: 'Jev AI Pricing, API & Cost Calculator | ToolPilot', description: 'Explore Jev AI pricing, API availability, verified capabilities, official sources, and estimated usage costs.', index: true },
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
