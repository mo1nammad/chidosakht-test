"use client";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { ServicesSlide } from "./services-slide";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselBullets } from "@/components/carousel-bullets";

type ServicesSliderProps = {
  data: {
    src: string;
    title: string;
  }[];
};
export const ServicesSlider = ({ data }: ServicesSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <Carousel setApi={setApi} className="relative ">
      <CarouselContent className="p-2">
        {data.map((props, index) => (
          // responsive : (basis)
          <CarouselItem
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            key={index}
          >
            <ServicesSlide {...props} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <button
        className="absolute z-10 top-1/2 -translate-y-1/2 -left-8 sm:-left-10 size-6 p-0 sm:size-9 bg-secondary text-primary grid place-content-center rounded-lg"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft className="text-primary !size-4 sm:size-8 p-0" />
      </button>
      <button
        className="absolute z-10 top-1/2 -translate-y-1/2 -right-8 sm:-right-10 size-6 sm:size-9 bg-secondary text-primary grid place-content-center rounded-lg"
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight className="text-primary !size-4 sm:size-8 p-0" />
      </button>
      <CarouselBullets
        count={count}
        current={current}
        onBulletClick={(index) => api?.scrollTo(index)}
        className="-bottom-8"
      />
    </Carousel>
  );
};
