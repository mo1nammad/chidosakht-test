"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { formatRIAL } from "@/lib/utils";
import { useSession } from "@/hooks/use-session";
import { Context as variantContext } from "../context/variant-context";

import { Button } from "@/components/ui/button";
import { useAddToCart } from "../api/use-add-to-cart";

export default function AddToCart() {
  const router = useRouter();

  const { stock, price, specialPrice, variantId } = use(variantContext);
  const [shopCount, setShopCount] = useState(Math.min(Number(stock), 1));

  const { session } = useSession();
  const { mutate: addToCart } = useAddToCart();

  useEffect(() => {
    setShopCount(Math.min(Number(stock), 1));
  }, [stock]);

  const increaseShopCount = () =>
    setShopCount((prev) => (prev >= Number(stock) ? Number(stock) : prev + 1));
  const decreaseShopCount = () =>
    setShopCount((prev) =>
      prev > Math.min(Number(stock), 1) ? prev - 1 : Math.min(Number(stock), 1)
    );

  const handleAddToCart = () => {
    if (!session) {
      return router.push("/login");
    }

    // handle add to cart
    return addToCart({
      count: shopCount,
      productVariantId: variantId,
    });
  };

  return (
    <div className="mt-4 grid gap-y-5 gap-x-2 grid-cols-6 grid-rows-2">
      {!stock || stock === 0 ? (
        <p className="flex items-center justify-center bg-gray-100 p-2 border border-red-300 text-red-500 rounded-xl opacity-60 gap-x-1.5 text-lg col-span-3 md:col-span-6">
          محصول ناموجود است
        </p>
      ) : (
        <>
          <p className="flex items-center gap-x-1.5 text-lg col-span-3 md:col-span-6">
            <span className="text-muted-foreground">تومان</span>
            {specialPrice
              ? formatRIAL(specialPrice, true, {
                  style: "decimal",
                })
              : price
              ? formatRIAL(price, true, {
                  style: "decimal",
                })
              : null}
          </p>
          <Button
            className="w-full col-span-6 md:col-span-4 max-md:order-3"
            variant={stock === 0 ? "tertiary" : "primary"}
            disabled={session && stock === 0}
            onClick={handleAddToCart}
          >
            {!session ? "برای خرید ابتدا وارد شوید" : "افزودن به سبد خرید"}
          </Button>
          <div className="flex justify-end items-center gap-x-2.5 md:gap-x-4 col-span-3 md:col-span-2">
            <Button
              disabled={shopCount === Math.min(Number(stock), 1)}
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
        </>
      )}
    </div>
  );
}
