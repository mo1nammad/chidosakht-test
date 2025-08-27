import React from "react";
import Link from "next/link";
import { ChevronDown, Search, ShoppingBasket } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/components/profile-dropdown";
import NavbarLogo from "@/components/navbar-logo";
import MobileNavigations from "./mobile-navigations";
import { cn } from "@/lib/utils";

const navigations = [
  {
    title: "تماس با‌ما",
    href: "/shop?modal=contact-us",
  },
  {
    title: "درباره‌ ما",
    href: "/about-us",
  },
  {
    title: "مطالب",
    href: "/blogs",
  },
  {
    title: "دسته بندی",
    href: "./?modal=categories",
    icon: ChevronDown,
  },
  {
    title: "صفحه اصلی",
    href: "/",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-(--navbar-height) bg-white drop-shadow-[0px_4px_58px_#00000007]">
      <div className="max-w-7xl mx-auto px-6 h-full">
        {" "}
        <div className="flex justify-between gap-x-8 items-center h-full">
          {/* user actions */}
          <div className="flex items-center gap-x-2.5">
            <Button variant="ghost" size="icon">
              <ShoppingBasket className="size-6!" />
            </Button>

            <div className="h-6 w-px mr-1.5 bg-gray-200 hidden md:block" />

            <ProfileDropdown className="hidden md:flex" />

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="size-6!" />
            </Button>
          </div>
          {/* navgations*/}
          <div className="items-center text-right hidden md:flex flex-wrap-reverse justify-between gap-x-2 max-w-70 w-full min-[900px]:max-w-116">
            {navigations.map((nav) => (
              <Link
                key={nav.href}
                scroll={false}
                href={nav.href}
                className={cn(
                  "flex items-center gap-x-0.5 flex-row-reverse font-medium hover:text-primary max-[900px]:text-xs",
                  nav.href === "/" && "max-[900px]:hidden"
                )}
              >
                {nav.title}
                {nav.icon ? <nav.icon className="size-4" /> : null}
              </Link>
            ))}
          </div>
          {/* Logo */}
          <NavbarLogo className="flex [&>img]:size-10 lg:[&>img]:size-auto" />
          <MobileNavigations className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
