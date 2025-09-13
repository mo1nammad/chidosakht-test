"use client";

import React, { useState } from "react";

import { useSearchProducts } from "../api/use-search-products";
import { useFilterQuery } from "../hooks/use-filter-query";

import SmartPagination from "@/components/smart-pagination";
import ProductCard from "$/shop/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductGrid() {
  const { data, status } = useSearchProducts();
  const [pagination, setPagination] = useState(data?.page ?? 1);

  useFilterQuery({ Page: pagination });

  if (status === "error")
    return (
      <div className="w-full h-1/2 flex flex-col gap-1.5 items-center justify-center">
        <Ghost className="size-8 text-muted-foreground" />
        <h6 className="text-lg text-muted-foreground">مشکلی پیش آمد</h6>
        <Link href="/shop/search">
          <Button size="sm">بازگشت</Button>
        </Link>
      </div>
    );

  if (status === "pending")
    return (
      <div className="w-full grid gap-7 md:grid-cols-2 lg:grid-cols-3 grid-flow-row">
        <Skeleton className="w-full h-29 md:h-83" />
        <Skeleton className="w-full h-29 md:h-83" />
        <Skeleton className="w-full h-29 md:h-83" />
        <Skeleton className="w-full h-29 md:h-83" />
        <Skeleton className="w-full h-29 md:h-83" />
        <Skeleton className="w-full h-29 md:h-83 hidden md:block" />
      </div>
    );

  if (status === "success")
    return (
      <>
        {!data.products.length && (
          <div className="w-full h-1/2">
            <div className="w-full h-1/2 flex flex-col gap-1.5 items-center justify-center">
              <Ghost className="size-8 text-muted-foreground" />
              <h6 className="text-lg text-muted-foreground">
                هیچ محصولی وجود ندارد
              </h6>
              <Link href="/shop/search">
                <Button size="sm">بازگشت</Button>
              </Link>
            </div>
          </div>
        )}
        <div className="w-full grid gap-3 md:gap-7 md:grid-cols-2 lg:grid-cols-3 grid-flow-row">
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
