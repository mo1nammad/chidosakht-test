import React from "react";
import CreateBlog from "@/app/features/dashboard/admin/components/create-blog";

import { getAllBlogs } from "@/app/features/dashboard/admin/actions/blogs";
import { BlogsTable } from "@/app/features/dashboard/admin/components/blogs-table";

export default async function ManageBlogsPage() {
  const response = await getAllBlogs();

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10">
        <div className="flex flex-row-reverse">
          <CreateBlog />
        </div>
        <div className="mt-10">
          {response?.blogs ? (
            <BlogsTable blogsData={response.blogs} />
          ) : (
            "هیچ داده ای وجود ندارد"
          )}
        </div>
      </div>
    </div>
  );
}
