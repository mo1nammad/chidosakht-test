"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { navigation } from "@/app/features/navigation/home/constants";

type Props = {
  className?: string;
};

const NavigationMenu = ({ className }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul
      className={cn(
        "flex flex-row-reverse items-center justify-between gap-x-6",
        className
      )}
    >
      {navigation.map((item, index) => {
        return (
          <li
            className={cn(
              "hover:text-blue-900 font-medium",
              pathname === item.route && !searchParams.get("modal")
                ? "text-primary"
                : "text-accent-foreground"
            )}
            key={index}
          >
            <Link scroll={false} href={item.route}>
              {item.title}
            </Link>
          </li>
        );
      })}
      {/* contact us modal routuing */}
      <li
        className={cn(
          "font-medium",
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

const Component = (props: Props) => (
  <Suspense>
    <NavigationMenu {...props} />
  </Suspense>
);

export default Component;
