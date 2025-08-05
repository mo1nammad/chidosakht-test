import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

type ApiResponse = { id: number; name: string }[];

export function useGetCategories() {
  const query = useQuery<ApiResponse>({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/Admin/Category/GetAllSamaple`);
      return response.data;
    },
  });

  return query;
}
