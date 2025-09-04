import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

import { extractAllCategories, findCategory } from "@/lib/category";
import { Category } from "@/types";
import { useEffect, useState } from "react";

type ApiResponse = {
  allCategories: Category[] | null;
};

export const useCategories = () => {
  const categoryId = useSearchParams().get("CategoryId");
  const [categories, setCategories] = useState<Category[]>([]);

  const query = useQuery({
    queryKey: ["shop-search-categories"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>("/Category");
      return response.data.allCategories;
    },
  });

  useEffect(() => {
    if (query.status !== "success" || !query?.data) setCategories([]);
    //
    else if (categoryId) {
      const target =
        findCategory(query.data, Number(categoryId))?.childCategories ?? null;

      // target available ?
      if (target) setCategories(target);
      // target invalid ?
      else setCategories([]);
    }
    // no categoryId
    else {
      setCategories(extractAllCategories(query.data));
    }
  }, [categoryId, query.data, query.status]);

  return { categories, status: query.status };
};
