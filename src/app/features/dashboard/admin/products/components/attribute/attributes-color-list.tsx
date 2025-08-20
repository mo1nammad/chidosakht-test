import React from "react";
import { motion } from "framer-motion";

import { AttributeValue } from "../../types";
import { cn } from "@/lib/utils";

type AppProps = {
  attributeOptions: AttributeValue[];
  selectedColor: number | undefined;
  setSelectedColor: (id: number) => void;
  className?: string;
};
export default function AttributesColorList({
  attributeOptions,
  className,
  selectedColor,
  setSelectedColor,
}: AppProps) {
  return (
    <div className={cn("overflow-x-auto mr-6 w-54", className)}>
      <div className="flex flex-row-reverse gap-x-4 w-max">
        {attributeOptions.map((color) => (
          <motion.button
            type="button"
            initial={{ scale: 0.8, opacity: 0.5, boxShadow: "0" }}
            animate={{
              scale: 1,
              opacity: 1,
              boxShadow:
                selectedColor === color.productAttributeValueId
                  ? "0 0 0 4px #2379FF"
                  : undefined,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            key={color.productAttributeValueId}
            onClick={() => setSelectedColor(color.productAttributeValueId)}
            className="size-6 rounded-full cursor-pointer "
            style={{ background: color.value }}
          />
        ))}
      </div>
    </div>
  );
}
