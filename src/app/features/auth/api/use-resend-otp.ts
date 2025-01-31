import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono/client";
import { toast } from "sonner";

type PostType =
  (typeof client.api.auth.register)["request-otp"]["resend"]["$post"];
type ApiResponse = InferResponseType<PostType>;

export const useResendOtp = () => {
  const { mutate, status } = useMutation<ApiResponse, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.register["request-otp"][
        "resend"
      ].$post();

      const data = await response.json();

      if (!response.ok || "error" in data) {
        throw new Error(
          "error" in data ? data.error : "An unknown error occurred"
        );
      }
      return data;
    },
    onSuccess: (data) => {
      if ("message" in data) {
        console.log(data);

        const { code, message } = data;
        toast.success(message, {
          description: () => code,
        });
      }
    },
  });
  return { resendOtp: mutate, status };
};
