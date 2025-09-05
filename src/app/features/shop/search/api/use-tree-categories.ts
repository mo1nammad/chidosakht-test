import axiosInstance from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  allCategories: Category[] | null;
};

export function useTreeCategories() {
  const query = useQuery({
    queryKey: ["shop-search-categories"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>("/Category");
      return response.data.allCategories;
    },
  });

  return query;
}
