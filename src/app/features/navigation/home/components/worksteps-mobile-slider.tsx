"use client";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { workstepsData } from "../constants";
import { cn } from "@/lib/utils";
// import { Title } from "@/components/title";

export function WorkstepsMobileSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const percentage = (current + 1) / workstepsData.length;

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="md:hidden block">
      <div className="flex items-center justify-center relative">
        <h3 className="text-xl font-yekan-semibold">مراحل انجام پروژه</h3>
        <div className="absolute overflow-hidden -bottom-4 bg-slate-300 w-36 h-1 rounded-md">
          <div
            className="rounded-md absolute h-1 bg-primary transition-[width] duration-500"
            style={{ width: percentage * 144 }}
          />
        </div>
      </div>
      <Carousel orientation="vertical" className="mt-8" setApi={setApi}>
        <CarouselContent className="h-[200px] ">
          {workstepsData.map((data, index) => (
            <CarouselItem
              key={data.title}
              className={cn(
                "basis-[100px] flex flex-col gap-y-4 items-center justify-center transition duration-300",
                index === current ? "scale-100" : "scale-50 opacity-0"
              )}
            >
              <h1 className="w-33 text-base bg-secondary text-primary text-center py-2 rounded-md font-yekan-semibold">
                {data.title}
              </h1>
              <p className="max-w-[357px] text-center text-xs leading-7">
                {data.description}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
