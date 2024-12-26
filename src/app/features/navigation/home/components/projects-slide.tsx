import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export type ProjectsSlideProps = {
  src: string;
  title: string;
  description: string;
};

export const ProjectsSlide = ({
  src,
  title,
  description,
}: ProjectsSlideProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="rounded-2xl overflow-hidden">
        <Image
          alt="project-image"
          width={261}
          height={215}
          src={src}
          className="w-full object-cover"
        />
      </div>
      <div className="flex justify-between mt-5">
        <Button
          size="icon"
          variant="secondary"
          className="text-primary [&_svg]:size-auto"
        >
          <ChevronLeft />
        </Button>
        <div className="text-right space-y-0.5">
          <h6 className="text-sm font-yekan-semibold">{title}</h6>
          <p className="text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
};
