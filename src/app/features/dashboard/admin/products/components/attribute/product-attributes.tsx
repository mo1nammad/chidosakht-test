import React, { useState } from "react";

import { useCreateAttribute } from "../../api/attribute/use-create-attribute";

import ProductAttributeSelect from "./product-attributes-select";
import AttributeModification from "./attributes-modifications";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/loader";

export default function ProductAttributes() {
  const { mutate: postAttribute, isPending } = useCreateAttribute();
  const [attributeType, setAttributeType] = useState<"1" | "2">("1");
  const [name, setName] = useState("");

  const handleCreateAttribute = () => {
    if (!name) return;

    postAttribute({
      name,
      attributeType: Number(attributeType) as 1 | 2,
    });
  };

  return (
    <div>
      <div className="flex flex-row-reverse mt-5 gap-x-4 items-end">
        <div>
          <Label htmlFor="tag">برچسب</Label>
          <Input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="bg-white max-w-65 text-right"
            id="tag"
          />
        </div>
        <div>
          <Label>نوع</Label>
          <ProductAttributeSelect
            value={attributeType}
            onChange={(val) => setAttributeType(val)}
          />
        </div>

        <Button
          type="button"
          className="h-8.5"
          variant={"secondary"}
          onClick={handleCreateAttribute}
          disabled={!name}
        >
          {isPending ? <Loader /> : "اضافه کردن"}
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
