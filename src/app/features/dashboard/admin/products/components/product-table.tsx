"use client";

import React, { useState } from "react";

import { useGetProducts } from "../api/use-get-products";

import { ProdutctDataTable } from "./products-data-table";
import { columns } from "./products-table-data-column";
import SmartPagination from "@/components/smart-pagination";
import { Loader2 } from "lucide-react";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const { data, status } = useGetProducts({ page });
  if (status === "pending")
    return (
      <div className="flex items-center justify-center mt-45">
        <Loader2 className="animate-spin size-9" />
      </div>
    );

  if (status !== "success") return null;

  return (
    <>
      <ProdutctDataTable columns={columns} data={data.products} />
      {/* pagination */}
      <SmartPagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.countAllPages}
        countPages={3}
      />
    </>
  );
}
