import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  imageSrc: string;
};

export default function GalleryModal({ children, imageSrc }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[80vw] bg-muted border-none">
        <DialogHeader className="sr-only">
          <DialogTitle>گواهینامه ها</DialogTitle>
        </DialogHeader>

        <Image
          src={imageSrc}
          alt="license image"
          width={500}
          height={1500}
          className="w-full h-full"
        />
      </DialogContent>
    </Dialog>
  );
}
