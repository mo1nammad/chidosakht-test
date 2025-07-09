import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

type RequestBody = {
  productId: string | number;
} & { [name: string]: string };

export function useUpdateProductBody(forApi: string /* , apiMethod ?*/) {
  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) => await axiosInstance.put(forApi, req),
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
  });

  return mutation;
}
