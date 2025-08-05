import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { generateGroupAndSpecQueryKey } from "./use-get-group-and-spec";

export function useDeleteSpec() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    number | string
  >({
    mutationFn: async (specId) =>
      await axiosInstance.delete(`/Admin/ProductSpecification/${specId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: generateGroupAndSpecQueryKey(productId as string),
      });
      toast.success("شاخصه با موفقیت حذف شد");
    },
    onError: (err) => {
      toast.error(err.response?.data.title);
    },
  });

  return mutation;
}
