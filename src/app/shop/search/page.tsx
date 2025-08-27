import React from "react";
import FilterAside from "$/shop/search/components/filter-aside";

export default function SearchPage() {
  return (
    <div className="max-w-7xl px-6 mx-auto relative">
      <div className="w-full h-5 my-4"></div>
      <section className="relative flex gap-x-8 min-h-[600px]">
        <div className="bg-muted w-full h-14 rounded-xl"></div>
        <FilterAside className="basis-71 shrink-0 sticky top-28 h-fit" />
      </section>
    </div>
  );
}

/*
    <div className="max-w-7xl min-h-290 px-6 mx-auto relative">
      <aside className="sticky ml-auto top-0 bottom-16 bg-red-400 w-71 h-200"></aside>
      <section className="mr-71 pr-5">
        <div className="bg-muted w-full h-14 rounded-xl"></div>
      </section>
    </div> */
