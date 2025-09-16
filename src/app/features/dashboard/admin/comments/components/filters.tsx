"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import { useFilterState } from "../hooks/use-filter-state";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    input: productIdInput,
    debouncedValue: productIdDebouncedValue,
    setInput: productIdSetInput,
  } = useFilterState(searchParams.get("ProductId") ?? "");

  const {
    input: userIdInput,
    debouncedValue: userIdDebouncedValue,
    setInput: userIdSetInput,
  } = useFilterState(searchParams.get("UserId") ?? "");

  const {
    input: pageInput,
    debouncedValue: pageDebouncedValue,
    setInput: pageSetInput,
  } = useFilterState(searchParams.get("Page") ?? "");

  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const queryObj = queryString.parse(searchParams.toString());
    queryObj.Page = pageDebouncedValue;
    queryObj.UserId = userIdDebouncedValue;
    queryObj.ProductId = productIdDebouncedValue;
    queryObj.Confirmation = `${isConfirmed}`;
    const url = `/dashboard/admin/comments?${queryString.stringify(queryObj, {
      skipEmptyString: true,
    })}`;
    router.push(url);
  }, [
    pageDebouncedValue,
    userIdDebouncedValue,
    productIdDebouncedValue,
    isConfirmed,
    router,
    searchParams,
  ]);

  return (
    <div dir="rtl" className="w-full flex flex-wrap items-center gap-2">
      <Input
        value={productIdInput}
        onChange={(ev) => productIdSetInput(ev.target.value)}
        placeholder="شناسه محصول"
        className="w-40 bg-white"
      />
      <Input
        value={userIdInput}
        onChange={(ev) => userIdSetInput(ev.target.value)}
        placeholder="شناسه کاربر"
        className="w-40 bg-white"
      />
      <Input
        value={pageInput}
        onChange={(ev) => pageSetInput(ev.target.value)}
        type="number"
        placeholder="شماره صفحه"
        className="w-26 bg-white"
      />
      <Button onClick={() => setIsConfirmed((prev) => !prev)} size="sm">
        {isConfirmed ? "تایید شده  ها" : "در انتظار تایید"}
      </Button>
    </div>
  );
}
