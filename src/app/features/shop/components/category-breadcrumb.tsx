"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { findCategoryPath } from "@/lib/category";
import { useTreeCategories } from "../search/api/use-tree-categories";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Loader } from "@/components/loader";
import Link from "next/link";
import { Category } from "@/types";

type AppProps = {
  categoryId?: string;
  productName?: string;
};

export default function CategoryBreadcrumb({
  categoryId: categoryIdProp,
  productName,
}: AppProps) {
  const searchParams = useSearchParams();
  const categoryId = categoryIdProp ?? searchParams.get("CategoryId");

  const { data: categories, status } = useTreeCategories();

  const [breadcrumbPaths, setBreadcrumbPaths] = useState<Category[]>([]);

  useEffect(() => {
    if (categories) {
      setBreadcrumbPaths(
        findCategoryPath(categories, Number(categoryId)) ?? []
      );
    }

    if (productName) {
      setBreadcrumbPaths((prev) => [
        ...prev,
        { id: 0, name: productName, childCategories: [] },
      ]);
    }
  }, [productName, categories, categoryId]);

  return status === "pending" ? (
    <Loader className="justify-end mr-3.5" />
  ) : (
    <Breadcrumb dir="rtl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/shop/search">
            {breadcrumbPaths.length ? (
              "خانه"
            ) : (
              <BreadcrumbPage>خانه</BreadcrumbPage>
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbPaths.length ? (
          <BreadcrumbSeparator>
            <ChevronLeft />
          </BreadcrumbSeparator>
        ) : null}
        {breadcrumbPaths.map((path, index) => (
          <Fragment key={path.id}>
            <BreadcrumbItem>
              {index === breadcrumbPaths.length - 1 ? (
                <BreadcrumbPage>{path.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/shop/search?CategoryId=${path.id}`}>
                    {path.name}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== breadcrumbPaths.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronLeft />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
