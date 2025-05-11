import axiosInstance from "@/lib/axios";
import { Role } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function usePermissions() {
  const query = useQuery<Role[]>({
    queryKey: ["permission-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Admin/Permission");
      return response.data;
    },
  });

  return query;
}
