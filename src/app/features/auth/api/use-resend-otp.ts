import { useMutation } from "@tanstack/react-query";

import { toast } from "@/lib/toast";

export const useResendOtp = () => {
  const { mutate, status } = useMutation({
    mutationFn: async () => {},
    onSuccess: (data) => {
      if ("message" in data) {
        console.log(data);

        const { code, message } = data;
        toast.success(message, {
          description: code,
        });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { resendOtp: mutate, status };
};
