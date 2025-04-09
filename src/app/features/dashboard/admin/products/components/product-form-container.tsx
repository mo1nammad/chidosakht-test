"use client";

import React from "react";
import Link from "next/link";

import { useProductsStore } from "../store/product";

import { buttonVariants } from "@/components/ui/button";
import ProductFeaturesForm from "./product-features-form";
import ProductAdditionals from "./product-additionals";

type Props = {
  productId: string;
};

// animation wrapper

// component
export default function ProductForm({ productId }: Props) {
  // retrieve product logic
  const product = useProductsStore((state) =>
    state.products.find((data) => data.id === +productId)
  );

  if (!product) {
    return (
      <div className="w-full flex flex-col items-center justify-center h-125 gap-1.5">
        <h1 className="text-2xl font-yekan-semibold">این محصول وجود ندارد</h1>
        <Link className={buttonVariants()} href={"/dashboard/admin/products"}>
          بازگشت
        </Link>
      </div>
    );
  }

  return (
    <div className="text-right">
      <ProductFeaturesForm productId={productId} />

      {/* additional forms */}
      <div className="overflow-hidden mt-12">
        <h2 className="text-lg mb-6 font-yekan-semibold">فرم های تکمیلی</h2>
        <ProductAdditionals />
      </div>
    </div>
  );
}
