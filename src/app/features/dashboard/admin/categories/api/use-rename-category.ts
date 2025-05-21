import { use } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { CategoryContext } from "../components/category-context";

type ApiRequest = {
  id: number;
  name: string;
  parentCategoryId: number | undefined;
};

export function useRenameCategory() {
  const { setCategoryId } = use(CategoryContext);

  const queryClient = useQueryClient();
  const mutation = useMutation<
    undefined,
    AxiosError<{ title: string }>,
    ApiRequest
  >({
    mutationFn: async (req) => {
      const response = await axiosInstance.put("/Admin/Category", req);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-list"] });
      toast.success("نقش با موفقیت تغییر یافت");
      setCategoryId("");
    },
    onError: (err) => {
      toast.error(err.response?.data.title);
    },
  });

  return mutation;
}
