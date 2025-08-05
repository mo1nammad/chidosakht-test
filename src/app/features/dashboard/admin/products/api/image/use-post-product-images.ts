import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function usePostProductImage(productId: string) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation<undefined, AxiosError<string>, FormData>({
    mutationFn: async (form) => {
      await axiosInstance.post(`/Admin/ProductImage/${productId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-images", Number(productId)],
      });
      router.refresh();
    },
    onError: (err) => toast.error(err.response?.data),
  });

  return mutation;
}
