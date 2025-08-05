import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { generateGroupAndSpecQueryKey } from "./use-get-group-and-spec";

type RequestBody = {
  titile: string;
};
export function useCreateSpecGroup() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    RequestBody
  >({
    mutationFn: async (req) =>
      await axiosInstance.post("/Admin/ProductSpecificationGroup", {
        ...req,
        productId: Number(productId),
      }),
    onSuccess: () => {
      //   TODO update queryClient
      queryClient.invalidateQueries({
        queryKey: generateGroupAndSpecQueryKey(productId as string),
      });
      toast.success("شاخصه جدید با موفقیت اضافه شد");
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
