import React from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

import RoleSection from "@/app/features/dashboard/admin/permissions/components/role-section";

export default async function PermissionPage() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto py-10 text-right">
        <h3 className="text-lg font-semibold">مدیریت نقش ها</h3>
        <RoleSection />
      </div>
    </div>
  );
}
