// import { redirect } from "next/navigation";
import SignUpForm from "@/app/features/auth/components/signup-form";

export default async function SignUpPage() {
  // if (session && session.userId) {
  //   redirect("/dashboard");
  // }
  return <SignUpForm />;
}
