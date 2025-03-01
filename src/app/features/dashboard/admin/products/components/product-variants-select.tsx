import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppProps = {
  value: "color" | "select" | undefined;
  onChange: (val: "color" | "select") => void;
};

export default function ProductVariantsSelect({ onChange, value }: AppProps) {
  return (
    <Select value={value as "color" | "select"} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-background flex-row-reverse">
        <SelectValue placeholder="نوع" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="flex-row-reverse" value="color">
          رنگ
        </SelectItem>
        <SelectItem className="flex-row-reverse" value="select">
          انتخابی
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
