import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = {
  name: string;
  productType: 1 | 2;
};

export function useCreateInstance() {
  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) => await axiosInstance.post("/Admin/Product", req),
    onSuccess: () => toast.success("محصول جدیدی برای با موفقیت اضافه شدند"),
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
