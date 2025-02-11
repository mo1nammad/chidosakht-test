"use client";

import { useEffect, useState } from "react";

import { ProjectsSlide, ProjectsSlideProps } from "./projects-slide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { CarouselBullets } from "@/components/carousel-bullets";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type ProjectsSliderProps = {
  data: ProjectsSlideProps[];
};
export const ProjectsSlider = ({ data }: ProjectsSliderProps) => {
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
    <Carousel setApi={setApi} className="max-w-[260px] mx-auto sm:max-w-full">
      <CarouselContent className="py-2 px-1 -ml-5">
        {data.map((props, index) => (
          <CarouselItem
            className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-5"
            key={index}
          >
            <ProjectsSlide {...props} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets
        count={count}
        current={current}
        onBulletClick={(index) => api?.scrollTo(index)}
        className="-bottom-6"
      />
    </Carousel>
  );
};
