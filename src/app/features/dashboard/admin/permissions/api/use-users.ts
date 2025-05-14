import axiosInstance from "@/lib/axios";
import { Session as User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  const query = useQuery<User[]>({
    queryKey: ["users-list"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Admin/User");
      return response.data;
    },
  });

  return query;
}
