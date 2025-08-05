import React from "react";

import CategoryFlow from "@/app/features/dashboard/admin/categories/components/category-flow";
import CategoryContextWrapper from "@/app/features/dashboard/admin/categories/components/category-context";
import CategoryActions from "@/app/features/dashboard/admin/categories/components/category-actions";

export default function AdminCategoriesPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <h1 className="text-lg font-semibold mb-1.5">ساختار دسته بندی ها</h1>
        <p className="mb-4.5 text-sm text-muted-foreground">
          ابتدا یکی از دسته بندی هایی که در گراف بالا وجود دارد را با دابل کلیک
          انتخاب کنید سپس می توانید هر عملیات مورد نظر خود را بر دسته بندی مورد
          نظر اعمال کنید
        </p>
        <CategoryContextWrapper>
          <CategoryFlow />
          <h5 className="mt-4 font-semibold ">پیام برنامه نویس</h5>
          <p className="bg-amber-300 w-fit ml-auto">
            در ساخت دسته بندی ها دقت کنید که اسامی ایجاد شده همسان نباشند در غیر
            این صورت احتمال به وجود آمدن باگ پیش بینی نشده وجود دارد
          </p>
          <CategoryActions />{" "}
        </CategoryContextWrapper>
      </div>
    </div>
  );
}
