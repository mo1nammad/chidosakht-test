import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import axiosInstance from "@/lib/axios";
import { loginNoOtpSchema } from "../schema";
import { RefreshTokenApiResponse } from "@/types";
import { storeRefreshTokenCookie } from "@/lib/cookie";
import { isAxiosError } from "axios";

type ApiRequest = z.infer<typeof loginNoOtpSchema>;

export const useLoginNoOtp = () => {
  const router = useRouter();

  const { mutateAsync, status } = useMutation<undefined, Error, ApiRequest>({
    mutationFn: async (body) => {
      try {
        const response = await axiosInstance.post("/Account/login", {
          ...body,
          loginType: 1,
        });

        const { refreshToken, refreshTokenExpireTime } =
          response.data as RefreshTokenApiResponse;

        await storeRefreshTokenCookie(refreshToken, refreshTokenExpireTime);
      } catch (error) {
        console.log(error);

        if (isAxiosError(error) && error.status && error.status >= 400) {
          throw new Error(error.message);
        }
      }
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  return { mutateAsync, status };
};
