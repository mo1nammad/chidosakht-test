import { Category } from "@/types";

/**
 * find category and its children by id
 */
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

/**
 * extract tree structred categories into single array */
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

/**
 * Find the path from root to a target category ID
 * Works with multiple root categories
 */
export function findCategoryPath(
  allCategories: Category[],
  targetId: number
): Category[] | null {
  for (const root of allCategories) {
    const path = findPathFromNode(root, targetId);
    if (path) return path;
  }
  return null;
}

function findPathFromNode(node: Category, targetId: number): Category[] | null {
  if (node.id === targetId) {
    return [node];
  }

  for (const child of node.childCategories) {
    const path = findPathFromNode(child, targetId);
    if (path) {
      return [node, ...path];
    }
  }

  return null;
}

/**
 * find a category by given name
 */

export function findCategoryByName(data: Category[], name: string) {
  const extractedList = extractAllCategories(data);

  const categories = extractedList?.filter((category) =>
    category.name.includes(name)
  );
  return categories;
}
