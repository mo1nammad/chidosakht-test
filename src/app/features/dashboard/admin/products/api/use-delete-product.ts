import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, string>({
    mutationFn: async (id) =>
      await axiosInstance.delete(`/Admin/Product/${id}`),
    onSuccess: (_res, id) => {
      toast.success(`محصول با شناسه ${id} با موفقیت حذف شد`);
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
