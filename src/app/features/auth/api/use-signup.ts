import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";

type PostType = (typeof client.api.auth)["sign-up"]["$post"];
type ApiRequest = InferRequestType<PostType>["json"];
type ApiResponse = InferResponseType<PostType>;

export const useSignUp = () => {
  const { mutate } = useMutation<ApiResponse, undefined, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.auth["sign-up"].$post({ json: req });

      if (response.ok) {
        return response.json(); // Extract JSON data and return
      }
      throw new Error("Failed to sign up");
    },
    onSuccess: (data) => console.log(data),
  });
  return { signUpFn: mutate };
};
