import React from "react";

import CategoryFlow from "@/app/features/dashboard/admin/categories/components/category-flow";
import CategoryContextWrapper from "@/app/features/dashboard/admin/categories/components/category-context";
import CategoryActions from "@/app/features/dashboard/admin/categories/components/category-actions";

export default function AdminCategoriesPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <h1 className="text-lg font-semibold mb-1.5">ساختار دسته بندی ها</h1>
        <CategoryContextWrapper>
          <CategoryFlow />
          <p className="mt-4.5 text-sm">
            ابتدا یکی از دسته بندی هایی که در گراف بالا وجود دارد را با دابل
            کلیک انتخاب کنید سپس می توانید هر عملیات مورد نظر خود را بر دسته
            بندی مورد نظر اعمال کنید
          </p>
          <CategoryActions />{" "}
        </CategoryContextWrapper>
      </div>
    </div>
  );
}
