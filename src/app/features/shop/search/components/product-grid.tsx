"use client";

import React, { useState } from "react";
import { useSearchProducts } from "../api/use-search-products";
import ProductCard from "$/shop/components/product-card";
import SmartPagination from "@/components/smart-pagination";
import { useFilterQuery } from "../hooks/use-filter-query";

export default function ProductGrid() {
  const { data, status } = useSearchProducts();
  const [pagination, setPagination] = useState(data?.page ?? 1);

  useFilterQuery({ Page: pagination });

  if (status === "success")
    return (
      <>
        <div className="w-full grid gap-7 md:grid-cols-2 lg:grid-cols-3 grid-flow-row">
          {data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="col-span-1 w-full!"
            />
          ))}
        </div>
        {data.countAllPages > 1 && (
          <SmartPagination
            currentPage={pagination}
            setPage={setPagination}
            totalPages={data.countAllPages}
          />
        )}
      </>
    );
}
