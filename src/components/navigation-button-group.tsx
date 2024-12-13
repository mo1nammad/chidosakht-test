"use client";

import Link from "next/link";
import { Headset, LogIn, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import HamburgerMenu from "./hamburger-menu";

const NavigationButtonGroup = () => {
  return (
    <>
      <HamburgerMenu classname="flex xl:hidden" />
      {/* call */}
      <div className="lg:flex hidden gap-x-6 items-center">
        <div className="bg-[#024CAA] px-0.5 py-2 rounded-md">
          <Smartphone className="size-6 text-white" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-y-[1px]">
          <span className="text-sm">021-77800287</span>
          <span className="text-sm text-muted-foreground">تماس‌با‌کارشناس</span>
        </div>
      </div>

      <div className="md:space-x-8 space-x-5">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({
              variant: "outline",

              className: "sm:inline-flex hidden",
            })
          )}
        >
          <LogIn className="!size-5" />
          <span>ورود | ثبت‌نام</span>
        </Link>

        <Button variant={"primary"}>
          <Headset className="!size-5" />
          <span className="font-vazir-semibold">مشاوره‌رایگان</span>
        </Button>
      </div>
    </>
  );
};

export default NavigationButtonGroup;
