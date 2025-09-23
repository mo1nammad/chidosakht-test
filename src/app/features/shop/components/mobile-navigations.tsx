"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Search,
  X,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { findCategoryByName } from "@/lib/category";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounced";

import { useTreeCategories } from "../search/api/use-tree-categories";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchProducts } from "../search/api/use-search-products";
import Image from "next/image";

type AppProps = {
  className?: string;
};

export default function MobileNavigations({ className }: AppProps) {
  const [openSheet, setOpenSheet] = useState(false);
  const [debouncedValue, setValue, value] = useDebounce("");
  console.log(debouncedValue);

  const { data: categoryData } = useTreeCategories();
  const categories = findCategoryByName(categoryData ?? [], debouncedValue);

  const { data: productsData } = useSearchProducts({
    queryObj: {
      ProductName: debouncedValue,
      CountInPage: "25",
    },
  });

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn("size-10", className)}
        >
          <Search className="size-6!" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-full [&>#close-btn]:hidden">
        <SheetHeader>
          <SheetTitle className="sr-only">جست و جوی محصول</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-x-4">
          <SheetClose>
            <X size={20} />
          </SheetClose>
          <div className="relative w-full">
            <Input
              dir="rtl"
              value={value}
              placeholder="جستجو..."
              onChange={(ev) => setValue(ev.target.value)}
              className="border-none bg-accent pr-10 text-sm"
            />
            <button
              onClick={() => setValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <XCircle className="size-4" />
            </button>
          </div>
        </div>

        {value ? (
          <div className="flex justify-between items-center mt-3">
            <Link
              onNavigate={() => setOpenSheet(false)}
              className="text-xs text-indigo-700 font-yekan-semibold flex gap-x-2 items-center"
              href={`/shop/search?ProductName=${value}`}
            >
              <ChevronLeft size={12} />
              مشاهده همه نتایج
            </Link>
            <div className="text-xs flex gap-x-2 items-center text-muted-foreground">
              <Link
                onNavigate={() => setOpenSheet(false)}
                href={`/shop/search?ProductName=${value}`}
                className="text-primary text-sm"
              >
                {value}
              </Link>
              <p dir="rtl">جست و جو برای ...</p>
              <LayoutGrid />
            </div>
          </div>
        ) : null}
        {/* category search */}

        {categories.length > 0 && (
          <div className="mt-4">
            <h6 dir="rtl" className="text-sm">
              در دسته بندی های {value}
            </h6>
            <ScrollArea className="w-full py-2">
              <div className="flex items-center gap-x-2 mt-2 h-fit w-max">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    onNavigate={() => setOpenSheet(false)}
                    href={`/shop/search?CategoryId=${category.id}`}
                    className="bg-secondary px-3 py-2 rounded-full flex items-center justify-center gap-x-1 text-sm"
                  >
                    {category.name}
                    <ChevronRight className="size-4" />
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="opacity-0" />
            </ScrollArea>
          </div>
        )}

        {/* product search */}
        {productsData && productsData?.products.length > 0 ? (
          <div className="mt-4">
            <h6 dir="rtl" className="text-sm">
              در محصولات {debouncedValue}
            </h6>

            <div className="flex flex-col w-full gap-4 mt-2">
              {productsData.products.map((product) => (
                <Link
                  key={product.id}
                  onNavigate={() => setOpenSheet(false)}
                  href={`/shop/${product.id}`}
                  className="bg-secondary/30 flex flex-row-reverse gap-x-2 text-sm px-4 py-2 rounded-xl items-center"
                >
                  <Image
                    src={product.urlNameIndexImage}
                    width={56}
                    height={56}
                    alt={product.imageAltText ?? "تصویر محصول"}
                    className="size-14 object-cover"
                  />
                  <h5>{product.name}</h5>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
