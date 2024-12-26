"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { ProjectsSlide, ProjectsSlideProps } from "./projects-slide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

type ProjectsSliderProps = {
  data: ProjectsSlideProps[];
};
export const ProjectsSlider = ({ data }: ProjectsSliderProps) => {
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  return (
    <div className={cn(isSwiperLoaded ? "block" : "hidden")}>
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        modules={[Pagination]}
        style={{
          padding: "40px 0",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "bullet-active",
          bulletClass: "all-bullets",
        }}
        onSwiper={() => setIsSwiperLoaded(true)}
        breakpoints={{
          1145: {
            slidesPerView: data.length,
          },
          850: {
            slidesPerView: 3,
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
        }}
      >
        {/* slides */}
        {data.map((props, index) => (
          <SwiperSlide key={index}>
            <ProjectsSlide {...props} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
