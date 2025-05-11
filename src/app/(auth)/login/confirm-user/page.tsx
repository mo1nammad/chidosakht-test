import React, { Suspense } from "react";
import ConfirmUserAccountForm from "@/app/features/auth/components/confirm-user-form";

export default function ConfirmUserPage() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <ConfirmUserAccountForm />
    </Suspense>
  );
}
