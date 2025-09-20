import { Footer } from "@/components/footer";

import Navbar from "$/shop/components/navbar";
import ContactUsModal from "$/navigation/components/contact-us-modal";
import MobileBottomBar from "$/shop/components/mobile-bottom-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={
        {
          "--navbar-height": "99px",
          "--bottom-bar-height": "77px",
        } as Record<string, string>
      }
    >
      <Navbar />
      <main className="min-h-screen pt-(--navbar-height)">{children}</main>
      <Footer className="pb-(--bottom-bar-height) md:pb-0" />
      <MobileBottomBar className="h-(--bottom-bar-height) md:hidden" />
      <ContactUsModal className="mt-20 md:mt-[110px]" />
    </div>
  );
}
