import { dbEnv } from "@servify/db/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function authEnv() {
  return createEnv({
    extends: [dbEnv()],
    server: {
      BETTER_AUTH_SECRET: z.string().min(1),
      BETTER_AUTH_URL: z.string().min(1),
      
      AUTH_SECRET:
        process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().min(1).optional(),

      CORS_ORIGIN: z.string().min(1),

      // Social Providers
      AUTH_GOOGLE_CLIENT_ID: z.string().min(1),
      AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),

      AUTH_TELEGRAM_BOT_TOKEN: z.string().min(1),

      NODE_ENV: z.enum(["development", "production"]).optional(),
    },
    runtimeEnv: process.env,
    skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  });
}
