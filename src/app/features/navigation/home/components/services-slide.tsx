import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type ServicesSlideProps = {
  src: string;
  title: string;
};

export const ServicesSlide = ({ src, title }: ServicesSlideProps) => {
  return (
    <Card className="w-full h-fit drop-shadow-md border-none group">
      <CardContent className="p-1 sm:p-2">
        <Image
          src={src}
          width={250}
          height={150}
          alt="slider image"
          className="rounded-lg w-full"
        />
        <h6 className="text-xs sm:text-base text-center py-2 sm:py-3 group-hover:text-primary transition cursor-default">
          {title}
        </h6>
      </CardContent>
    </Card>
  );
};
