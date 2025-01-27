"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { navigation } from "@/app/features/navigation/home/constants";

const NavigationMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul className="flex flex-row-reverse items-center justify-between gap-x-[41px]">
      {navigation.map((item, index) => {
        return (
          <li
            className={cn(
              pathname === item.route && !searchParams.get("modal")
                ? "text-primary"
                : "text-accent-foreground"
            )}
            key={index}
          >
            <Link href={item.route}>{item.title}</Link>
          </li>
        );
      })}
      {/* contact us modal routuing */}
      <li
        className={cn(
          searchParams.get("modal") === "contact-us"
            ? "text-primary"
            : "text-accent-foreground"
        )}
      >
        <Link href={`${pathname}?modal=contact-us`}>تماس با ما</Link>
      </li>
    </ul>
  );
};

const Component = () => (
  <Suspense>
    <NavigationMenu />
  </Suspense>
);

export default Component;
