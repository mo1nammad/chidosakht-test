import React from "react";

import { CreateProductDrawerDialog } from "@/app/features/dashboard/admin/products/components/create-product-drawer-dialog";
import ProductTable from "@/app/features/dashboard/admin/products/components/product-table";

export default async function ManageBlogsPage() {
  return (
    <div className="flex flex-col gap-y-3.5">
      <div className="flex flex-row-reverse">
        <CreateProductDrawerDialog />
      </div>
      <ProductTable />
    </div>
  );
}
