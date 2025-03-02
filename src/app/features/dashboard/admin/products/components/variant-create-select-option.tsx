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
import { Label } from "@/components/ui/label";

type AppProps = {
  onUpdate: (value: string) => void;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VariantCreateSelectOption({
  onUpdate,
  onOpenChange,
  open,
}: AppProps) {
  const [value, setValue] = useState<string | undefined>("");

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleUpdate = () => {
    if (!value) return;
    onUpdate(value);
    onOpenChange(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[450px] gap-y-2.5">
          <DialogHeader className="mt-6 mb-4">
            <DialogTitle className="text-right">ایجاد یک انتخاب</DialogTitle>
            <DialogDescription dir="rtl" className="text-right">
              در این قسمت می توانید یک انتخاب برای واریانت خود ایجاد نمایید.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="text-right">
              <Label>برچسب</Label>
              <Input
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                className="text-right"
              />
            </div>

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
        <DrawerHeader className="mt-6 mb-4">
          <DrawerTitle className="text-right">ایجاد یک انتخاب</DrawerTitle>
          <DrawerDescription dir="rtl" className="text-right">
            در این قسمت می توانید یک انتخاب برای واریانت خود ایجاد نمایید.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <div className="text-right">
            <Label>برچسب</Label>
            <Input
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              className="text-right"
            />
          </div>

          <Button onClick={handleUpdate} type="button" className="h-9">
            ثبت
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
