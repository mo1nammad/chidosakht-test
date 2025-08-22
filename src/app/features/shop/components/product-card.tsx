"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";

export default function ProductCard() {
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  return isTablet ? null : (
    <div className="w-62 h-86.5 bg-[#F4F6F8] flex flex-col pt-4 rounded-xl">
      {/* image */}
      <div className="w-full h-54.5 px-4">
        <div className="bg-white rounded-[7px] w-full h-full grid place-content-center">
          image
        </div>
      </div>

      <h6 className="text-sm font-medium px-4 py-3 text-right">
        نام محصول تخفیفی
      </h6>

      {/* price */}
      <div className="w-full px-[6.5px] pb-[10px]">
        <div className="flex justify-between h-15 bg-white w-full px-2">
          <span className="bg-secondary text-primary grid place-content-center size-10 self-center rounded-[8px]">
            20%
          </span>

          <div className="flex flex-col text-right pt-2">
            <div className="flex items-center gap-x-1.5">
              <p className="text-xs font-medium">تومان</p>
              <p className="text-xl font-medium">15.900.000</p>
            </div>
            <p className="font-medium text-sm text-muted-foreground line-through">
              16.500.000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
