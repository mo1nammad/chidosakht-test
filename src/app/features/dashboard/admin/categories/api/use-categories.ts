import axiosInstance from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = { allCategories: Category[] };

export function useCategories() {
  const query = useQuery<ApiResponse>({
    queryKey: ["category-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Admin/Category");
      return response.data;
    },
  });

  return query;
}
