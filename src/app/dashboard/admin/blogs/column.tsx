import { ColumnDef } from "@tanstack/react-table";

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
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const Action = ({ blogId }: { blogId: number }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row-reverse w-fit gap-x-2.5">
        <Button size="sm" variant="secondary">
          <Link href={`/dashboard/admin/blogs/${blogId}`}>ویرایش</Link>
        </Button>
        <Button size="sm" variant="destructive">
          {/* todo add delete files api in server */}
          حذف
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
