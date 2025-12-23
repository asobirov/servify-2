import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {},
  clientPrefix: "VITE_PUBLIC_",
  client: {
    VITE_PUBLIC_SERVER_URL: z.string().min(1),
  },
  runtimeEnv: process.env,
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
