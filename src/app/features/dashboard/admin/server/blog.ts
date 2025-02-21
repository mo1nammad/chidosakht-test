import { Hono } from "hono";
const app = new Hono();

import { zValidator } from "@hono/zod-validator";

// database
import { db } from "@/db";
import { blogCategoryTable, blogTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import * as s3 from "@/lib/s3";
// middleware
import { authMiddleware } from "@/lib/session-middlware";
import { createBlogFormSchema } from "../schema";

export default app
  .basePath("/blogs")

  .get("/", async (c) => {
    try {
      // get all blogs
      const blogs = await db
        .select({
          id: blogTable.id,
          authorName: usersTable.name,
          categoryTitle: blogCategoryTable.title,
          isPublished: blogTable.isPublished,
          title: blogTable.title,
          updatedAt: blogTable.updatedAt,
        })
        .from(blogTable)
        .innerJoin(usersTable, eq(blogTable.authorId, usersTable.id))
        .leftJoin(
          blogCategoryTable,
          eq(blogTable.categoryId, blogCategoryTable.id)
        )
        .orderBy(desc(blogTable.updatedAt));

      return c.json({
        message: "blogs success",
        blogs: blogs,
      });
    } catch (error) {
      console.log(error, "/blogs : GET");
      return c.json({ error: "somthing went wrong" }, 400);
    }
  })
  .get("/categories", async (c) => {
    try {
      const categories = await db.select().from(blogCategoryTable);
      return c.json({
        message: "categories fetched",
        categories,
      });
    } catch (error) {
      console.log(error);
      console.log(error, "/blogs/categories GET");

      return c.json({ error: "internal server error" });
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
        blog: selectedBlog,
      });
    } catch (error) {
      console.log(error, "/blogs/:id GET");
      return c.json({ error: "دریافت بلاگ ناموفق بود" }, 400);
    }
  })
  .put("/:id", async (c) => {
    return c.json({ message: "update blog" });
  })
  .delete("/:id", authMiddleware, async (c) => {
    const role = c.get("role");

    if (role === "user") {
      return c.json({ error: "شما دسترسی برای این عملیات را ندارید" }, 401);
    }

    try {
      const blogId = Number(c.req.param("id"));
      if (typeof blogId !== "number")
        return c.json({ error: "آیدی بلاگ برای حذف بلاگ صحیح نیست" }, 403);

      // delete blog and related files to it
      // s3
      s3.deleteFolderFromAws(`blogs/${blogId}`)
        .then(() => console.log("delete was succesfull"))
        .catch((err) => console.log(err));

      // db
      await db.delete(blogTable).where(eq(blogTable.id, blogId)).execute();

      return c.json({ message: "بلاگ با موفقیت حذف شد" });
    } catch (error) {
      console.log(error, "/blogs/:id DELETE");
      return c.json({ error: "حذف بلاگ ناموفق بود" }, 400);
    }
  })
  .post(
    "/create",
    authMiddleware,
    zValidator("json", createBlogFormSchema),
    async (c) => {
      const role = c.get("role");
      const userId = c.get("userId");
      if (role === "user") return c.json({ error: "Access denied" }, 401);

      const body = c.req.valid("json");

      try {
        // upload blog
        const blog = await db
          .insert(blogTable)
          .values({
            ...body,
            authorId: userId,
          })
          .returning({ id: blogTable.id })
          .then(([data]) => data);

        return c.json({
          message: "ایجاد بلاگ موفق بود",
          blogId: blog.id,
        });
      } catch (error) {
        console.log(error, "/blogs/create :POST");
        return c.json({ error: "آپلود بلاگ ناموفق بود" }, 400);
      }
    }
  );
