import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = {
  productAttributeId: number;
  name: string;
};

export function useEditAttribute() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ title: string }>,
    RequestBody
  >({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductAttribute", {
        ...req,
        useForVariant: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-product-attributes"] });

      toast.success("نام شاخصه با موفقیت تغییر یافت");
    },
    onError: (err) => toast.error(err.response?.data.title),
  });

  return mutation;
}
