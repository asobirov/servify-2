import type { Context as HonoContext } from "hono";

import { auth } from "@servify/auth";
import { LOCALES, DEFAULT_LOCALE } from "@servify/i18n/languages";
import Negotiator from "negotiator";

export function getRequestLocale(
  requestHeaders: Headers,
  defaultLocale: string = DEFAULT_LOCALE,
): string {
  // First, check for explicit x-locale header (set by client)
  const explicitLocale = requestHeaders.get("x-locale");
  if (explicitLocale && LOCALES.includes(explicitLocale as (typeof LOCALES)[number])) {
    return explicitLocale;
  }

  // Fall back to accept-language header negotiation
  const langHeader = requestHeaders.get("accept-language") || undefined;
  const languages = new Negotiator({
    headers: { "accept-language": langHeader },
  }).languages(LOCALES.slice());

  console.log(">>> Negotiator languages", languages);

  const activeLocale = languages[0] || defaultLocale;
  return activeLocale;
}

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const headers = context.req.raw.headers;
  const session = await auth.api.getSession({
    headers,
  });

  const locale = getRequestLocale(headers);

  const source = headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source, "by", session?.user, "with locale", locale);

  return {
    session,
    locale,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
