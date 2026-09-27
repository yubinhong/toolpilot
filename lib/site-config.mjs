export const DEFAULT_SITE_URL = 'https://toolpilot.cc';
export function getSiteUrl() {
  const value = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
  let url;
  try { url = new URL(value); } catch { throw new Error('NEXT_PUBLIC_SITE_URL must be a public HTTPS origin'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || url.port) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a credential-free HTTPS origin without a path or query');
  }
  return url.origin;
}
