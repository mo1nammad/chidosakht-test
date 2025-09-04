import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

import { useParams } from "next/navigation";
import { ProductCard } from "@/types";

type ApiResponse = {
  page: number;
  countInPage: number;
  countAllPages: number;
  countAllItems: number;
  products: ProductCard[];
};

type HookProps = {
  searchQuery: string;
};

export function useGetProductsToPick({ searchQuery }: HookProps) {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-related-product-pick", searchQuery],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>(
        searchQuery
          ? `/Product?TypeOrderByForProduct=1&ProductName=${searchQuery}`
          : "/Product?TypeOrderByForProduct=1&ProductName"
      );

      const newProductList = response.data.products.filter(
        (product) => product.id !== Number(productId)
      );

      return { ...response.data, products: newProductList };
    },
  });

  return query;
}
