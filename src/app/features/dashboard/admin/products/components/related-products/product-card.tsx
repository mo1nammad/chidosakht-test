import React from "react";
import Image from "next/image";

import { cn, formatRIAL } from "@/lib/utils";
import { ProductToPick } from "../../types";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type AppProps = {
  product: ProductToPick;
  onChange?: (productId: number, action: "select" | "unselect") => void;
  selected?: boolean;
};
export default function ProductCard({ product, onChange, selected }: AppProps) {
  return (
    <Card
      onClick={() => onChange?.(product.id, !selected ? "select" : "unselect")}
      className="p-3 flex flex-row-reverse items-center gap-x-7 text-right"
    >
      <span className="text-sm md:text-base basis-20 line-clamp-1 truncate">
        {product.id}
      </span>
      <Image
        src={product.urlNameIndexImage}
        alt={product.imageAltText ?? "image index"}
        className="size-7 md:size-10 object-cover rounded-md"
        width={40}
        height={40}
      />
      <h6 className="basis-40 line-clamp-1 truncate text-xs md:text-sm">
        {product.name}
      </h6>
      <h6
        className={cn(
          "basis-20 text-xs hidden sm:block md:text-sm",
          !!product.specialPrice && "line-through"
        )}
      >
        {formatRIAL(product.price)}
      </h6>
      <h6 className="basis-20 hidden sm:block text-xs md:text-sm">
        {formatRIAL(product.specialPrice)}
      </h6>
      <Checkbox checked={selected} className="mr-auto size-5 cursor-pointer" />
    </Card>
  );
}
