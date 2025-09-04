import { Category } from "@/types";

export function findCategory(
  categories: Category[],
  targetId: number
): Category | null {
  for (const category of categories) {
    if (category.id === targetId) {
      return category;
    }
    if (category.childCategories.length > 0) {
      const result = findCategory(category.childCategories, targetId);
      if (result) return result;
    }
  }
  return null;
}

// extract tree structred categories into single array
export function extractAllCategories(categories: Category[]): Category[] {
  const result: Category[] = [];

  function traverse(nodes: Category[]) {
    for (const node of nodes) {
      result.push({ id: node.id, name: node.name, childCategories: [] });
      if (node.childCategories.length > 0) {
        traverse(node.childCategories);
      }
    }
  }

  traverse(categories);
  return result;
}
