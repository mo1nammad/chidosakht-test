import React from "react";
import { useBlogCategories } from "../api/use-blog-categories";

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

type Props = {
  className?: string;
  onChange: (value: string) => void;
  value: number | undefined;
};
export default function SelectCategory({ className, onChange, value }: Props) {
  const { data } = useBlogCategories();

  if (!data || "error" in data) return null;

  return (
    <Select onValueChange={onChange} value={value?.toString()}>
      <SelectTrigger
        className={cn(
          "w-full sm:w-[210px] h-full border-border bg-background flex-row-reverse",
          className
        )}
      >
        <SelectValue placeholder="یک دسته را انتخاب کن" />
      </SelectTrigger>
      <SelectContent className="border-border">
        <SelectGroup>
          <SelectLabel className="text-right text-xs">دسته بندی</SelectLabel>
          {data.categories.map((category) => (
            <SelectItem
              key={category.id}
              className="[&_span]:left-2 flex-row-reverse pl-8 pr-2 text-xs"
              value={category.id.toString()}
            >
              {category.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
