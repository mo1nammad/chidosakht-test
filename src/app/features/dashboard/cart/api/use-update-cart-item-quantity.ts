import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type ApiRequest = {
  cartItemId: number;
  quantity: number;
};

export const useUpdateCartItemQuantity = () => {
  const queryQlient = useQueryClient();

  const mutation = useMutation<undefined, AxiosError<string>, ApiRequest>({
    mutationFn: async (req) => {
      await axiosInstance.put(`/Cart/UpdateQuantityAnItem`, req);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({
        queryKey: ["cart-products"],
      });
    },
    onError: (err) => {
      if (typeof err.response?.data === "string") {
        toast.error(err.response?.data);
      } else console.log(err);
    },
  });

  return mutation;
};
