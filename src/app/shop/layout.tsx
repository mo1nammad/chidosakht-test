import { Footer } from "@/components/footer";

import Navbar from "$/shop/components/navbar";
import ContactUsModal from "$/navigation/components/contact-us-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarHeight = "99px";

  return (
    <div
      style={
        {
          "--navbar-height": navbarHeight,
        } as Record<string, string>
      }
    >
      <Navbar />
      <main className="min-h-screen pt-(--navbar-height) bg-muted">
        {children}
      </main>
      <Footer />
      <ContactUsModal className="mt-20 md:mt-[110px]" />
    </div>
  );
}
