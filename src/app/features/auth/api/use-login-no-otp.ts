import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import axiosInstance from "@/lib/axios";
import { loginNoOtpSchema } from "../schema";
import { RefreshTokenApiResponse } from "@/types";
import { storeAllTokens } from "@/lib/cookie";
import { isAxiosError } from "axios";

type ApiRequest = z.infer<typeof loginNoOtpSchema>;

export const useLoginNoOtp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, status } = useMutation<undefined, Error, ApiRequest>({
    mutationFn: async (body) => {
      try {
        const response = await axiosInstance.post("/Account/login", {
          ...body,
          loginType: 1,
        });

        await storeAllTokens(response.data as RefreshTokenApiResponse);
      } catch (error) {
        console.log(error);

        if (isAxiosError(error) && error.status && error.status >= 400) {
          throw new Error(error.response?.data);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
      router.push("/");
    },
  });
  return { mutateAsync, status };
};
