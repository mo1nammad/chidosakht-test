"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { adminNavData, navigationData } from "../constants";

type Props = {
  className?: string;
};

const SidebarNavigation = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full px-2 py-6 text-right", className)}>
      {/* header */}
      <div className="flex justify-end items-center h-16 px-2 bg-white">
        <Link href="/" className="flex items-center justify-center gap-x-2">
          <h1 className="text-xl font-black">چیدوساخت</h1>
          <img src="/logo.svg" alt="logo" className="w-12" />
        </Link>
      </div>

      {/* content */}
      <ul className="px-2 py-4 space-y-1">
        {/* Navigation Links */}
        {navigationData.map((route) => (
          <Link
            href={route.url}
            key={route.title}
            className={cn(
              "flex justify-end items-center gap-x-3 px-2 py-2 text-base font-medium rounded-md hover:bg-muted",
              route.url === pathname
                ? "text-primary bg-accent/60"
                : "text-slate-950"
            )}
          >
            <li>{route.title}</li>
            <route.icon
              className={cn(
                "size-5 ",
                route.url === pathname
                  ? "text-primary"
                  : "text-muted-foreground/80"
              )}
            />
          </Link>
        ))}
      </ul>
      {/* {showModeratorNav && ( */}
      <div className="py-2">
        <h5 className="text-sm px-4 text-muted-foreground">دسترسی های ادمین</h5>
        <ul className="px-2 mt-2.5 space-y-1">
          {adminNavData.map((route) => {
            const activeRoute =
              pathname === "/dashboard"
                ? route.url === pathname
                : pathname.includes(route.url);
            return (
              <Link
                href={route.url}
                key={route.title}
                className={cn(
                  "flex justify-end items-center gap-x-3 px-2 py-2 text-base font-medium rounded-md hover:bg-muted group",
                  activeRoute ? "text-primary bg-accent/60" : "text-slate-950"
                )}
              >
                <li className="group-hover:text-indigo-600">{route.title}</li>
                <route.icon
                  className={cn(
                    "size-5 group-hover:text-indigo-600",
                    activeRoute ? "text-primary" : "text-muted-foreground/80"
                  )}
                />
              </Link>
            );
          })}
        </ul>
      </div>
      {/* )} */}

      {/* back to landing page */}
      <div className="mt-auto">
        <ul className="px-2 mt-2.5 space-y-1">
          <Link
            href="/"
            className="flex justify-end items-center gap-x-3 px-2 py-2 text-base font-medium rounded-md hover:bg-muted"
          >
            <li>برگشت به صفحه اصلی</li>
            <ArrowRight className="size-5 text-muted-foreground" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SidebarNavigation;
