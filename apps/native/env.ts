import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },

  clientPrefix: "EXPO_PUBLIC",
  client: {
    EXPO_PUBLIC_SERVER_URL: z.string().min(1),

    EXPO_PUBLIC_TELEGRAM_BOT_ID: z.coerce.number(),
    EXPO_PUBLIC_TELEGRAM_CALLBACK_URL: z.string().min(1),
  },

  runtimeEnv: process.env,
});
