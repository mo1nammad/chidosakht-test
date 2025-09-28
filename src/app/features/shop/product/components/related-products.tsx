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
import { useRelatedProducts } from "../api/use-related-products";
import { Skeleton } from "@/components/ui/skeleton";
import CustomHeader from "../../components/custom-header";
import { cn } from "@/lib/utils";

type AppProps = {
  className?: string;
};
export default function RelatedProducts({ className }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { data: relatedProducts, status } = useRelatedProducts();
  const pendingArray = new Array(5).fill(null);

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
    <div
      className={cn(
        "w-full h-full",
        relatedProducts && relatedProducts.length < 1 && "hidden"
      )}
    >
      <CustomHeader className="px-12 pb-2.5 mb-11">محصولات مرتبط</CustomHeader>

      <Carousel
        setApi={setApi}
        dir="rtl"
        className={className}
        orientation={isTablet ? "vertical" : "horizontal"}
        opts={{
          direction: "rtl",
        }}
      >
        <CarouselContent className="h-105 md:h-auto">
          {status === "success"
            ? // success
              relatedProducts.map((product) => (
                <CarouselItem key={product.id} className="basis-36 md:basis-69">
                  <ProductCard product={product} />
                </CarouselItem>
              ))
            : status === "pending"
            ? // pending
              pendingArray.map((_item, i) => (
                <CarouselItem key={i} className="basis-36 md:basis-78">
                  <Skeleton className="size-full md:w-69 md:h-86" />
                </CarouselItem>
              ))
            : null}
        </CarouselContent>
        <CarouselBullets
          count={count}
          current={current}
          onBulletClick={(index) => api?.scrollTo(index)}
          className="bottom-4 md:hidden"
        />
      </Carousel>
    </div>
  );
}
