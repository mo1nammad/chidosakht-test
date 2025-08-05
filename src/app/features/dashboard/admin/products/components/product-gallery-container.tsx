import React from "react";
import { useParams } from "next/navigation";

import { useGetProductImages } from "../api/image/use-get-product-images";

import ProductGalleryCarousel from "./product-gallery-carousel";
import ProductGalleryDropzone from "./product-gallery-dropzone";

export default function ProductGalleryContainer() {
  const { productId } = useParams();
  const { data: Images, status } = useGetProductImages(productId as string);

  //   success
  if (status === "success")
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">گالری تصاویر</h2>
        <ProductGalleryDropzone />
        <ProductGalleryCarousel imageList={Images} />
      </div>
    );
}
