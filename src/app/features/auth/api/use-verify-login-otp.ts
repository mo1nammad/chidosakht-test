import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono/client";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type PostType = (typeof client.api.auth.login)["verify-otp"]["$post"];
type ApiRequest = InferRequestType<PostType>["json"];
type ApiResponse = InferResponseType<PostType>;

export const useVerifyLoginOtp = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.auth.login["verify-otp"].$post({
        json: req,
      });
      const data = await response.json();

      if (response.ok || "message" in data) {
        return data; // Extract JSON data and return
      }

      throw new Error(
        "error" in data ? data.error : "مشکلی پیش آمد دوباره تلاش کنید"
      );
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
  return { verifyOtp: mutateAsync };
};
