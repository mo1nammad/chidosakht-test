import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { OTP_SESSION_NAME } from "@/app/features/auth/constant";
import LoginVerifyOtpForm from "@/app/features/auth/components/login-verify-otp-form";

export default async function VerifyOtpPage() {
  const otpSession = (await cookies()).get(OTP_SESSION_NAME)?.value;
  if (!otpSession) redirect("/sign-up");

  return <LoginVerifyOtpForm />;
}
