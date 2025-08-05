import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

import { attributeAndValuesKey } from "./use-get-both-attribute-value";
import { attributesKey } from "./use-get-attributes";

export function useDeleteAttribute() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    number | string
  >({
    mutationFn: async (attributeId) =>
      await axiosInstance.delete(`/Admin/ProductAttribute/${attributeId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attributeAndValuesKey(Number(productId)),
      });
      queryClient.invalidateQueries({
        queryKey: attributesKey(Number(productId)),
      });

      toast.success("شاخصه با موفقیت حذف شد");
    },
    onError: (err) => {
      toast.error(err.response?.data.title);
    },
  });

  return mutation;
}
