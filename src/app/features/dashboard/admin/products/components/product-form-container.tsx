"use client";

import React from "react";
import Link from "next/link";

import { useGetProduct } from "../api/use-get-product";

import { buttonVariants } from "@/components/ui/button";
import ProductBodyForm from "./product-body-form";
import ProductGalleryContainer from "./product-gallery-container";
import ProductAdditionals from "./product-additionals";
import ProductCategory from "./product-category";

// component
export default function ProductForm() {
  // retrieve product logic
  const { data: product, status } = useGetProduct();

  if (status === "error") {
    return (
      <div className="w-full flex flex-col items-center justify-center h-125 gap-1.5">
        <h1 className="text-2xl font-yekan-semibold">این محصول وجود ندارد</h1>
        <Link className={buttonVariants()} href={"/dashboard/admin/products"}>
          بازگشت
        </Link>
      </div>
    );
  }

  if (status === "success" && product.id) {
    return (
      <div className="text-right">
        <h3 className="font-semibold text-xl mb-4">فرم بدنه محصول</h3>
        <div className="text-right flex flex-col gap-1">
          <ProductBodyForm
            label="نام محصول"
            name="name"
            forApi="/Admin/Product/SetName"
            defaultValue={product.name}
            registerOption={{
              minLength: {
                message: "حداقل 4 کاراکتر ورودی الزامی است",
                value: 4,
              },
              maxLength: {
                message: "حداکثر 100 کاراکتر ورودی قابل قبول است",
                value: 100,
              },
              required: {
                message: "این فیلد الزامی است",
                value: true,
              },
            }}
          />
          <div className="mt-8">
            <ProductBodyForm
              label="توضیحات"
              name="description"
              forApi="/Admin/Product/SetDescription"
              defaultValue={product.description}
              registerOption={{
                maxLength: {
                  message: "حداکثر 300 کاراکتر ورودی قابل قبول است",
                  value: 300,
                },
              }}
              inputType="text-editor"
            />
          </div>

          <div className="mt-8 space-y-2.5">
            <ProductBodyForm
              label="پیوند یکتا"
              name="uniqeLink"
              forApi="/Admin/Product/SetUniqelink"
              defaultValue={product.uniqeLink}
              registerOption={{
                minLength: {
                  message: "حداقل 4 کاراکتر ورودی الزامی است",
                  value: 4,
                },
                maxLength: {
                  message: "حداکثر 100 کاراکتر ورودی قابل قبول است",
                  value: 100,
                },
              }}
              inputSize="sm"
            />
            <ProductBodyForm
              label="شناسه یکتا"
              name="uniCode"
              forApi="/Admin/Product/SetUniCode"
              defaultValue={product.uniCode}
              registerOption={{
                minLength: {
                  message: "حداقل 4 کاراکتر ورودی الزامی است",
                  value: 4,
                },
                maxLength: {
                  message: "حداکثر 50 کاراکتر ورودی قابل قبول است",
                  value: 50,
                },
              }}
              inputSize="sm"
            />
          </div>

          {/* gallery form */}
          <ProductGalleryContainer />

          {/* category */}
          <ProductCategory productCategoryId={product.categoryId} />
          {/* additional forms */}

          <div className="overflow-hidden mt-12 relative">
            <h2 className="text-lg mb-6 font-yekan-semibold">فرم های تکمیلی</h2>
            <ProductAdditionals product={product} />
          </div>
        </div>
      </div>
    );
  }
}
