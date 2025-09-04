import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AppProps = {
  className?: string;
  href?: string;
};

export default function NavbarLogo({ className, href = "/" }: AppProps) {
  return (
    <Link
      href={href}
      id="logo"
      className={cn("md:flex text-2xl items-center gap-x-3 hidden", className)}
    >
      <span className="font-yekan-semibold">Chidosakht</span>
      <Image src="/logo.svg" width={71} height={56} alt="logo" />
    </Link>
  );
}
