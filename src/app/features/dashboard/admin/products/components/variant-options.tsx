import React from "react";
import { Variant } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppProps = {
  options: Variant["options"];
  value?: string;
  onChange?: (val: string) => void;
};

export default function VariantOptions({ options, onChange, value }: AppProps) {
  if (options.length === 0)
    return <div className="text-sm">هیچ انتخابی وجود ندارد</div>;
  console.log(options);

  return (
    <Select value={value} onValueChange={(value) => onChange?.(value)}>
      <SelectTrigger className="w-[180px] bg-background flex-row-reverse">
        <SelectValue placeholder="انتخاب ها" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.id}
            value={option.id}
            className="flex-row-reverse"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
