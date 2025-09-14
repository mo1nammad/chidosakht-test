import React, { Suspense } from "react";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { Product } from "@/types";

import CategoryBreadcrumb from "$/shop/components/category-breadcrumb";
import Gallery from "$/shop/product/components/gallery";
import AttributeValues from "$/shop/product/components/attribute-values";
import AddToShoppingBag from "$/shop/product/components/add-to-shopping-bag";
import ProductTabs from "$/shop/product/components/product-tabs";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

type ProductPageProps = {
  params: Promise<{
    productId: string;
    uniqeName: string[];
  }>;
};

// server side api fetching
async function fetchProductData<T>(productId: string): Promise<T> {
  const request = await fetch(`${apiBaseUrl}/Product/${productId}`);
  const data = await request.json();
  return data;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  const productData = await fetchProductData<Product>(productId);

  return (
    <div className="max-w-7xl px-6 mx-auto relative">
      {/* breadcrumb */}
      <div className="w-full h-5 my-4 mt-6">
        <Suspense>
          <CategoryBreadcrumb
            categoryId={productData.categoryId.toString()}
            productName={productData.name}
          />
        </Suspense>
      </div>
      {/* gallery and shopping section */}
      <div className="flex flex-col md:flex-row-reverse">
        <Gallery
          alt={productData.imageAltText}
          images={productData.productImages}
          indexImageName={productData.nameIndexImage}
        />

        {/* ceo important */}
        <section className="flex flex-col md:w-3/6 h-fit">
          <div className="text-right border-t md:border-none border-gray-200 pt-4">
            <div className="flex flex-col gap-y-2 lg:flex-row-reverse lg:justify-between items-end lg:items-center">
              <h1 className="text-lg md:text-3xl font-bold truncate">
                {productData.name}
              </h1>
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

          <AttributeValues data={productData.attributeAndValues} />
          <AddToShoppingBag
            stock={productData.stock}
            price={productData.price}
          />
        </section>
      </div>
      {/* tabs */}
      <ProductTabs description={productData.description} />
    </div>
  );
}
