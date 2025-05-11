import axiosInstance from "@/lib/axios";
import { Role } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
  const query = useQuery<Role[]>({
    queryKey: ["roles-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Admin/Role");
      return response.data;
    },
  });

  return query;
}
