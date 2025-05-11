import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const useBlogData = () => {
  const router = useRouter();
  const { data, status } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      return {};
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // ✅ Cache remains fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // ✅ Keep in cache for 30 minutes
  });

  useEffect(() => {
    if (status === "error") {
      router.push("/dashboard/admin/blogs");
    }
  }, [status, router]);
  return { data, status };
};
