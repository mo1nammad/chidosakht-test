import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Variant } from "../types";
import VariantOptions from "./variant-options";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";
import VariantModificationInputModal from "./variant-modification-input-modal";

type AppProps = {
  variants: Variant[];
  onChange: React.Dispatch<React.SetStateAction<Variant[]>>;
};

export default function VariantModification({ variants, onChange }: AppProps) {
  const handleDeleteVariant = (id: number) => {
    onChange((state) => state.filter((variant) => variant.id !== id));
  };
  const handleEditVariantName = (id: number, label: string) => {
    onChange((state) =>
      state.map((variant) =>
        variant.id === id ? { ...variant, label } : variant
      )
    );
  };

  return (
    <div
      dir="rtl"
      className="mt-6 grid grid-cols-1 sm:grid-cols-3 grid-flow-row-dense gap-y-9 mb-45"
    >
      <AnimatePresence>
        {variants.map((variant) => (
          <motion.div
            dir="ltr"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 100, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            key={variant.id}
          >
            <label className="mr-11">{variant.label}</label>
            {variant.type === "select" && (
              <div className="flex flex-row-reverse items-center gap-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"ghost"}
                      className="size-8"
                    >
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="text-right min-w-56"
                  >
                    <DropdownMenuLabel className="font-yekan-semibold">
                      {variant.label}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <VariantModificationInputModal
                        defaultValue={variant.label}
                        onUpdate={(val) =>
                          handleEditVariantName(variant.id, val)
                        }
                      >
                        <div className="w-full flex flex-row-reverse justify-between">
                          <span>تغییر نام واریانت</span>
                          <Pen />
                        </div>
                      </VariantModificationInputModal>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteVariant(variant.id)}
                      className="flex-row-reverse justify-between"
                    >
                      <span>حذف واریانت</span>
                      <Delete />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex-row-reverse justify-between">
                      <span>اضافه کردن یک انتخاب</span>
                      <Plus />
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex-row-reverse justify-between">
                      <span>حذف این انتخاب</span>
                      <XCircle />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <VariantOptions options={variant.options} />

                {/* <Button type="button" size="sm" variant="destructive">
                حذف انتخاب از لیست
              </Button>

              <div className="flex">
                <Input />
                <Button size="sm" variant="destructive">
                  ایجاد انتخاب جدید
                </Button>
              </div> */}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
