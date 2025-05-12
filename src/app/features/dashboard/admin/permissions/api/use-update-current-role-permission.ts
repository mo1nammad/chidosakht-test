import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type RequestBody = {
  roleId: string;
  permissionIds: number[];
};

export function useUpdateCurrentRolePermission() {
  const mutation = useMutation<undefined, AxiosError, RequestBody>({
    mutationFn: async (req) =>
      await axiosInstance.put("/Admin/RolePermission", req),
    onSuccess: () => toast.success("دسترسی های جدید با موفقیت اضافه شدند"),
  });

  return mutation;
}
