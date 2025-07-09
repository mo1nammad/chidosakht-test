import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

export default function useDeleteAttributeValue() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<string>,
    string | number
  >({
    mutationFn: async (attributeValueId) =>
      await axiosInstance.delete(
        `/Admin/ProductAttributeValue/${attributeValueId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-attribute-values"],
      });

      toast.success(`ارزش با موفقیت حذف شد`);
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
