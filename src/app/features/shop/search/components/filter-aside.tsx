import React from "react";

import { cn } from "@/lib/utils";

import { Filter, X } from "lucide-react";

// filters
import PriceFilter from "./price-filter";
import AvailablityFilter from "./availablity-filter";
import CategoryFilter from "./category-filter";

type AppProps = {
  className?: string;
};

export default function FilterAside({ className }: AppProps) {
  return (
    <aside className={cn("flex flex-col gap-y-4", className)}>
      <div className="bg-muted w-full flex justify-between pl-4 pr-4.5 py-4 rounded-xl">
        <a
          href="/shop/search"
          className="text-primary flex items-center justify-center gap-x-2 text-sm font-normal [&>svg]:size-4 cursor-pointer"
        >
          حذف فیلتر
          <X />
        </a>
        <div className="flex items-center justify-center gap-x-2.5 font-medium">
          <h6>فیلتر</h6>
          <Filter className="size-4" />
        </div>
      </div>

      {/* all filters */}
      <PriceFilter />
      <AvailablityFilter />
      <CategoryFilter />
    </aside>
  );
}
