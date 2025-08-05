import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

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

      toast.success("شاخصه جدید با موفقیت اضافه شد");
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
