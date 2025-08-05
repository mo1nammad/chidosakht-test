import axiosInstance from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  id: number;
  name: string;
  parentCategoryId: number | null;
  parentCategoryName: string | null;
  createTime: Date | string;
  lastUpdateTime: Date | string;
  childCategories: Category[];
};

export function useCategory(categoryId: string) {
  const query = useQuery<ApiResponse>({
    queryKey: ["admin-category-data", categoryId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Admin/Category/${categoryId}`);
      return response.data;
    },
  });

  return query;
}
