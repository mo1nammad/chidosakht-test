import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppProps = {
  value: "2" | "1" | undefined;
  onChange: (val: "2" | "1") => void;
};

export default function ProductAttributesSelect({ onChange, value }: AppProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-background flex-row-reverse">
        <SelectValue placeholder="نوع" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="flex-row-reverse" value="2">
          رنگ
        </SelectItem>
        <SelectItem className="flex-row-reverse" value="1">
          انتخابی
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
