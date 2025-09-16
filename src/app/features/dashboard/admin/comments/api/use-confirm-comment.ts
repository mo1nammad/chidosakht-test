import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";

type ApiRequest = string | number;

export function useConfirmComment() {
  const queryClient = useQueryClient();
  const mutation = useMutation<undefined, AxiosError<string>, ApiRequest>({
    mutationFn: async (commentId) => {
      const response = await axiosInstance.put(`/Admin/Comment/${commentId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      toast.success("کامنت با موفقیت تایید شد");
    },
    onError: (err) => {
      toast.error(err.response?.data ?? "مشکلی پیش آمد");
    },
  });

  return mutation;
}
