import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import HeroFeatures from "$/shop/components/hero-features";
import CustomHeader from "$/shop/components/custom-header";
import CategoryCards from "$/shop/components/category-cards";

export default function ShopHome() {
  return (
    <div className="max-w-7xl px-6 mx-auto">
      {/* hero section */}
      <section className="flex flex-col items-center mt-3.5">
        <div className="flex flex-row-reverse mt-11 flex-wrap gap-y-3 items-center justify-center text-center">
          <h1 className="font-bold text-3xl md:text-[44px]">
            همه چیز برای ساختن خانه تان با
          </h1>
          <div className="flex flex-row-reverse items-center justify-center mr-1.5 bg-secondary rounded-xl h-12 md:h-15 drop-shadow-[1px_1px_4px_#2563EB]">
            <h1 className="font-bold text-3xl md:text-[44px] text-primary">
              چیدوساخت
            </h1>
            <Image
              alt="hero architector"
              src="/shop/architector.png"
              width={64}
              height={94}
              className="md:-mr-3 -mt-3 md:-mt-3 w-13 h-20 md:w-16 md:h-23"
            />
          </div>
        </div>
        <p className="text-muted-foreground mt-6 md:mt-2 font-normal text-center">
          رویاهای مسکونی شما را با مهارت و اشتیاق به واقعیت تبدیل می کنیم
        </p>
        <Link href="#" className="relative z-40 mt-5">
          <Button>
            <ChevronLeft />
            <span>مشاهده محصولات</span>
          </Button>
        </Link>

        <div className="relative w-full">
          <Image
            src="/shop/unfinished-house.png"
            alt="Hero Image"
            width={698}
            height={698}
            className="-mt-10 mx-auto"
          />

          <HeroFeatures />
        </div>
      </section>

      {/* category Section */}
      <section className="pb-12">
        <CustomHeader
          icon={ChevronDown}
          iconProps={{
            className:
              "mb-4 border-b rounded-full border-b-gray-400 size-7 w-9",
          }}
          className="px-6 pb-2.5 mb-11"
        >
          دسته بندی محصولات
        </CustomHeader>

        <CategoryCards />
      </section>
    </div>
  );
}
