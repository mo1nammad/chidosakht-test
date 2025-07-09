import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

type ApiResponse = { id: number; url: string }[];

export function useGetProductImages(productId: string) {
  const query = useQuery<ApiResponse>({
    queryKey: ["admin-product-images", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductImage/${productId}`
      );
      return response.data;
    },
  });

  return query;
}
