import Navbar from "@/components/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mt-20 md:mt-[110px]">{children}</main>
    </>
  );
}
