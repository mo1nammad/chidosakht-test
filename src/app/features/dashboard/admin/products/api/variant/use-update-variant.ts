import { useParams, useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditProductVariantScheme } from "../../scheme";
import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type RequestBody = EditProductVariantScheme;

export function useUpdateProductVariant() {
  const router = useRouter();
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/ProductVariant", req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-variants", Number(productId)],
      });

      router.back();
    },
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
  });

  return mutation;
}
