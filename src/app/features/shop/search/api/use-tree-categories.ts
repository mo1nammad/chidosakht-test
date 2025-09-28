import { axiosBetaInstance } from "@/lib/axios";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  allCategories: Category[] | null;
};

export function useTreeCategories() {
  const query = useQuery({
    queryKey: ["shop-search-categoriess"],
    queryFn: async () => {
      const response = await axiosBetaInstance.get<ApiResponse>("/Category");
      return response.data.allCategories;
    },
  });

  return query;
}
