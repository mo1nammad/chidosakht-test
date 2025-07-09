import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function usePostProductImage(productId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<undefined, AxiosError<string>, FormData>({
    mutationFn: async (form) => {
      await axiosInstance.post(`/Admin/ProductImage/${productId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products-images", productId],
      });
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
