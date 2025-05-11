"use client";

import React from "react";
import { DataTable } from "@/app/dashboard/admin/blogs/data-table";
import { columns } from "@/app/dashboard/admin/blogs/column";
import { useGetBlogs } from "../api/use-get-blogs";
import { Loader2, Ghost } from "lucide-react";

export const BlogsTable = () => {
  // const { data, status } = useGetBlogs();

  // if (status === "pending")
  //   return (
  //     <div className="w-full flex flex-col justify-center items-center h-120">
  //       <Loader2 className="animate-spin size-8" />
  //       <h6 className="text-xl font-yekan-semibold mt-1.5">در حال بارگزاری</h6>
  //     </div>
  //   );

  // if (!data || data.blogs.length === 0)
  //   return (
  //     <div className="w-full flex flex-col justify-center items-center h-120">
  //       <Ghost className="size-8 text-muted-foreground" />
  //       <h6 className="text-lg font-yekan-semibold text-muted-foreground mt-1.5">
  //         هیچ داده ای موجود نیست
  //       </h6>
  //     </div>
  //   );

  // return <DataTable columns={columns} data={data?.blogs ?? []} />;

  return null;
};
