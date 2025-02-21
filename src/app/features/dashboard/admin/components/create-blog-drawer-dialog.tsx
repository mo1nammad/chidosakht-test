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

import CreateBlog from "./create-blog";

export function CreateBlogDrawerDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>ساخت مطلب</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <DialogHeader className="mt-7">
            <DialogTitle className="text-right">نام گذاری</DialogTitle>
            <DialogDescription className="text-right text-sm">
              در این قسمت ابتدا موضوع مطلب خود را وارد کنید سپس میتوانید دیگر
              جزییات ان را در ادامه تغییر دهید
            </DialogDescription>
          </DialogHeader>
          <CreateBlog />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>ساخت مطلب</Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-7">
        <DrawerHeader className="text-right">
          <DrawerTitle>نام گذاری</DrawerTitle>
          <DrawerDescription>
            در این قسمت ابتدا موضوع مطلب خود را وارد کنید سپس میتوانید دیگر
            جزییات ان را وارد کنید
          </DrawerDescription>
        </DrawerHeader>
        <CreateBlog />
      </DrawerContent>
    </Drawer>
  );
}
