import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import queryString from "query-string";

import { usePhoneNumber } from "../store/phone-number";
import { RefreshTokenApiResponse } from "@/types";
import { storeAllTokens } from "@/lib/cookie";
import axiosInstance from "@/lib/axios";
import { useShallow } from "zustand/react/shallow";

type ApiRequest = {
  code: string;
};
type ApiResponse = RefreshTokenApiResponse;

export const useVerifyLoginOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { phoneNumber, setPhoneNumber } = usePhoneNumber(
    useShallow((state) => state)
  );

  useEffect(() => {
    if (!phoneNumber) router.back();
  }, [router]);

  const parsed = queryString.parse(searchParams.toString());
  const { mutateAsync } = useMutation<ApiResponse, AxiosError, ApiRequest>({
    mutationFn: async (body) => {
      try {
        const response = await axiosInstance(`/Account/${<string>parsed.for}`, {
          data: {
            ...body,
            phoneNumber,
          },
          method: <string>parsed.httpMethod,
        });

        if (response.data satisfies RefreshTokenApiResponse) {
          return response.data;
        }
      } catch (error) {
        if (isAxiosError(error)) {
          throw Error(
            error.response?.data.message
              ? error.response?.data.message
              : "مشکلی پیش آمد"
          );
        }
      }
    },
    onSuccess: (data) => {
      storeAllTokens(data);
      setPhoneNumber("");
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
      router.push("/dashboard");
    },
  });
  return { verifyOtp: mutateAsync };
};
