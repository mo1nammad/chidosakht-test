import { CreateProductDrawerDialog } from "@/app/features/dashboard/admin/products/components/create-product-drawer-dialog";
import React from "react";

export default async function ManageBlogsPage() {
  return (
    <div className="flex flex-row-reverse">
      <CreateProductDrawerDialog />
    </div>
  );
}
