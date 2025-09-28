import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

import { ProductCard } from "@/types";
import { axiosBetaInstance } from "@/lib/axios";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  products: ProductCard[];
};

type HookProps = {
  queryObj?: Record<string, string>;
};

export function useSearchProducts(props?: HookProps) {
  const searchParams = useSearchParams();
  const searchParamsStringified = searchParams.toString();

  let parsed = queryString.parse(searchParamsStringified);

  parsed = {
    TypeOrderByForProduct: "1", // required
    ...parsed,
    ...props?.queryObj,
  };

  const resultQueriesStringified = queryString.stringify(parsed, {
    skipNull: true,
    skipEmptyString: true,
  });

  const url = `/Product?${resultQueriesStringified}`;

  const query = useQuery<ApiResponse>({
    queryKey: ["search-products", url],
    queryFn: async () => {
      const request = await axiosBetaInstance.get(url);
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
