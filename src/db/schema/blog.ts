import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./index";

export const blogCategoryTable = pgTable("blog_category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 32 }).notNull(),

  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const blogTable = pgTable("blog", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 64 }).notNull(),
  thumbnail: text().notNull(),
  imagesUrlList: varchar({ length: 2048 }).array(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => blogCategoryTable.id),
  content: text().notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  headersHtmlIds: varchar("headers_html_ids", { length: 32 }).notNull().array(),

  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
