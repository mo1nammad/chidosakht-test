import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApiRequest = {
  userId: string;
  roleIds: string[];
};

export function useRemoveUserRole() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (req: ApiRequest) =>
      await axiosInstance.delete(`/Admin/UserRole`, {
        data: req,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users-by-role-list", variables.roleIds[0]],
      });
    },
  });

  return mutation;
}
