"use client";

import React from "react";

import { Switch } from "@/components/ui/switch";
import { useFilterQuery } from "../hooks/use-filter-query";

export default function AvailablityFilter() {
  const [isAvailable, setIsAvailable] = React.useState(false);

  useFilterQuery({
    OnlyAvailableGoods: isAvailable,
  });

  return (
    <div className="bg-muted w-full flex justify-between pl-4 pr-4.5 py-4 rounded-xl">
      <div className="flex items-center justify-center gap-x-2.5 font-medium">
        <Switch
          checked={isAvailable}
          onCheckedChange={(val) => setIsAvailable(val)}
        />
      </div>
      <button
        onClick={() => setIsAvailable((prev) => !prev)}
        className="flex items-center justify-center gap-x-2 text-sm font-normal [&>svg]:size-4 cursor-pointer"
      >
        نمایش کالاهای موجود
      </button>
    </div>
  );
}
