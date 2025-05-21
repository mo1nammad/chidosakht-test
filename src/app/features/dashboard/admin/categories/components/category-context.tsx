"use client";

import React from "react";
import { Edge, Node, useEdgesState, useNodesState } from "@xyflow/react";
import { useCategories } from "../api/use-categories";
import { Category } from "@/types";

export const CategoryContext = React.createContext<{
  categoryId: string;
  setCategoryId: (value: string) => void;
  categories: { allCategories: Category[] } | undefined;
  nodesApi: ReturnType<typeof useNodesState<Node<{ label: string }>>>;
  edgesApi: ReturnType<typeof useEdgesState<Edge>>;
}>({
  categoryId: "",
  setCategoryId: () => {},
  categories: { allCategories: [] },
  edgesApi: [[], () => {}, () => {}],
  nodesApi: [[], () => {}, () => {}],
});

export default function CategoryContextWrapper({
  children,
}: React.PropsWithChildren) {
  const { data: categories } = useCategories();

  const [categoryId, setCategoryId] = React.useState<string>("");
  const nodesApi = useNodesState<Node<{ label: string }>>([]);
  const edgesApi = useEdgesState<Edge>([]);

  return (
    <CategoryContext
      value={{ categoryId, setCategoryId, categories, edgesApi, nodesApi }}
    >
      {children}
    </CategoryContext>
  );
}
