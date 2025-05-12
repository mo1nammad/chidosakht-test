import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { useCreateRole } from "../api/use-create-role";

import { Loader2, Plus } from "lucide-react";
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
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;

  description: string;
};

type RoleInputs = {
  name: string;
  description: string;
};

export default function CreateRoleInputDrawerDialog({
  description,
  title,
}: AppProps) {
  const [value, setValue] = useState<RoleInputs>({ name: "", description: "" });
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  const { mutate: createRole, isPending } = useCreateRole();

  useEffect(() => setMounted(true), []);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!value.name || !value.description) return;

    createRole(value, {
      onSuccess: () => {
        setShow(false);
        setValue({ description: "", name: "" });
      },
    });
  };

  if (!mounted) return null; // or a fallback
  if (isDesktop) {
    return (
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] gap-y-2.5">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mt-6 mb-4 space-y-1.5">
              <DialogTitle className="text-right">{title}</DialogTitle>
              <DialogDescription className="text-right">
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-y-2.5">
              <Input
                value={value.name}
                placeholder="نام"
                onChange={(ev) =>
                  setValue((prev) => ({ ...prev, name: ev.target.value }))
                }
                className="text-right"
              />
              <Input
                value={value.description}
                placeholder="توضیحات"
                onChange={(ev) =>
                  setValue((prev) => ({
                    ...prev,
                    description: ev.target.value,
                  }))
                }
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
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="px-4 pb-7">
        <form onSubmit={handleSubmit}>
          <DrawerHeader className="text-right">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={value.name}
              placeholder="نام"
              onChange={(ev) =>
                setValue((prev) => ({ ...prev, name: ev.target.value }))
              }
              className="text-right"
            />
            <Input
              value={value.description}
              placeholder="توضیحات"
              onChange={(ev) =>
                setValue((prev) => ({ ...prev, description: ev.target.value }))
              }
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
