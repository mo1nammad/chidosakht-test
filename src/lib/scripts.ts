"use server";

import { db } from "@/db";
import { blogCategoryTable } from "@/db/schema";

await db
  .insert(blogCategoryTable)
  .values([
    { title: "آموزشی" },
    { title: "خدمات" },
    { title: "ترفندها" },
    { title: "تخصصی" },
    { title: "تجربیات " },
  ]);
