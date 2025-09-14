"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Product } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type AppProps = {
  images: Product["productImages"];
  indexImageName: Product["nameIndexImage"];
  alt: Product["imageAltText"];
};

export default function ProductGallery({
  images,
  indexImageName,
  alt,
}: AppProps) {
  const [selectedImage, setSelectedImage] = useState(indexImageName);
  const [render, setRender] = useState(false);

  const isTablet = useMediaQuery({
    maxWidth: 768,
  });

  const imageUrl = images.find((image) => image.name === selectedImage);

  useEffect(() => {
    setRender(true);
  }, []);

  return render ? (
    <div className="flex flex-col md:flex-row w-full md:w-3/6 md:items-center md:max-h-106">
      <div className="w-full h-87.5 md:size-full ">
        <Image
          src={imageUrl?.url ?? ""}
          alt={alt ?? "تصویر محصول"}
          width={1024}
          height={1024}
          className="size-full object-contain"
        />
      </div>
      <Carousel
        orientation={isTablet ? "horizontal" : "vertical"}
        className="mt-3"
      >
        <CarouselContent className="-ml-4 md:-ml-0 p-4 md:h-100 md:w-26 lg:w-33">
          {images.map((image) => (
            <CarouselItem
              key={image.id}
              className="basis-1/4 md:h-1/4 lg:basis-1/3 lg:h-1/3 pl-4 md:pl-0"
            >
              <button
                className={cn(
                  "size-full rounded-[9px] overflow-hidden cursor-pointer transition",
                  selectedImage === image.name && "ring-4 ring-primary"
                )}
                onClick={() => setSelectedImage(image.name)}
              >
                <Image
                  src={image.url}
                  alt={alt ?? "تصویر محصول"}
                  width={1024}
                  height={1024}
                  className="size-full object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-md:-left-1 md:-top-4" />
        <CarouselNext className="max-md:-right-1 md:-bottom-4" />
      </Carousel>
    </div>
  ) : null;
}
