import { Hono } from "hono";
const app = new Hono();

import { zValidator } from "@hono/zod-validator";

// database
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// middleware
import { authMiddleware } from "@/lib/session-middlware";
import { createBlogFormSchema } from "../schema";

export default app
  .basePath("/blogs")
  .get("/", async (c) => {
    try {
      const blogs = await db.select().from(blogTable);

      return c.json({
        message: "blogs success",
        data: { blogs },
      });
    } catch (error) {
      console.log(error, "/blogs : GET");
      return c.json({ error: "somthing went wrong" }, 400);
    }
  })
  .get("/:id", async (c) => {
    const blogId = Number(c.req.param("id"));
    if (typeof blogId !== "number")
      return c.json({ error: "آیدی بلاگ برای دریافت بلاگ صحیح نیست" }, 403);

    try {
      // retrieve blog from database
      const selectedBlog = await db
        .select()
        .from(blogTable)
        .where(eq(blogTable.id, blogId))
        .then(([data]) => data);

      return c.json({
        message: "بلاگ با موفقیت دریافت شد",
        data: {
          blog: selectedBlog,
        },
      });
    } catch (error) {
      console.log(error, "/blogs/:id GET");
      return c.json({ error: "دریافت بلاگ ناموفق بود" }, 400);
    }
  })
  .post(
    "/create",
    authMiddleware,
    zValidator("json", createBlogFormSchema),
    async (c) => {
      const role = c.get("role");
      if (role === "user") return c.json({ error: "Access denied" }, 401);

      const body = c.req.valid("json");

      try {
        // upload blog
        const blog = await db
          .insert(blogTable)
          .values({
            ...body,
          })
          .returning({ id: blogTable.id })
          .then(([data]) => data);

        return c.json({
          message: "آپلود بلاگ موفق بود",
          data: {
            blogId: blog.id,
          },
        });
      } catch (error) {
        console.log(error, "/blogs/create :POST");
        return c.json({ error: "آپلود بلاگ ناموفق بود" }, 400);
      }
    }
  );
