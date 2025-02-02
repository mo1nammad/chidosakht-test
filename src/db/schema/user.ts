import {
  boolean,
  timestamp,
  varchar,
  pgTable,
  uuid,
  text,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    phone: varchar({ length: 32 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    isVerified: boolean().default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      phoneIdx: index("phone_idx").on(table.phone),
    };
  }
);

export const otpTable = pgTable("otp-code", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  value: text("otp").notNull(),
  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
