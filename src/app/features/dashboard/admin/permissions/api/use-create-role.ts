import axiosInstance from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateRole() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    undefined,
    AxiosError<{ title: string }>,
    { name: string; description: string }
  >({
    mutationFn: async (req) => {
      const response = await axiosInstance.post("/Admin/Role", req);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles-list"] });
      toast.success("نقش با موقیت اضافه شد");
    },
    onError: (err) => {
      console.log(err);

      toast.error(err.response?.data.title);
    },
  });

  return mutation;
}
