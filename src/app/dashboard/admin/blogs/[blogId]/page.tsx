import React from "react";

import BlogForm from "@/app/features/dashboard/admin/components/blog-form";
import { getSession } from "@/app/features/auth/server/actions";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    blogId: string;
  }>;
};

export default async function BlogPage({ params }: Props) {
  const session = await getSession();
  if (!session || !session.userId) return redirect("/");
  const { blogId } = await params;
  console.log(blogId);

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right space-y-2.5">
        {/* container */}

        <h3 className="text-lg sm:text-2xl font-yekan-semibold">مطلب</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          این قسمت برای تغییرات مطلب های وبسایت است ابتدا فرم ایجاد وبسایت را پر
          کرده سپس روی دکمه ثبت مطلب کلیک کنید
        </p>

        <BlogForm blogId={blogId} />
      </div>
    </div>
  );
}
