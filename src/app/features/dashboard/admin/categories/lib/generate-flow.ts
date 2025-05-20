import { Category } from "@/types";

import { Edge, Node } from "@xyflow/react";

export const generateFlow = (categories: Category[]) => {
  const nodes: Node<{ label: string }>[] = [
    {
      id: "0",
      data: { label: "کتگوری ها" },
      position: { x: 0, y: 0 },
      type: "category",
    },
  ];
  const edges: Edge[] = [];

  function traverse(category: Category, parentId: number | null) {
    const nodeId = category.id.toString();

    nodes.push({
      id: nodeId,
      data: { label: category.name },
      position: { x: 0, y: 0 }, // placeholder for Dagre layout
      type: "category",
    });

    if (parentId !== null) {
      edges.push({
        id: `${parentId}-${category.id}`,
        source: parentId.toString(),
        target: nodeId,
        animated: true,
      });
    }

    category.childCategories.forEach((child) => {
      traverse(child, category.id);
    });
  }

  for (const root of categories) {
    traverse(root, 0);
  }

  return { nodes, edges };
};
