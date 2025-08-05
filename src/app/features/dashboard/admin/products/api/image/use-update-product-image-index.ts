import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type RequestBody = {
  name: string;
  productId: number;
};

export function useUpdateProductImageIndex() {
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductImage/SetIndexImage", req),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-images", variables.productId],
      });
    },
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
  });

  return mutation;
}
