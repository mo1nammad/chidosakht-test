import Link from "next/link";
import Image from "next/image";
import { Headset, Smartphone } from "lucide-react";

import { Button } from "./ui/button";
import NavigationMenu from "./navigaion-menu";
import HamburgerMenu from "./hamburger-menu";

import ProfileButton from "./profile-button";

const Navbar = async () => {
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
              <ProfileButton />

              <Button variant={"primary"} className="hidden sm:inline-flex">
                <Headset className="size-5!" />
                <span className="font-vazir-semibold">مشاوره‌رایگان</span>
              </Button>
            </div>
          </>
        </div>

        <div className="flex items-center gap-x-16">
          <NavigationMenu className="hidden xl:flex xl:items-center" />
          <Link
            href="/"
            id="logo"
            className="md:flex items-center gap-x-3 hidden"
          >
            <span className="text-2xl font-yekan-semibold">Chidosakht</span>
            <Image src="/logo.svg" width={71} height={56} alt="logo" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
