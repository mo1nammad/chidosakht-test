import React from "react";

import { BlogsTable } from "@/app/features/dashboard/admin/components/blogs-table";
import { CreateBlogDrawerDialog } from "@/app/features/dashboard/admin/components/create-blog-drawer-dialog";

export default async function ManageBlogsPage() {
  // const response = await getAllBlogs();

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10">
        <div className="flex flex-row-reverse">
          <CreateBlogDrawerDialog />
        </div>
        <div className="mt-10">
          <BlogsTable />
        </div>
      </div>
    </div>
  );
}
