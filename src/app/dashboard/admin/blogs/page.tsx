import React from "react";
import CreateBlog from "@/app/features/dashboard/admin/components/create-blog";

export default function ManageBlogsPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 flex flex-row-reverse">
        <CreateBlog />
      </div>
    </div>
  );
}
