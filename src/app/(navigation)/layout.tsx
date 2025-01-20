import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import ContactUsModal from "@/app/features/navigation/components/contact-us-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mt-20 md:mt-[110px]">{children}</main>
      <Footer />
      <ContactUsModal className="mt-20 md:mt-[110px]" />
    </>
  );
}
