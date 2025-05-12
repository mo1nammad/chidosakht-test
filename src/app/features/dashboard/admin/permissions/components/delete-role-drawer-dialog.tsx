import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Delete, Loader2 } from "lucide-react";

import { Role } from "@/types";
import { useDeleteRole } from "../api/use-delete-role";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

type AppProps = {
  title: string;
  description: string;
  selectedRole: Role;
};

export default function DeleteRoleDrawerDialog({
  description,
  title,
  selectedRole,
}: AppProps) {
  const { mutate: deleteRole, isPending } = useDeleteRole();

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const { id, name } = selectedRole;

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!id) return;

    deleteRole(id, {
      onSuccess: () => setShow(false),
    });
  };

  if (!mounted) return null; // or a fallback
  if (isDesktop) {
    return (
      <AlertDialog open={show} onOpenChange={setShow}>
        <AlertDialogTrigger asChild>
          <Button disabled={!name} variant="destructive" size="icon">
            <Delete />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] gap-y-2.5">
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader className="mt-6 mb-4">
              <AlertDialogTitle className="text-right">
                {title}
              </AlertDialogTitle>

              <AlertDialogDescription className="text-right">
                {description}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div dir="rtl" className="font-medium my-5">
              <div className="flex gap-x-0.5 mb-0.5">
                <p>نقش مورد نظر:</p>
                <p className="font-bold text-fuchsia-800">‍‍‍ {name}</p>
              </div>
              <p className="text-right text-sm text-muted-foreground">
                {selectedRole.description}
              </p>
            </div>

            <div className="flex flex-col gap-y-1.5">
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : "حذف"}
              </Button>
              <AlertDialogCancel type="button">لغو</AlertDialogCancel>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={show} onOpenChange={setShow}>
      <DrawerTrigger asChild>
        <Button disabled={!name} variant="destructive" size="icon">
          <Delete />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-4 pb-7">
        <form onSubmit={handleSubmit}>
          <DrawerHeader className="text-right">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
            <div
              dir="rtl"
              className="flex text-sm font-medium mt-1.5 gap-x-0.5"
            >
              <p>نقش مورد نظر:</p>
              <p className="font-bold text-fuchsia-800">‍‍‍ {name}</p>
            </div>
          </DrawerHeader>
          <div className="flex flex-col gap-y-2.5 mt-2.5">
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "حذف"}
            </Button>
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              onClick={() => setShow(false)}
            >
              لغو
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
