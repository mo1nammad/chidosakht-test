"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownWideNarrow, Check, Filter } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import { filters as sorts } from "../constants";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import FilterAside from "./filter-aside";
import queryString from "query-string";
import { cn } from "@/lib/utils";

export default function MobileFilterShortcuts() {
  const selectedFilterId = Number(
    useSearchParams().get("TypeOrderByForProduct") ?? 1
  );
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isTablet = useMediaQuery({
    query: "(max-width:768px)",
  });

  const handleSortingClick = (
    filterQuery: (typeof sorts)[0]["queryObject"]
  ) => {
    const parsed = Object(queryString.parse(location.search));

    const object = { ...parsed, ...filterQuery };

    const updatedUrl = queryString.stringifyUrl({
      url: pathname,
      query: object,
    });

    router.push(updatedUrl);
    setIsDrawerOpen(false);
  };

  // close drawer aoutomaticly on resize
  useEffect(() => {
    if (!isTablet && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  }, [isTablet, isDrawerOpen]);

  return (
    <div className="flex w-full flex-row-reverse gap-x-2 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="accent" className="bg-muted">
            فیلتر ها
            <Filter className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="max-w-89 min-w-78">
          <SheetHeader className="mb-6">
            <SheetTitle>فیلتر محصولات</SheetTitle>
          </SheetHeader>
          <FilterAside />
        </SheetContent>
      </Sheet>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="accent" className="bg-muted">
            <span>
              {sorts.find((sort) => sort.id === selectedFilterId)?.title}
            </span>
            <ArrowDownWideNarrow className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-3">
          <DrawerHeader dir="rtl" className="flex-row">
            <ArrowDownWideNarrow size={20} />
            <DrawerTitle>مرتب سازی :</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-2">
            {sorts.map((sort) => (
              <Button
                onClick={() => handleSortingClick(sort.queryObject)}
                variant="ghost"
                key={sort.id}
                className={cn(
                  "flex-row-reverse justify-between",
                  sort.id === selectedFilterId && "font-semibold"
                )}
              >
                {sort.title}
                {sort.id === selectedFilterId && <Check />}
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
