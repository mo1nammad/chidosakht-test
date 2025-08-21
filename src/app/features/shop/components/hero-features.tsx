"use client";

import React from "react";
import { Grip, Headphones, Truck } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HeroFeatures() {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        AutoScroll({
          speed: 0.5,
          stopOnInteraction: false,
          stopOnFocusIn: false,
          stopOnMouseEnter: false,
        }),
      ]}
      className="bg-white absolute w-full bottom-12 md:bottom-16 rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]"
    >
      <CarouselContent className="h-22 md:h-25 items-center">
        <CarouselItem className="basis-[250px] md:basis-1/3  flex items-center justify-center">
          {" "}
          <div className="flex flex-row-reverse gap-x-2.5">
            <div className="p-3 lg:p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6] flex items-center justify-center">
              <Headphones
                strokeWidth={1.5}
                className="text-primary size-4 lg:size-6.5"
              />
            </div>
            <div className="flex flex-col text-right justify-between py-1 font-medium text-xl">
              <p className="text-primary text-sm lg:text-base">
                پشتیبانی ۲۴ ساعته
              </p>
              <p className="text-muted-foreground text-[10px] lg:text-xs font-light">
                پاسخگوی همیشگی
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-[250px] md:basis-1/3 flex items-center justify-center">
          <div className="flex flex-row-reverse gap-x-2.5">
            <div className="p-3 lg:p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
              <Truck
                strokeWidth={1.5}
                className="text-primary size-4 lg:size-6.5"
              />
            </div>
            <div className="flex flex-col text-right justify-between py-1 font-medium text-xl">
              <p className="text-primary text-sm lg:text-base">
                ارسال رایگان به سراسر کشور
              </p>
              <p className="text-muted-foreground text-[10px] lg:text-xs font-light">
                ارسال با پست به سراسر کشور
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-[250px] md:basis-1/3 flex items-center justify-center">
          <div className="flex flex-row-reverse gap-x-2.5">
            <div className="p-3 lg:p-3.5 bg-secondary rounded-xl drop-shadow-[0px_4px_4px_#c6c6c6]">
              <Grip
                strokeWidth={1.5}
                className="text-primary size-4 lg:size-6.5"
              />
            </div>
            <div className="flex flex-col text-right justify-between py-1 font-medium text-xl">
              <p className="text-primary text-sm lg:text-base">
                تنوع بالای محصولات
              </p>
              <p className="text-muted-foreground text-[10px] lg:text-xs font-light">
                بیش از ۲۰۰ محصول
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
