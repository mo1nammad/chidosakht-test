import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";

type RequestBody = {
  name: string;
  productType: 1 | 2;
};
const generateUniLinkByName = (name: string) => name.split(" ").join("-");

export function useCreateInstance() {
  const router = useRouter();

  const mutation = useMutation<AxiosResponse, AxiosError<string>, RequestBody>({
    mutationFn: async (req) => await axiosInstance.post("/Admin/Product", req),

    onSuccess: async (data, variable) => {
      toast.success("محصول جدیدی برای با موفقیت اضافه شدند");

      const location = data.headers.location as string;
      const productId = location.split("/Product/")[1];
      router.push(`/dashboard/admin/products/${productId}`);

      await axiosInstance.put("/Admin/Product/setUniqeLink", {
        productId: Number(productId),
        uniqeLink: generateUniLinkByName(variable.name),
      });
    },
    onError: (err) =>
      toast.error(
        typeof err.response?.data === "string"
          ? err.response?.data
          : "مشکلی پیش آمد"
      ),
  });

  return mutation;
}
