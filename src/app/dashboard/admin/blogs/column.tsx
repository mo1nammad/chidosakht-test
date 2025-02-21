"use client";

import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Loader } from "lucide-react";

type Blog = {
  id: number;
  title: string;
  authorName: string;
  categoryTitle: string | null;
  isPublished: boolean;
  updatedAt: string;
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDeleteBlog } from "@/app/features/dashboard/admin/api/use-delete-blog";

const Action = ({ blogId }: { blogId: number }) => {
  const [open, setOpen] = useState(false);
  const { mutate, status } = useDeleteBlog();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row-reverse w-fit gap-x-2.5">
        <Link href={`/dashboard/admin/blogs/${blogId}`}>
          <Button size="sm" variant="secondary" disabled={status === "pending"}>
            ویرایش
          </Button>
        </Link>
        <Button
          size="sm"
          variant="destructive"
          onClick={() =>
            mutate({ id: `${blogId}` }, { onSuccess: () => setOpen(false) })
          }
          disabled={status === "pending"}
        >
          {/* todo add delete files api in server */}
          {status === "pending" ? (
            <Loader className="animate-spin size-6" />
          ) : (
            " حذف"
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    accessorKey: "authorName",
    header: "نویسنده",
  },
  {
    accessorKey: "categoryTitle",
    header: "دسته بندی",
    cell: (row) => row.getValue() || "بدون دسته بندی",
  },
  {
    accessorKey: "isPublished",
    header: "منتشر شده",
    cell: (row) => (row.getValue() ? "بله" : "خیر"),
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: (row) =>
      new Date(row.getValue() as string).toLocaleDateString("fa-IR"),
  },
  {
    accessorKey: "actions",
    header: undefined,
    cell: ({ row }) => <Action blogId={row.original.id} />,
  },
];
