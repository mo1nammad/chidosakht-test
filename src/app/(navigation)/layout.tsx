import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <main className="mt-20 md:mt-[110px]">{children}</main>
      <Footer />
    </section>
  );
}
