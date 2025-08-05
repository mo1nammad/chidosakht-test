import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductVariants } from "../api/variant/use-get-product-variants";

export const useEditVariant = () => {
  const router = useRouter();

  const { data: variants } = useGetProductVariants();

  // TODO:  edit api hook

  const variantId = useSearchParams().get("variantId");
  const variant = variants?.find(
    (variant) => Number(variantId) === variant.productVariantId
  );

  React.useEffect(() => {
    if (!variantId) {
      router.push("/dashboard/admin/products/36?form=variants");
    }
  }, [router, variantId]);

  return { variant };
};
