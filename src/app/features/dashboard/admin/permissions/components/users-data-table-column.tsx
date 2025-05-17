"use client";

import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Loader } from "lucide-react";

import type { Session as User } from "@/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const Action = ({ blogId }: { blogId: number }) => {
  const [open, setOpen] = useState(false);

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
          onClick={() => {}}
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "fullName",
    header: "نام",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    cell: (row) => row.getValue() ?? "بدون ایمیل",
  },
  {
    accessorKey: "phoneNumber",
    header: "تلفن همراه",
  },
];
