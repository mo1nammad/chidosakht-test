"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  adminNavData,
  generateNavigateUrlList,
  navigationData,
} from "../constants";
import ProfileDropdown from "@/components/profile-dropdown";
import MobileSidebar from "./mobile-sidebar";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

const DashboardNavbar = ({ className }: Props) => {
  const pathname = usePathname();

  const [navigateUrlList, setNavigateUrlList] = useState<
    ReturnType<typeof generateNavigateUrlList>
  >([]);
  useEffect(() => {
    setNavigateUrlList(
      generateNavigateUrlList({
        path: pathname,
        serachList: [...navigationData, ...adminNavData],
        result: [],
      }).reverse()
    );
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 bg-background border-b px-6 z-50",
        className
      )}
    >
      <div className="flex flex-row-reverse items-center max-w-5xl mx-auto w-full h-full justify-between">
        <div className="flex items-center justify-center">
          <div className="hidden items-center justify-center gap-x-2.5 sm:flex">
            {navigateUrlList.map((navigateItem, index) => (
              <div
                key={navigateItem.url}
                className="flex items-center text-muted-foreground gap-x-2.5"
              >
                {index !== 0 && <ChevronLeft className="size-4 relative" />}
                <Link
                  href={navigateItem.url}
                  className={cn(
                    "text-xs hover:underline",
                    pathname === navigateItem.url && "text-black"
                  )}
                >
                  {navigateItem.title}
                </Link>
              </div>
            ))}
          </div>
          <MobileSidebar className="flex lg:hidden" />
        </div>
        {/* right side */}
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default DashboardNavbar;
