import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType } from "hono/client";
import { toast } from "@/lib/toast";

type PostType = (typeof client.api.blogs)[":id"]["$delete"];
type ApiRequest = InferRequestType<PostType>["param"];

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation<undefined, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.blogs[":id"].$delete({ param: req });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "مشکلی پیش آمد");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, status };
};
