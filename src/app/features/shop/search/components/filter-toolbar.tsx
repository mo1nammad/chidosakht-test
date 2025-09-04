"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { ArrowDownWideNarrow } from "lucide-react";

import { cn } from "@/lib/utils";
import { filters } from "../constants";

export default function FilterToolbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilterId = Number(
    searchParams.get("TypeOrderByForProduct") ?? 1
  );

  const ascendingBoolean = searchParams.get("Ascending");

  React.useEffect(() => {
    if (!searchParams.get("TypeOrderByForProduct")) {
      const parsed = Object(queryString.parse(location.search));

      const object = { ...parsed, ...filters[0].queryObject };

      const updatedUrl = queryString.stringifyUrl({
        url: pathname,
        query: object,
      });
      router.push(updatedUrl);
    }
  }, [router, pathname, searchParams]);

  const handleFilterClick = (
    filterQuery: (typeof filters)[0]["queryObject"]
  ) => {
    const parsed = Object(queryString.parse(location.search));

    const object = { ...parsed, ...filterQuery };

    const updatedUrl = queryString.stringifyUrl({
      url: pathname,
      query: object,
    });

    router.push(updatedUrl);
  };

  return (
    <>
      <div className="hidden md:flex w-full bg-muted gap-x-3 lg:gap-x-8 justify-around px-3 rounded-xl h-14">
        <div className="text-muted-foreground text-xs md:text-[0.658rem] py-4 lg:text-sm text-nowrap grid place-content-center">
          16 کالا
        </div>

        <div className="flex flex-row-reverse w-max gap-x-4 lg:gap-x-8 h-full">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterClick(filter.queryObject)}
              className={cn(
                "h-14 text-xs lg:text-sm font-medium flex items-center justify-center relative cursor-pointer",
                selectedFilterId === filter.id &&
                  ascendingBoolean === filter.queryObject.Ascending &&
                  "text-primary font-semibold after:absolute after:bottom-0 after:w-[calc(100%-15px)] after:h-1 after:rounded-t-xl after:bg-primary "
              )}
            >
              {filter.title}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-x-3 py-4">
          <h6 dir="rtl" className="text-nowrap hidden lg:block">
            مرتب سازی :
          </h6>
          <ArrowDownWideNarrow size={20} />
        </div>
      </div>
    </>
  );
}
