"use client";

import React from "react";
import { useStore } from "../store/product";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  productId: string;
};

export default function ProductForm({ productId }: Props) {
  // retrieve product logic
  const productsList = useStore((state) => state.products);
  const product = productsList.find((value) => value.id === +productId);

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

  return <div>{product.title}</div>;
}
