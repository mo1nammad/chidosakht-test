"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type CommentsSliderProps = {
  data: {
    name: string;
    description: string;
    avatar?: string;
  }[];
};
export const CommentsSlider = ({ data }: CommentsSliderProps) => {
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  return (
    <div className={cn(isSwiperLoaded ? "block" : "hidden")}>
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        onSwiper={() => setIsSwiperLoaded(true)}
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={6000}
        breakpoints={{
          1145: {
            slidesPerView: 3,
          },
          850: {
            slidesPerView: 2,
          },
          680: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
        }}
      >
        {/* slides */}
        {data.map((props, index) => (
          <SwiperSlide key={index}>
            <Card>
              <div className="flex flex-col-reverse sm:flex-row items-center gap-4 p-4 sm:p-7 pr-5">
                <div className="text-center sm:text-right space-y-3">
                  <h5 className="text-sm sm:text-base">{props.name}</h5>
                  <p className="text-[10px] sm:text-xs text-[#a5a5a5] leading-5">
                    {props.description}
                  </p>
                </div>
                <Image
                  src={
                    // TODO :update avatars
                    props.avatar ? props.avatar : "/home/comments-profile.png"
                  }
                  alt="comment profile"
                  width={95}
                  height={95}
                  className="size-[75px] sm:size-[95px]"
                />
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
