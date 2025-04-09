import React, { useState } from "react";

import ProductAttributeSelect from "./product-attributes-select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import AttributeModification from "./attributes-modifications";

import { AttributeType } from "../types";
import { useAttributesStore } from "../store/attributes";

export default function ProductAttributes() {
  // store
  const createAttribute = useAttributesStore((state) => state.addAttribute);

  const [selectType, setSelectType] = useState<AttributeType>("select");
  const [label, setLabel] = useState("");

  return (
    <div>
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
          <ProductAttributeSelect
            value={selectType}
            onChange={(val) => setSelectType(val)}
          />
        </div>

        <Button
          type="button"
          className="h-8.5"
          variant={"secondary"}
          onClick={() => {
            if (!label) return;
            createAttribute(label, selectType);
          }}
          disabled={!label}
        >
          اضافه کردن
        </Button>
      </div>

      {/* modify Attribute */}

      <AttributeModification />

      <p className="text-sm bg-amber-300 w-fit mt-4 ml-auto mb-4">
        بعد از ثبت شاخصه ها و فرم مربوط به محصولات وارد قسمت قیمت گذاری شوید
      </p>
    </div>
  );
}
