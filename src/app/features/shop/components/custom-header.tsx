import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";
import Image from "next/image";
import React from "react";

type AppProps = {
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconProps?: LucideProps;
};

export default function CustomHeader({
  children,
  className,
  icon: Icon,
  iconProps,
}: AppProps) {
  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit mx-auto">
      {Icon ? <Icon {...iconProps} /> : null}

      <div
        className={cn(
          "relative flex items-center justify-center font-medium text-2xl",
          className
        )}
      >
        <Image
          src="/shop/headerVectorBackground.png"
          alt="header background"
          width={256}
          height={46}
          className="absolute w-full"
        />
        <h1 className="relative z-10">{children}</h1>
      </div>
    </div>
  );
}
