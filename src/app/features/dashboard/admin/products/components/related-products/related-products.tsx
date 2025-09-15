"use client";

import React, { useState } from "react";
import ProductPicker from "./product-picker";
import { useGetRelatedProducts } from "../../api/related-product/use-get-related-products";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { useRemoveRelation } from "../../api/related-product/use-remove-relation";

export default function RelatedProducts() {
  const [relatedProductList, setRelatedProductList] = useState<number[]>([]);
  const { data } = useGetRelatedProducts();
  const { mutate: removeRelation, status } = useRemoveRelation();

  const modifyRelatedProducts = (
    productId: number,
    action: "select" | "unselect"
  ) => {
    if (action === "select") {
      setRelatedProductList((prev) => [...prev, productId]);
    } else {
      setRelatedProductList((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <>
      <div className="flex flex-row-reverse gap-x-2.5">
        <ProductPicker />
        {relatedProductList.length > 0 && (
          <Button
            disabled={status === "pending"}
            onClick={() =>
              removeRelation(
                {
                  relatedProductIds: relatedProductList,
                },
                {
                  onSuccess: () => setRelatedProductList([]),
                }
              )
            }
            size="sm"
            variant="destructive"
          >
            حذف از لیست مرتبط
          </Button>
        )}
      </div>
      {/* TODO Edit here */}
      <div className="flex flex-col gap-y-1.5 w-full mt-3">
        {data?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            selected={relatedProductList.includes(product.id)}
            onChange={modifyRelatedProducts}
          />
        ))}
      </div>
    </>
  );
}
