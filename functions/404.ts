import { notFoundResponse } from "./_not-found";

export function onRequest() {
  return notFoundResponse();
}
