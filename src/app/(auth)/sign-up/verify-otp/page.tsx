import SignupVerifyOtpForm from "@/app/features/auth/components/signup-verify-otp-form";
import { Suspense } from "react";

export default async function VerifyOtpPage() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <SignupVerifyOtpForm />
    </Suspense>
  );
}
