import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  classname?: string;
  textClassName?: string;
};
export const Title = ({ children, classname, textClassName }: Props) => {
  return (
    <div className={cn("flex flex-row-reverse", classname)}>
      <div className="w-fit relative">
        <h1
          className={cn(
            "text-xl sm:text-[2rem] font-yekan-semibold after:absolute after:inset-x-0 after:-bottom-1 after:w-full after:h-[0.5px] after:bg-primary after:drop-shadow-[0_3px_4px_rgba(20,34,189,1)]",
            textClassName
          )}
        >
          {children}
        </h1>
      </div>
    </div>
  );
};
