import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useParams } from "next/navigation";

type ApiResponse = {
  productId: number;
  productName: string;
}[];
export function useGetRelatedProducts() {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-related-products", Number(productId)],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/RelatedProduct/${productId}`
      );

      return response.data;
    },
  });

  return query;
}
