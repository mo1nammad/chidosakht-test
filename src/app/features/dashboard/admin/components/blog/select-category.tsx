import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};
export default function SelectCategory({ className }: Props) {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "w-full sm:w-[230px] h-full border-border bg-background flex-row-reverse",
          className
        )}
      >
        <SelectValue placeholder="یک دسته را انتخاب کن" />
      </SelectTrigger>
      <SelectContent className="border-border">
        <SelectGroup>
          <SelectLabel className="text-right text-xs">دسته بندی</SelectLabel>
          <SelectItem
            className="[&_span]:left-2 flex-row-reverse pl-8 pr-2 text-xs"
            value="apple"
          >
            آموزشی
          </SelectItem>
          <SelectItem
            className="[&_span]:left-2 flex-row-reverse pl-8 pr-2 text-xs"
            value="banana"
          >
            لورم اچسیم
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
