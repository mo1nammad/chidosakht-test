import { redirect } from "next/navigation";
import SignUpForm from "@/app/features/auth/components/signup-form";
import { getSession } from "@/app/features/auth/server/actions";

export default async function SignUpPage() {
  const session = await getSession();
  if (session && session.userId) {
    redirect("/dashboard");
  }
  return <SignUpForm />;
}
