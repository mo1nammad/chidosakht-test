import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import axios, { AxiosError, isAxiosError } from "axios";
import { getRefreshTokenCookie, storeAllTokens } from "@/lib/cookie";
import axiosInstance from "@/lib/axios";
import { CustomAxiosRequestConfig, RefreshTokenApiResponse } from "@/types";
import { SERVER_API_URL } from "@/constant";
import { useRouter } from "next/navigation";

export const TokenContext = createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<null | string>>;
  isFetching: boolean;
  hasError: boolean;
}>({
  token: null,
  setToken: () => {},
  isFetching: false,
  hasError: false,
});

export default function AuthTokenProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const refreshTokenAsync = useCallback(async () => {
    try {
      setIsFetching(true);
      setHasError(false);
      const refreshToken = await getRefreshTokenCookie();

      if (!refreshToken) throw new Error("no refresh token");

      // if we used axiosInstance we would have a api loop
      const response = await axios.get(
        `${SERVER_API_URL}/Account/RefreshToken/${refreshToken}`
      );

      const data: RefreshTokenApiResponse = response.data;

      setAccessToken(data.token);
      await storeAllTokens(data);
      return data.token;
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) {
        router.push("/login");
      }

      setAccessToken(null);
      setHasError(true);
    } finally {
      setIsFetching(false);
    }
  }, [router]);

  useLayoutEffect(() => {
    refreshTokenAsync();
  }, [refreshTokenAsync]);

  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = accessToken
          ? `Bearer ${accessToken}`
          : config.headers.Authorization;

        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken, refreshTokenAsync]);

  useLayoutEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          const newToken = await refreshTokenAsync();

          originalRequest._retry = true;

          // Retry original request with new token
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshTokenAsync]);

  return (
    <TokenContext
      value={{
        token: accessToken,
        setToken: setAccessToken,
        isFetching,
        hasError,
      }}
    >
      {children}
    </TokenContext>
  );
}
