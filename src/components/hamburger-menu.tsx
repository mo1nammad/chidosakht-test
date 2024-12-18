"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { navigation } from "@/app/features/navigation/home/constants";

type Props = {
  classname?: string;
};
const HamburgerMenu = ({ classname }: Props) => {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center justify-center", classname)}>
      <Sheet>
        <SheetTrigger>
          <Menu className="size-8" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <div
              id="logo"
              className="flex flex-row-reverse justify-end items-center gap-x-3 my-3"
            >
              <SheetTitle className="text-lg font-yekan-semibold">
                Chidosakht
              </SheetTitle>
              <Image src="/logo.svg" width={51} height={6} alt="logo" />
            </div>
          </SheetHeader>

          <ul className="mt-6 space-y-3 flex flex-col">
            {navigation.map((item, index) => {
              return (
                <Link
                  className={cn(
                    "text-lg hover:bg-muted py-2 pl-2 rounded-lg",
                    pathname === item.route
                      ? "text-primary"
                      : "text-accent-foreground"
                  )}
                  key={index}
                  href={item.route}
                >
                  <li>{item.title}</li>
                </Link>
              );
            })}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
