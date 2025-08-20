"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { useGetCategories } from "../api/use-get-categories";
import { useUpdateProductCategory } from "../api/use-update-product-category";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";

type AppProps = {
  productCategoryId: number | undefined | null;
};

export default function ProductCategory({ productCategoryId }: AppProps) {
  const [selectedId, setSelectedId] = React.useState(productCategoryId);

  const { data: categories } = useGetCategories();
  const { mutate: updateProductCategory } = useUpdateProductCategory();

  const mappedCategories = (categories ?? [])?.map((category) => ({
    id: category.id,
    value: category.name,
  }));

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">دسته بندی</h2>

      <ResponsiveWrapper
        trigger={() => (
          <Button
            variant="outline"
            role="combobox"
            className="w-[250px] justify-between flex-row-reverse"
          >
            {selectedId
              ? mappedCategories.find((category) => category.id === selectedId)
                  ?.value
              : "یک دسته بندی انتخاب کنید"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        )}
      >
        <Command>
          <CommandInput
            placeholder="یک دسته بندی انتخاب کنید"
            className="h-9"
            dir="rtl"
          />
          <CommandList>
            <CommandEmpty>هیچ دسته بندی ای موجود نیست</CommandEmpty>
            <CommandGroup>
              {mappedCategories.map((category) => (
                <CommandItem
                  className="flex-row-reverse"
                  key={category.id}
                  value={category.value}
                  onSelect={() => {
                    setSelectedId(category.id);
                    updateProductCategory({
                      categoryId: category.id,
                    });
                  }}
                >
                  {category.value}
                  <Check
                    className={cn(
                      "mr-auto",
                      selectedId === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ResponsiveWrapper>
    </div>
  );
}

type ResponsiveWrapperProps = {
  children: React.ReactNode;
  trigger: () => React.ReactNode | React.ReactNode;
};

function ResponsiveWrapper({
  children,
  trigger: Trigger,
}: ResponsiveWrapperProps) {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {typeof Trigger === "function" ? Trigger() : Trigger}
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">{children}</PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {typeof Trigger === "function" ? Trigger() : Trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">انتخاب دسته بندی</DrawerTitle>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
