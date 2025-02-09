import React from "react";

import CreateBlogForm from "@/app/features/dashboard/admin/components/blog/create-blog-form";
export default function CreateBlogsPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right space-y-2.5">
        {/* container */}

        <h3 className="text-lg sm:text-2xl font-yekan-semibold">ایجاد مطلب</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          این قسمت برای ایجاد بلاگ های وبسایت است ابتدا فرم ایجاد وبسایت را پر
          کرده سپس روی دکمه ایجاد بلاگ کلیک کنید
        </p>

        <CreateBlogForm />
      </div>
    </div>
  );
}
