import { useParams } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductSimpleSchemeType } from "../scheme";
import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = ProductSimpleSchemeType;

export function useUpdateSimpleProductPricing() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) => await axiosInstance.put(`/Admin/Product`, req),
    onSuccess: () => {
      toast.success("اطلاعات جدید برای محصول ثبت شد");
      queryClient.invalidateQueries({
        queryKey: ["admin-product", Number(productId)],
      });
    },
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
  });

  return mutation;
}
