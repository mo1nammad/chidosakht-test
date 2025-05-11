import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export const useCreateBlogInstance = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return {};
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
