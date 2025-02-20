import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono/client";

type Req = typeof client.api.blogs.$get;
type ApiResponse = InferResponseType<Req>;
type ApiReturnType = Extract<ApiResponse, { message: string }>;

export const useGetBlogs = () => {
  const { data, status } = useQuery<ApiReturnType, Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await client.api.blogs.$get();
      const data = await response.json();

      if (response.ok) {
        return data as ApiReturnType;
      }

      throw new Error("error" in data ? data.error : "مشکلی پیش آمد");
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // ✅ Cache remains fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // ✅ Keep in cache for 30 minutes
  });

  return { data, status };
};
