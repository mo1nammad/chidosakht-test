import React from "react";
import Sidebar from "@/app/features/dashboard/components/sidebar";
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
    >
      <DashboardNavbar className="mr-(--sidebar-width) h-18" />
      <Sidebar className="w-(--sidebar-width) bg-white" />
      <main className="mr-(--sidebar-width) pt-18">{children}</main>
    </div>
  );
}
