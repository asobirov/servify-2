import type { ServiceCategoryTranslations } from "@servify/db/schema/service-category";

import { db } from "@servify/db";
import { z } from "zod/v4";

import { publicProcedure } from "@/trpc";

export const getCategories = publicProcedure
  .input(
    z.object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(30),
    }),
  )
  .output(
    z.array(
      z.object({
        name: z.string(),
        slug: z.string(),
        isActive: z.boolean(),
      }),
    ),
  )
  .query(async ({ input, ctx: { locale } }) => {
    const categories = await db.query.ServiceCategory.findMany({
      limit: input.limit,
      offset: (input.page - 1) * input.limit,
      orderBy: (c, { desc }) => [desc(c.isActive)],
    });

    const localizedCategories = categories.map((category) => ({
      name: category.nameTranslations[locale as keyof ServiceCategoryTranslations],
      slug: category.slug,
      isActive: category.isActive,
    }));

    return localizedCategories;
  });
