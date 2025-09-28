"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Search,
  XCircle,
} from "lucide-react";
import { Portal } from "@radix-ui/react-portal";

import { useDebounce } from "@/hooks/use-debounced";
import { findCategoryByName } from "@/lib/category";
import { useTreeCategories } from "../search/api/use-tree-categories";
import { useSearchProducts } from "../search/api/use-search-products";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

export default function SearchButton() {
  const [open, setOpen] = useState(false);

  const [debouncedValue, setValue, value] = useDebounce("");

  const { data: categoryData } = useTreeCategories();
  const categories = findCategoryByName(categoryData ?? [], debouncedValue);

  const { data: productsData } = useSearchProducts({
    queryObj: {
      ProductName: debouncedValue,
      CountInPage: "3",
    },
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Search className="size-6!" />
        </Button>
      </PopoverTrigger>
      {open && (
        <>
          <div className="absolute bg-black opacity-30 inset-0" />
          <Portal>
            <div className="absolute bg-black opacity-30 inset-0" />
          </Portal>
        </>
      )}
      <PopoverContent className="border-none w-128">
        <div className="relative w-full">
          <Input
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className="border-none bg-accent pr-9"
            dir="rtl"
            placeholder="جستجو برای ..."
          />
          <button
            onClick={() => setValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <XCircle className="size-4" />
          </button>
        </div>
        {value ? (
          <div className="flex justify-between items-center mt-3">
            <Link
              onNavigate={() => setOpen(false)}
              className="text-xs text-indigo-700 font-yekan-semibold flex gap-x-2 items-center"
              href={`/shop/search?ProductName=${value}`}
            >
              <ChevronLeft size={12} />
              مشاهده همه نتایج
            </Link>
            <div className="text-xs flex gap-x-2 items-center text-muted-foreground">
              <Link
                onNavigate={() => setOpen(false)}
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
            <ScrollArea className="w-full pb-4">
              <div className="flex items-center gap-x-2 mt-2 h-fit w-max">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    onNavigate={() => setOpen(false)}
                    href={`/shop/search?CategoryId=${category.id}`}
                    className="bg-secondary px-3 py-2 rounded-full flex items-center justify-center gap-x-1 text-sm"
                  >
                    {category.name}
                    <ChevronRight className="size-4" />
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="" />
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
                  onNavigate={() => setOpen(false)}
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
      </PopoverContent>
    </Popover>
  );
}
