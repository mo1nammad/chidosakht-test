import React, { useState } from "react";

import ProductVariantsSelect from "./product-variants-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import VariantModification from "./variant-modifications";

import { VariantType } from "../types";
import { useVariantsStore } from "../store/variants";

export default function ProductVariants() {
  // store
  const createVariant = useVariantsStore((state) => state.addVariant);

  const [selectType, setSelectType] = useState<VariantType>("select");
  const [label, setLabel] = useState("");

  return (
    <div>
      <h5 className="text-2xl font-yekan-semibold">ایجاد واریانت</h5>
      <div className="flex flex-row-reverse mt-5 gap-x-4 items-end">
        <div>
          <Label htmlFor="tag">برچسب</Label>
          <Input
            value={label}
            onChange={(ev) => setLabel(ev.target.value)}
            className="bg-white max-w-65 text-right"
            id="tag"
          />
        </div>
        <div>
          <Label>نوع</Label>
          <ProductVariantsSelect
            value={selectType}
            onChange={(val) => setSelectType(val)}
          />
        </div>

        <Button
          type="button"
          className="h-8.5"
          variant={"secondary"}
          onClick={() => createVariant(label, selectType)}
        >
          اضافه کردن
        </Button>
      </div>

      {/* modify variants */}

      <VariantModification />
    </div>
  );
}
