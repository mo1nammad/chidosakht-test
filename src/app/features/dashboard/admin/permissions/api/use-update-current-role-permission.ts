import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

type RequestBody = {
  roleId: string;
  permissionIds: number[];
};

export function useUpdateCurrentRolePermission() {
  const mutation = useMutation<undefined, AxiosError, RequestBody>({
    mutationFn: async (req) => {
      console.log(req);

      await axiosInstance.put("/Admin/RolePermission", req);
    },
  });

  return mutation;
}
