"use client";
import React from "react";

import { useDebounce } from "@/hooks/use-debounced";

import CollapsableFilter from "./collapsible-filter";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RialToTuman from "@/components/rial-to-tuman";
import { useFilterQuery } from "../hooks/use-filter-query";
import { useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const minValue = 0;
  const maxValue = 10000000; //  10 milion tuman

  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("FromPrice");
  const toPrice = searchParams.get("ToPrice");

  const [minMaxValues, setMinMaxValues] = React.useState<number[]>([
    fromPrice ? Number(fromPrice) : minValue,
    toPrice ? Number(toPrice) : maxValue,
  ]);

  // to only call api on drag end
  const debouncedMinMaxValue = useDebounce({
    value: minMaxValues,
  });

  useFilterQuery({
    FromPrice: debouncedMinMaxValue[0],
    ToPrice: debouncedMinMaxValue[1],
  });

  return (
    <CollapsableFilter title="بازه قیمتی" defaultOpen={true}>
      <div className="flex flex-col gap-y-4">
        <Slider
          min={minValue}
          max={maxValue}
          value={minMaxValues}
          onValueChange={(values) => setMinMaxValues(values)}
        />

        <div className="flex flex-col mt-1">
          <div className="flex gap-x-7 flex-row-reverse items-center justify-between">
            <Label dir="rtl" htmlFor="fromPrice" className="line-clamp-1 w-25">
              قیمت از :
            </Label>
            <Input
              id="fromPrice"
              value={minMaxValues[0]}
              onChange={(ev) =>
                setMinMaxValues((prev) => [Number(ev.target.value), prev[1]])
              }
              className="focus-visible:ring-primary bg-white"
            />
          </div>
          {minMaxValues[0] > 10 && (
            <RialToTuman
              skipSlice
              price={minMaxValues[0]}
              className="flex flex-row-reverse gap-x-1.5 text-muted-foreground text-xs mr-auto ml-1 mt-1.5 max-w-[250px] truncate"
            />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex gap-x-7 flex-row-reverse items-center justify-between">
            <Label dir="rtl" htmlFor="fromPrice" className="line-clamp-1 w-25">
              قیمت تا :
            </Label>
            <Input
              id="fromPrice"
              value={minMaxValues[1]}
              onChange={(ev) =>
                setMinMaxValues((prev) => [prev[0], Number(ev.target.value)])
              }
              className="focus-visible:ring-primary bg-white"
            />
          </div>

          <RialToTuman
            skipSlice
            price={minMaxValues[1]}
            className="flex flex-row-reverse gap-x-1.5 text-muted-foreground text-xs mr-auto ml-1 mt-1.5 max-w-[250px] truncate"
          />
        </div>
      </div>
    </CollapsableFilter>
  );
}
