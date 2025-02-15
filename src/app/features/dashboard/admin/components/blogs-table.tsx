"use client";

import React from "react";
import { DataTable } from "@/app/dashboard/admin/blogs/data-table";
import { columns } from "@/app/dashboard/admin/blogs/column";

type Props = {
  blogsData: {
    id: number;
    authorName: string;
    categoryTitle: string | null;
    isPublished: boolean;
    title: string;
    updatedAt: string;
  }[];
};

export const BlogsTable = ({ blogsData }: Props) => (
  <DataTable columns={columns} data={blogsData} />
);
