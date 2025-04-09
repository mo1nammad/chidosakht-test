import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AppProps = {
  defaultValue?: string;
  onUpdate: (value: string) => void;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
};

export default function SimpleInputDrawerDialog({
  defaultValue,
  onUpdate,
  onOpenChange,
  open,
  description,
  title,
}: AppProps) {
  const [value, setValue] = useState<string>(defaultValue ?? "");

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleUpdate = () => {
    if (!value) return;
    onUpdate(value);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <DialogHeader className="mt-6 mb-4">
            <DialogTitle className="text-right">{title}</DialogTitle>
            <DialogDescription className="text-right">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-2.5">
            <Input
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              className="text-right"
            />
            <Button onClick={handleUpdate} type="button" className="h-9">
              ثبت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 pb-7">
        <DrawerHeader className="text-right">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className="text-right"
          />
          <Button onClick={handleUpdate} type="button">
            ثبت
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
