"use client";
import { useState, useEffect } from "react";

import { teamGalleryData } from "@/app/features/navigation/about-us/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CarouselBullets } from "@/components/carousel-bullets";

const TeamGallery = () => {
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
    <Carousel setApi={setApi}>
      <CarouselContent className="-ml-16 lg:-ml-0">
        {teamGalleryData.map((member) => (
          <CarouselItem
            key={member.work}
            className="basis-[200px] pl-16 lg:pl-0 lg:basis-1/4 xl:basis-1/5 "
          >
            <div className="relative w-[180px] lg:w-[211px] h-48 lg:h-56 p-1.5 flex items-end">
              <Image
                src={member.imageSrc}
                alt="member image"
                width={211}
                height={225}
                className="-z-10 absolute inset-0 rounded-xl transition duration-300 grayscale hover:grayscale-0"
              />
              <div className="w-full h-1/4 bg-white/90 rounded-xl flex flex-col items-center justify-center">
                <h4 className="text-xs sm:text-sm">{member.name}</h4>
                <p className="text-[0.65rem] sm:text-xs text-muted-foreground">
                  {member.work}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets
        count={count}
        current={current}
        onBulletClick={(index) => api?.scrollTo(index)}
        className="-bottom-6.5"
      />
    </Carousel>
  );
};

export default TeamGallery;
