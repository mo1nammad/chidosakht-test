import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono/client";

type PostType = typeof client.api.blogs.categories.$get;
type ApiResponse = InferResponseType<PostType>;
export const useBlogCategories = () => {
  const { data, status } = useQuery<ApiResponse, Error>({
    queryKey: ["blogs-categories"],
    queryFn: async () => {
      const response = await client.api.blogs.categories.$get();
      const data = await response.json();

      if (response.ok && "categories" in data) {
        return data;
      }

      throw new Error(
        "error" in data ? data.error : "An unknown error occurred"
      );
    },
  });
  return { data, status };
};
