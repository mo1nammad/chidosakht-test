"use client";
import { useMediaQuery } from "react-responsive";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "$/shop/components/product-card";
import { useEffect, useState } from "react";
import { CarouselBullets } from "@/components/carousel-bullets";

type AppProps = {
  className?: string;
};
export default function RelatedProducts({ className }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const items = [1, 2, 3, 4, 5]; // example array

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) return null;

  return (
    <Carousel
      setApi={setApi}
      dir="ltr"
      className={className}
      orientation={isTablet ? "vertical" : "horizontal"}
      opts={{
        align: "start",
        loop: false,
        startIndex: isTablet ? 0 : items.length - 1, // 👈 start at last item
      }}
    >
      <CarouselContent className="h-105 md:h-auto">
        {items.map((item, i) => (
          <CarouselItem key={i} className="basis-36 md:basis-69">
            <ProductCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselBullets
        count={count}
        current={current}
        onBulletClick={(index) => api?.scrollTo(index)}
        className="bottom-4 md:hidden"
      />
    </Carousel>
  );
}
