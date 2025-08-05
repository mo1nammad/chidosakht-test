import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

type RequestBody = {
  categoryId: number;
};

export function useUpdateProductCategory() {
  const { productId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/Product/SetCategoryId", {
        ...req,
        productId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product", Number(productId)],
      });
      toast.success("محصول با موفقیت به دسته بندی اضافه شد");
    },
    onError: (err) => toast.error(err.response?.data || "مشکلی پیش آمد"),
  });

  return mutation;
}
