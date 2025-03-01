"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselBullets } from "@/components/carousel-bullets";

type AppProps = {
  imageList: {
    id: number;
    url: string;
  }[];
  alt: string;
};

const ProductGalleryCarousel = ({ imageList, alt }: AppProps) => {
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

  if (imageList.length === 0)
    return (
      <div className="bg-background rounded-md mt-3.5 border w-full h-32 grid place-content-center text-muted-foreground">
        هیچ عکسی موجود نیست
      </div>
    );

  return (
    <div className="bg-muted p-3 rounded-[30px] max-w-[1210px] mx-auto">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {imageList.map((image) => {
            return (
              <CarouselItem
                key={image.id}
                className="basis-[150px] overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={alt}
                  width={127}
                  height={179}
                  className="w-full rounded-lg"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselBullets
          count={count}
          current={current}
          onBulletClick={(index) => api?.scrollTo(index)}
          className="-bottom-6"
        />
      </Carousel>
    </div>
  );
};

export default ProductGalleryCarousel;
