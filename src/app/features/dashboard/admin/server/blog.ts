import { Hono } from "hono";
const app = new Hono();

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// database
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default app
  .basePath("/blogs")
  .get(
    "/",
    zValidator(
      "param",
      z.object({
        categoryId: z.union([z.undefined(), z.number().min(1).max(10)]),
      })
    ),
    async (c) => {
      const { categoryId } = c.req.valid("param");

      try {
        let blogs: (typeof blogTable.$inferSelect)[] = [];

        // asign blogs
        if (categoryId) {
          blogs = await db
            .select()
            .from(blogTable)
            .where(eq(blogTable.categoryId, categoryId));
        } else {
          blogs = await db.select().from(blogTable);
        }
        c.json({
          message: "blogs sucess",
          data: blogs,
        });
      } catch (error) {
        console.log(error, "/blogs : GET");
        c.json({ error: "somthing went wrong" }, 400);
      }
    }
  )
  .post("/create");
