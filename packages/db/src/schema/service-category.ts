import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

export type ServiceCategoryTranslations = {
  en: string;
  uz: string;
  ru: string;
};

export const ServiceCategory = pgTable("service_category", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),

  nameTranslations: t.jsonb("name_translations").$type<ServiceCategoryTranslations>().notNull(),
  slug: t.text().notNull().unique(),

  isActive: t.boolean().notNull().default(true),

  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp({ mode: "date", withTimezone: true }).$onUpdateFn(() => sql`now()`),
}));
