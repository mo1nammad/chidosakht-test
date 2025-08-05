import { use } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { CategoryContext } from "../components/category-context";

export function useDeleteCategory(categoryId: string | number) {
  const { setCategoryId } = use(CategoryContext);

  const queryClient = useQueryClient();
  const mutation = useMutation<undefined, AxiosError<string>>({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/Admin/Category/${categoryId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-tree"] });
      setCategoryId("");
    },
  });

  return mutation;
}
