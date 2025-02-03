import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";

type PostType = (typeof client.api.auth.login)["$post"];
type ApiRequest = InferRequestType<PostType>["json"];
type ApiResponse = InferResponseType<PostType>;

export const useLoginNoOtp = () => {
  const router = useRouter();
  const { mutateAsync, status } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (req) => {
      const response = await client.api.auth.login.$post({
        json: req,
      });
      const data = await response.json();
      if (!response.ok || "error" in data) {
        throw new Error(
          "error" in data ? data.error : "An unknown error occurred"
        );
      }
      return data;
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  return { mutateAsync, status };
};
