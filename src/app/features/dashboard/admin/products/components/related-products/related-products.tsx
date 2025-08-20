import React from "react";
import ProductPicker from "./product-picker";
import { useGetRelatedProducts } from "../../api/related-product/use-get-related-products";

export default function RelatedProducts() {
  const { data } = useGetRelatedProducts();
  return (
    <div>
      <ProductPicker />
      <div dir="rtl" className="grid grid-cols-3 grid-flow-row mt-8">
        {/* TODO Edit here */}
        {data?.map((relation) => (
          <div key={relation.productId} className="flex gap-x-2.5">
            <span>{relation.productId}</span>
            <span>{relation.productName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
