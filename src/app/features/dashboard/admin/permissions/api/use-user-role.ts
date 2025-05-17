import axiosInstance from "@/lib/axios";
import { Session as User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUserRoles(RoleId: string) {
  const query = useQuery<User[]>({
    queryKey: ["users-role-list", RoleId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Admin/RoleUser/${RoleId}`);
      return response.data;
    },
  });

  return query;
}
