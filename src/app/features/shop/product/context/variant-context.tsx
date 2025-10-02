"use client";

import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { simpleProduct } from "@/app/features/dashboard/admin/products/types";
import { Product } from "@/types";

// context
type ContextType = {
  attributeValuesObj: Record<number, number>;
  setAttributeValueObj: (attrId: number, valueId: number) => void;

  variantId: number | null;
  productType: Product["productType"];

  price: number | null;
  specialPrice: number | null;
  stock: number;
};
export const Context = createContext<ContextType>({
  price: 0,
  specialPrice: 0,
  stock: 0,
  productType: 1,
  variantId: 0,
  attributeValuesObj: {},
  setAttributeValueObj: () => {},
});

// attribute
const extractDefaultAttValue = (attributes: Product["attributeAndValues"]) => {
  const obj: Record<number, number> = {};

  for (const attr of attributes) {
    obj[attr.productAttributeId] = attr.values[0].productAttributeValueId;
  }

  return obj;
};

type AppProps = {
  product: Product;
};
export default function VariantContext({
  product,
  children,
}: PropsWithChildren<AppProps>) {
  const [attValueObj, setAttValueObj] = useState<Record<number, number>>(
    extractDefaultAttValue(product.attributeAndValues)
  );

  const [variant, setVariant] = useState<
    NonNullable<Product["productVariants"]>[0] | null
  >(null);

  useEffect(() => {
    // find variant by attrValueObj
    const targetVariant = product.productVariants?.find((variant) => {
      const isInVariant = Object.values(attValueObj).every((valueId) =>
        variant.productAttributeValues
          .map((item) => item.productAttributeValueId)
          .includes(valueId)
      );

      return isInVariant;
    });

    if (targetVariant) {
      setVariant(targetVariant);
    }
  }, [attValueObj, product.productVariants]);

  const setAttrValue = (attrId: number, valueId: number) =>
    setAttValueObj((prev) => ({ ...prev, [attrId]: valueId }));

  const priceFn = () => {
    let price: null | number = null;
    let specialPrice: null | number = null;

    if (product.productType === simpleProduct) {
      price = product.infoForSimpleProduct?.price ?? null;
      specialPrice = product.infoForSimpleProduct?.specialPrice ?? null;
    }

    if (variant) {
      price = variant.price;
      specialPrice = variant.specialPrice;
    }

    return [price, specialPrice];
  };

  const stock =
    product.productType === simpleProduct
      ? product.infoForSimpleProduct?.stock
      : variant?.stock;

  return (
    <Context
      value={{
        attributeValuesObj: attValueObj,
        setAttributeValueObj: setAttrValue,

        productType: product.productType,
        variantId: variant?.productVariantId ?? null,

        price: priceFn()[0],
        specialPrice: priceFn()[1],
        stock: stock ?? 0,
      }}
    >
      {children}
    </Context>
  );
}
