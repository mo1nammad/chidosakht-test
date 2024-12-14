import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  textClassname?: string;
  classname?: string;
};
export const Title = ({ children, classname, textClassname }: Props) => {
  return (
    <div className={cn("flex flex-row-reverse", classname)}>
      <div className="w-fit relative">
        <h1
          className={cn(
            "text-3xl font-yekan-semibold after:absolute after:inset-x-0 after:-bottom-1 after:w-full after:h-[0.5px] after:bg-primary after:drop-shadow-[0_3px_4px_rgba(20,34,189,1)]",
            textClassname
          )}
        >
          {children}
        </h1>
      </div>
    </div>
  );
};
