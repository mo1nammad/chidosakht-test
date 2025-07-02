import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type RequestBody = {
  name: string;
  productType: 1 | 2;
};

export function useCreateInstance() {
  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) => await axiosInstance.post("/Admin/Product", req),
    onSuccess: () => toast.success("محصول جدیدی برای با موفقیت اضافه شدند"),
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
