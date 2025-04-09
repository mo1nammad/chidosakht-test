import React, { useEffect } from "react";

import { Attribute, AttributeType } from "../types";

import AttributeOptions from "./attributes-options";
import AttributesColorList from "./attributes-color-list";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type AppProps = {
  type: AttributeType;
  attribute: Attribute;

  value: string;
  onChange: (attributeId: string, val: string) => void;
};

export default function PricingAttributeField({
  type,
  attribute,
  onChange,
  value,
}: AppProps) {
  const [isSelectedAll, setIsSelectedAll] = React.useState(false);
  const id = attribute.id;

  useEffect(() => {
    if (isSelectedAll) {
      onChange(id, "all");
    }
  }, [isSelectedAll, id]);

  return type === "select" ? (
    <div className="flex items-center justify-between gap-x-3.5">
      <div className="mb-6">
        <h4 className="text-sm">{attribute.label}</h4>
        <AttributeOptions
          options={attribute.options}
          value={value}
          onChange={(optionId) => onChange(id, optionId)}
          disabled={isSelectedAll}
        />
      </div>

      {attribute.options.length > 0 && (
        <div className="flex items-center gap-x-2">
          <Label className="text-sm" htmlFor={id}>
            انتخاب همه موارد
          </Label>
          <Checkbox
            className="bg-background"
            id={id}
            onCheckedChange={() => setIsSelectedAll((state) => !state)}
            checked={isSelectedAll}
          />
        </div>
      )}
    </div>
  ) : (
    <div key={id} className="flex items-center justify-between">
      <div className="flex items-center sm:col-span-3 grow">
        <h4
          className={cn(
            "text-sm",
            isSelectedAll && "opacity-60 pointer-events-none"
          )}
        >
          {attribute.label}
        </h4>
        {attribute.options.length > 0 ? (
          <>
            <AttributesColorList
              className={cn(
                "items-center py-2.5 px-2",
                isSelectedAll && "opacity-30 pointer-events-none"
              )}
              selectedColorId={value}
              setSelectedColorId={(colorId) => onChange(id, colorId)}
              attribute={attribute}
            />
          </>
        ) : (
          <span className="text-xs text-muted-foreground mr-1.5">
            هیچ رنگی برای انتخاب وجود ندارد
          </span>
        )}
      </div>
      <div className="mr-8 flex items-center gap-x-2">
        <Label className="text-sm" htmlFor={id}>
          انتخاب همه موارد
        </Label>
        <Checkbox
          className="bg-background"
          id={id}
          onCheckedChange={() => setIsSelectedAll((state) => !state)}
          checked={isSelectedAll}
        />
      </div>
    </div>
  );
}
