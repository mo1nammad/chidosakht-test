import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function ManageBlogsPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 flex flex-row-reverse">
        <Link
          href="/dashboard/admin/blogs/create"
          className={cn(buttonVariants({}))}
        >
          ساخت مطلب
        </Link>
      </div>
    </div>
  );
}
