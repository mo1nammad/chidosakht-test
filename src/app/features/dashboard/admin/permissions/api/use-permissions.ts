import axiosInstance from "@/lib/axios";
import { Permission } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function usePermissions() {
  const query = useQuery<Permission[]>({
    queryKey: ["permission-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Admin/Permission");
      return response.data;
    },
  });

  return query;
}
