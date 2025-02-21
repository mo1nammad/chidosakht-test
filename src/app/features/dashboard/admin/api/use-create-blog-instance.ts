import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";

type PostType = typeof client.api.blogs.create.$post;
type ApiRequest = InferRequestType<PostType>["json"];
type ApiResponse = InferResponseType<PostType>;
export const useCreateBlogInstance = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.blogs.create.$post({ json: req });
      const data = await response.json();

      if (response.ok && "blogId" in data) {
        return data;
      }

      throw new Error("error" in data ? data.error : "مشکلی پیش آمد");
    },
    onSuccess: (data) => {
      if ("blogId" in data) {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        router.push(`/dashboard/admin/blogs/${data.blogId}`);
      }
    },
  });
  return { mutate, status };
};
