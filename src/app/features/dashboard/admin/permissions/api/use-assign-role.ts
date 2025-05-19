import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAssignUserRole(roleId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    undefined,
    AxiosError,
    { userId: string; roleIds: string[] }
  >({
    mutationFn: async (req) => {
      const response = await axiosInstance.post("/Admin/UserRole", req);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-by-role-list", roleId],
      });
      toast.success("کاربر با موفقیت به نقش اضافه شد");
    },
    onError: (err) => {
      toast.error(err.response?.data as string);
    },
  });

  return mutation;
}
