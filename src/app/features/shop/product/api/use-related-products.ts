import axiosInstance from "@/lib/axios";
import { ProductCard } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type ApiResponse = ProductCard[];

export const useRelatedProducts = () => {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["related-products"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/RelatedProduct/${productId}`);
      return response.data;
    },
  });

  return query;
};
