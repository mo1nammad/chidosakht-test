import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useParams } from "next/navigation";

type ApiVariables = {
  productVariantId: number | null;
  count: number;
};

export function useAddToCart() {
  const { productId } = useParams();

  const mutation = useMutation<undefined, AxiosError<string>, ApiVariables>({
    mutationFn: async (req) => {
      const response = await axiosInstance.post("/Cart", {
        productVariantId: req.productVariantId,
        productId: req.productVariantId ? null : Number(productId),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("محصول با موفقیت به سبد خرید اضافه شد");

      // update counts here
    },
    onError: (err) => {
      toast.error(err.response?.data ?? "مشکلی پیش آمد");
    },
  });

  return mutation;
}
