import LoginVerifyOtpForm from "@/app/features/auth/components/login-verify-otp-form";
import { Suspense } from "react";

export default async function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <LoginVerifyOtpForm />
    </Suspense>
  );
}
