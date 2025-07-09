import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Attribute } from "../types";

type ApiResponse = Attribute[];

export function useGetAttributes() {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-product-attributes", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/ProductAttribute/${productId}`
      );
      return response.data;
    },
  });

  return query;
}
