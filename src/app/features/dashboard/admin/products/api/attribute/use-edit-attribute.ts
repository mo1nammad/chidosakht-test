import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useParams } from "next/navigation";
import { attributeAndValuesKey } from "./use-get-both-attribute-value";
import { attributesKey } from "./use-get-attributes";

type RequestBody = {
  productAttributeId: number;
  name: string;
};

export function useEditAttribute() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    RequestBody
  >({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductAttribute", {
        ...req,
        useForVariant: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attributeAndValuesKey(Number(productId)),
      });
      queryClient.invalidateQueries({
        queryKey: attributesKey(Number(productId)),
      });

      toast.success("نام شاخصه با موفقیت تغییر یافت");
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
