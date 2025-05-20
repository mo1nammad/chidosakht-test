import React from "react";
import CategoryFlow from "@/app/features/dashboard/admin/categories/components/category-flow";
export default function AdminCategoriesPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <h1 className="text-lg font-semibold mb-1.5">ساختار دسته بندی</h1>
        <CategoryFlow />
      </div>
    </div>
  );
}
