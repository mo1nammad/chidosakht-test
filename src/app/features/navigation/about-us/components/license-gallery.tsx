"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { licenseGallery } from "../constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const LicenseGallery = () => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const bulletArray = new Array(count).fill(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    api.on("slidesInView", () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-muted p-3 rounded-[30px] max-w-[1210px] mx-auto">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {licenseGallery.map((license) => {
            const path = license.replace(/(\.jpg|\.png)$/, "-thumbnail$1");

            return (
              <CarouselItem
                key={license}
                className="basis-[150px] rounded-[20px] overflow-hidden"
              >
                <Image
                  src={path}
                  alt="license of work"
                  width={127}
                  height={179}
                  className="w-full h-[179px]"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex gap-x-0.5 absolute inset-x-0 h-4 -bottom-10 justify-center items-center">
          {count > 1 &&
            bulletArray.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "size-1.5 bg-[#DBD3D3] ml-1 inline-block rounded-full transition-[width] duration-300 cursor-pointer",
                  current === index + 1 && "w-6 bg-primary"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
        </div>
      </Carousel>
    </div>
  );
};

export default LicenseGallery;
