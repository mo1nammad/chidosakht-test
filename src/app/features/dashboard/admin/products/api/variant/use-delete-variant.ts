import { useParams } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

export function useDeleteVariant() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, number>({
    mutationFn: async (id) =>
      await axiosInstance.delete(`/Admin/ProductVariant/${id}`),
    onSuccess: () => {
      toast.success(`این واریانت با موفقیت حذف شد`);
      queryClient.invalidateQueries({
        queryKey: ["admin-product-variants", Number(productId)],
      });
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
