import {
  Home,
  Files,
  Megaphone,
  ShoppingBag,
  BookText,
  LucideIcon,
  PackageOpen,
  UserLock,
  SendToBack,
} from "lucide-react";

import ProductPricingForm from "./admin/products/components/product-pricing-form";
import ProductAttributes from "./admin/products/components/product-attributes";

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
    title: "پروژه ها",
    icon: Files,
    url: "/dashboard/projects",
  },
  {
    title: "گزارشات",
    icon: Megaphone,
    url: "/dashboard/reports",
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

export const createProductAdditonalFormsList = [
  {
    title: "قیمت گذاری",
    query: "pricing",
    component: ProductPricingForm,
  },
  {
    title: "شاخصه ها",
    query: "attributes",
    component: ProductAttributes,
  },
  {
    title: "حمل و نقل",
    query: "transportation",
    component: ProductPricingForm,
  },
];
