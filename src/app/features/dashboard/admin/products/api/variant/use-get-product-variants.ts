import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { ProductVariant } from "../../types";
import { useParams } from "next/navigation";

type ApiResponse = ProductVariant[];

export function useGetProductVariants() {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-product-variants", Number(productId)],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductVariant/${productId}`
      );
      return response.data;
    },
  });

  return query;
}
