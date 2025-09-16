import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useParams } from "next/navigation";

type ApiRequest = {
  text: string;
  star: number;
};

export function usePostComment() {
  const { productId } = useParams();

  const mutation = useMutation<undefined, AxiosError<string>, ApiRequest>({
    mutationFn: async (req) => {
      const response = await axiosInstance.post("/Comment", {
        ...req,
        productId: Number(productId),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success(
        "کامنت با موفقیت ارسال شد و پس از تایید به نمایش گذاشته خواهد شد"
      );
    },
    onError: (err) => {
      toast.error(err.response?.data ?? "مشکلی پیش آمد");
    },
  });

  return mutation;
}
