import { expo } from "@better-auth/expo";
import { db } from "@servify/db";
import * as schema from "@servify/db/schema/auth";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { telegram } from "./plugins/telegram/index";
import { env } from "@/env";

const getDefaultCookieAttributes = () => {
  if (env.NODE_ENV === "production") {
    return {} satisfies NonNullable<BetterAuthOptions["advanced"]>["defaultCookieAttributes"];
  }

  return {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  } satisfies NonNullable<BetterAuthOptions["advanced"]>["defaultCookieAttributes"];
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN, "servify://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: getDefaultCookieAttributes(),
  },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    expo(),
    telegram({
      botToken: env.AUTH_TELEGRAM_BOT_TOKEN,
      getTempEmail: (id) => `${id}@t.me`,
    }),
  ],
});
