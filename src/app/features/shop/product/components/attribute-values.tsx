"use client";

import React, { use } from "react";

import { colorAttribute } from "$/dashboard/admin/products/types";
import { cn } from "@/lib/utils";

import { Context as variantcontext } from "../context/variant-context";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

type AppProps = {
  data: Product["attributeAndValues"];
};

export default function AttributeValues({ data }: AppProps) {
  const { attributeValuesObj, setAttributeValueObj } = use(variantcontext);

  return (
    <div className="flex flex-col text-right gap-y-1 mt-8">
      {data.map((att) => (
        <div key={att.productAttributeId} className="relative flex flex-col">
          <h4 className="font-medium relative pr-4 after:size-2.5 after:absolute after:bg-primary after:right-0 after:top-1/2 after:-translate-y-1/2 after:rounded-[3px]">
            {att.name}
          </h4>

          {/* values selection section */}
          <ScrollArea dir="rtl" className="w-full py-2">
            <div className="flex gap-x-2 p-2">
              {att.values.map(({ value, productAttributeValueId }) => (
                <Button
                  variant="accent"
                  size={"sm"}
                  key={productAttributeValueId}
                  onClick={() =>
                    setAttributeValueObj(
                      att.productAttributeId,
                      productAttributeValueId
                    )
                  }
                  className={cn(
                    "rounded-full transition",
                    att.attributeType === colorAttribute && "px-6",
                    attributeValuesObj[att.productAttributeId] ===
                      productAttributeValueId && "ring-1 ring-primary"
                  )}
                >
                  {att.attributeType === colorAttribute ? (
                    <div
                      style={{ background: value }}
                      className="size-5 rounded-sm"
                    />
                  ) : (
                    value
                  )}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
