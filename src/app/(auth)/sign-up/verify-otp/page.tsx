import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { OTP_SESSION_NAME } from "@/app/features/auth/constant";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SignupOtpForm from "@/app/features/auth/components/signup-otp-form";

export default async function VerifyOtpPage() {
  const otpSession = (await cookies()).get(OTP_SESSION_NAME)?.value;
  if (!otpSession) redirect("/sign-up");

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-center h-full">
      <Card className="w-full max-w-120 py-6">
        <CardHeader>
          <Link href="/" className="flex items-center justify-center gap-x-2">
            <h1 className="text-3xl font-black">چیدوساخت</h1>
            <img src="/logo.svg" alt="logo" />
          </Link>
        </CardHeader>
        <CardContent className="w-fit mx-auto space-y-5">
          <h4 className="text-center">کد 6 رقمی به شماره تلفن شما ارسال شد</h4>
          <SignupOtpForm className="justify-center" />
        </CardContent>
      </Card>
    </div>
  );
}
