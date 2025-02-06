import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "../features/auth/server/actions";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-[calc(100vh-4.5rem)] text-right">DashboardPage</div>
  );
}
