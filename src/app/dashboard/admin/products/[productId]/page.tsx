import ProductForm from "@/app/features/dashboard/admin/products/components/product-form-container";
import React from "react";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  return (
    <div>
      <div>
        <ProductForm productId={productId} />
      </div>
    </div>
  );
}
