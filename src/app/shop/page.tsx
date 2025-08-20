import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Grip, Headphones, Truck } from "lucide-react";

export default function ShopHome() {
  return (
    <div className="max-w-7xl px-6 mx-auto">
      {/* hero section */}
      <div className="flex flex-col items-center">
        <div className="flex flex-row-reverse mt-11 flex-wrap items-center justify-center text-center">
          <h1 className="font-bold text-[44px]">
            همه چیز برای ساختن خانه تان با
          </h1>
          <div className="flex flex-row-reverse items-center justify-center mr-1.5 bg-secondary rounded-xl h-15 pb-2 drop-shadow-[1px_1px_4px_#2563EB]">
            <h1 className="font-bold text-[44px] text-primary">چیدوساخت</h1>
            <Image
              alt="hero architector"
              src="/shop/architector.png"
              width={64}
              height={94}
              className="-mr-3 -mt-1.5"
            />
          </div>
        </div>
        <p className="text-muted-foreground mt-2 font-normal text-center">
          رویاهای مسکونی شما را با مهارت و اشتیاق به واقعیت تبدیل می کنیم
        </p>
        <Link href="#" className="relative z-40 mt-5">
          <Button>
            <ChevronLeft />
            <span>مشاهده محصولات</span>
          </Button>
        </Link>

        <div className="relative max-w-274 w-full">
          <Image
            src="/shop/unfinished-house.png"
            alt="Hero Image"
            width={698}
            height={698}
            className="-mt-10 mx-auto"
          />

          <div className="absolute w-full h-25 bg-white bottom-16 rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
            <div className="flex justify-around items-center h-full">
              <div className="flex flex-row-reverse gap-x-2.5">
                <div className="p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
                  <Headphones
                    strokeWidth={1.5}
                    className="text-primary size-6.5"
                  />
                </div>
                <div className="flex flex-col text-right font-medium text-xl">
                  <p className="text-primary">پشتیبانی ۲۴ ساعته</p>
                  <p className="text-muted-foreground text-xs font-light">
                    پاسخگوی همیشگی
                  </p>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-x-2.5">
                <div className="p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
                  <Truck strokeWidth={1.5} className="text-primary size-6.5" />
                </div>
                <div className="flex flex-col text-right font-medium text-xl">
                  <p className="text-primary">ارسال رایگان به سراسر کشور</p>
                  <p className="text-muted-foreground text-xs font-light">
                    ارسال با پست به سراسر کشور
                  </p>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-x-2.5">
                <div className="p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
                  <Grip strokeWidth={1.5} className="text-primary size-6.5" />
                </div>
                <div className="flex flex-col text-right font-medium text-xl">
                  <p className="text-primary">تنوع بالای محصولات</p>
                  <p className="text-muted-foreground text-xs font-light">
                    بیش از ۲۰۰ محصول
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
