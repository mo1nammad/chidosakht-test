"use client";
import { ColumnDef } from "@tanstack/react-table";

import type { Product } from "../types";
import { SquareArrowOutUpRight, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useDeleteProduct } from "../api/use-delete-product";

// import { toast } from "sonner";
type RemoveProductActionType = {
  name: string;
  id: string;
};
const RemoveProductAction = ({ name, id }: RemoveProductActionType) => {
  const { mutate } = useDeleteProduct();
  const removeFn = () => mutate(id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="active:text-muted-foreground cursor-pointer flex items-center justify-center w-fit">
          <X className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row-reverse gap-x-1.5">
            <span className="font-medium">حذف محصول</span>
            <span className="text-primary font-semibold">{name}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            با این کار این محصول برای همیشه از فهرست محصولات حذف می شود
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={removeFn}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type ProductColumns = Pick<Product, "productType" | "name" | "id">;

export const columns: ColumnDef<ProductColumns>[] = [
  {
    accessorKey: "actions",
    header: undefined,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-x-2.5">
        <RemoveProductAction
          name={row.getValue("name")}
          id={row.getValue("id")}
        />
        <Link href={`/dashboard/admin/products/${row.getValue("id")}`}>
          <SquareArrowOutUpRight className="size-4 active:text-muted-foreground" />
        </Link>
      </div>
    ),
  },

  {
    accessorKey: "productType",
    header: "نوع محصول",
    cell: (row) =>
      row.getValue() === 1 ? "ساده" : row.getValue() === 2 ? "متغیر" : "نامشخص",
  },
  {
    accessorKey: "name",
    header: "نام",
  },
  {
    accessorKey: "id",
    header: "شناسه",
  },
];
