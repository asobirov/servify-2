import type { AppRouter } from "@servify/api";

import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useAppLanguage } from "@/store/use-app-language-store";

export const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: {
      serializeData: superjson.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      shouldRedactErrors: () => {
        return false;
      },
    },
    hydrate: {
      deserializeData: superjson.deserialize,
    },
  },
});

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: superjson,
      url: `${env.EXPO_PUBLIC_SERVER_URL}/trpc`,
      headers() {
        const headers = new Map<string, string>();
        const cookies = authClient.getCookie();
        if (cookies) {
          headers.set("Cookie", cookies);
        }

        const locale = useAppLanguage.getState().language;
        if (locale) {
          headers.set("accept-language", locale);
        }
        return Object.fromEntries(headers);
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
