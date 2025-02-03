import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

type PostType = (typeof client.api.auth.login)["request-otp"]["$post"];
type ApiRequest = InferRequestType<PostType>["query"];
type ApiResponse = InferResponseType<PostType>;

export const useLoginWithOtp = () => {
  const router = useRouter();

  const { mutate, status } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.auth.login["request-otp"].$post({
        query: req,
      });
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
        const { code, message } = data;
        toast.success(message, {
          description: code,
        });
      }
      router.push("/login/verify-otp");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, status };
};
