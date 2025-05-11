import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useDeleteRole() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (roleId: string) =>
      await axiosInstance.delete(`/Admin/Role/${roleId}`),
    onError: (err: AxiosError<string>) => toast.error(err.response?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-list"] });
      toast.success("نقش با موفقیت حذف شد");
    },
  });

  return mutation;
}
