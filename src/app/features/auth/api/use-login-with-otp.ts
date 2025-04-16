import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { z } from "zod";

import { toast } from "@/lib/toast";
import axiosInstance from "@/lib/axios";
import { loginWithOtpSchema } from "../schema";
import { usePhoneNumber } from "../store/phone-number";
import { AxiosError, isAxiosError } from "axios";

type ApiRequest = z.infer<typeof loginWithOtpSchema>;

type ApiResponse = {
  link: {
    url: string;
    for: string;
    httpMethod: string;
  };
  code: string;
};

type ApiErrorResponse = AxiosError<{
  message: string;
  link: {
    url: string;
    for: string;
    httpMethod: string;
  };
}>;

export const useLoginWithOtp = () => {
  const setPhoneNumber = usePhoneNumber((state) => state.setPhoneNumber);
  const router = useRouter();

  const { mutate, status } = useMutation<
    ApiResponse,
    ApiErrorResponse,
    ApiRequest
  >({
    mutationFn: async (body) => {
      try {
        const response = await axiosInstance.post("/Account/Login", {
          ...body,
          loginType: 2,
        });

        return response.data;
      } catch (error) {
        if (isAxiosError(error) && error.status === 401) {
          throw error;
        }
      }
    },
    onSuccess: (data, variable) => {
      setPhoneNumber(variable.phoneNumber);

      const { code, link } = data;

      const stringifiedLink = queryString.stringify(link);

      toast.success("کد ورود به شماره موبایل شما ارسال شد", {
        description: code,
      });
      router.push(`/login/verify-otp?${stringifiedLink}`);
    },
    onError: (err) => {
      if (err.status === 401) {
        toast.error(err.response?.data?.message);
        const data = err.response?.data;

        if (data) {
          const stringifiedLink = queryString.stringify(data.link);
          router.push(`/login/confirm-user?${stringifiedLink}`);
        }
      } else toast.error(err.message);
    },
  });
  return { mutate, status };
};
