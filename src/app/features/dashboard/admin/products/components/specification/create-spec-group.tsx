import React from "react";

import { cn } from "@/lib/utils";
import { useCreateSpecGroup } from "../../api/specification/use-create-group";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AppProps = {
  className?: string;
};

export default function CreateSpecGroup({ className }: AppProps) {
  const { mutate } = useCreateSpecGroup();
  const [value, setValue] = React.useState("");

  const createSpecGroup = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!value) return;

    mutate({ titile: value });
  };

  return (
    <form
      onSubmit={createSpecGroup}
      className={cn("flex justify-end gap-x-2.5 items-center", className)}
    >
      <Button disabled={!value} className="h-8.5" variant="secondary">
        ایجاد
      </Button>
      <Input
        id="CreateGroup"
        className="bg-background max-w-64"
        placeholder="ایجاد گروه"
        dir="rtl"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </form>
  );
}
