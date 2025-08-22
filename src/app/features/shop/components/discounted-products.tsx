"use client";
import { useMediaQuery } from "react-responsive";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./product-card";

type AppProps = {
  className?: string;
};
export default function DiscountedProducts({ className }: AppProps) {
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const items = [1, 2, 3, 4, 5]; // example array

  return (
    <Carousel
      dir="ltr"
      className={className}
      orientation={isTablet ? "vertical" : "horizontal"}
      opts={{
        align: "start",
        loop: false,
        startIndex: items.length - 1, // 👈 start at last item
      }}
    >
      <CarouselContent>
        {items.map((item, i) => (
          <CarouselItem key={i} className="basis-69">
            <ProductCard />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
