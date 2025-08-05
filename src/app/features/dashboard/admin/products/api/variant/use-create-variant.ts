import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import type { ProductVariantScheme } from "../../scheme";
import { useParams } from "next/navigation";

type RequestBody = ProductVariantScheme;

export function useCreateVariant() {
  const queryClient = useQueryClient();
  const { productId } = useParams();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.post("/Admin/ProductVariant", req),
    onSuccess: () => {
      toast.success("واریانت جدیدی برای محصول با موفقیت اضافه شد");
      queryClient.invalidateQueries({
        queryKey: ["admin-product-variants", Number(productId)],
      });
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
