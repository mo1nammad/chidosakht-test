import React from "react";
import SidebarLayout from "@/app/features/dashboard/components/sidebar-layout";
import DashboardNavbar from "../features/dashboard/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const session = await getSession();
  if (!session?.id) redirect("/login");

  const SIDEBAR_WIDTH = "20rem";
  return (
    <div
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
        } as never
      }
      className="bg-muted"
    >
      <DashboardNavbar className="lg:mr-(--sidebar-width) h-18" />
      <SidebarLayout className="w-(--sidebar-width) bg-white hidden lg:flex" />
      <main className="lg:mr-(--sidebar-width) pt-18 min-h-screen">
        {children}
      </main>
    </div>
  );
}
