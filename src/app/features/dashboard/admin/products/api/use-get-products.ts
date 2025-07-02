import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { Product } from "@/types";
import axiosInstance from "@/lib/axios";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  products: Product[];
};

type QueryProps = {
  page?: number;
};

export function useGetProducts(queryOptions: QueryProps) {
  const query = useQuery<ApiResponse>({
    queryKey: ["admin-products", queryOptions.page],
    queryFn: async () => {
      const url = queryString.stringifyUrl({
        url: "/Admin/Product",
        query: queryOptions,
      });

      const response = await axiosInstance.get(url);
      return response.data;
    },
  });

  return query;
}
