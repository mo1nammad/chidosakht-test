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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge, BadgeCheck, X } from "lucide-react";
import { useDeleteImage } from "../api/image/use-delete-image";
import { useParams } from "next/navigation";
import { useUpdateProductImageIndex } from "../api/image/use-update-product-image-index";
import { cn } from "@/lib/utils";

type AppProps = {
  imageList: {
    id: number;
    name: string;
    url: string;
    isIndex: boolean;
  }[];
};

const ProductGalleryCarousel = ({ imageList }: AppProps) => {
  const { productId } = useParams();
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { mutate: deleteImage, isPending } = useDeleteImage(
    productId as string
  );
  const { mutate: updateImageIndex } = useUpdateProductImageIndex();

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
      <div className="bg-background rounded-md mt-3.5 border w-full h-32 my-4 grid place-content-center text-muted-foreground">
        هیچ عکسی موجود نیست
      </div>
    );

  return (
    <div className="bg-background p-3 mx-auto my-4 rounded-[30px] max-w-[1210px] ">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {imageList.map((image) => {
            return (
              <CarouselItem
                key={image.id}
                className="basis-[150px] overflow-hidden relative"
              >
                <Image
                  src={image.url}
                  alt="admin-product-image"
                  width={127}
                  height={179}
                  className="w-full h-full rounded-lg object-cover"
                />
                <div className="absolute top-0.5 right-0.5 flex items-center gap-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "bg-white/80 cursor-pointer rounded-full size-5 flex items-center justify-center hover:bg-white",
                          image.isIndex &&
                            "bg-green-500 text-green-100 hover:text-black"
                        )}
                        onClick={() =>
                          updateImageIndex({
                            name: image.name,
                            productId: Number(productId),
                          })
                        }
                        disabled={isPending}
                      >
                        {image.isIndex ? (
                          <BadgeCheck className="size-3" />
                        ) : (
                          <Badge className="size-3" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تنظیم به عنوان شاخص</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="bg-white/80 cursor-pointer rounded-full size-5 flex items-center justify-center hover:bg-white"
                        onClick={() => deleteImage(image.name)}
                        disabled={isPending}
                      >
                        <X className="size-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>حذف تصویر</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
