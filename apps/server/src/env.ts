import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { env as authEnv } from "@servify/auth/env";
import { env as dbEnv } from "@servify/db/env";

export const env = createEnv({
  extends: [authEnv, dbEnv],
  server: {
    CORS_ORIGIN: z.string().min(1),
  },
  runtimeEnv: process.env,
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
