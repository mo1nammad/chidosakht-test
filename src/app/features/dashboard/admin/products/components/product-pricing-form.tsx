import React, { useState } from "react";

import { useAttributesStore } from "../store/attributes";
import { Attribute, Product, simpleProduct } from "../types";

import ImagePicker from "./product-pricing-image-picker";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

import PricingAttributeField from "./pricing-attribute-field";

const generatePriceMappingObject = (attributes: Attribute[]) =>
  attributes.reduce<Record<string, string>>((acc, item) => {
    acc[item.id] = item.options?.[0]?.id ?? "";
    return acc;
  }, {});

const validateFormPricing = (object: Record<string, string>) =>
  Object.entries(object).every((field) => {
    if (field[0] === "price" || field[0] === "offPrice") return true;
    else return field[1].length > 0;
  });

type PriceMappingStateType = {
  price: string;
  offPrice: string;
  imageIndex: string;
  [x: string]: string;
};

type AppProps = {
  productType: Product["productType"];
};

export default function ProductPricingForm({ productType }: AppProps) {
  const attributes = useAttributesStore((state) => state.attributes);

  // states
  const [currentPriceMapping, setCurrentPriceMapping] =
    useState<PriceMappingStateType>({
      price: "",
      offPrice: "",
      imageIndex: "",
      ...generatePriceMappingObject(attributes),
    });

  const updateCurrent = (fieldId: keyof PriceMappingStateType, val: string) =>
    setCurrentPriceMapping((state) => ({ ...state, [fieldId]: val }));

  const isFormValidToSubmit = validateFormPricing(currentPriceMapping);

  // simple product
  if (productType === simpleProduct) {
    return <div>محصول ساده</div>;
  }

  const handleSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!currentPriceMapping["price"]) return;

    // update product variants and priceMapping here
    // updateProduct((state) => ({
    //   products: state.products.map((product) =>
    //     product.id !== +productId
    //       ? product
    //       : {
    //           ...product,
    //           priceMapping: [
    //             ...(product.priceMapping ?? []), // add recent maps if exists
    //             currentPriceMapping,
    //           ],
    //           variants,
    //         }
    //   ),
    // }));

    toast.success("قیمت اضافه شد");
  };

  return (
    <div className="flex flex-row-reverse">
      <form
        dir="rtl"
        className="my-6 flex flex-col w-110"
        onSubmit={handleSubmitForm}
      >
        {/* variant selection */}
        {attributes.map((attribute) => (
          <PricingAttributeField
            key={attribute.id}
            attribute={attribute}
            onChange={(id, val) => updateCurrent(id, val)}
            value={currentPriceMapping[attribute.id]}
            type={attribute.type}
          />
        ))}

        <ImagePicker
          onImagePick={(id) => updateCurrent("imageIndex", id)}
          currentImageId={currentPriceMapping["imageIndex"]}
        />

        <div className="flex flex-col gap-y-3 mt-6">
          <Input
            disabled={!isFormValidToSubmit}
            className="bg-background"
            value={currentPriceMapping.price}
            placeholder="قیمت"
            onChange={(ev) => updateCurrent("price", ev.target.value)}
          />
          <Input
            disabled={!isFormValidToSubmit}
            className="bg-background"
            value={currentPriceMapping.offPrice}
            placeholder="قیمت تخفیف خورده"
            onChange={(ev) => updateCurrent("offPrice", ev.target.value)}
          />
          <p className="bg-amber-300 w-fit px-2 text-sm">
            تمامی قیمت ها به ریال می باشد
          </p>
          <Button disabled={!isFormValidToSubmit}>ثبت</Button>
        </div>
      </form>
    </div>
  );
}
