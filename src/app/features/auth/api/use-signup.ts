import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosCore from "axios";
import queryString from "query-string";

import { toast } from "@/lib/toast";
import axios from "@/lib/axios";

import { z } from "zod";
import { signUpSchema } from "../schema";
import { usePhoneNumber } from "../store/phone-number";

type ApiRequest = z.infer<typeof signUpSchema>;
type ApiResponse = {
  message: string;
  link: {
    url: string;
    for: string;
    httpMethod: string;
  };
  code: string;
};

export const useSignUp = () => {
  const router = useRouter();
  const setPhoneNumberState = usePhoneNumber((state) => state.setPhoneNumber);

  const { mutate, status } = useMutation<ApiResponse, Error, ApiRequest>({
    mutationFn: async (body) => {
      try {
        const response = await axios.post("/Account/Register", body);

        // for otp auth api
        setPhoneNumberState(body.phoneNumber);

        return response.data;
      } catch (error) {
        if (axiosCore.isAxiosError(error)) {
          const message = error.response?.data || "خطا در ثبت نام";
          throw new Error(message);
        }
        throw new Error("خطا در ثبت نام");
      }
    },
    onSuccess: (data) => {
      const { code, message, link } = data;

      const stringifiedLink = queryString.stringify(link);

      toast.success(message, {
        description: code,
      });
      router.push(`/sign-up/verify-otp?${stringifiedLink}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signUpFn: mutate, status };
};
