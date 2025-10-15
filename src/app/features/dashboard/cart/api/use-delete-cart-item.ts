import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

export const useDeleteCartItem = () => {
  const queryQlient = useQueryClient();

  const mutation = useMutation<undefined, AxiosError<string>, number | string>({
    mutationFn: async (cartItemId) => {
      await axiosInstance.delete(`/Cart/${cartItemId}`);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({
        queryKey: ["cart-products"],
      });

      toast.success("محصول از سبد خرید شما حذف شد");
    },
    onError: (err) => {
      toast.error(err.response?.data);
    },
  });

  return mutation;
};
