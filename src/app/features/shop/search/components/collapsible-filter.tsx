"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AppProps = {
  title: string;
  children: React.ReactNode;
};
export default function CollapsableFilter({ children, title }: AppProps) {
  const [isCollapsed, setIsCollpased] = React.useState(true);
  return (
    <motion.div
      initial={{
        height: "56px",
      }}
      animate={{
        height: isCollapsed ? "fit-content" : "56px",
      }}
      className="bg-muted overflow-hidden rounded-xl"
    >
      <button
        onClick={() => setIsCollpased((prev) => !prev)}
        className="flex w-full items-center justify-between pl-4 pr-4.5 py-4 cursor-pointer"
      >
        <ChevronDown
          className={cn(
            "size-5 transition duration-500",
            isCollapsed && "rotate-180"
          )}
        />
        <h6 className="text-sm font-medium">{title}</h6>
      </button>
      <div className="pl-4 pr-4.5 py-4">{children}</div>
    </motion.div>
  );
}
