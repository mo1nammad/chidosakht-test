"use client";

import * as React from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/button";
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

import CreateProduct from "./create-product";

export function CreateProductDrawerDialog() {
  const [open, setOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  if (!isClient) {
    // Render nothing until mounted on client
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>ساخت محصول</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <DialogHeader className="mt-7">
            <DialogTitle className="text-right">نام گذاری</DialogTitle>
            <DialogDescription className="text-right text-sm">
              در این قسمت ابتدا موضوع مطلب خود را وارد کنید سپس میتوانید دیگر
              جزییات ان را در ادامه تغییر دهید
            </DialogDescription>
          </DialogHeader>
          <CreateProduct />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>ساخت محصول</Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-7">
        <DrawerHeader className="text-right">
          <DrawerTitle>نام گذاری</DrawerTitle>
          <DrawerDescription>
            در این قسمت ابتدا موضوع مطلب خود را وارد کنید سپس میتوانید دیگر
            جزییات ان را وارد کنید
          </DrawerDescription>
        </DrawerHeader>
        <CreateProduct />
      </DrawerContent>
    </Drawer>
  );
}
