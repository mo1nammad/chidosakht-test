import { useQuery } from "@tanstack/react-query";

export const useGetBlogs = () => {
  const { data, status } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return {};
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // ✅ Cache remains fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // ✅ Keep in cache for 30 minutes
  });

  return { data, status };
};
