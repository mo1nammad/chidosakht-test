import React, { Suspense } from "react";

import CommentsSection from "@/app/features/dashboard/admin/comments/components/comments-section";

export default function ManageCommentsPage() {
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <h3 className="text-lg font-semibold">مدیریت نظرات</h3>
        <Suspense>
          <CommentsSection />
        </Suspense>
      </div>
    </div>
  );
}
