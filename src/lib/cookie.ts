"use server";

import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/constant";
import { RefreshTokenApiResponse } from "@/types";

export const getRefreshTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
};
export const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
};
// write get session function

export const storeRefreshTokenCookie = async (
  value: string,
  expires: Date | string
) => {
  const cookieStore = await cookies();
  const _expires = new Date(expires);

  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, value, {
    expires: _expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const storeAccessTokenCookie = async (
  value: string,
  expires: Date | string
) => {
  const cookieStore = await cookies();
  const _expires = new Date(expires);

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, value, {
    expires: _expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const removeAllToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
};

export const storeAllTokens = async (data: RefreshTokenApiResponse) => {
  await storeAccessTokenCookie(data.token, data.tokenExpireTime);
  await storeRefreshTokenCookie(data.refreshToken, data.refreshTokenExpireTime);
};
