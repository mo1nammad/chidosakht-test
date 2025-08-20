import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export function usePublishProduct() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse, AxiosError<string>>({
    mutationFn: async () =>
      await axiosInstance.put(
        `/Admin/Product/PublishProductIfValidate/${productId}`
      ),
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product", Number(productId)],
      });
    },
  });

  return mutation;
}
