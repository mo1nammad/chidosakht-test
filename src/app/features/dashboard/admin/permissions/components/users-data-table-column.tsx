"use client";
import { ColumnDef } from "@tanstack/react-table";

import type { Session as User } from "@/types";
import { Loader, X } from "lucide-react";

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
import { useRemoveUserRole } from "../api/use-remove-user-role";
import { toast } from "sonner";

const RemoveUserAction = ({
  username,
  roleId,
  userId,
}: {
  username: string;
  userId: string;
  roleId: string;
}) => {
  const { mutateAsync } = useRemoveUserRole();

  const removeFn = () =>
    toast.promise(() => mutateAsync({ roleIds: [roleId], userId }), {
      loading: (
        <div className="flex gap-x-4 items-center">
          <p className="text-sm"> در حال پردازش</p>
          <Loader className="animate-spin size-4" />
        </div>
      ),
      success: () => "حذف نقش کاربر با موفقیت انجام شد",
      error: (err) => err.message,
      position: "top-center",
      className: "flex-row-reverse! gap-x-4!",
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="active:text-muted-foreground cursor-pointer flex items-center justify-center w-full">
          <X className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">
            از حذف کاربر <span className="text-purple-600">{username}</span>{" "}
            اطمینان دارید
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            با این کار عضویت این کاربر از این نقش باطل می شود
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

export const columns: (roleId: string) => ColumnDef<User>[] = (roleId) => [
  {
    accessorKey: "actions",
    header: undefined,
    cell: ({ row }) => (
      <RemoveUserAction
        username={row.getValue("fullName")}
        roleId={roleId}
        userId={row.getValue("id")}
      />
    ),
  },
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
