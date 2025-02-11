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
    <div className="flex flex-col w-full group">
      <div className="rounded-2xl overflow-hidden">
        <Image
          alt="project-image"
          width={261}
          height={215}
          src={src}
          className="w-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <Button
          size="icon"
          variant="tertiary"
          className="text-primary max-sm:size-6 sm:[&_svg]:size-auto"
        >
          <ChevronLeft />
        </Button>
        <div className="text-right space-y-0.5">
          <h6 className="text-xs sm:text-sm font-yekan-semibold group-hover:text-primary">
            {title}
          </h6>
          <p className="text-[10px] sm:text-xs text-[#a5a5a5]">{description}</p>
        </div>
      </div>
    </div>
  );
};
