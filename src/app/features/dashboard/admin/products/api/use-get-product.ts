import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Product } from "../types";
import { useParams } from "next/navigation";

type ApiResponse = Product;

export function useGetProduct() {
  const { productId } = useParams();

  const query = useQuery<ApiResponse>({
    queryKey: ["admin-product", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Admin/Product/${productId}`);
      return response.data;
    },
  });

  return query;
}
