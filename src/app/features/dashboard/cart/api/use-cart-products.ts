import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Cart } from "@/types";

type ApiResponse = Cart;

export const useCartProducts = () => {
  const query = useQuery<ApiResponse>({
    queryKey: ["cart-products"],
    queryFn: async () => {
      const req = await axiosInstance.get("/Cart?CartType=1");
      return req.data;
    },
  });

  return query;
};
