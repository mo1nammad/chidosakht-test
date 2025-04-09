import React from "react";
import { Check, Edit } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CustomInputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "default" | "sm";
};

export const ProductCustomInput = ({
  className,
  size = "default",
  ...props
}: CustomInputProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative hover:bg-gray-100 w-full">
      <div
        onDoubleClick={() => setShow(true)}
        className={cn(
          "rounded-sm px-1.5 py-3 text-2xl grow",
          show && "hidden",
          size === "sm" && "py-2.5 text-xs"
        )}
      >
        {props.value ? (
          <span className={cn("pr-13", size === "sm" && "pr-8")}>
            {props.value}
          </span>
        ) : (
          <span className="pr-13 text-sm">هیچ متنی وجود ندارد </span>
        )}
      </div>
      <Input
        className={cn(
          "text-right hidden px-1.5 w-full",
          show && "block",
          {
            "h-8 text-xs pr-9": size === "sm",
            "h-14 text-base pr-13": size === "default",
          },
          className
        )}
        {...props}
      />
      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={() => setShow((state) => !state)}
        className={cn(
          "absolute right-0 top-2 cursor-pointer mr-2.5",
          size === "sm" && "size-6 top-1 mr-1.5"
        )}
      >
        {show ? (
          <Check
            className={cn(
              "size-6 text-muted-foreground hover:text-primary transition",
              size === "sm" && "!size-3.5"
            )}
          />
        ) : (
          <Edit
            className={cn(
              "size-6 text-muted-foreground hover:text-primary transition",
              size === "sm" && "!size-3.5"
            )}
          />
        )}
      </Button>
    </div>
  );
};

export const ProductCustomTextarea = (
  props: React.ComponentProps<"textarea">
) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative hover:bg-gray-100">
      <div
        onDoubleClick={() => setShow(true)}
        className={cn("rounded-sm px-1.5 py-3 w-full", show && "hidden")}
      >
        {props.value ? (
          <div className="pr-13 text-base max-w-[1024px] break-words whitespace-pre-wrap">
            {props.value}
          </div>
        ) : (
          <span className="pr-13 text-sm">هیچ متنی وجود ندارد </span>
        )}
      </div>

      <Textarea
        className={cn(
          "text-right hidden px-1.5 pr-13 min-h-36 text-base",
          show && "block"
        )}
        {...props}
      />

      <Button
        type="button"
        size="icon"
        variant="secondary"
        onClick={() => setShow((state) => !state)}
        className="absolute right-0 top-2 cursor-pointer mr-2.5"
      >
        {show ? (
          <Check className="size-6 text-muted-foreground hover:text-primary transition" />
        ) : (
          <Edit className="size-6 text-muted-foreground hover:text-primary transition" />
        )}
      </Button>
    </div>
  );
};
