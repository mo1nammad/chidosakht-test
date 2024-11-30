import { Headset, LogIn, Smartphone } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import NavigationMenu from "./navigaion-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 h-[110px] shadow-md rounded-2xl bg-background">
      <nav className="max-w-screen-2xl mx-auto px-4 xl:px-0 h-full flex items-center justify-center">
        <div className="flex items-center justify-between">
          <div id="button-group" className="flex items-center gap-x-8">
            <div className="flex gap-x-6 items-center">
              <div className="bg-[#024CAA] px-1 py-3 rounded-md">
                <Smartphone className="size-8 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-y-[1px]">
                <span className="text-sm">021-77800287</span>
                <span className="text-sm text-muted-foreground">
                  تماس‌با‌کارشناس
                </span>
              </div>
            </div>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({
                  variant: "accent",
                  size: "lg",
                  className: "text-base",
                })
              )}
            >
              <LogIn className="!size-7" />
              <span>ورود | ثبت‌نام</span>
            </Link>

            <Button variant={"primary"} size={"lg"} className="text-base">
              <Headset className="!size-7" />
              <span className="font-vazir-semibold">مشاوره‌رایگان</span>
            </Button>
          </div>
          <div id="menu" className="flex items-center ml-[85px]">
            <NavigationMenu />
          </div>
          <div id="logo" className="flex items-center gap-x-3 ml-[86px]">
            <span className="text-2xl font-vazir-semibold">Chidosakht</span>
            <Image src="/logo.svg" width={71} height={56} alt="logo" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
