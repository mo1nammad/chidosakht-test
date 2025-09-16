import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type ApiRequest = string | number;

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation<undefined, AxiosError<string>, ApiRequest>({
    mutationFn: async (commentId) =>
      await axiosInstance.delete(`/Admin/Comment/${commentId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      toast.success("کامنت با موفقیت حذف شد");
    },
    onError: (err) => {
      toast.error(err.response?.data ?? "مشکلی پیش آمد");
    },
  });

  return mutation;
}
