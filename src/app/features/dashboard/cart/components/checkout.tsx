import React from "react";

import { formatRIAL } from "@/lib/utils";
import { useUpdateCart } from "../api/use-update-cart";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type AppProps = {
  cartId: number;
  itemsLength: number;
  totalAmount: number;
  totalDiscountAmount: number;
  finalTotalAmout: number;
};

export default function Checkout({
  finalTotalAmout,
  itemsLength,
  totalAmount,
  totalDiscountAmount,
  cartId,
}: AppProps) {
  useUpdateCart(cartId);

  return (
    <div className="md:basis-82">
      <div
        dir="rtl"
        className="w-full border border-gray-200 flex flex-col py-4 px-5.5 gap-y-2.5 text-sm"
      >
        <div className="flex justify-between items-center text-muted-foreground">
          <h6>قیمت کالاها ({itemsLength})</h6>
          <p>
            {formatRIAL(totalAmount, true, {
              style: "decimal",
            })}{" "}
            تومان
          </p>
        </div>
        <div className="flex justify-between items-center text-primary">
          <h6>سود شما از خرید</h6>
          <p>
            {formatRIAL(totalDiscountAmount, true, {
              style: "decimal",
            })}{" "}
            تومان
          </p>
        </div>
        <div className="flex justify-between items-center">
          <h6>مبلغ قابل پرداخت</h6>
          <p>
            {formatRIAL(finalTotalAmout, true, {
              style: "decimal",
            })}{" "}
            تومان
          </p>
        </div>

        <Button asChild>
          <Link href={"/dashboard/cart/checkout"}>تایید و تکمیل سفارش</Link>
        </Button>
      </div>
    </div>
  );
}
