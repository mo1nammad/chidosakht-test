"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Search } from "lucide-react";

import { useCategories } from "../api/use-categories";

import { Input } from "@/components/ui/input";
import CollapsableFilter from "./collapsible-filter";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";

export default function CategoryFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = useSearchParams().get("CategoryId");

  const { categories, status } = useCategories();
  const [searchCategory, setSearchCagtegory] = useState("");
  const filterdCatgories = searchCategory
    ? categories.filter((category) => category.name.includes(searchCategory))
    : categories;

  const handleSelectCategory = (categoryId: string | number) => {
    const parsed = Object(queryString.parse(location.search));

    const object = { ...parsed, CategoryId: categoryId };

    const updatedUrl = queryString.stringifyUrl({
      url: pathname,
      query: object,
    });

    router.push(updatedUrl);
  };
  const handleRemoveCategoryId = () => {
    const parsed = Object(queryString.parse(location.search));

    const object = { ...parsed, CategoryId: null };

    const updatedUrl = queryString.stringifyUrl({
      url: pathname,
      query: object,
    });

    router.push(updatedUrl);
  };

  return (
    <CollapsableFilter title="دسته بندی">
      <div className="w-full relative mb-3">
        <Input
          className="bg-white pl-7"
          dir="rtl"
          placeholder="جست و جو دسته بندی"
          value={searchCategory}
          onChange={(ev) => setSearchCagtegory(ev.target.value)}
        />
        <Search className="absolute left-1 top-1/2 -translate-y-1/2" />
      </div>{" "}
      {status === "success" && filterdCatgories.length > 0 && (
        <>
          <ScrollArea
            className="w-full h-56 mt-3.5 pl-3"
            showOriginalScrollBar={false}
          >
            <div className="flex flex-col w-full">
              {/* back to all categories */}
              {!!categoryId && (
                <button
                  onClick={handleRemoveCategoryId}
                  className="flex justify-end p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
                >
                  همه دسته بندی ها
                </button>
              )}

              {filterdCatgories.map((category) => (
                <button
                  onClick={() => handleSelectCategory(category.id)}
                  key={category.id}
                  className="flex justify-end p-2 hover:bg-gray-200 cursor-pointer rounded-lg"
                >
                  {category.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation="vertical" className="left-0" />
          </ScrollArea>
        </>
      )}
      {status === "pending" && <Loader />}
      {status !== "pending" && !filterdCatgories.length && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-center text-muted-foreground">
            هیچ دسته بندی ای مربوط به دسته بندی کنونی وجود ندارد
          </p>
          <Button onClick={handleRemoveCategoryId} size="sm">
            همه دسته بندی ها
          </Button>
        </div>
      )}
    </CollapsableFilter>
  );
}
