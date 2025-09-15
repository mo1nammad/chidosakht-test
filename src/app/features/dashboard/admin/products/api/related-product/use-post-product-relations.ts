import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useParams } from "next/navigation";

type RequestBody = {
  relatedProductIds: number[];
};

export function usePostProductRelations() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.post("/Admin/RelatedProduct", {
        productId: Number(productId),
        ...req,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-related-products", Number(productId)],
      });
      toast.success("محصولات مرتبط با موفقیت اضافه شدند");
    },
    onError: (err) => toast.error(err.response?.data ?? "مشکلی پیش آمد"),
  });

  return mutation;
}
