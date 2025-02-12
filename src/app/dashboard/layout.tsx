import React from "react";
import SidebarLayout from "@/app/features/dashboard/components/sidebar-layout";
import DashboardNavbar from "../features/dashboard/components/dashboard-navbar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
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
