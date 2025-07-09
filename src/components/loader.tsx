import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AppProps = {
  size?: "default" | "lg";
};
export const Loader = ({ size = "default" }: AppProps) => (
  <div className="flex items-center justify-center">
    <Loader2
      className={cn("animate-spin", {
        "size-8": size === "lg",
        "size-5": size === "default",
      })}
    />
  </div>
);
