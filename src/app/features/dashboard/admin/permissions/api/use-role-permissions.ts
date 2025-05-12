import axiosInstance from "@/lib/axios";
import { Permission } from "@/types";

import { useQuery } from "@tanstack/react-query";

export function useRolePermissions(roleId: string) {
  const query = useQuery<number[]>({
    queryKey: ["role-permission-list", roleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/Admin/RolePermission/${roleId}`
      );
      const data = response.data as Permission[];
      const mappedPermission = data.map((perm) => perm.id);
      return mappedPermission;
    },
  });

  return query;
}
