"use server";

import { cookies } from "next/headers";
import { AUTH_SESSION_NAME, OTP_SESSION_NAME, Session } from "../constant";
import { decryptSession } from "./controllers";

export const getOtpSessionStatus = async () => {
  const cookie = await cookies();

  const session = cookie.get(OTP_SESSION_NAME);
  if (session?.value) {
    return true;
  }
  return false;
};

export const getSession = async (): Promise<Session | null> => {
  const cookie = await cookies();
  const session = cookie.get(AUTH_SESSION_NAME);

  if (!session) return null;

  const payload = await decryptSession<Session>(session.value);
  return payload;
};

export const logoutSession = async () => {
  const cookie = await cookies();
  cookie.delete(AUTH_SESSION_NAME);
};
