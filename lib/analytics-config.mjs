const GA_ID_PATTERN = /^G-[A-Z0-9]{6,}$/i;
const GSC_TOKEN_PATTERN = /^[A-Za-z0-9_-]{10,}$/;

export function getGoogleAnalyticsId(value = process.env.NEXT_PUBLIC_GA_ID) {
  return typeof value === "string" && GA_ID_PATTERN.test(value) ? value : null;
}

export function getSearchConsoleVerification(value = process.env.NEXT_PUBLIC_GSC_VERIFICATION) {
  return typeof value === "string" && GSC_TOKEN_PATTERN.test(value) ? value : null;
}
