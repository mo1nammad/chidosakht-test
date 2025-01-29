"use server";

import { cookies } from "next/headers";
import { OTP_SESSION_NAME } from "../constant";

export const invalidateOtpSession = async () => {
  const cookie = await cookies();
  cookie.delete(OTP_SESSION_NAME);
};

export const getOtpSessionStatus = async () => {
  const cookie = await cookies();

  const session = cookie.get(OTP_SESSION_NAME);
  if (session) {
    return true;
  }
  return false;
};
