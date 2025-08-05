import React from "react";
import { useSearchParams } from "next/navigation";

import { Loader } from "@/components/loader";
import { useGetProductVariants } from "../api/variant/use-get-product-variants";
import { ProdutctDataTable } from "./products-data-table";
import { useVariantColumn } from "../hooks/use-variant-column";
import ProductEditVariantForm from "./product-edit-variant-form";

export default function ProductVariantsData() {
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variantId");

  const { data: variants, status } = useGetProductVariants();

  const columns = useVariantColumn();

  const mappedVariants = (variants ?? []).map((variant) => {
    const attrValueObject: Record<string, string> = {};

    variant.productVariantAttributeValues.forEach((attr) => {
      attrValueObject[String(attr.productAttributeId)] =
        attr.productAttributeValue;
    });

    return { ...variant, ...attrValueObject };
  });

  if (status === "pending") return <Loader />;

  if (status === "success")
    return variantId ? (
      <ProductEditVariantForm />
    ) : (
      <ProdutctDataTable data={mappedVariants} columns={columns} />
    );
}
