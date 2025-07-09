import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";

import { Attribute } from "../types";

// api
import { useDeleteAttribute } from "../api/use-delete-attribute";
import { useEditAttribute } from "../api/use-edit-attribute";
import useCreateAttributeValue from "../api/use-create-attribute-value";
import { useGetAttributeValues } from "../api/use-get-attribute-values";
import useDeleteAttributeValue from "../api/use-delete-attribute-value";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AttributeColorPicker from "./attributes-color-picker";
import SimpleInputDrawerDialog from "./simple-input-drawer-dialog";
import AttributeColorList from "./attributes-color-list";

type Props = { attribute: Attribute };

export default function AttributeModificationsColor({ attribute }: Props) {
  // attribute modals states
  const [openAttributeNameModal, setOpenAttributeNameModal] = useState(false);
  const [openColorPopover, setOpenColorPopover] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState<number | undefined>(
    undefined
  );

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  // APIs
  const { data: attributeValues, status: attributeValues_fetchStatus } =
    useGetAttributeValues(attribute.productAttributeId);

  const { mutate: deleteAttribute } = useDeleteAttribute();
  const { mutate: editAttributeName } = useEditAttribute();
  const { mutate: createAttributeValue } = useCreateAttributeValue(
    attribute.name
  );

  const { mutate: deleteAttributeValue } = useDeleteAttributeValue();

  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 100, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      key={attribute.productAttributeId}
      className="sm:col-span-3 flex items-center flex-row-reverse gap-x-2.5 w-full"
    >
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
            <Popover
              modal={true}
              open={openColorPopover}
              onOpenChange={setOpenColorPopover}
            >
              <PopoverTrigger className="flex flex-row-reverse justify-between w-full text-sm px-2 py-1.5 hover:bg-accent rounded-sm">
                <span>اضافه کردن یک رنگ</span>
                <Plus className="size-4 text-muted-foreground" />
              </PopoverTrigger>
              {/* overlay */}
              {openColorPopover && <div className="absolute inset-0" />}
              <PopoverContent
                side={isDesktop ? "left" : "top"}
                align="end"
                className="min-w-fit p-0"
              >
                <AttributeColorPicker
                  onUpdate={(val) => {
                    createAttributeValue({
                      productAttributeId: attribute.productAttributeId,
                      value: val,
                    });
                    setOpenColorPopover(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            <DropdownMenuItem
              onClick={() => {
                if (selectedColorId === undefined) return;
                deleteAttributeValue(selectedColorId);
                setSelectedColorId(undefined);
              }}
              disabled={selectedColorId === undefined}
              className="flex-row-reverse justify-between"
            >
              <span>حذف رنگ انتخاب شده</span>
              <XCircle />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
      </div>
      <h4 className="text-sm">{attribute.name}</h4>
      {/* TODO add color list */}

      <AnimatePresence>
        {attributeValues_fetchStatus === "success" ? (
          <AttributeColorList
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            attributeOptions={attributeValues}
            className="p-4 w-full flex flex-row-reverse"
          />
        ) : (
          <div className="text-xs text-muted-foreground flex items-center gap-x-2.5 mr-4">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="size-6"
              onClick={() => {
                setOpenDropdown(true);
                setOpenColorPopover(true);
              }}
            >
              <Plus className="size-4" />
            </Button>
            <span>هیچ رنگی وجود ندارد</span>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
