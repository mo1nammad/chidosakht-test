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
  thumbnail: text(),
  content: text(),
  categoryId: integer("category_id").references(() => blogCategoryTable.id),
  authorId: uuid("author_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  timeToRead: varchar("time_to_read", { length: 128 }),
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
  isVerified: boolean("is_verified").default(false).notNull(),

  createAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
