import {
  Home,
  Files,
  ShoppingBag,
  BookText,
  LucideIcon,
  PackageOpen,
  UserLock,
  SendToBack,
  MessageSquareText,
  ShoppingBasket,
} from "lucide-react";

import { Product, simpleProduct, variantProduct } from "./admin/products/types";

import ProductAttributes from "./admin/products/components/attribute/product-attributes";
import ProductVariantForm from "./admin/products/components/variant/product-variant-form";
import ProductVariantsData from "./admin/products/components/variant/product-variants-data";
import ProductSpecifications from "./admin/products/components/specification/product-specifications";
import RelatedProducts from "./admin/products/components/related-products/related-products";
import React from "react";
import ProductSimplePricingForm from "./admin/products/components/product-simple-pricing-form";

type Route = {
  title: string;
  icon: LucideIcon;
  url: string;
  subRoutes?: SubRoute[];
};
type SubRoute = {
  title: string;
  url: string;
  subRoutes?: SubRoute[];
};

export const navigationData: Route[] = [
  {
    title: "داشبورد",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "سبد خرید",
    icon: ShoppingBasket,
    url: "/dashboard/checkout",
  },
  {
    title: "پروژه ها",
    icon: Files,
    url: "/dashboard/projects",
  },
  {
    title: "خرید های قبلی",
    icon: ShoppingBag,
    url: "/dashboard/shop-history",
  },
];
export const adminNavData: Route[] = [
  {
    title: "مدیریت مطالب",
    icon: BookText,
    url: "/dashboard/admin/blogs",
    subRoutes: [
      {
        title: "مطلب",
        url: "/dashboard/admin/blogs/*",
      },
    ],
  },
  {
    title: "مدیریت محصولات",
    icon: PackageOpen,
    url: "/dashboard/admin/products",
    subRoutes: [
      {
        title: "محصول",
        url: "/dashboard/admin/products/*",
      },
    ],
  },
  {
    title: "مدیریت دسترسی ها",
    icon: UserLock,
    url: "/dashboard/admin/permissions",
  },
  {
    title: "مدیریت دسته بندی ها",
    icon: SendToBack,
    url: "/dashboard/admin/categories",
  },
  {
    title: "مدیریت نظرات",
    icon: MessageSquareText,
    url: "/dashboard/admin/comments",
  },
];

export const generateNavigateUrlList = ({
  path,
  result = [],
  serachList,
}: {
  path: string;
  serachList: Route[] | SubRoute[];
  result?: { url: string; title: string }[];
}): { url: string; title: string }[] => {
  // to store url that matches with Route URL Scheme
  let urlReference = "";

  // routes searching
  const route = serachList.find((data) => {
    // all exceptions
    if (data.url === "/dashboard") {
      return path === data.url;
    }

    if (data.url.match(/.*\/\*$/)) {
      if (path.length >= data.url.length) {
        const sliceIndex = path.lastIndexOf("/");
        const slicedPath = path.slice(0, sliceIndex);

        if (data.url.includes(slicedPath)) {
          // wherever ends with (/*) store entire path in result ---can result in some bugs---
          urlReference = path;
          return true;
        }
        return false;
      }
    }

    return path.includes(data.url);
  });

  if (route) {
    const url = urlReference ? urlReference : route.url;

    if (route.subRoutes)
      return generateNavigateUrlList({
        path,
        result: [...result, { title: route.title, url }],
        serachList: route.subRoutes,
      });
    else return [...result, { title: route.title, url }];
  }

  return result;
};

export const createProductAdditonalFormsList: {
  title: string;
  query: string;
  component:
    | ((props: { product: Product }) => React.ReactNode)
    | (() => React.ReactNode);
  productType: (1 | 2)[];
}[] = [
  {
    title: "شاخصه ها",
    query: "attributes",
    component: ProductAttributes,
    productType: [variantProduct],
  },
  {
    title: "قیمت گذاری",
    query: "pricing-variant",
    component: ProductVariantForm,
    productType: [variantProduct],
  },
  {
    title: "قیمت گذاری",
    query: "pricing-simple",
    component: ProductSimplePricingForm,
    productType: [simpleProduct],
  },
  {
    title: "جدول واریانت ها",
    query: "variants",
    component: ProductVariantsData,
    productType: [variantProduct],
  },
  {
    title: "توضیحات تکمیلی",
    query: "specifications",
    component: ProductSpecifications,
    productType: [simpleProduct, variantProduct],
  },
  {
    title: "محصولات مرتبط",
    query: "related-products",
    component: RelatedProducts,
    productType: [simpleProduct, variantProduct],
  },
];
