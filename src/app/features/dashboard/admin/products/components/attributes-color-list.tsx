import React from "react";
import { motion } from "framer-motion";

import { Attribute } from "../types";
import { cn } from "@/lib/utils";

type AppProps = {
  attribute: Attribute;
  selectedColorId: string | undefined;
  setSelectedColorId: (colorId: string) => void;

  className?: string;
};
export default function AttributesColorList({
  attribute,
  selectedColorId,
  setSelectedColorId,
  className,
}: AppProps) {
  return (
    <div className={cn("overflow-x-auto mr-6 w-54", className)}>
      <div className="flex flex-row-reverse gap-x-4 w-max">
        {attribute.options.map((color) => (
          <motion.button
            type="button"
            initial={{ scale: 0.8, opacity: 0.5, boxShadow: "0" }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow:
                selectedColorId === color.id ? "0 0 0 4px #2379FF" : undefined,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            key={color.id}
            onClick={() => setSelectedColorId(color.id)}
            className="size-6 rounded-full cursor-pointer "
            style={{ background: color.label }}
          />
        ))}
      </div>
    </div>
  );
}
