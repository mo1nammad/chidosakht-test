"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
const items = [
  {
    title: "خانه",
    href: "/shop",
    icon: Home,
  },
  {
    title: "دسته بندی",
    href: "/shop/categories",
    icon: LayoutGrid,
  },
  {
    title: "سبد خرید",
    href: "/dashboard/cart",
    icon: ShoppingCart,
  },
  {
    title: "پروفایل",
    href: "/dashboard",
    icon: User,
  },
];
export default function MobileBottomBar({ className }: Props) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "fixed bottom-0 bg-white inset-x-0 flex flex-row-reverse justify-around items-center z-50 shadow-xl",
        className
      )}
    >
      {items.map((item, i) => (
        <li key={i}>
          {
            <Link
              className={cn(
                "flex flex-col gap-1 justify-center items-center text-xs text-muted-foreground",
                pathname === item.href && "text-primary"
              )}
              href={item.href}
            >
              <item.icon />
              {item.title}
            </Link>
          }
        </li>
      ))}
    </ul>
  );
}
