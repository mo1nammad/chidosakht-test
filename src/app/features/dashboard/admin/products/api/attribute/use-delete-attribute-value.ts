import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { productAttributeValuesKey } from "./use-get-attribute-values";
import { attributeAndValuesKey } from "./use-get-both-attribute-value";

export default function useDeleteAttributeValue(attributeId: string | number) {
  const queryClient = useQueryClient();
  const { productId } = useParams();

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
        queryKey: productAttributeValuesKey(Number(attributeId)),
      });
      queryClient.invalidateQueries({
        queryKey: attributeAndValuesKey(Number(productId)),
      });
      toast.success(`ارزش با موفقیت حذف شد`);
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
