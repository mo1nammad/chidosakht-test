// import { redirect } from "next/navigation";
import LoginNoOtpForm from "@/app/features/auth/components/login-no-otp-form";
// import { getSession } from "@/lib/session";
// import { redirect } from "next/navigation";

export default async function SignUpPage() {
  // const session = await getSession();
  // if (session) {
  //   redirect("/dashboard");
  // }

  return <LoginNoOtpForm />;
}
