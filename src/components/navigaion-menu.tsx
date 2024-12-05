"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/app/features/home/constants";
const NavigationMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-row-reverse items-center justify-between gap-x-[41px]">
      {navigation.map((item, index) => {
        return (
          <li
            className={cn(
              pathname === item.route
                ? "text-primary"
                : "text-accent-foreground"
            )}
            key={index}
          >
            <Link href={item.route}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationMenu;
