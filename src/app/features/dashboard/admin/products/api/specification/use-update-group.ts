import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { generateGroupAndSpecQueryKey } from "./use-get-group-and-spec";

type ApiRequest = {
  productSpecificationGroupId: number;
  titile: string;
};

export function useUpdateSpecGroup() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    ApiRequest
  >({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductSpecificationGroup", req),
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
