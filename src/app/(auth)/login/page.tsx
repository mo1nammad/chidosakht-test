import { redirect } from "next/navigation";
import LoginNoOtpForm from "@/app/features/auth/components/login-no-otp-form";
import { getSession } from "@/app/features/auth/server/actions";

export default async function SignUpPage() {
  const session = await getSession();
  if (session && session.userId) {
    redirect("/dashboard");
  }
  return <LoginNoOtpForm />;
}
