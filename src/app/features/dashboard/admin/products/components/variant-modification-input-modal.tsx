import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AppProps = {
  defaultValue: string | undefined;
  onUpdate: (value: string) => void;
  children: React.ReactNode;
};

export default function VariantModificationInputModal({
  defaultValue,
  onUpdate,
  children,
}: AppProps) {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleUpdate = () => {
    if (!value) return;
    onUpdate(value);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <DialogHeader className="mt-7">
            <DialogTitle className="text-right">تغییر نام</DialogTitle>
          </DialogHeader>
          <div className="flex gap-x-2.5">
            <Input value={value} onChange={(ev) => setValue(ev.target.value)} />
            <Button onClick={handleUpdate} type="button">
              ثبت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-4 pb-7">
        <DrawerHeader>
          <DrawerTitle>تغییر نام</DrawerTitle>
        </DrawerHeader>
        <div className="flex gap-x-2.5">
          <Input value={value} onChange={(ev) => setValue(ev.target.value)} />
          <Button onClick={handleUpdate} type="button">
            ثبت
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
