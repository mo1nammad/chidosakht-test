import React from "react";

import CreateBlogForm from "@/app/features/dashboard/admin/components/create-blog-form";
import { getSession } from "@/app/features/auth/server/actions";
import { redirect } from "next/navigation";
export default async function CreateBlogsPage() {
  const session = await getSession();
  if (!session || !session.userId) return redirect("/");

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right space-y-2.5">
        {/* container */}

        <h3 className="text-lg sm:text-2xl font-yekan-semibold">ایجاد مطلب</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          این قسمت برای ایجاد بلاگ های وبسایت است ابتدا فرم ایجاد وبسایت را پر
          کرده سپس روی دکمه ایجاد بلاگ کلیک کنید
        </p>

        <CreateBlogForm userId={session.userId} />
      </div>
    </div>
  );
}
