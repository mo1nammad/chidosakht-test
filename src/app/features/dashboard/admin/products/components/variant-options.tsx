import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppProps = {
  options: { id: number; value: string; label: string }[];
};

export default function VariantOptions({ options }: AppProps) {
  if (options.length === 0)
    return <div className="text-sm">هیچ انتخابی وجود ندارد</div>;
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-background flex-row-reverse">
        <SelectValue placeholder="انتخاب ها" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.id}
            value={option.value}
            className="flex-row-reverse"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
