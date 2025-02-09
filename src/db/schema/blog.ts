import {
  boolean,
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
  title: varchar({ length: 256 }).notNull(),
  thumbnail: text().notNull(),
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
  isPublished: boolean("is_published").default(false).notNull(),

  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const blogCommentTable = pgTable("blog_comment", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: varchar({ length: 512 }).notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogTable.id, {
      onDelete: "cascade",
    }),

  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
