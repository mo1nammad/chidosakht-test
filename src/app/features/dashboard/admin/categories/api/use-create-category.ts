import { use } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { CategoryContext } from "../components/category-context";

export function useCreateCategory() {
  const { setCategoryId } = use(CategoryContext);

  const queryClient = useQueryClient();
  const mutation = useMutation<
    undefined,
    AxiosError<string>,
    { name: string; parentCategoryId?: number }
  >({
    mutationFn: async (req) => {
      const response = await axiosInstance.post("/Admin/Category", req);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-list"] });
      toast.success("نقش با موفقیت اضافه شد");
      setCategoryId("");
    },
    onError: (err) => {
      toast.error(err.response?.data);
    },
  });

  return mutation;
}
