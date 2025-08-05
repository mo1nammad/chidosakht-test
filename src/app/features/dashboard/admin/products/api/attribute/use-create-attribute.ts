import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { attributeAndValuesKey } from "./use-get-both-attribute-value";
import { attributesKey } from "./use-get-attributes";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = {
  name: string;
  attributeType: 1 | 2;
};

export function useCreateAttribute() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    RequestBody
  >({
    mutationFn: async (req) =>
      await axiosInstance.post("/Admin/ProductAttribute", {
        ...req,
        productId,
        useForVariant: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attributeAndValuesKey(Number(productId)),
      });
      queryClient.invalidateQueries({
        queryKey: attributesKey(Number(productId)),
      });

      toast.success("شاخصه جدید با موفقیت اضافه شد");
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
