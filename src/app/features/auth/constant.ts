export const AUTH_SESSION_NAME = "session";
export const OTP_SESSION_NAME = "otp-session";

export type Session = {
  email: string | null;
  phone: string;
  userId: string;
  name: string;
  // avatar :
};
