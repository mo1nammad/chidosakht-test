import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  Crown,
  Laugh,
  MoveLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import HeroFeatures from "$/shop/components/hero-features";
import CustomHeader from "$/shop/components/custom-header";
import CategoryCards from "$/shop/components/category-cards";
import DiscountedProducts from "$/shop/components/discounted-products";
import MostSellingProducts from "$/shop/components/most-selling-products";

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
        <Link href="/shop/search" className="relative z-40 mt-5">
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

      {/* discounted products sections*/}

      <section
        dir="rtl"
        className="flex relative w-full min-h-86.5 mt-8 mb-20 gap-6"
      >
        {/* timer card */}
        <div className="bg-[#F4F6F8] md:min-w-61 h-80 md:h-auto absolute inset-x-0 md:inset-y-0 md:inset-x-auto flex flex-col items-center pt-8.5 rounded-xl overflow-hidden">
          <Image
            src="/shop/discount-text.png"
            alt="discount text"
            width={228}
            height={82}
            className="mr-11"
          />

          {/* timer */}
          <div className="flex flex-row-reverse gap-x-2 w-46 h-12 mt-8">
            <div className="w-10 h-12 flex flex-col items-center justify-center gap-y-0.5 bg-primary rounded-sm text-white">
              <span className="font-bold text-sm">2</span>
              <span className="font-medium text-xs">روز</span>
            </div>
            <div className="w-10 h-12 flex flex-col items-center justify-center gap-y-0.5 bg-primary rounded-sm text-white">
              <span className="font-bold text-sm">14</span>
              <span className="font-medium text-xs">ساعت</span>
            </div>
            <div className="w-10 h-12 flex flex-col items-center justify-center gap-y-0.5 bg-primary rounded-sm text-white">
              <span className="font-bold text-sm">32</span>
              <span className="font-medium text-xs">دقیقه</span>
            </div>
            <div className="w-10 h-12 flex flex-col items-center justify-center gap-y-0.5 bg-primary rounded-sm text-white">
              <span className="font-bold text-sm">08</span>
              <span className="font-medium text-xs">ثانیه</span>
            </div>
          </div>

          {/* images */}
          <div className="size-78 bg-primary rounded-full absolute -bottom-63" />
          <Image
            src="/shop/Happy_Construction_Worker.png"
            alt="happy constructor worker image"
            width={140}
            height={140}
            className="absolute bottom-0"
          />
        </div>

        <DiscountedProducts className="w-full mt-[360px] md:mt-0 md:w-[calc(100%-272px)] md:mr-[272px] md:pr-6" />
      </section>

      <section className="mb-10 flex flex-col md:flex-row h-62 md:h-52 gap-x-8 gap-y-4">
        <div className="bg-black/80 flex-1 grid place-content-center text-white rounded-xl">
          جایگاه بنر
        </div>{" "}
        <div className="bg-black/80 flex-1 grid place-content-center text-white rounded-xl">
          جایگاه بنر
        </div>
      </section>

      <section className="mb-15">
        <CustomHeader
          icon={Crown}
          iconProps={{
            className: "mb-4 size-7 w-9",
            strokeWidth: 1,
          }}
          className="px-6 pb-2.5 mb-11"
        >
          پر فروش ترین محصولات
        </CustomHeader>

        <MostSellingProducts />
      </section>

      <Link href="#" className="flex w-full mb-15">
        <Image
          src="/shop/chidosakht-social.png"
          alt="social media"
          width={1100}
          height={92}
          className="object-cover w-full"
        />
      </Link>

      {/* other features */}
      <section className="mb-11">
        <div className="relative flex flex-row-reverse mb-9">
          <Image
            src="/shop/architector-happy-2.png"
            alt="happy charactor"
            width={50}
            height={67}
            className="relative right-4.5"
          />
          <div className="bg-secondary w-27 h-9.5 absolute bottom-0 right-0 -z-10 rounded-[10px]" />

          <h3
            className="absolute top-1/2 -translate-y-1 right-19 font-bold text-xl md:text-2xl"
            dir="rtl"
          >
            بهترین هارا در <span className="text-primary">کنار ما</span> تجربه
            خواهید کرد چون ...
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-10 lg:gap-x-20">
          <div dir="rtl" className="flex flex-col gap-y-3">
            <CreditCard className="size-9" />
            <h4 className="font-bold text-sm lg:text-base">
              پرداخت امن با درگاه امن
            </h4>
            <p className="text-xs lg:text-sm text-muted-foreground leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              است
            </p>
          </div>
          <div dir="rtl" className="flex flex-col gap-y-3">
            <Laugh className="size-9" />
            <h4 className="font-bold text-sm lg:text-base">
              رضایت بیش از ۱ میلیون مشتری
            </h4>
            <p className="text-xs lg:text-sm text-muted-foreground leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              است
            </p>
          </div>
          <div dir="rtl" className="flex flex-col gap-y-3">
            <Activity className="size-9" />
            <h4 className="font-bold text-sm lg:text-base">
              پشتیبانی ۲۴ ساعته
            </h4>
            <p className="text-xs lg:text-sm text-muted-foreground leading-6">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              است
            </p>
          </div>
        </div>
      </section>

      <section>
        <CustomHeader className="px-6 pb-2.5 mt-6 mb-11">
          وبلاگ و مقالات چیدوساخت
        </CustomHeader>

        <div className="flex flex-col sm:flex-row-reverse text-right gap-y-12 gap-x-7 md:gap-x-14 mb-8 sm:mb-12">
          <div className="flex-1 flex flex-col gap-y-3">
            <Image
              src={"/shop/blog-preview.png"}
              alt="blog preview"
              width={330}
              height={218}
              className="w-full object-cover rounded-2xl"
            />
            <h6 className="font-medium text-lg">نام و تایتل مقاله</h6>
            <div className="flex items-center justify-between">
              <Link href={"#"}>
                <MoveLeft className="text-primary size-6" />
              </Link>
              <Link href={"#"}>
                <p className="text-sm text-muted-foreground">
                  دسته بندی: آموزشی
                </p>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 flex flex-col gap-y-3">
              <Image
                src={"/shop/blog-preview.png"}
                alt="blog preview"
                width={330}
                height={218}
                className="w-full object-cover rounded-2xl"
              />
              <h6 className="font-medium text-lg">نام و تایتل مقاله</h6>
              <div className="flex items-center justify-between">
                <Link href={"#"}>
                  <MoveLeft className="text-primary size-6" />
                </Link>
                <Link href={"#"}>
                  <p className="text-sm text-muted-foreground">
                    دسته بندی: آموزشی
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex-1 flex flex-col gap-y-3">
              <Image
                src={"/shop/blog-preview.png"}
                alt="blog preview"
                width={330}
                height={218}
                className="w-full object-cover rounded-2xl"
              />
              <h6 className="font-medium text-lg">نام و تایتل مقاله</h6>
              <div className="flex items-center justify-between">
                <Link href={"#"}>
                  <MoveLeft className="text-primary size-6" />
                </Link>
                <Link href={"#"}>
                  <p className="text-sm text-muted-foreground">
                    دسته بندی: آموزشی
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <Button className="mx-auto">
            <ChevronLeft className="size-6" />
            <span>مقالات بیشتر</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
