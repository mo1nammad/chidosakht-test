import React from "react";
import { Car } from "lucide-react";

import { Cart } from "@/types";

import CartItemQuantity from "./cart-item-quantity";
import { formatRIAL } from "@/lib/utils";

type AppProps = {
  items: Cart["cartItems"];
};

export default function CartItems({ items }: AppProps) {
  return (
    <div className="min-h-120 grow flex flex-col mt-10 gap-y-18">
      {items.map((item) => (
        <div
          key={item.cartItemId}
          className="flex w-full h-26 gap-x-5 justify-end"
        >
          <div className="flex flex-col items-end justify-between">
            {/* name */}
            <h6 dir="rtl" className="font-bold text-sm sm:text-lg">
              {item.productName}
            </h6>
            {/* variant */}

            {/* post */}
            <div className="flex text-sm items-center gap-x-1 sm:mt-4">
              <p className="text-muted-foreground text-xs sm:text-sm">
                ارسال از چیدوساخت
              </p>
              <Car
                size={20}
                strokeWidth={1}
                className="rotate-y-180 text-primary"
              />
            </div>

            {/* discount */}
            <div dir="rtl" className="flex flex-col mt-5">
              {item.discountAmount_Now ? (
                <p className="text-xs text-red-500">
                  {formatRIAL(item.discountAmount_Now, true, {
                    style: "decimal",
                  })}
                  تومان تخفیف
                </p>
              ) : null}

              {/* price */}
              <p className="text-xs sm:text-sm font-bold">
                {item.specialPrice_Now
                  ? formatRIAL(item.specialPrice_Now, true, {
                      style: "decimal",
                    })
                  : formatRIAL(item.price_Now, true, {
                      style: "decimal",
                    })}{" "}
                تومان
              </p>
            </div>
          </div>
          <div className="basis-22 h-full text-xs flex flex-col justify-between items-center">
            <p>تصویر محصول</p>
            <CartItemQuantity
              cartItemId={item.cartItemId}
              quantity={item.quantity}
              stock={item.stock}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
