import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type ApiRequest = {
  relatedProductIds: number[];
};

export const useRemoveRelation = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<undefined, AxiosError<string>, ApiRequest>({
    mutationFn: (requestData) =>
      axiosInstance.delete("/Admin/RelatedProduct", {
        headers: { "Content-Type": "application/json" },
        data: { productId: Number(productId), ...requestData },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-related-products", Number(productId)],
      });
      toast.success("محصولات با موفقیت از لیست مرتبط حذف شدند");
    },
    onError: (err) => toast.error(err.response?.data ?? "مشکلی پیش آمد"),
  });
  return mutation;
};
