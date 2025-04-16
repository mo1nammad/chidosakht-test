// app/api/refresh-token/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  SERVER_API_URL,
} from "@/constant";
import { RefreshTokenApiResponse } from "@/types";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const res = await fetch(
      `${SERVER_API_URL}/Account/RefreshToken/${refreshToken}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
      cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);

      return NextResponse.redirect(new URL("/login", req.url));
    }

    const data: RefreshTokenApiResponse = await res.json();

    // Set cookies here
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, data.token, {
      httpOnly: true,
      expires: new Date(data.tokenExpireTime),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, data.refreshToken, {
      httpOnly: true,
      expires: new Date(data.refreshTokenExpireTime),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
