"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const HeroImage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Avoid rendering until the client-side is fully initialized
    return (
      <div className="relative w-full sm:w-fit h-[340px] sm:h-[600px] overflow-hidden"></div>
    );
  }

  return (
    <div className="relative w-full sm:w-fit h-[340px] sm:h-[600px] overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 sm:relative sm:top-0 sm:left-0 sm:translate-x-0 size-[300px] sm:size-[600px] z-10"
        style={{
          background:
            "linear-gradient(#ffffff 1.7000000000000002px,transparent 1.7000000000000002px), linear-gradient(to right,#ffffff 1.7000000000000002px, #00000000 1.7000000000000002px)",
          backgroundColor: "#00000000",
          backgroundSize: isMobile ? "25px 25px" : "40px 40px",
          opacity: 0.8,
        }}
      />
      <div className="size-[200px] sm:size-[350] bg-primary/60 absolute left-[calc(50%+2px)] -translate-x-1/2 top-[70px] sm:top-28 sm:left-32 sm:translate-x-0 rounded-full blur-2xl"></div>
      <Image
        alt="hero section image"
        width={isMobile ? 300 : 450}
        height={isMobile ? 300 : 450}
        src={"/home/Fanavaran 1.png"}
        className="absolute left-1/2 -translate-x-1/2 top-7 sm:translate-x-0 sm:top-20 sm:left-[70px] z-20"
      />
    </div>
  );
};

export default HeroImage;
