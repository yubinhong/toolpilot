import { fileURLToPath } from "node:url";
import sharp from "sharp";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4f7f5"/>
  <rect x="0" y="0" width="16" height="630" fill="#126b59"/>
  <g transform="translate(74 58)">
    <rect width="54" height="54" rx="8" fill="#0b5144"/>
    <rect x="12" y="29" width="7" height="13" rx="1" fill="#d8e9e3"/>
    <rect x="24" y="21" width="7" height="21" rx="1" fill="#d8e9e3"/>
    <rect x="36" y="12" width="7" height="30" rx="1" fill="#d8e9e3"/>
    <path d="M11 34 L24 25 L34 27 L44 13" fill="none" stroke="#e0b85b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="44" cy="13" r="3" fill="#e0b85b"/>
  </g>
  <text x="146" y="96" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700">ToolPilot</text>
  <text x="74" y="230" fill="#0b5144" font-family="Arial, Helvetica, sans-serif" font-size="67" font-weight="700">AI Model Pricing</text>
  <text x="74" y="306" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700">Compare API costs</text>
  <text x="76" y="365" fill="#536866" font-family="Arial, Helvetica, sans-serif" font-size="21">Official prices. API estimates. Objective model comparisons.</text>
  <g transform="translate(74 450)">
    <rect width="266" height="48" rx="5" fill="#0b5144"/>
    <text x="24" y="31" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Compare provider prices</text>
  </g>
  <g transform="translate(765 80)">
    <rect width="366" height="470" rx="8" fill="#ffffff" stroke="#cbd8d4" stroke-width="2"/>
    <rect width="366" height="64" rx="8" fill="#e7efec"/>
    <rect y="56" width="366" height="8" fill="#e7efec"/>
    <text x="24" y="41" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700">Compare official rates</text>
    <text x="24" y="104" fill="#536866" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700">PRICE TYPE</text>
    <text x="222" y="104" fill="#536866" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700">BILLING UNIT</text>
    <text x="24" y="151" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Input tokens</text>
    <text x="222" y="151" fill="#126b59" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">per 1M tokens</text>
    <path d="M24 174 H342" stroke="#e2e9e6" stroke-width="2"/>
    <text x="24" y="219" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Cached input</text>
    <text x="222" y="219" fill="#9b4d32" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">separate rate</text>
    <path d="M24 242 H342" stroke="#e2e9e6" stroke-width="2"/>
    <text x="24" y="287" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Output tokens</text>
    <text x="222" y="287" fill="#326986" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">per 1M tokens</text>
    <path d="M24 310 H342" stroke="#e2e9e6" stroke-width="2"/>
    <text x="24" y="355" fill="#142b2a" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Pricing schedule</text>
    <text x="222" y="355" fill="#806018" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700">dated terms</text>
    <path d="M24 378 H342" stroke="#e2e9e6" stroke-width="2"/>
    <circle cx="32" cy="421" r="7" fill="#126b59"/>
    <text x="50" y="426" fill="#536866" font-family="Arial, Helvetica, sans-serif" font-size="13">Official-source pricing data</text>
  </g>
  <text x="74" y="586" fill="#536866" font-family="Arial, Helvetica, sans-serif" font-size="16">toolpilot.cc</text>
</svg>`;

const outputPath = fileURLToPath(new URL("../public/og-toolpilot.png", import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(outputPath);
console.log(`Generated ${outputPath}`);
