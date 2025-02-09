import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });
export const DBURL =
  process.env.DATABASE_URL ??
  "postgresql://user:password@postgres:5432/mydatabase";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DBURL,
  },
});
