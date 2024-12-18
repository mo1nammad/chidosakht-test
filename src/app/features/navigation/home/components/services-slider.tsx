"use client";
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ServicesSlide } from "./services-slide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ServicesSliderProps = {
  data: {
    src: string;
    title: string;
  }[];
};
export const ServicesSlider = ({ data }: ServicesSliderProps) => {
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={cn(isSwiperLoaded ? "block" : "hidden")}>
      {/* custom next and prev buttons */}
      <Button
        ref={prevBtnRef}
        className="absolute z-10 top-1/2 -translate-y-1/2 -left-10 sm:-left-5 [&_svg]:size-auto"
        size={"icon"}
        variant={"secondary"}
      >
        <ChevronLeft className="text-primary" />
      </Button>
      <Button
        ref={nextBtnRef}
        className="absolute z-10 top-1/2 -translate-y-1/2 -right-10 sm:-right-5 [&_svg]:size-auto"
        size={"icon"}
        variant={"secondary"}
      >
        <ChevronRight className="text-primary" />
      </Button>

      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        height={240}
        modules={[Navigation]}
        navigation={{ nextEl: nextBtnRef.current, prevEl: prevBtnRef.current }}
        onBeforeInit={(swiper) => {
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevBtnRef.current;
            swiper.params.navigation.nextEl = nextBtnRef.current;
          }
        }}
        onSwiper={() => setIsSwiperLoaded(true)}
        breakpoints={{
          1024: {
            slidesPerView: data.length,
          },
          768: {
            slidesPerView: 3,
          },
          647: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }}
      >
        {/* slides */}
        {data.map((props, index) => (
          <SwiperSlide key={index}>
            <ServicesSlide {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
