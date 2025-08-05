import React, { useState } from "react";
import { motion } from "framer-motion";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";

import { Attribute } from "../types";

// api
import { useDeleteAttribute } from "../api/attribute/use-delete-attribute";
import { useEditAttribute } from "../api/attribute/use-edit-attribute";
import useCreateAttributeValue from "../api/attribute/use-create-attribute-value";
import { useGetAttributeValues } from "../api/attribute/use-get-attribute-values";
import useDeleteAttributeValue from "../api/attribute/use-delete-attribute-value";

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
import { Loader } from "@/components/loader";

type Props = { attribute: Attribute };

export default function AttributeModificationsSelect({ attribute }: Props) {
  // variant modals states
  const [openAttributeNameModal, setOpenAttributeNameModal] = useState(false);
  const [openCreateOptionModal, setOpenCreateOptionModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined
  );

  // APIs
  const { data: attributeValues, status: attributeValues_fetchStatus } =
    useGetAttributeValues(attribute.productAttributeId);
  const { mutate: deleteAttribute } = useDeleteAttribute();
  const { mutate: editAttributeName } = useEditAttribute();
  const { mutate: createAttributeValue } = useCreateAttributeValue(
    attribute.name
  );
  const { mutate: deleteAttributeValue } = useDeleteAttributeValue(
    attribute.productAttributeId
  );

  const attributeOptionsComponentRender = {
    success: (
      <AttributesOptions
        options={attributeValues ?? []}
        onChange={setSelectedOptionId}
        value={selectedOptionId}
      />
    ),
    pending: <Loader />,
    error: (
      <div className="text-sm text-destructive">
        مشکلی در بارگیری اطلاعات پیش آمده است
      </div>
    ),
  };

  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 100, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      key={attribute.productAttributeId}
    >
      <label className="mr-11">{attribute.name}</label>

      {/* dropdown */}

      <div className="flex flex-row-reverse items-center gap-x-3">
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
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
              {attribute.name}
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
              onClick={() => deleteAttribute(attribute.productAttributeId)}
              className="flex-row-reverse justify-between"
            >
              <span>حذف شاخصه</span>
              <Delete />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setOpenCreateOptionModal(true);
                setOpenDropdown(false);
              }}
              className="flex-row-reverse justify-between"
            >
              <span>اضافه کردن یک انتخاب</span>
              <Plus />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                if (selectedOptionId === undefined) return;
                deleteAttributeValue(selectedOptionId);
                setSelectedOptionId("");
              }}
              disabled={!selectedOptionId}
              className="flex-row-reverse justify-between"
            >
              <span>حذف این انتخاب</span>
              <XCircle />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* renders attribute options based on fetching status  */}
        {attributeOptionsComponentRender[attributeValues_fetchStatus]}

        {/* edit attribute modal */}
        <SimpleInputDrawerDialog
          defaultValue={attribute.name}
          onUpdate={(val) =>
            editAttributeName({
              name: val,
              productAttributeId: attribute.productAttributeId,
            })
          }
          open={openAttributeNameModal}
          onOpenChange={setOpenAttributeNameModal}
          title="تغییر نام"
          description="در این قسمت شما می توانید نام شاخصه ایجاد شده را تغییر دهید"
        />

        {/* create-select-option modal  */}

        <SimpleInputDrawerDialog
          onUpdate={(val) => {
            createAttributeValue({
              productAttributeId: attribute.productAttributeId,
              value: val,
            });
          }}
          open={openCreateOptionModal}
          onOpenChange={setOpenCreateOptionModal}
          title="ایجاد یک انتخاب"
          description="در این قسمت شما می توانید یک انتخاب برای شاخصه خود ایجاد کنید"
        />
      </div>
    </motion.div>
  );
}
