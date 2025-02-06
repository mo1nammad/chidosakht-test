import { Home, Files, Megaphone, ShoppingBag, BookText } from "lucide-react";

export const navigationData = [
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
export const adminNavData = [
  {
    title: "مدیریت مطالب",
    icon: BookText,
    url: "/dashboard/admin/blogs",
  },
];
