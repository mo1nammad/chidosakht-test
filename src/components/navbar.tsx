import Link from "next/link";
import Image from "next/image";
import { Headset, LogIn, Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import NavigationMenu from "./navigaion-menu";
import HamburgerMenu from "./hamburger-menu";

import { getSession } from "@/app/features/auth/server/actions";
import ProfileButton from "./profile-button";

export const dynamic = "force-dynamic"; // Ensure fresh data

const Navbar = async () => {
  const session = await getSession();

  return (
    <div className="fixed inset-x-0 top-0 h-20 md:h-[110px] shadow-md rounded-2xl bg-background z-50">
      <nav className="max-w-(--breakpoint-xl) mx-auto px-8 xl:px-4 h-full flex items-center justify-between">
        <div
          id="button-group"
          className="flex items-center gap-x-8 w-full md:w-auto justify-between md:justify-normal"
        >
          <>
            <HamburgerMenu classname="flex xl:hidden" />
            {/* call */}
            <div className="lg:flex hidden gap-x-6 items-center">
              <div className="bg-[#024CAA] px-0.5 py-2 rounded-md">
                <Smartphone className="size-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-y-[1px]">
                <span className="text-sm">021-77800287</span>
                <span className="text-sm text-muted-foreground">
                  تماس‌با‌کارشناس
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-5 md:gap-x-6">
              {session ? (
                <ProfileButton session={session} />
              ) : (
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  <LogIn className="size-5!" />
                  <span>ورود | ثبت‌نام</span>
                </Link>
              )}

              <Button variant={"primary"} className="hidden sm:inline-flex">
                <Headset className="size-5!" />
                <span className="font-vazir-semibold">مشاوره‌رایگان</span>
              </Button>
            </div>
          </>
        </div>
        <div id="menu" className="hidden items-center xl:flex">
          <NavigationMenu />
        </div>
        <Link
          href="/"
          id="logo"
          className="md:flex items-center gap-x-3 hidden"
        >
          <span className="text-2xl font-yekan-semibold">Chidosakht</span>
          <Image src="/logo.svg" width={71} height={56} alt="logo" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
