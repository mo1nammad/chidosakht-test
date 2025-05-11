import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  getAccessTokenCookie,
  getRefreshTokenCookie,
  storeAllTokens,
} from "@/lib/cookie";
import axiosInstance from "@/lib/axios";
import { CustomAxiosRequestConfig, RefreshTokenApiResponse } from "@/types";
import { SERVER_API_URL } from "@/constant";

export const TokenContext = createContext<{
  token: string | null;
  removeToken: () => void;
  isFetching: boolean;
}>({
  token: null,
  removeToken: () => {},
  isFetching: false,
});

export default function AuthTokenProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const removeToken = () => setAccessToken(null);

  const refreshTokenAsync = useCallback(async () => {
    try {
      setIsFetching(true);
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
    } catch {
      setAccessToken(null);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await getAccessTokenCookie();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          setAccessToken(accessToken);
        }

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
        setAccessToken(null);
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest?._retry) {
          const newToken = await refreshTokenAsync();

          originalRequest._retry = true;

          // Retry original request with new token
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshTokenAsync]);

  useLayoutEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user-session"] });
  }, [accessToken, queryClient]);

  return (
    <TokenContext
      value={{
        token: accessToken,
        isFetching,
        removeToken,
      }}
    >
      {children}
    </TokenContext>
  );
}
