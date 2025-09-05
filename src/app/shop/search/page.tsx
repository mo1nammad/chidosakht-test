import React, { Suspense } from "react";

import FilterAside from "$/shop/search/components/filter-aside";
import FilterToolbar from "$/shop/search/components/filter-toolbar";
import MobileFilterShortcuts from "$/shop/search/components/mobile-filter-shortcuts";
import ProductGrid from "$/shop/search/components/product-grid";
import CategoryBreadcrumb from "$/shop/search/components/category-breadcrumb";

export default function SearchPage() {
  return (
    <div className="max-w-7xl px-6 mx-auto relative">
      <div className="w-full h-5 my-4 mt-6">
        <Suspense>
          <CategoryBreadcrumb />
        </Suspense>
      </div>
      <section className="relative flex gap-x-8 min-h-180 mb-12">
        <div className="flex flex-col gap-6 w-full">
          <Suspense>
            <FilterToolbar />
            <MobileFilterShortcuts />
            <ProductGrid />
          </Suspense>
        </div>
        <Suspense>
          <FilterAside className="hidden md:flex md:basis-62 [@media(min-width:1025px)]:basis-71 shrink-0 sticky top-28 h-fit" />
        </Suspense>
      </section>
    </div>
  );
}
