import React from "react";

import FilterAside from "$/shop/search/components/filter-aside";
import FilterToolbar from "$/shop/search/components/filter-toolbar";
import MobileFilterShortcuts from "$/shop/search/components/mobile-filter-shortcuts";
import ProductGrid from "@/app/features/shop/search/components/product-grid";

export default function SearchPage() {
  return (
    <div className="max-w-7xl px-6 mx-auto relative">
      <div className="w-full h-5 my-4 mt-6"></div>
      <section className="relative flex gap-x-8 min-h-[1024px] mb-12">
        <div className="flex flex-col gap-6 w-full">
          <FilterToolbar />
          <MobileFilterShortcuts />
          <ProductGrid />
        </div>
        <FilterAside className="hidden md:flex md:basis-62 [@media(min-width:1025px)]:basis-71 shrink-0 sticky top-28 h-fit" />
      </section>
    </div>
  );
}
