import React, { useState } from "react";
import { motion } from "framer-motion";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";

import { useAttributesStore } from "../store/attributes";
import { Attribute } from "../types";

import AttributesOptions from "./attributes-options";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SimpleInputDrawerDialog from "./simple-input-drawer-dialog";

import { useShallow } from "zustand/react/shallow";

type Props = { attribute: Attribute };

export default function AttributeModificationsSelect({ attribute }: Props) {
  // store
  const { addOption, deleteAttribute, deleteOption, editAttributeName } =
    useAttributesStore(useShallow((state) => ({ ...state })));

  // variant modals states
  const [openAttributeNameModal, setOpenAttributeNameModal] = useState(false);
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
      key={attribute.id}
    >
      <label className="mr-11">{attribute.label}</label>

      {/* dropdown */}
      {attribute.type === "select" && (
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
                {attribute.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setOpenAttributeNameModal(true)}
                className="flex-row-reverse justify-between"
              >
                <span>تغییر نام شاخصه</span>
                <Pen />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteAttribute(attribute.id)}
                className="flex-row-reverse justify-between"
              >
                <span>حذف شاخصه</span>
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
                  deleteOption(attribute.id, selectedOptionId);
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

          <AttributesOptions
            options={attribute.options}
            onChange={setSelectedOptionId}
            value={selectedOptionId}
          />

          {/* edit attribute modal */}
          <SimpleInputDrawerDialog
            defaultValue={attribute.label}
            onUpdate={(val) => editAttributeName(attribute.id, val)}
            open={openAttributeNameModal}
            onOpenChange={setOpenAttributeNameModal}
            title="تغییر نام"
            description="در این قسمت شما می توانید نام شاخصه ایجاد شده را تغییر دهید"
          />

          {/* create-select-option modal  */}

          <SimpleInputDrawerDialog
            onUpdate={(val) => addOption(attribute.id, val)}
            open={openCreateOptionModal}
            onOpenChange={setOpenCreateOptionModal}
            title="ایجاد یک انتخاب"
            description="در این قسمت شما می توانید یک انتخاب برای شاخصه خود ایجاد کنید"
          />
        </div>
      )}
    </motion.div>
  );
}
