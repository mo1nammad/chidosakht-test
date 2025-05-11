import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import {
  AlertDialog,
  AlertDialogAction,
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
import { Delete, Loader2 } from "lucide-react";
import { useDeleteRole } from "../api/use-delete-role";

type AppProps = {
  title: string;
  description: string;
  roleName: string | undefined;
  roleId: string;
};

export default function DeleteRoleDrawerDialog({
  description,
  title,
  roleId,
  roleName,
}: AppProps) {
  const { mutate: deleteRole, isPending } = useDeleteRole();

  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleClick = () => {
    if (!roleId) return;

    deleteRole(roleId, {
      onSuccess: () => setShow(false),
    });
  };

  if (!mounted) return null; // or a fallback
  if (isDesktop) {
    return (
      <AlertDialog open={show} onOpenChange={setShow}>
        <AlertDialogTrigger asChild>
          <Button disabled={!roleName} variant="destructive" size="icon">
            <Delete />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] gap-y-2.5">
          <AlertDialogHeader className="mt-6 mb-4 space-y-1.5">
            <AlertDialogTitle className="text-right">{title}</AlertDialogTitle>

            <AlertDialogDescription className="text-right">
              {description}
            </AlertDialogDescription>
            <div dir="rtl" className="flex text-sm font-medium mt-3 gap-x-0.5">
              <p>نقش مورد نظر:</p>
              <p className="font-bold text-fuchsia-800">‍‍‍ {roleName}</p>
            </div>
          </AlertDialogHeader>

          <AlertDialogAction disabled={isPending} onClick={() => handleClick}>
            {isPending ? <Loader2 className="animate-spin" /> : "حذف"}
          </AlertDialogAction>
          <AlertDialogCancel disabled={isPending}>لغو</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={show} onOpenChange={setShow}>
      <DrawerTrigger asChild>
        <Button disabled={!roleName} variant="destructive" size="icon">
          <Delete />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-4 pb-7">
        <DrawerHeader className="text-right">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
          <div dir="rtl" className="flex text-sm font-medium mt-1.5 gap-x-0.5">
            <p>نقش مورد نظر:</p>
            <p className="font-bold text-fuchsia-800">‍‍‍ {roleName}</p>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-y-2.5 mt-2.5">
          <Button onClick={handleClick} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "حذف"}
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            onClick={() => setShow(false)}
          >
            لغو
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
