import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import React from "react";

type AppProps = {
  showDiscount?: boolean;
};
export default function ProductCard({ showDiscount }: AppProps) {
  return (
    <div className="w-full h-29.5 md:w-62 md:h-86.5 bg-[#F4F6F8] flex justify-center md:justify-start flex-row-reverse md:flex-col gap-3 md:gap-0 p-3 md:p-0 md:pt-4 rounded-xl">
      {/* image */}
      <div className="w-full h-full basis-2/5 md:basis-auto md:h-54.5 md:px-4">
        <div className="bg-white rounded-[7px] w-full h-full grid place-content-center">
          image
        </div>
      </div>

      <h6 className="hidden md:block text-sm font-medium px-4 py-3 text-right">
        نام محصول تخفیفی
      </h6>

      {/* price */}
      <div className="w-full md:px-[6.5px] md:pb-[10px]">
        <div className="flex flex-col h-full bg-white rounded-[7px] p-2 md:p-0">
          <h6 className="md:hidden block text-sm font-medium text-right">
            نام محصول تخفیفی
          </h6>

          <div className="flex justify-between items-end md:items-start h-full md:h-15 w-full md:px-2">
            <span className="bg-secondary text-primary grid place-content-center size-10 md:self-center rounded-[8px]">
              {showDiscount ? "20%" : <ShoppingBag />}
            </span>

            <div
              className={cn(
                "flex flex-col h-full text-right pt-2",
                !showDiscount && "justify-end md:justify-center"
              )}
            >
              <div className="flex items-center gap-x-1.5">
                <p className="text-[10px] font-medium text-primary">تومان</p>
                <p
                  className={cn(
                    "text-sm md:text-xl font-medium",
                    !showDiscount && "md:text-lg"
                  )}
                >
                  15.900.000
                </p>
              </div>
              {showDiscount ? (
                <p className="font-medium text-xs md:text-sm text-muted-foreground line-through">
                  16.500.000
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
