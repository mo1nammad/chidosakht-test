import axiosInstance from "@/lib/axios";
import { Session } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: session, ...others } = useQuery<Session>({
    queryKey: ["user-session"],
    queryFn: async () => {
      const response = await axiosInstance.get("/Profile");
      const data: Session = await response.data;
      return data;
    },
    staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes (reduce network requests)
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false, // ✅ Avoid unnecessary refetching when switching tabs
    refetchOnReconnect: true, // ✅ Refetch when internet reconnects
  });

  return { session, ...others };
};
