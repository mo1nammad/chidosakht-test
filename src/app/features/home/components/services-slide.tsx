import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type ServicesSlideProps = {
  src: string;
  title: string;
};

export const ServicesSlide = ({ src, title }: ServicesSlideProps) => {
  return (
    <Card className="w-full h-fit drop-shadow-md border-none">
      <CardContent className="mt-2 px-2 py-0">
        <Image
          src={src}
          width={250}
          height={150}
          alt="slider image"
          className="rounded-md w-full"
        />
        <h6 className="text-center py-4">{title}</h6>
      </CardContent>
    </Card>
  );
};
