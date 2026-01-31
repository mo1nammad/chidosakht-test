"use client";

import Image from "next/image";
import React from "react";

import { useCartProducts } from "../api/use-cart-products";

import SuggestedProducts from "./suggested-products";
import CartItems from "./cart-items";
import Checkout from "./checkout";

export default function UserCart() {
  const { data, isSuccess } = useCartProducts();

  const totalQuantity =
    data && data.cartItems.length > 0
      ? data.cartItems
          .map((item) => item.quantity)
          .reduce((total, curr) => total + curr)
      : 0;

  return (
    <section className="mt-6">
      <div dir="rtl" className="flex gap-x-1 items-center">
        <h3 className="font-semibold">سبد خرید شما</h3>
        <p className="text-xs">.{totalQuantity} مرسوله</p>
      </div>

      {!isSuccess || !data || data.cartItems.length === 0 ? (
        <div
          dir="rtl"
          className="w-full min-h-120 flex flex-col items-center justify-center"
        >
          <Image
            src={"/shop/empty-shoping-cart.png"}
            alt="empty shopping cart"
            width={200}
            height={200}
          />
          <h5 className="font-bold mt-7.5">سبد خرید شما خالی است!</h5>
          <p className="text-muted-foreground font-bold text-[15px] mt-1.5">
            یه نگاهی به محصولاتمون بنداز...
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col-reverse md:flex-row">
          <Checkout
            cartId={data.cartId}
            finalTotalAmout={data.finalTotalAmout_Now}
            itemsLength={totalQuantity ?? 0}
            totalAmount={data.totalAmount_Now}
            totalDiscountAmount={data.totalDiscountAmount_Now}
          />
          <CartItems items={data.cartItems} />
        </div>
      )}

      <SuggestedProducts />
    </section>
  );
}
