import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType, InferRequestType } from "hono/client";

type PostType = (typeof client.api.blogs)[":id"]["$get"];
type ApiResponse = InferResponseType<PostType>;
type ApiRequest = InferRequestType<PostType>["param"];

type QueryResponse = Extract<ApiResponse, { message: string }>;

export const useBlogData = (req: ApiRequest) => {
  const router = useRouter();
  const { data, status } = useQuery<QueryResponse>({
    queryKey: ["blog", req.id],
    queryFn: async () => {
      const response = await client.api.blogs[":id"].$get({ param: req });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "مشکلی پیش آمد");
      }

      return data as QueryResponse;
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
