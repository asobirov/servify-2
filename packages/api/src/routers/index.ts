import { protectedProcedure, publicProcedure, router } from "@/trpc";

import { categoryRouter } from "./service/category";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  service: {
    category: categoryRouter,
  },
});
export type AppRouter = typeof appRouter;
