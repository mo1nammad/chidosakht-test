import React, { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Delete, MoreVertical, Pen, Plus, XCircle } from "lucide-react";

import { useAttributesStore } from "../store/attributes";
import { Attribute } from "../types";

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
  // store
  const { addOption, deleteAttribute, deleteOption, editAttributeName } =
    useAttributesStore(useShallow((state) => ({ ...state })));

  // attribute modals states
  const [openAttributeNameModal, setOpenAttributeNameModal] = useState(false);
  const [openColorPopover, setOpenColorPopover] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [selectedColorId, setSelectedColorId] = useState<string | undefined>(
    undefined
  );

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <motion.div
      dir="ltr"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 100, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      key={attribute.id}
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
                    const id = addOption(attribute.id, val);
                    setSelectedColorId(id);
                    setOpenColorPopover(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            <DropdownMenuItem
              onClick={() => {
                if (selectedColorId === undefined) return;
                deleteOption(attribute.id, selectedColorId); // color list as option[]
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
          defaultValue={attribute.label}
          onUpdate={(val) => editAttributeName(attribute.id, val)}
          open={openAttributeNameModal}
          onOpenChange={setOpenAttributeNameModal}
          title="تغییر نام"
          description="در این قسمت شما می توانید نام شاخصه ایجاد شده را تغییر دهید"
        />
      </div>
      <h4 className="text-sm">{attribute.label}</h4>
      {/* TODO add color list */}

      <AnimatePresence>
        {attribute.options.length > 0 ? (
          <AttributeColorList
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            attribute={attribute}
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
