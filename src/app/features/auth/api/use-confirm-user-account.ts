import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import queryString from "query-string";

import { RefreshTokenApiResponse } from "@/types";
import { storeAllTokens } from "@/lib/cookie";
import axiosInstance from "@/lib/axios";
import { useEffect } from "react";
import { toast } from "@/lib/toast";

type ApiQueryResponse = {
  link: {
    url: string;
    for: string;
    httpMethod: string;
  };
  code: string;
};

type ApiRequest = {
  code: string;
};
type ApiResponse = RefreshTokenApiResponse;

export const useConfirmUserAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneNumber = (<string>searchParams.get("url")).split(
    "/ConfirmPhoneNumber/"
  )[1];

  useEffect(() => {
    if (!phoneNumber) {
      router.back();
    }
  }, []);

  const parsed = queryString.parse(searchParams.toString());
  const { data, isSuccess: isSuccessQuery } = useQuery({
    queryKey: ["confirmPhoneNumber"],
    queryFn: async () => {
      try {
        const response = await axiosInstance({
          url: <string>parsed.url,
          method: <string>parsed.httpMethod,
          baseURL: undefined,
        });

        const { code, ...data } = response.data as ApiQueryResponse;
        toast.success("کد ورود به شماره موبایل شما ارسال شد", {
          description: code,
        });

        return data;
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
  });

  const { mutateAsync } = useMutation<ApiResponse, AxiosError, ApiRequest>({
    mutationFn: async (body) => {
      try {
        if (!isSuccessQuery) return;

        const response = await axiosInstance(`/Account/${data?.link.for}`, {
          data: {
            ...body,
            phoneNumber,
          },
          method: data?.link.httpMethod ?? "POST",
          baseURL: undefined,
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

      router.push("/dashboard");
    },
  });
  return { verifyOtp: mutateAsync };
};
