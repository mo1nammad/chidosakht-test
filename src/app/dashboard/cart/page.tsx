import React from "react";
import UserCart from "@/app/features/dashboard/cart/components/cart";

export default function CartPage() {
  return (
    <div className="px-6 bg-white min-h-[91vh]">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <ul className="w-full border-b border-gray-200 flex justify-end">
          <li className="border-b-3 border-b-primary pb-2 px-3 rounded-b-[3px]">
            سبد خرید
          </li>
        </ul>

        <UserCart />
      </div>
    </div>
  );
}
