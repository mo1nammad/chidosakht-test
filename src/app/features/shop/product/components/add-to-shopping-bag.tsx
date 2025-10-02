"use client";

import React, { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { formatRIAL } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Context as variantContext } from "../context/variant-context";

export default function AddToShoppingBag() {
  const { stock, price } = use(variantContext);

  const [shopCount, setShopCount] = useState(Math.min(stock, 1));

  useEffect(() => {
    setShopCount(Math.min(stock, 1));
  }, [stock]);

  const increaseShopCount = () =>
    setShopCount((prev) => (prev >= stock ? stock : prev + 1));
  const decreaseShopCount = () =>
    setShopCount((prev) =>
      prev > Math.min(stock, 1) ? prev - 1 : Math.min(stock, 1)
    );

  return (
    <div className="mt-4 grid gap-y-5 gap-x-2 grid-cols-6 grid-rows-2">
      {stock === 0 ? (
        <p className="flex items-center gap-x-1.5 text-lg col-span-3 md:col-span-6">
          محصول ناموجود است
        </p>
      ) : (
        <p className="flex items-center gap-x-1.5 text-lg col-span-3 md:col-span-6">
          <span className="text-muted-foreground">تومان</span>
          {!!price &&
            formatRIAL(price, true, {
              style: "decimal",
            })}
        </p>
      )}
      <Button
        className="w-full col-span-6 md:col-span-4 max-md:order-3"
        variant={stock === 0 ? "tertiary" : "primary"}
        disabled={stock === 0}
      >
        افزودن به سبد خرید
      </Button>
      <div className="flex justify-end items-center gap-x-2.5 md:gap-x-4 col-span-3 md:col-span-2">
        <Button
          disabled={shopCount === Math.min(stock, 1)}
          onClick={decreaseShopCount}
          variant="accent"
          size="icon"
          className="md:h-full md:w-10"
        >
          <Minus />
        </Button>
        <span className="md:text-lg">{shopCount}</span>
        <Button
          disabled={shopCount === stock}
          onClick={increaseShopCount}
          variant="accent"
          size="icon"
          className="md:h-full md:w-10"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
