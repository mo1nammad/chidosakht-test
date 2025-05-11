import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import queryString from "query-string";
import { useShallow } from "zustand/react/shallow";

import { usePhoneNumber } from "../store/phone-number";
import { SERVER_API_URL } from "@/constant";

import { storeAllTokens } from "@/lib/cookie";
import { toast } from "@/lib/toast";
import { RefreshTokenApiResponse } from "@/types";

type ApiRequest = {
  code: string;
};

export const useVerifySignupOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { url, httpMethod } = queryString.parse(
    searchParams.toString()
  ) as Record<string, string>;

  const { phoneNumber, setPhoneNumber } = usePhoneNumber(
    useShallow((state) => ({
      phoneNumber: state.phoneNumber,
      setPhoneNumber: state.setPhoneNumber,
    }))
  );

  useEffect(() => {
    if (!phoneNumber) router.push("/sign-up");
  }, []);

  const { mutateAsync } = useMutation<
    RefreshTokenApiResponse,
    Error,
    ApiRequest
  >({
    mutationFn: async (body) => {
      try {
        const response = await axios({
          method: httpMethod ?? "POST",
          url: url ?? `${SERVER_API_URL}/Account/VerifyPhoneNumber`,
          data: {
            ...body,
            phoneNumber,
          },
        });

        // reset state
        setPhoneNumber("");

        // store refresh and bearer roken
        if (response.data satisfies RefreshTokenApiResponse) {
          return response.data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data || "خطا در ثبت نام";
          throw new Error(message);
        }
        throw new Error("خطا در ثبت نام");
      }
    },
    onSuccess: (data) => {
      storeAllTokens(data);
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
      toast.success("ثبت نام با موفقیت انجام شد");
      router.push("/");
    },
  });

  return { verifyOtp: mutateAsync };
};
