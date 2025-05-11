import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/lib/toast";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      return {};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, status };
};
