import React, { useState } from "react";
import { motion } from "framer-motion";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";

import { useVariantsStore } from "../store/variants";
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
import VariantModificationInputModal from "./variant-modification-input-modal";
import VariantCreateSelectOption from "./variant-create-select-option";
import { useShallow } from "zustand/react/shallow";

type Props = { variant: Variant };

export default function VariantModificationsSelect({ variant }: Props) {
  // store
  const { addOption, deleteVariant, deleteOption, editVariantName } =
    useVariantsStore(useShallow((state) => ({ ...state })));

  // variant modals states
  const [openVariantNameModal, setOpenVariantNameModal] = useState(false);
  const [openCreateOptionModal, setOpenCreateOptionModal] = useState(false);

  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined
  );

  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 100, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      key={variant.id}
    >
      <label className="mr-11">{variant.label}</label>

      {/* dropdown */}
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
            <DropdownMenuContent align="end" className="text-right min-w-56">
              <DropdownMenuLabel className="font-yekan-semibold">
                {variant.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenVariantNameModal(true)}
                className="flex-row-reverse justify-between"
              >
                <span>تغییر نام واریانت</span>
                <Pen />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteVariant(variant.id)}
                className="flex-row-reverse justify-between"
              >
                <span>حذف واریانت</span>
                <Delete />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenCreateOptionModal(true)}
                className="flex-row-reverse justify-between"
              >
                <span>اضافه کردن یک انتخاب</span>
                <Plus />
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  if (selectedOptionId === undefined) return;
                  deleteOption(variant.id, selectedOptionId);
                  setSelectedOptionId(undefined);
                }}
                disabled={selectedOptionId === undefined}
                className="flex-row-reverse justify-between"
              >
                <span>حذف این انتخاب</span>
                <XCircle />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <VariantOptions
            options={variant.options}
            onChange={setSelectedOptionId}
            value={selectedOptionId}
          />

          {/* edit variant modal */}
          <VariantModificationInputModal
            defaultValue={variant.label}
            onUpdate={(val) => editVariantName(variant.id, val)}
            open={openVariantNameModal}
            onOpenChange={setOpenVariantNameModal}
          />

          {/* create-select-option modal  */}

          <VariantCreateSelectOption
            onUpdate={(val) => addOption(variant.id, val)}
            open={openCreateOptionModal}
            onOpenChange={setOpenCreateOptionModal}
          />
        </div>
      )}
    </motion.div>
  );
}
