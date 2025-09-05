import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AppProps = {
  size?: "default" | "lg";
  className?: string;
};
export const Loader = ({ size = "default", className }: AppProps) => (
  <div className={cn("flex items-center justify-center", className)}>
    <Loader2
      className={cn("animate-spin", {
        "size-8": size === "lg",
        "size-5": size === "default",
      })}
    />
  </div>
);
