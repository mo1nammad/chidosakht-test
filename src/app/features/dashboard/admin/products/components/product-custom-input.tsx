import React, { useState } from "react";
import { Check, Edit } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";

type CustomInputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "default" | "sm";
};

export const ProductBodyCustomInput = ({
  className,
  size = "default",
  disabled,
  ...props
}: CustomInputProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative hover:bg-gray-100 w-full">
      <div
        onDoubleClick={() => setShow(true)}
        className={cn(
          "rounded-sm px-1.5 py-3 text-lg grow",
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
        type={!show ? "submit" : "button"}
        size="icon"
        variant="secondary"
        disabled={disabled}
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

type ProductTextEditorType = {
  onChange: (val: string) => void;
  value?: string;
  onBlur?: () => void;
};
export const ProductBodyCustomTextEditor = ({
  onChange,
  ...props
}: ProductTextEditorType) => {
  const [isEdited, setIsEdited] = useState(false);

  return (
    <div className="relative">
      <TextEditor
        toolbar={{
          className: "bg-muted/60 backdrop-blur-2xl -mb-2",
          opt: {
            lists: false,
            headings: true,
            textAlignment: true,
            textFormatting: true,
            undoRedo: true,
          },
        }}
        onChange={(val) => {
          onChange(val);
          setIsEdited(true);
        }}
        {...props}
      />
      <Button
        type="submit"
        onClick={() => {
          // immidiate changing state results in submition cancelling

          setTimeout(() => {
            setIsEdited(false);
          }, 0.5);
        }}
        size={"icon"}
        disabled={!isEdited}
        variant={"secondary"}
        className="w-full mt-2"
      >
        <Check />
      </Button>
    </div>
  );
};
