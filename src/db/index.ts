import { drizzle } from "drizzle-orm/node-postgres";
import { DBURL } from "../../drizzle.config";

export const db = drizzle(DBURL);
