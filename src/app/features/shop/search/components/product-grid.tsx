"use client";

import React from "react";
import { useSearchProducts } from "../api/use-search-products";
import ProductCard from "$/shop/components/product-card";

export default function ProductGrid() {
  const { data, status } = useSearchProducts();

  if (status === "success")
    return (
      <div className="w-full grid gap-7 md:grid-cols-2 lg:grid-cols-3 grid-flow-row">
        {data.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="col-span-1 w-full!"
          />
        ))}
      </div>
    );
}
