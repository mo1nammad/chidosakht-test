import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useDeleteImage(productId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, string>({
    mutationFn: async (name) =>
      await axiosInstance.delete(`/Admin/ProductImage/${name}`),
    onSuccess: () => {
      toast.success(`این تصویر با موفقیت حذف شد`);
      queryClient.invalidateQueries({
        queryKey: ["admin-product-images", Number(productId)],
      });
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
