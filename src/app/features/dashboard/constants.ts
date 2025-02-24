import {
  Home,
  Files,
  Megaphone,
  ShoppingBag,
  BookText,
  LucideIcon,
  PackageOpen,
} from "lucide-react";

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
];

export const generateNavigateUrlList = ({
  path,
  result = [],
  serachList,
}: {
  path: string;
  serachList: Route[] | SubRoute[];
  result: { url: string; title: string }[];
}): { url: string; title: string }[] => {
  // routes searching
  const route = serachList.find((data) => {
    // all exceptions
    if (data.url === "/dashboard") {
      return path === data.url;
    }

    if (data.url.endsWith("/*")) {
      if (path.length >= data.url.length) {
        const sliceIndex = path.lastIndexOf("/");
        const slicedPath = path.slice(0, sliceIndex);

        if (data.url.includes(slicedPath)) {
          data.url = path;
          return true;
        }
        return false;
      }
    }

    return path.includes(data.url);
  });

  if (route) {
    if (route.subRoutes)
      return generateNavigateUrlList({
        path,
        result: [...result, { title: route.title, url: route.url }],
        serachList: route.subRoutes,
      });
    else return [...result, { title: route.title, url: route.url }];
  }

  return result;
};
