import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ProductCard } from "@/types";
import axiosInstance from "@/lib/axios";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  products: ProductCard[];
};

export function useSearchProducts() {
  const searchParams = useSearchParams();
  const searchParamsStringified = searchParams.toString();

  const hasTypeOrder = searchParams.get("TypeOrderByForProduct");

  const url = hasTypeOrder
    ? `/Product?${searchParamsStringified}`
    : `/Product?${searchParamsStringified}&TypeOrderByForProduct=1`;

  const query = useQuery<ApiResponse>({
    queryKey: ["search-products", url],
    queryFn: async () => {
      const request = await axiosInstance.get(url);
      const response = await request.data;

      return response;
    },
    // ✅ Recommended options
    enabled: !!searchParams, // don’t fetch until searchParams exist
    staleTime: 1000 * 60 * 5, // 5 minutes – data considered fresh
    gcTime: 1000 * 60 * 10, // 10 minutes – keep in cache
    retry: 2, // retry failed requests twice
    refetchOnWindowFocus: false, // don’t spam fetch when switching tabs
    refetchOnReconnect: true, // refetch when back online
  });

  return query;
}
