"use client";

import React, { use } from "react";

import { CategoryContext } from "./category-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategory } from "../api/use-category";
import { Loader2 } from "lucide-react";
import AddSubCategoryDrawerDialog from "./add-subcategory-drawer-dialog";
import RenameCategoryDrawerDialog from "./rename-category-drawer-dialog";
import { DeleteCategoryDialog } from "./delete-category";

export default function CategoryActions() {
  const { categoryId } = use(CategoryContext);
  const { data: categoryInfo, isLoading } = useCategory(categoryId);

  const isRoot = categoryId === "0";

  if (!isRoot && isLoading)
    return (
      <div className="flex justify-end mt-12">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (!isRoot && (!categoryId || !categoryInfo)) return null;

  return (
    <div className="mt-12">
      {isRoot ? (
        <>
          <h3 className="text-xl font-yekan-semibold">دسته بندی ها</h3>
        </>
      ) : (
        <>
          <h3 className="text-xl font-yekan-semibold">{categoryInfo?.name}</h3>
          <h4>
            نام پدر مجموعه : {categoryInfo?.parentCategoryName ?? "undefined"}
          </h4>
        </>
      )}

      {/* button group */}
      <ScrollArea className="pb-4 mt-4">
        <div className="flex gap-x-1.5 flex-row-reverse w-full">
          <AddSubCategoryDrawerDialog
            parrentId={categoryId === "0" ? undefined : categoryId}
          />

          {/* root is only alowed to add category */}
          {!isRoot && !!categoryInfo && (
            <>
              <RenameCategoryDrawerDialog
                categoryId={categoryInfo.id}
                parrentId={categoryInfo.parentCategoryId ?? undefined}
                previousName={categoryInfo.name}
              />
              <DeleteCategoryDialog
                categoryId={categoryInfo.id}
                name={categoryInfo.name}
              />
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
