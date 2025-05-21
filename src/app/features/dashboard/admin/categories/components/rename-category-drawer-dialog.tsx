import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useRenameCategory } from "../api/use-rename-category";

import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AppProps = {
  parrentId: number | undefined;
  categoryId: number;
  previousName: string;
};

export default function RenameCategoryDrawerDialog({
  parrentId,
  categoryId,
  previousName,
}: AppProps) {
  const [value, setValue] = useState<string>(previousName);
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  const { mutate: renameCategoryFn, isPending } = useRenameCategory();

  useEffect(() => setMounted(true), []);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!value) return;

    // api call
    renameCategoryFn(
      {
        name: value,
        parentCategoryId: parrentId,
        id: categoryId,
      },
      {
        onSuccess: () => {
          setShow(false);
          setValue("");
        },
      }
    );
  };

  if (!mounted) return null; // or a fallback
  if (isDesktop) {
    return (
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button size={"sm"}>تغییر نام دسته بندی</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mt-6 mb-4 space-y-1.5">
              <DialogTitle className="text-right">نام دسته بندی</DialogTitle>
              <DialogDescription className="text-right">
                در این قسمت می توانید نام دسته بندی را تغییر دهید
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-2.5">
              <Input
                value={value}
                placeholder="نام"
                onChange={(ev) => setValue(ev.target.value)}
                className="text-right"
              />
              <Button disabled={isPending} className="h-9">
                ثبت
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={show} onOpenChange={setShow}>
      <DrawerTrigger asChild>
        <Button size={"sm"}>تغییر نام دسته بندی</Button>
      </DrawerTrigger>

      <DrawerContent className="px-4 pb-7">
        <form onSubmit={handleSubmit}>
          <DrawerHeader className="text-right">
            <DrawerTitle>نام دسته بندی</DrawerTitle>
            <DrawerDescription>
              در این قسمت می توانید نام دسته بندی را تغییر دهید
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={value}
              placeholder="نام"
              onChange={(ev) => setValue(ev.target.value)}
              className="text-right"
            />
            <Button disabled={isPending} className="h-9">
              {isPending ? <Loader2 className="animate-spin" /> : "ثبت"}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
