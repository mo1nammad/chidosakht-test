import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

export function useDeleteAttribute() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    number | string
  >({
    mutationFn: async (attributeId) =>
      await axiosInstance.delete(`/Admin/ProductAttribute/${attributeId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-product-attributes"] });
      toast.success("شاخصه جدید با موفقیت حذف شد");
    },
    onError: (err) => {
      toast.error(err.response?.data.title);
    },
  });

  return mutation;
}
