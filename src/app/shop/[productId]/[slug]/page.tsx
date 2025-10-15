import React, { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { FaRegCommentDots } from "react-icons/fa";

import { SERVER_API_URL } from "@/constant";

import { Product } from "@/types";

import CategoryBreadcrumb from "$/shop/components/category-breadcrumb";
import Gallery from "$/shop/product/components/gallery";
import AttributeValues from "$/shop/product/components/attribute-values";
import AddToCart from "@/app/features/shop/product/components/add-to-cart";
import ProductTabs from "$/shop/product/components/product-tabs";
import RelatedProducts from "$/shop/product/components/related-products";
import CommentForm from "$/shop/product/components/comment-form";
import Comments from "$/shop/product/components/comments";
import Image from "next/image";
import VariantContext from "@/app/features/shop/product/context/variant-context";

type ProductPageProps = {
  params: Promise<{
    productId: string;
    slug: string;
  }>;
};

// server side api fetching
async function fetchProductData<T>(productId: string): Promise<T | null> {
  try {
    const request = await fetch(`${SERVER_API_URL}/Product/${productId}`, {
      next: {
        revalidate: 60,
      },
    });
    if (!request.ok) return null;

    const data = await request.json();
    return data;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId, slug } = await params;

  const productData = await fetchProductData<Product>(productId);

  if (!productData) notFound();

  const apiSlug = productData.uniqeLink.trim();
  const safeSlug = encodeURIComponent(apiSlug);

  // Compare decoded browser slug with raw API slug
  if (decodeURIComponent(slug) !== apiSlug) {
    redirect(`/shop/${productId}/${safeSlug}`);
  }

  return (
    <div className="max-w-7xl px-6 mx-auto relative">
      {/* breadcrumb */}
      <div className="w-full h-fit my-4 mt-6">
        <Suspense>
          <CategoryBreadcrumb
            categoryId={productData.categoryId.toString()}
            productName={productData.name}
          />
        </Suspense>
      </div>
      {/* gallery and shopping section */}
      <div className="flex flex-col md:flex-row-reverse gap-x-6">
        <Gallery
          alt={productData.imageAltText}
          images={productData.productImages}
          indexImageName={productData.nameIndexImage}
        />

        {/* ceo important */}
        <section className="flex flex-col md:w-3/6 h-fit mr-auto">
          <div className="text-right border-t md:border-none border-gray-200 pt-4">
            <div className="flex flex-col gap-y-2 lg:flex-row-reverse lg:justify-between items-end lg:items-center">
              <h1 dir="rtl" className="text-lg md:text-3xl font-bold truncate">
                {productData.name}
              </h1>
              {/* seo index image */}
              <div className="sr-only relative">
                <Image
                  width={100}
                  height={100}
                  src={productData.urlNameIndexImage}
                  alt={productData.imageAltText ?? "تصویر محصول"}
                />
              </div>
              {/* <div className="hidden md:flex text-xs lg:text-sm items-center gap-2 h-4 -ml-1.5">
                <Star
                  fill="#FF9F0E"
                  className="text-transparent bg-[#FBF0E0] rounded-full p-2 size-8 mr-1"
                />
                <span>امتیاز 4.5</span>
                <div className="h-full w-px bg-gray-300" />
                <span>7 دیدگاه</span>
              </div> */}
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-xs md:text-sm gap-x-3">
                <BadgeCheck
                  className="size-5 text-white relative bottom-0.5"
                  fill="#2563EB"
                />
                <p>ضمانت اصالت و کیفیت کالا</p>
              </div>

              <div
                dir="rtl"
                className="flex items-center text-xs md:text-sm gap-x-1"
              >
                <p className="text-muted-foreground">برچسب:</p>
                <Link
                  target="_blank"
                  href={`/shop/search?CategoryId=${productData.categoryId}`}
                  className="text-primary"
                >
                  {productData.categoryName}
                </Link>
              </div>
            </div>
            <p
              dir="rtl"
              className="text-muted-foreground text-xs md:text-sm mt-2.5"
            >
              شناسه کالا :{" "}
              <span className="text-foreground">{productData.uniCode}</span>
            </p>
          </div>

          {/* add to purchase section */}
          <VariantContext product={productData}>
            <AttributeValues data={productData.attributeAndValues} />
            <AddToCart />
          </VariantContext>
        </section>
      </div>
      {/* tabs */}
      <ProductTabs
        description={productData.description}
        details={productData.specificationGroups}
      />

      <RelatedProducts className="pb-10 md:border-b border-gray-200" />
      {/* comment sections */}

      <section className="my-10 md:mt-3">
        <CommentForm />
        <div className="flex items-center justify-end gap-x-2 mb-6 mt-10 md:my-6">
          <h6 className="font-medium">نظرات کاربران</h6>
          <FaRegCommentDots size={20} className="text-primary" />
        </div>

        <Comments />
      </section>
    </div>
  );
}
