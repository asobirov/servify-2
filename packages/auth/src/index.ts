import { expo } from "@better-auth/expo";
import { db } from "@servify/db";
import * as schema from "@servify/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { telegram } from "telegram-better-auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || "", "servify://", "exp://"],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: process.env.NODE_ENV
      ? {}
      : {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    expo(),
    telegram({
      botToken: process.env.TELEGRAM_BOT_TOKEN || "",
      getTempEmail: (id) => `${id}@t.me`,
    }),
  ],
});
