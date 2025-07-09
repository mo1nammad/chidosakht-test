import React from "react";
import { AttributeValue } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppProps = {
  options: AttributeValue[];
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
};

export default function AttributeOptions({
  options,
  onChange,
  value,
  disabled,
}: AppProps) {
  if (options.length === 0)
    return (
      <div className="text-xs text-muted-foreground mt-1.5">
        هیچ انتخابی وجود ندارد
      </div>
    );

  return (
    <Select value={value} onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger
        className="w-[180px] bg-background flex-row-reverse"
        disabled={disabled}
      >
        <SelectValue placeholder="انتخاب ها" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.productAttributeValueId}
            value={option.productAttributeValueId.toString()}
            className="flex-row-reverse"
          >
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
