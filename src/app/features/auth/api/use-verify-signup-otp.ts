import { useRouter } from "next/navigation";
import { InferRequestType, InferResponseType } from "hono/client";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type PostType = (typeof client.api.auth.register)["verify-otp"]["$post"];
type ApiRequest = InferRequestType<PostType>["json"];
type ApiResponse = InferResponseType<PostType>;

export const useVerifySignupOtp = () => {
  const router = useRouter();
  const { mutate } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.auth.register["verify-otp"].$post({
        json: req,
      });

      if (response.ok) {
        return response.json(); // Extract JSON data and return
      }
      throw new Error("Failed to sign up");
    },
    onSuccess: () => {
      // TODO do somthing here
      router.push("/");
    },
  });
  return { verifyOtp: mutate };
};
